"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "text-violet-500/10",
      href: "/conversation"
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      bgColor: "text-emerald-500/10",
      href: "/music"
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "text-pink-700/10",
      href: "/image"
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-500",
      bgColor: "text-orange-500/10",
      href: "/video"
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor: "text-green-700/10",
      href: "/conversation"
    }
  ]

  const DashboardPage = () => {

  const router = useRouter();

  return (
    <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
                Explore the power of AI
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-md text-center">
              Chat with the Smartest AI - Experoience the Power of AI
            </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.label}
            className="hover:shadow-md transition cursor-pointer"
          >
            <div
              onClick={() => router.push(tool.href)}
              className="p-4 border-black/5 flex flex-row items-center justify-between w-full"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Card>
        ))}
        </div>
    </div>
  );
}

export default DashboardPage;