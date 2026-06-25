"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Send, X } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  city: string;
  location: string;
  position: string;
  experience: string;
  startDate: string;
  comment: string;
};

type FieldProps = {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  required?: boolean;
  type?: "text" | "tel";
  placeholder?: string;
  autoComplete?: string;
};

const cityOptions = ["Запоріжжя", "Львів"];
const locationOptions = ["Seven Володимира Великого", "Seven Площа Ринок", "Seven Запоріжжя"];
const positionOptions = ["Офіціант", "Бармен", "Кухар", "Кальянщик", "Адміністратор", "Інше"];

const initialFormState: FormState = {
  name: "",
  phone: "",
  city: "",
  location: "",
  position: "",
  experience: "",
  startDate: "",
  comment: "",
};

const fallbackMessage = "Заявку не вдалося відправити. Спробуйте ще раз або напишіть нам у Telegram.";
const fieldClass =
  "mt-2 w-full rounded-[8px] border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-seven-muted/65 focus:border-seven-green focus:ring-2 focus:ring-seven-green/20";

const isValidUkrainianPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 && digits.startsWith("0")) || (digits.length === 12 && digits.startsWith("380"));
};

function TextField({ id, label, value, onChange, required, type = "text", placeholder, autoComplete }: FieldProps) {
  return (
    <label htmlFor={id} className="text-sm font-semibold text-white">
      {label} {required ? <span className="text-seven-green">*</span> : null}
      <input
        id={id}
        name={id}
        type={type}
        className={fieldClass}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  options: string[];
}) {
  return (
    <label htmlFor={id} className="text-sm font-semibold text-white">
      {label}
      <select id={id} name={id} className={fieldClass} value={value} onChange={(event) => onChange(id, event.target.value)}>
        <option value="">Оберіть варіант</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="text-sm font-semibold text-white md:col-span-2">
      {label}
      <textarea
        id={id}
        name={id}
        className={`${fieldClass} min-h-24 resize-y`}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function HRSection() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

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

  const statusMessageClass = useMemo(
    () =>
      status === "success"
        ? "bg-seven-green/12 text-seven-green premium-border"
        : "bg-seven-terracotta/15 text-white premium-border",
    [status],
  );

  const updateField = (field: keyof FormState, value: string) => {
    if (field === "phone") {
      setPhoneError("");
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetAndOpen = () => {
    setStatus("idle");
    setMessage("");
    setPhoneError("");
    setOpen(true);
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setPhoneError("");

    if (!isValidUkrainianPhone(form.phone)) {
      setStatus("idle");
      setPhoneError("Вкажіть український номер у форматі 0XX XXX XX XX або +380 XX XXX XX XX.");
      return;
    }

    try {
      const response = await fetch("/api/hr-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || fallbackMessage);
        return;
      }

      setStatus("success");
      setForm(initialFormState);
      setMessage("Дякуємо!\nМи отримали вашу заявку.\nНайближчим часом HR звʼяжеться з вами.");
    } catch {
      setStatus("error");
      setMessage(fallbackMessage);
    }
  };

  const modal = open ? (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="careers-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[90vh] max-h-[90dvh] w-full max-w-3xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/10 bg-seven-background/95 p-4 backdrop-blur-xl md:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-seven-green">Careers</p>
            <h2 id="careers-modal-title" className="mt-2 font-display text-3xl font-black leading-none text-white md:text-4xl">
              Анкета кандидата
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white transition hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
            onClick={() => setOpen(false)}
            aria-label="Закрити анкету"
          >
            <X size={22} />
          </button>
        </div>

        <form className="grid gap-4 p-4 md:grid-cols-2 md:p-6" onSubmit={submitApplication}>
          <TextField id="name" label="Імʼя" value={form.name} onChange={updateField} required autoComplete="name" />
          <div>
            <TextField
              id="phone"
              label="Телефон"
              value={form.phone}
              onChange={updateField}
              required
              type="tel"
              placeholder="+380 XX XXX XX XX"
              autoComplete="tel"
            />
            {phoneError ? <p className="mt-2 text-xs font-semibold text-seven-terracotta">{phoneError}</p> : null}
          </div>
          <SelectField id="city" label="Місто" value={form.city} onChange={updateField} options={cityOptions} />
          <SelectField id="location" label="Заклад" value={form.location} onChange={updateField} options={locationOptions} />
          <SelectField id="position" label="Посада" value={form.position} onChange={updateField} options={positionOptions} />
          <TextField id="startDate" label="Коли готові почати" value={form.startDate} onChange={updateField} placeholder="Наприклад: з наступного тижня" />
          <TextAreaField id="experience" label="Досвід роботи" value={form.experience} onChange={updateField} placeholder="Коротко про попередній досвід" />
          <TextAreaField id="comment" label="Коментар" value={form.comment} onChange={updateField} placeholder="Що ще нам варто знати?" />

          {message ? (
            <div className={`whitespace-pre-line rounded-[8px] p-4 text-sm leading-6 md:col-span-2 ${statusMessageClass}`} role="status" aria-live="polite">
              {message}
            </div>
          ) : null}

          {status === "error" ? (
            <a
              href="https://t.me/Hrsevengroup"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-1 text-sm font-bold text-seven-green underline underline-offset-4 md:col-span-2"
            >
              Написати HR у Telegram
            </a>
          ) : null}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50 disabled:cursor-not-allowed disabled:opacity-60"
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
    <section id="careers" className="scroll-mt-28 bg-black py-14 md:py-16" aria-labelledby="careers-title">
      <div className="container-shell">
        <div className="grid gap-6 rounded-[8px] bg-seven-card/80 p-6 premium-border md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-seven-green">Careers</p>
            <h2 id="careers-title" className="font-display text-4xl font-black leading-none text-white md:text-5xl">
              Стати частиною команди Seven
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-seven-muted">
              Шукаємо людей, які люблять сервіс, атмосферу і живу енергію закладу.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50 md:min-w-60"
            onClick={resetAndOpen}
          >
            Заповнити анкету
          </button>
        </div>
      </div>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </section>
  );
}
