'use client';

import { useState } from 'react';
import Heading  from '@/components/header'; // Adjust path as per your project
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';

import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

export default function ChatPage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResponse('Loading...');

    try {
      const res = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.choices?.[0]?.message?.content || 'No response');
      }
    } catch (err) {
      console.log(err);
      setResponse('Request failed');
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our Most Advanced Conversation Model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          <div className="whitespace-pre-line text-sm border p-4 rounded-md bg-gray-50">
            {response || 'Model response will appear here.'}
          </div>
        </div>
      </div>
    </div>
  );
}
