"use client";

import { type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Send, X } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  telegram: string;
  city: string;
  position: string;
  experience: string;
  comment: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  telegram: "",
  city: "",
  position: "",
  experience: "",
  comment: "",
};

const fieldClass = "mt-2 w-full rounded-[8px] border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-seven-green";

export function HRSection() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/hr-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || "Заявка поки не відправилась. Спробуйте написати нам у Telegram.");
        return;
      }

      setStatus("success");
      setForm(initialFormState);
      setMessage("Дякуємо! Анкету отримали. Якщо все підходить — звʼяжемось з вами.");
    } catch {
      setStatus("error");
      setMessage("Заявка поки не відправилась. Спробуйте написати нам у Telegram.");
    }
  };

  const modal = open ? (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hr-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[90vh] max-h-[90dvh] w-full max-w-2xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-seven-background/95 p-4 backdrop-blur-xl md:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-seven-green">Team Seven</p>
            <h2 id="hr-modal-title" className="mt-2 font-display text-3xl font-black leading-none text-white md:text-4xl">
              Анкета кандидата
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white transition hover:bg-seven-cream hover:text-seven-background"
            onClick={() => setOpen(false)}
            aria-label="Закрити"
          >
            <X size={22} />
          </button>
        </div>

        <form className="grid gap-4 p-4 md:grid-cols-2 md:p-6" onSubmit={submitApplication}>
          <label className="text-sm font-semibold text-white">
            Імʼя *
            <input className={fieldClass} value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-white">
            Телефон *
            <input className={fieldClass} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-white">
            Telegram username
            <input className={fieldClass} value={form.telegram} onChange={(event) => updateField("telegram", event.target.value)} placeholder="@username" />
          </label>
          <label className="text-sm font-semibold text-white">
            Місто
            <input className={fieldClass} value={form.city} onChange={(event) => updateField("city", event.target.value)} />
          </label>
          <label className="text-sm font-semibold text-white md:col-span-2">
            Бажана посада *
            <input className={fieldClass} value={form.position} onChange={(event) => updateField("position", event.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-white md:col-span-2">
            Досвід роботи
            <textarea className={`${fieldClass} min-h-24 resize-y`} value={form.experience} onChange={(event) => updateField("experience", event.target.value)} />
          </label>
          <label className="text-sm font-semibold text-white md:col-span-2">
            Коментар
            <textarea className={`${fieldClass} min-h-24 resize-y`} value={form.comment} onChange={(event) => updateField("comment", event.target.value)} />
          </label>

          {message ? (
            <div className={`rounded-[8px] p-4 text-sm leading-6 md:col-span-2 ${status === "success" ? "bg-seven-green/12 text-seven-green premium-border" : "bg-seven-terracotta/15 text-white premium-border"}`}>
              {message}{" "}
              {status === "error" ? (
                <a href="https://t.me/Hrsevengroup" target="_blank" rel="noreferrer" className="font-bold text-seven-green underline underline-offset-4">
                  Написати HR
                </a>
              ) : null}
            </div>
          ) : null}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === "loading"}
            >
              <Send size={17} />
              {status === "loading" ? "Відправляємо..." : "Відправити анкету"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <section className="bg-black py-14 md:py-16">
      <div className="container-shell">
        <div className="grid gap-6 rounded-[8px] bg-seven-card/80 p-6 premium-border md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-seven-green">HR</p>
            <h2 className="font-display text-4xl font-black leading-none text-white md:text-5xl">Стати командою Seven</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-seven-muted">
              Шукаємо людей, які люблять сервіс, атмосферу і живу енергію закладу.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background md:min-w-60"
            onClick={() => {
              setStatus("idle");
              setMessage("");
              setOpen(true);
            }}
          >
            Заповнити анкету
          </button>
        </div>
      </div>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </section>
  );
}
