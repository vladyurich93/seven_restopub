"use client";

import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, CheckCircle2, ChevronDown, ChevronLeft, Clock3, MapPinned, Minus, Plus, Send, UserRound, X } from "lucide-react";
import { bookingLocations, type BookingLocationId } from "@/data/bookingConfig";
import { useLanguage } from "@/lib/i18n";

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

const activeFieldClass = "border-seven-terracotta bg-seven-terracotta/12 shadow-[0_0_0_1px_rgba(201,113,74,0.32),0_14px_34px_rgba(201,113,74,0.14)]";

const timeOptions = Array.from({ length: 23 }, (_, index) => {
  const totalMinutes = 12 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

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
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const { t, tv } = useLanguage();

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

  const selectTime = (value: string) => {
    updateField("time", value);
    setTimePickerOpen(false);
  };

  const openBookingModal = (locationId?: BookingLocationId) => {
    setStep(0);
    setStatus("idle");
    setMessage("");
    setErrors({});
    setTimePickerOpen(false);
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

  const validateSubmit = () => {
    const nextErrors: Partial<Record<keyof BookingForm, string>> = {};

    if (!form.locationId) nextErrors.locationId = "Оберіть заклад.";
    if (!form.date) nextErrors.date = "Оберіть дату.";
    if (!form.time) nextErrors.time = "Оберіть час.";
    if (!form.guests || Number(form.guests) < 1) nextErrors.guests = "Вкажіть кількість гостей.";
    if (!form.name) nextErrors.name = "Вкажіть імʼя.";
    if (!form.phone) {
      nextErrors.phone = "Вкажіть телефон.";
    } else if (!isValidUkrainianPhone(form.phone)) {
      nextErrors.phone = "Вкажіть український номер у форматі 0XX XXX XX XX або +380 XX XXX XX XX.";
    }

    setErrors(nextErrors);

    if (nextErrors.locationId) setStep(0);
    else if (nextErrors.date || nextErrors.time || nextErrors.guests) setStep(1);
    else if (nextErrors.name || nextErrors.phone) setStep(2);

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

    if (!validateSubmit()) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: form.locationId,
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
              <p className="text-xs font-black uppercase tracking-[0.28em] text-seven-green">{t.common.bookTable}</p>
              <h2 id="booking-modal-title" className="mt-1 font-display text-3xl font-black leading-none text-white md:text-5xl">
                {t.common.bookTable}
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white shadow-[var(--shadow-button)] transition hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/45"
              onClick={() => setOpen(false)}
              aria-label={t.forms.close}
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
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-seven-green">{t.common.bookTable}</p>
                    <h3 className="mt-3 font-display text-5xl font-black leading-none text-white">{t.forms.successTitle}</h3>
                    <p className="mt-5 text-lg leading-8 text-seven-muted">
                      {message || "Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами."}
                    </p>
                    <button
                      type="button"
                      className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background"
                      onClick={() => setOpen(false)}
                    >
                      {t.forms.close}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitBooking}>
                  <div className="mb-7 grid gap-2 sm:grid-cols-3">
                    {[t.forms.location, t.forms.details, t.forms.contacts].map((label, index) => (
                      <div key={label} className={`rounded-full px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] premium-border ${step === index ? "bg-seven-green/12 text-seven-green" : "bg-white/5 text-seven-muted"}`}>
                        {label}
                      </div>
                    ))}
                  </div>

                  {step === 0 ? (
                    <div className="grid gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-seven-muted">{t.common.chooseVenue}</p>
                      <div className="grid gap-4 md:grid-cols-3">
                        {bookingLocations.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            className={`flex min-h-48 flex-col rounded-[8px] p-5 text-left transition duration-500 premium-border premium-lift ${
                              form.locationId === location.id
                                ? "border-seven-terracotta bg-seven-terracotta/18 shadow-[0_0_0_1px_rgba(201,113,74,0.35),0_22px_54px_rgba(201,113,74,0.18)]"
                                : "bg-seven-card/75 hover:border-seven-terracotta/50"
                            }`}
                            onClick={() => updateField("locationId", location.id)}
                          >
                            <div className="mb-5 flex items-center justify-between gap-3">
                              <MapPinned className={form.locationId === location.id ? "text-seven-green" : "text-seven-terracotta"} size={24} />
                              {form.locationId === location.id ? (
                                <CheckCircle2 className="text-seven-green" size={22} strokeWidth={2.2} />
                              ) : null}
                            </div>
                            <span className="block font-display text-3xl font-black leading-none text-white">{tv(location.label)}</span>
                            {form.locationId === location.id ? (
                              <span className="mt-5 inline-flex rounded-full bg-seven-green px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-seven-background">
                                <CheckCircle2 size={13} />
                                <span className="ml-1.5">{t.common.selected}</span>
                              </span>
                            ) : null}
                            <span className={`mt-auto block pt-6 text-[11px] font-black uppercase tracking-[0.18em] ${form.locationId === location.id ? "text-seven-cream" : "text-seven-muted"}`}>{tv(location.city)}</span>
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
                        <input type="date" min={today()} className={`${fieldClass} ${form.date ? activeFieldClass : ""}`} value={form.date} onChange={(event) => updateField("date", event.target.value)} required />
                        {errors.date ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.date}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        Час <span className="text-seven-green">*</span>
                        <div className="relative">
                          <button
                            type="button"
                            className={`${fieldClass} ${form.time ? activeFieldClass : ""} flex min-h-12 items-center justify-between text-left`}
                            onClick={() => setTimePickerOpen((current) => !current)}
                            aria-haspopup="listbox"
                            aria-expanded={timePickerOpen}
                          >
                            <span className={form.time ? "text-white" : "text-seven-muted/65"}>{form.time || "Оберіть час"}</span>
                            <ChevronDown size={18} className={`text-seven-green transition ${timePickerOpen ? "rotate-180" : ""}`} />
                          </button>
                          {timePickerOpen ? (
                            <div
                              className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-y-auto rounded-[8px] border border-white/10 bg-seven-card p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] [-webkit-overflow-scrolling:touch]"
                              role="listbox"
                              aria-label="Оберіть час бронювання"
                            >
                              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
                                {timeOptions.map((time) => {
                                  const selected = form.time === time;

                                  return (
                                    <button
                                      key={time}
                                      type="button"
                                      className={`rounded-[8px] px-3 py-2.5 text-sm font-black transition ${
                                        selected
                                          ? "bg-seven-terracotta text-white shadow-[0_0_0_1px_rgba(201,113,74,0.42),0_12px_28px_rgba(201,113,74,0.2)]"
                                          : "bg-white/5 text-seven-cream hover:bg-seven-green hover:text-seven-background"
                                      }`}
                                      onClick={() => selectTime(time)}
                                      role="option"
                                      aria-selected={selected}
                                    >
                                      {time}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                        {errors.time ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.time}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        Кількість гостей <span className="text-seven-green">*</span>
                        <div className={`mt-2 flex min-h-12 items-center rounded-[8px] border border-white/10 bg-black/30 transition ${form.guests ? activeFieldClass : ""}`}>
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
                        {status === "loading" ? "Надсилаємо бронювання..." : "Забронювати"}
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
                  <span>{selectedLocation ? tv(selectedLocation.displayName) : t.common.chooseVenue}</span>
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
