"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import type { Messages } from "@/types/chatbot";

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your projects",
  "What's your experience?",
  "What technologies do you use?",
];

const LOCAL_STORAGE_KEY = "chatbot_message_history";

export function ChatBot() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsHydrated(true);

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();

    if (!text || isLoading) return;

    const userMessage: Messages = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;

          // Update the assistant message with streamed content
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: assistantContent }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: "Sorry, something went wrong. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  if (!isHydrated) {
    return (
      <div className="flex h-[calc(100dvh-120px)] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-120px)] w-full max-w-3xl mx-auto">
      {/* Messages Area - Scrollable */}
    <div className="px-3 sm:px-4 py-4 sm:py-6 border border-border/30 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Welcome message if no messages */}
          {messages.length === 0 && (
            <div className="flex gap-2 sm:gap-3">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                <AvatarImage src="/me.jpg" alt="Assistant" />
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl bg-muted/50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground">
                <p>
                  Hi! 👋 I&apos;m Rangga&apos;s AI assistant. Feel free to ask
                  me about his projects, skills, experience, or anything else
                  you&apos;d like to know!
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 sm:gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                {message.role === "assistant" ? (
                  <>
                    <AvatarImage src="/me.jpg" alt="Assistant" />
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-blue-500/20">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground"
                )}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                {message.role === "assistant" &&
                  message.content === "" &&
                  isLoading && (
                    <span className="inline-block animate-pulse">▊</span>
                  )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="px-3 sm:px-4 py-3 border-t border-border/30">
          <p className="mb-2 text-[10px] sm:text-xs text-muted-foreground">
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                className="h-auto whitespace-normal rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-background/30 hover:bg-background/50"
                onClick={() => handleSend(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input - Fixed at bottom */}
      <div className=" px-3 sm:px-4 py-3 pt-6">
        <div className="flex w-full items-end gap-2 max-w-3xl mx-auto">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl hover:bg-destructive/10 hover:text-destructive"
              onClick={clearChat}
              title="Clear chat"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              disabled={isLoading}
              className="w-full resize-none rounded-2xl border border-border/50 bg-muted/30 backdrop-blur-sm px-4 py-3 pr-12 text-xs sm:text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <Button
              size="icon"
              className="absolute right-1.5 bottom-1.5 h-8 w-8 sm:h-9 sm:w-9 rounded-xl"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simulated response - replace with actual AI API
function getSimulatedResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("skill") || q.includes("technology") || q.includes("tech")) {
    return "I'm proficient in various technologies including:\n\n• **Frontend**: React, Next.js, Vue.js, Tailwind CSS\n• **Backend**: Go, Node.js, Laravel, Express.js\n• **Database**: PostgreSQL, MySQL\n• **AI/ML**: Python, FastAPI, LLMs\n• **DevOps**: Docker\n\nI'm always learning new technologies to stay up-to-date!";
  }

  if (q.includes("project")) {
    return "I've worked on several interesting projects:\n\n1. **SIMEDI** - Inventory Management System for PERUMDA Perkebunan Kahyangan\n2. **TBCARE** - Tuberculosis Care Monitoring System\n3. **IURIS** - Faculty Administrative Information System\n4. **Kampus Kita Mobile** - Mobile app for UNAIR students\n5. **HRIS Backend API** - HR system for Ministry of Defense\n6. **AI Service for HRIS** - LLM-powered analytics service\n\nWant to know more about any specific project?";
  }

  if (q.includes("experience") || q.includes("work")) {
    return "Here's my professional experience:\n\n• **ERA Real Estate** (2025 - Present)\n  Backend & AI Engineer Intern\n  Working on SSO integration and AI-powered services\n\n• **Universitas Airlangga** (2024 - 2025)\n  Information Systems & Digitalization Intern\n  Campus mobile API development\n\n• **Universitas Airlangga** (2022 - 2023)\n  Innovation & Educational Development Intern\n  Academic data management";
  }

  if (
    q.includes("education") ||
    q.includes("study") ||
    q.includes("university")
  ) {
    return "I'm currently pursuing my **Bachelor's Degree in Informatics Engineering** at **Universitas Airlangga** (UNAIR), Surabaya, Indonesia. Started in 2021 and still ongoing! 🎓";
  }

  if (q.includes("contact") || q.includes("reach") || q.includes("email")) {
    return "You can reach me through:\n\n📧 **Email**: ranggaprathama9@gmail.com\n💼 **LinkedIn**: linkedin.com/in/rangga-prathama-05a066291\n🐙 **GitHub**: github.com/RanggaPrathama\n\nFeel free to connect!";
  }

  return "That's a great question! I'm here to help you learn more about Rangga's projects, skills, and experience. Feel free to ask about:\n\n• Technical skills & technologies\n• Projects and portfolio\n• Work experience\n• Education background\n• How to get in contact\n\nWhat would you like to know?";
}
