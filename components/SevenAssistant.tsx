"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  "Локації",
  "Меню",
  "Банкети",
  "Вакансії",
  "Як забронювати?",
  "Дитяча кімната",
] as const;

const quickPrompts: Record<(typeof quickActions)[number], string> = {
  Локації: "Покажи всі локації Seven з адресами, телефонами і графіком.",
  Меню: "Де подивитися меню Seven для кожної локації?",
  Банкети: "Які умови банкетів у Seven?",
  Вакансії: "Як подати заявку на роботу в Seven?",
  "Як забронювати?": "Як забронювати стіл у Seven?",
  "Дитяча кімната": "У яких локаціях Seven є дитяча кімната?",
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content: "Привіт! Я допоможу з локаціями, меню, бронюванням, банкетами, подіями та вакансіями Seven.",
};

export function SevenAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 180);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(messageText: string) {
    const text = messageText.trim();

    if (!text || loading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Assistant request failed.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply || "" }]);
    } catch {
      setError("Помічник Seven зараз не відповідає. Спробуйте ще раз або зателефонуйте у потрібний заклад.");
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Помічник Seven зараз не відповідає. Спробуйте ще раз або зателефонуйте у потрібний заклад.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function clearChat() {
    setMessages([initialMessage]);
    setError("");
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] right-4 z-[55] inline-flex min-h-12 items-center gap-2 rounded-full bg-seven-terracotta px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_46px_rgba(201,113,74,0.32)] transition duration-500 hover:bg-seven-cream hover:text-seven-background md:bottom-8 md:right-8 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Відкрити чат Запитати Seven"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Запитати Seven</span>
        <span className="sm:hidden">Seven</span>
      </button>

      {open ? (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[90] w-[calc(100vw-32px)] max-w-[380px] animate-[fadeIn_420ms_ease-out] md:bottom-8 md:right-8">
          <section
            className="premium-border flex max-h-[70vh] w-full max-w-[380px] flex-col overflow-hidden rounded-[24px] bg-[#151515] shadow-[0_30px_90px_rgba(0,0,0,0.48)]"
            aria-label="Чат Запитати Seven"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-seven-green/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-seven-green">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  AI помічник
                </div>
                <h2 className="mt-2 font-display text-2xl font-black uppercase leading-none text-white">Запитати Seven</h2>
                <p className="mt-1 text-xs leading-5 text-seven-muted">Коротко підкажу про локації, меню, бронювання та події.</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={clearChat}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-seven-muted transition hover:bg-white/10 hover:text-white"
                  aria-label="Очистити чат"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-seven-terracotta"
                  aria-label="Закрити чат"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [-webkit-overflow-scrolling:touch] sm:px-5">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-seven-terracotta text-white"
                        : "border border-white/10 bg-white/[0.05] text-seven-cream"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-seven-muted">
                    Seven відповідає...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-4 py-4 sm:px-5">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => sendMessage(quickPrompts[action])}
                    disabled={loading}
                    className="shrink-0 rounded-full border border-seven-green/25 bg-seven-green/10 px-3 py-2 text-[11px] font-bold text-seven-green transition hover:bg-seven-green hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {error ? <p className="mb-3 text-xs leading-5 text-seven-terracotta">{error}</p> : null}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label className="sr-only" htmlFor="seven-assistant-input">
                  Повідомлення для Seven
                </label>
                <input
                  ref={inputRef}
                  id="seven-assistant-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Напишіть питання..."
                  className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-seven-muted focus:border-seven-green/60"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-seven-terracotta text-white shadow-[0_14px_34px_rgba(201,113,74,0.24)] transition hover:bg-seven-cream hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Надіслати"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
