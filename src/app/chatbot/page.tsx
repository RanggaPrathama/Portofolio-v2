import { ChatBot } from "@/components/chatbot";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
const metadata = {
  title: "ChatBot",
  description: "Chat with our AI-powered chatbot.",
};

const ChatBotPage = async () => {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <BlurFade delay={0.04}>
          <div className="space-y-4 text-center">
            <Badge className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">AI Assistant</Badge>
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
