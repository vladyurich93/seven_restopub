"use client";

import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, FileText, Instagram, Send, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

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

type CareersModalContextValue = {
  openCareersModal: () => void;
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

const CareersModalContext = createContext<CareersModalContextValue | null>(null);

const cityOptions = ["Запоріжжя", "Львів"];
const locationOptions = ["Seven Володимира Великого", "Seven Площа Ринок", "Seven Запоріжжя"];
const positionOptions = ["Офіціант", "Бармен", "Кухар", "Кальянщик", "Адміністратор", "Інше"];
const locationInstagramLinks: Record<string, string> = {
  "Seven Запоріжжя": "https://www.instagram.com/seven.restopub.zp?igsh=Z2RlbGQ2bWFscG02",
  "Seven Володимира Великого": "https://www.instagram.com/seven.vv18?igsh=MW1kdjFoaDZ1NXNvdg==",
  "Seven Площа Ринок": "https://www.instagram.com/seven.square25?igsh=MXF5cGthdXdsd3Vvbg==",
  Запоріжжя: "https://www.instagram.com/seven.restopub.zp?igsh=Z2RlbGQ2bWFscG02",
  "Львів Володимира Великого": "https://www.instagram.com/seven.vv18?igsh=MW1kdjFoaDZ1NXNvdg==",
  "Львів Площа Ринок": "https://www.instagram.com/seven.square25?igsh=MXF5cGthdXdsd3Vvbg==",
};

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
const maxCvSizeBytes = 10 * 1024 * 1024;
const allowedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
const fieldClass =
  "mt-1.5 w-full rounded-[8px] border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-seven-muted/65 focus:border-seven-green focus:ring-2 focus:ring-seven-green/20";

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

export function useCareersModal() {
  const context = useContext(CareersModalContext);

  if (!context) {
    throw new Error("useCareersModal must be used within CareersModalProvider");
  }

  return context;
}

export function CareersModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

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

  const openCareersModal = () => {
    setStatus("idle");
    setMessage("");
    setPhoneError("");
    setCvError("");
    setOpen(true);
  };

  const resetApplicationForm = () => {
    setStatus("idle");
    setMessage("");
    setPhoneError("");
    setCvError("");
    setForm(initialFormState);
    setCvFile(null);
  };

  const updateCvFile = (file: File | null) => {
    setCvError("");

    if (!file) {
      setCvFile(null);
      return;
    }

    if (!allowedCvTypes.includes(file.type)) {
      setCvFile(null);
      setCvError("Додайте файл у форматі PDF, DOC, DOCX, JPG або PNG.");
      return;
    }

    if (file.size > maxCvSizeBytes) {
      setCvFile(null);
      setCvError("Файл має бути до 10 MB.");
      return;
    }

    setCvFile(file);
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setPhoneError("");
    setCvError("");

    if (!isValidUkrainianPhone(form.phone)) {
      setStatus("idle");
      setPhoneError("Вкажіть український номер у форматі 0XX XXX XX XX або +380 XX XXX XX XX.");
      return;
    }

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (cvFile) {
        payload.append("cv", cvFile);
      }

      const response = await fetch("/api/hr-application", {
        method: "POST",
        body: payload,
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || fallbackMessage);
        return;
      }

      setStatus("success");
      setSubmittedLocation(form.location);
      setForm(initialFormState);
      setCvFile(null);
      setMessage(result.message || "Дякуємо! Ми отримали вашу заявку. HR Seven звʼяжеться з вами найближчим часом.");
    } catch {
      setStatus("error");
      setMessage(fallbackMessage);
    }
  };

  const selectedInstagramLink = submittedLocation ? locationInstagramLinks[submittedLocation] : undefined;
  const instagramHref = selectedInstagramLink || siteConfig.instagram;
  const instagramLabel = selectedInstagramLink ? "Instagram закладу" : "Instagram Seven";

  const modal = open ? (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-black/78 p-3 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="careers-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-h-[90vh] max-h-[90dvh] w-full max-w-3xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/10 bg-seven-background p-4 md:px-5 md:py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-seven-green">Команда Seven</p>
            <h2 id="careers-modal-title" className="mt-1.5 font-display text-3xl font-black leading-none text-white md:text-4xl">
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

        {status === "success" ? (
          <div className="animate-[fadeIn_500ms_ease-out] px-4 py-8 text-center md:px-10 md:py-10" role="status" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-seven-green/12 text-seven-green premium-border shadow-glow">
              <CheckCircle2 size={34} strokeWidth={1.8} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-seven-green">Анкета в Telegram</p>
            <h3 className="mt-2 font-display text-4xl font-black leading-none text-white md:text-5xl">Заявку отримано!</h3>
            <p className="mx-auto mt-4 max-w-xl text-lg font-semibold leading-7 text-seven-cream">
              Дякуємо, що хочете стати частиною команди Seven.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-seven-muted md:text-base">
              HR-команда вже отримала вашу анкету в Telegram. Ми переглянемо її та звʼяжемося з вами найближчим часом.
            </p>
            <p className="mx-auto mt-5 max-w-lg text-xs font-semibold uppercase tracking-[0.14em] text-seven-muted">
              Поки очікуєте відповідь — можете подивитися атмосферу саме того Seven, який обрали в анкеті.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
                onClick={() => setOpen(false)}
              >
                Закрити
              </button>
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-green hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
              >
                <Instagram size={17} />
                {instagramLabel}
              </a>
              <a
                href="https://t.me/Hrsevengroup"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
              >
                Написати HR
              </a>
            </div>
            <button
              type="button"
              className="mt-5 text-sm font-bold text-seven-green underline underline-offset-4 transition hover:text-seven-cream"
              onClick={resetApplicationForm}
            >
              Заповнити ще одну анкету
            </button>
          </div>
        ) : (
          <form className="grid gap-3.5 p-4 md:grid-cols-2 md:p-5" onSubmit={submitApplication}>
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

            <label htmlFor="cv" className="rounded-[8px] border border-dashed border-white/15 bg-white/[0.03] p-3 text-sm font-semibold text-white transition hover:border-seven-green/50 md:col-span-2">
              <span className="flex items-center gap-2">
                <FileText size={17} className="text-seven-green" />
                CV / Резюме
                <span className="font-normal text-seven-muted">(необовʼязково)</span>
              </span>
              <input
                id="cv"
                name="cv"
                type="file"
                className="mt-2 block w-full cursor-pointer rounded-[8px] text-sm text-seven-muted file:mr-4 file:rounded-full file:border-0 file:bg-seven-terracotta file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-[0.12em] file:text-white hover:file:bg-seven-cream hover:file:text-seven-background"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                onChange={(event) => updateCvFile(event.target.files?.[0] ?? null)}
              />
              <span className="mt-2 block text-xs font-medium leading-5 text-seven-muted">PDF, DOC, DOCX, JPG або PNG до 10 MB.</span>
              {cvFile ? <span className="mt-1 block text-xs font-bold text-seven-green">{cvFile.name}</span> : null}
              {cvError ? <span className="mt-1 block text-xs font-semibold text-seven-terracotta">{cvError}</span> : null}
            </label>

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
        )}
      </div>
    </div>
  ) : null;

  return (
    <CareersModalContext.Provider value={{ openCareersModal }}>
      {children}
      {mounted && modal ? createPortal(modal, document.body) : null}
    </CareersModalContext.Provider>
  );
}
