"use client";

import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, CheckCircle2, ChevronLeft, Clock3, MapPinned, Minus, Plus, Send, UserRound, X } from "lucide-react";
import { bookingLocations, type BookingLocationId } from "@/data/bookingConfig";

type BookingForm = {
  locationId: BookingLocationId | "";
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  comment: string;
};

type BookingModalContextValue = {
  openBookingModal: (locationId?: BookingLocationId) => void;
};

type BookingButtonProps = {
  className?: string;
  label?: string;
  locationId?: BookingLocationId;
  onOpen?: () => void;
};

type Step = 0 | 1 | 2;

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

const initialBookingForm: BookingForm = {
  locationId: "",
  date: "",
  time: "",
  guests: "2",
  name: "",
  phone: "",
  comment: "",
};

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-seven-muted/65 focus:border-seven-green focus:ring-2 focus:ring-seven-green/20";

const isValidUkrainianPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 && digits.startsWith("0")) || (digits.length === 12 && digits.startsWith("380"));
};

const today = () => new Date().toISOString().split("T")[0] ?? "";

export function useBookingModal() {
  const context = useContext(BookingModalContext);

  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }

  return context;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<BookingForm>(initialBookingForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

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

  const selectedLocation = useMemo(
    () => bookingLocations.find((location) => location.id === form.locationId),
    [form.locationId],
  );

  const updateField = (field: keyof BookingForm, value: string) => {
    setErrors((current) => ({ ...current, [field]: "" }));
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openBookingModal = (locationId?: BookingLocationId) => {
    setStep(0);
    setStatus("idle");
    setMessage("");
    setErrors({});
    setForm({ ...initialBookingForm, locationId: locationId ?? "" });
    setOpen(true);
  };

  const validateStep = (targetStep = step) => {
    const nextErrors: Partial<Record<keyof BookingForm, string>> = {};

    if (targetStep === 0 && !form.locationId) {
      nextErrors.locationId = "Оберіть заклад.";
    }

    if (targetStep === 1) {
      if (!form.date) nextErrors.date = "Оберіть дату.";
      if (!form.time) nextErrors.time = "Оберіть час.";
      if (!form.guests || Number(form.guests) < 1) nextErrors.guests = "Вкажіть кількість гостей.";
    }

    if (targetStep === 2) {
      if (!form.name) nextErrors.name = "Вкажіть імʼя.";
      if (!form.phone) {
        nextErrors.phone = "Вкажіть телефон.";
      } else if (!isValidUkrainianPhone(form.phone)) {
        nextErrors.phone = "Вкажіть український номер у форматі 0XX XXX XX XX або +380 XX XXX XX XX.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) {
      return;
    }

    setStep((current) => Math.min(current + 1, 2) as Step);
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0) as Step);
  };

  const changeGuests = (direction: 1 | -1) => {
    const currentGuests = Number(form.guests || 1);
    const nextGuests = Math.max(1, Math.min(40, currentGuests + direction));
    updateField("guests", String(nextGuests));
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep(2)) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: selectedLocation?.displayName || form.locationId,
          name: form.name,
          phone: form.phone,
          guests: form.guests,
          date: form.date,
          time: form.time,
          comment: form.comment,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || "Бронювання поки не відправилось. Будь ласка, зателефонуйте в заклад.");
        return;
      }

      setStatus("success");
      setMessage(
        result.message ||
          "Дякуємо! Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами.",
      );
    } catch {
      setStatus("error");
      setMessage("Бронювання поки не відправилось. Будь ласка, зателефонуйте в заклад.");
    }
  };

  const modal = open ? (
    <div
      className="fixed inset-0 z-[135] flex bg-black/82"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-seven-background"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src="/images/gallery/gallery-20.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-22"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.94),rgba(15,15,15,0.78),rgba(15,15,15,0.9))]" />
        <div className="cinematic-vignette absolute inset-0" />

        <header className="relative z-10 border-b border-white/10 px-4 py-4 md:px-8">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-seven-green">Book a Table</p>
              <h2 id="booking-modal-title" className="mt-1 font-display text-3xl font-black leading-none text-white md:text-5xl">
                Бронювання столу
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white shadow-[var(--shadow-button)] transition hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/45"
              onClick={() => setOpen(false)}
              aria-label="Закрити бронювання"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 [-webkit-overflow-scrolling:touch] md:px-8 md:py-10">
          <div className="mx-auto grid w-full max-w-6xl gap-6 min-[1000px]:grid-cols-[0.72fr_0.28fr]">
            <div className="rounded-[8px] bg-black/38 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.32)] premium-border md:p-7">
              {status === "success" ? (
                <div className="grid min-h-[420px] place-items-center text-center" role="status" aria-live="polite">
                  <div className="max-w-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-seven-green/12 text-seven-green premium-border shadow-glow">
                      <CheckCircle2 size={34} strokeWidth={1.8} />
                    </div>
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-seven-green">Бронювання отримано</p>
                    <h3 className="mt-3 font-display text-5xl font-black leading-none text-white">Дякуємо!</h3>
                    <p className="mt-5 text-lg leading-8 text-seven-muted">
                      {message || "Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами."}
                    </p>
                    <button
                      type="button"
                      className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background"
                      onClick={() => setOpen(false)}
                    >
                      Закрити
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitBooking}>
                  <div className="mb-7 grid gap-2 sm:grid-cols-3">
                    {["Локація", "Деталі", "Контакти"].map((label, index) => (
                      <div key={label} className={`rounded-full px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] premium-border ${step === index ? "bg-seven-green/12 text-seven-green" : "bg-white/5 text-seven-muted"}`}>
                        {label}
                      </div>
                    ))}
                  </div>

                  {step === 0 ? (
                    <div className="grid gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-seven-muted">Оберіть заклад</p>
                      <div className="grid gap-4 md:grid-cols-3">
                        {bookingLocations.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            className={`min-h-44 rounded-[8px] p-5 text-left transition duration-500 premium-border premium-lift ${form.locationId === location.id ? "border-seven-green bg-seven-green/12 shadow-glow" : "bg-seven-card/75 hover:border-seven-terracotta/50"}`}
                            onClick={() => updateField("locationId", location.id)}
                          >
                            <MapPinned className="mb-5 text-seven-terracotta" size={24} />
                            <span className="block font-display text-3xl font-black leading-none text-white">{location.label}</span>
                            <span className="mt-3 block text-sm font-semibold uppercase tracking-[0.14em] text-seven-muted">{location.city}</span>
                          </button>
                        ))}
                      </div>
                      {errors.locationId ? <p className="text-sm font-semibold text-seven-terracotta">{errors.locationId}</p> : null}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-5 md:grid-cols-3">
                      <label className="text-sm font-semibold text-white">
                        Дата <span className="text-seven-green">*</span>
                        <input type="date" min={today()} className={fieldClass} value={form.date} onChange={(event) => updateField("date", event.target.value)} required />
                        {errors.date ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.date}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        Час <span className="text-seven-green">*</span>
                        <input type="time" className={fieldClass} value={form.time} onChange={(event) => updateField("time", event.target.value)} required />
                        {errors.time ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.time}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        Кількість гостей <span className="text-seven-green">*</span>
                        <div className="mt-2 flex min-h-12 items-center rounded-[8px] border border-white/10 bg-black/30">
                          <button type="button" className="grid h-12 w-12 place-items-center text-seven-green" onClick={() => changeGuests(-1)} aria-label="Зменшити кількість гостей">
                            <Minus size={18} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="40"
                            className="h-12 min-w-0 flex-1 bg-transparent text-center text-lg font-black text-white outline-none"
                            value={form.guests}
                            onChange={(event) => updateField("guests", event.target.value)}
                            required
                          />
                          <button type="button" className="grid h-12 w-12 place-items-center text-seven-green" onClick={() => changeGuests(1)} aria-label="Збільшити кількість гостей">
                            <Plus size={18} />
                          </button>
                        </div>
                        {errors.guests ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.guests}</span> : null}
                      </label>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="text-sm font-semibold text-white">
                        Імʼя <span className="text-seven-green">*</span>
                        <input className={fieldClass} value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" required />
                        {errors.name ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.name}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        Телефон <span className="text-seven-green">*</span>
                        <input type="tel" className={fieldClass} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+380 XX XXX XX XX" autoComplete="tel" required />
                        {errors.phone ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.phone}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white md:col-span-2">
                        Коментар
                        <textarea
                          className={`${fieldClass} min-h-28 resize-y`}
                          value={form.comment}
                          onChange={(event) => updateField("comment", event.target.value)}
                          placeholder="Побажання щодо столу, дитячої кімнати або події"
                        />
                      </label>
                    </div>
                  ) : null}

                  {status === "error" && message ? (
                    <div className="mt-6 rounded-[8px] bg-seven-terracotta/15 p-4 text-sm leading-6 text-white premium-border" role="status" aria-live="polite">
                      {message}
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-border premium-lift hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35"
                      onClick={goBack}
                      disabled={step === 0 || status === "loading"}
                    >
                      <ChevronLeft size={17} />
                      Назад
                    </button>
                    {step < 2 ? (
                      <button
                        type="button"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background"
                        onClick={goNext}
                      >
                        Далі
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" /> : <Send size={17} />}
                        {status === "loading" ? "Відправляємо..." : "Забронювати"}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            <aside className="rounded-[8px] bg-black/30 p-5 premium-border md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-seven-green">Ваш вечір</p>
              <div className="mt-6 space-y-5 text-sm leading-6 text-seven-muted">
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{selectedLocation?.displayName || "Оберіть локацію Seven"}</span>
                </p>
                <p className="flex gap-3">
                  <CalendarDays className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{form.date || "Дата"} · {form.time || "Час"}</span>
                </p>
                <p className="flex gap-3">
                  <UserRound className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{form.guests || "0"} гостей</span>
                </p>
                <p className="flex gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>Після заявки адміністратор підтвердить бронювання.</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      {mounted && modal ? createPortal(modal, document.body) : null}
    </BookingModalContext.Provider>
  );
}

export function BookingButton({ className = "", label = "Забронювати стіл", locationId, onOpen }: BookingButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/45 ${className}`}
      onClick={() => {
        onOpen?.();
        openBookingModal(locationId);
      }}
    >
      {label}
    </button>
  );
}
