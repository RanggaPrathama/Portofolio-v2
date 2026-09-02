import { ChatBot } from "@/components/chatbot";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot",
  description:
    "Chat with Rangga Prathama's AI assistant. Ask about my projects, skills, experience, and what I can build for you.",
  // openGraph: {
  //   title: "AI Assistant | Rangga Prathama",
  //   description:
  //     "Chat with Rangga Prathama's AI assistant. Ask about my projects, skills, experience, and what I can build for you.",
  //   images: [
  //     {
  //       url: `/api/og?title=AI%20Assistant&desc=Chat%20with%20my%20AI%20assistant%20about%20my%20skills%20and%20projects.`,
  //       width: 1200,
  //       height: 630,
  //       alt: "Rangga Prathama AI Assistant",
  //     },
  //   ],
  // },
  openGraph: {
    images: [
      "/api/og?title=Chatbot&desc=Chat%20with%20my%20AI%20assistant%20about%20my%20skills%20and%20projects.",
    ],
  },
  twitter: {
    images: [
      "/api/og?title=Chatbot&desc=Chat%20with%20my%20AI%20assistant%20about%20my%20skills%20and%20projects.",
    ],
  },
};

const ChatBotPage = async () => {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <BlurFade delay={0.04}>
          <div className="space-y-4 text-center">
            <Badge className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              AI Assistant
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Chat with My AI Assistant
            </h1>
            <p className="text-muted-foreground text-md md:text-lg">
              Ask anything about my projects, skills, or experience!
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={0.08}>
          <ChatBot />
        </BlurFade>
      </div>
    </main>
  );
};

export default ChatBotPage;
