"use client";

import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CalendarDays, CheckCircle2, ChevronDown, ChevronLeft, Clock3, MapPinned, Minus, Plus, Send, UserRound, X } from "lucide-react";
import { bookingLocations, type BookingLocationId } from "@/data/bookingConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { registerModalVisibility } from "@/lib/modalVisibility";

type BookingZone = "non_smoking" | "smoking" | "no_preference";

type BookingForm = {
  locationId: BookingLocationId | "";
  date: string;
  time: string;
  guests: string;
  zone: BookingZone | "";
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
  zone: "",
  name: "",
  phone: "",
  comment: "",
};

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-seven-muted/65 focus:border-seven-green focus:ring-2 focus:ring-seven-green/20";

const activeFieldClass = "border-seven-terracotta bg-seven-terracotta/12 shadow-[0_0_0_1px_rgba(201,113,74,0.32),0_14px_34px_rgba(201,113,74,0.14)]";

const timeOptions = Array.from({ length: 20 }, (_, index) => {
  const totalMinutes = 12 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

const bookingZones = [
  { id: "non_smoking", labelKey: "zoneNonSmoking" },
  { id: "smoking", labelKey: "zoneSmoking" },
  { id: "no_preference", labelKey: "zoneNoPreference" },
] as const satisfies readonly { id: BookingZone; labelKey: keyof ReturnType<typeof useLanguage>["t"]["forms"] }[];

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const locationCardRefs = useRef<Partial<Record<BookingLocationId, HTMLDivElement | null>>>({});
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
    const unregisterModalVisibility = registerModalVisibility();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unregisterModalVisibility();
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

  const isStepReady = useMemo(() => {
    if (step === 0) {
      return Boolean(form.locationId);
    }

    if (step === 1) {
      return Boolean(form.date && form.time && form.guests && Number(form.guests) >= 1 && form.zone);
    }

    return Boolean(form.name && isValidUkrainianPhone(form.phone));
  }, [form.date, form.guests, form.locationId, form.name, form.phone, form.time, form.zone, step]);

  const resetModalScroll = () => {
    requestAnimationFrame(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    });
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    resetModalScroll();
  }, [open, status, step]);

  useEffect(() => {
    if (!open || step !== 0 || !form.locationId) {
      return;
    }

    requestAnimationFrame(() => {
      locationCardRefs.current[form.locationId as BookingLocationId]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    });
  }, [form.locationId, open, step]);

  const updateField = (field: keyof BookingForm, value: string) => {
    setErrors((current) => ({ ...current, [field]: "" }));
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectTime = (value: string) => {
    updateField("time", value);
    setTimePickerOpen(false);
  };

  const openBookingModal = (locationId?: BookingLocationId) => {
    setStep(locationId ? 1 : 0);
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
      nextErrors.locationId = t.forms.chooseVenueError;
    }

    if (targetStep === 1) {
      if (!form.date) nextErrors.date = t.forms.chooseDateError;
      if (!form.time) nextErrors.time = t.forms.chooseTimeError;
      if (!form.guests || Number(form.guests) < 1) nextErrors.guests = t.forms.guestsError;
      if (!form.zone) nextErrors.zone = t.forms.chooseZoneError;
    }

    if (targetStep === 2) {
      if (!form.name) nextErrors.name = t.forms.nameError;
      if (!form.phone) {
        nextErrors.phone = t.forms.phoneRequiredError;
      } else if (!isValidUkrainianPhone(form.phone)) {
        nextErrors.phone = t.forms.phoneFormatError;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateSubmit = () => {
    const nextErrors: Partial<Record<keyof BookingForm, string>> = {};

    if (!form.locationId) nextErrors.locationId = t.forms.chooseVenueError;
    if (!form.date) nextErrors.date = t.forms.chooseDateError;
    if (!form.time) nextErrors.time = t.forms.chooseTimeError;
    if (!form.guests || Number(form.guests) < 1) nextErrors.guests = t.forms.guestsError;
    if (!form.zone) nextErrors.zone = t.forms.chooseZoneError;
    if (!form.name) nextErrors.name = t.forms.nameError;
    if (!form.phone) {
      nextErrors.phone = t.forms.phoneRequiredError;
    } else if (!isValidUkrainianPhone(form.phone)) {
      nextErrors.phone = t.forms.phoneFormatError;
    }

    setErrors(nextErrors);

    if (nextErrors.locationId) setStep(0);
    else if (nextErrors.date || nextErrors.time || nextErrors.guests) setStep(1);
    else if (nextErrors.zone) setStep(1);
    else if (nextErrors.name || nextErrors.phone) setStep(2);

    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) {
      return;
    }

    setTimePickerOpen(false);
    setStep((current) => Math.min(current + 1, 2) as Step);
  };

  const goBack = () => {
    setErrors({});
    setTimePickerOpen(false);
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
          locationId: form.locationId,
          locationName: selectedLocation ? tv(selectedLocation.displayName) : "",
          name: form.name,
          phone: form.phone,
          guests: form.guests,
          zone: form.zone,
          date: form.date,
          time: form.time,
          comment: form.comment,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || t.forms.bookingFailed);
        return;
      }

      setStatus("success");
      setMessage(result.message || t.forms.bookingSuccess);
    } catch {
      setStatus("error");
      setMessage(t.forms.bookingFailed);
    }
  };

  const modal = open ? (
    <div
      className="fixed inset-0 z-[135] flex bg-black/82 p-0 sm:p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-seven-background sm:max-h-[calc(100dvh-24px)] sm:rounded-[8px] sm:premium-border"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src="/images/gallery/gallery-20.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={72}
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

        <div
          ref={scrollContainerRef}
          className="relative z-10 flex-1 overflow-y-auto px-4 py-6 [-webkit-overflow-scrolling:touch] md:px-8 md:py-10"
          style={{ paddingBottom: "max(32px, calc(32px + env(safe-area-inset-bottom)))" }}
        >
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
                      {message || t.forms.bookingSuccess}
                    </p>
                    <div className="mt-6 grid gap-3 rounded-[8px] bg-white/5 p-4 text-left text-sm leading-6 text-seven-muted premium-border">
                      <p>
                        <span className="font-black text-white">{t.common.chooseVenue}: </span>
                        {selectedLocation ? tv(selectedLocation.displayName) : t.common.chooseVenue}
                      </p>
                      <p>
                        <span className="font-black text-white">{t.forms.date}: </span>
                        {form.date} · {form.time}
                      </p>
                      <p>
                        <span className="font-black text-white">{t.forms.guestsCount}: </span>
                        {form.guests}
                      </p>
                      <p>
                        <span className="font-black text-white">{t.forms.chooseZone}: </span>
                        {form.zone ? t.forms[bookingZones.find((zone) => zone.id === form.zone)?.labelKey ?? "chooseZone"] : t.forms.chooseZone}
                      </p>
                    </div>
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
                <form id="booking-form" onSubmit={submitBooking}>
                  <div className="mb-7 grid gap-2 sm:grid-cols-3">
                    {[t.forms.location, t.forms.details, t.forms.contacts].map((label, index) => (
                      <div key={label} className={`rounded-full px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] premium-border ${step === index ? "bg-seven-green/12 text-seven-green" : "bg-white/5 text-seven-muted"}`}>
                        {label}
                      </div>
                    ))}
                  </div>

                  <div key={step} className="booking-step-panel">
                  {step === 0 ? (
                    <div className="grid gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-seven-muted">{t.common.chooseVenue}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        {bookingLocations.map((location) => (
                          <div
                            key={location.id}
                            ref={(node) => {
                              locationCardRefs.current[location.id] = node;
                            }}
                            className="grid gap-3"
                          >
                            <button
                              type="button"
                              className={`flex min-h-48 flex-col rounded-[8px] p-5 text-left transition duration-300 active:scale-[0.98] premium-border premium-lift ${
                                form.locationId === location.id
                                  ? "border-seven-green bg-seven-green/10 shadow-[0_0_0_1px_rgba(183,225,77,0.34),0_22px_54px_rgba(183,225,77,0.12)]"
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
                            {form.locationId === location.id ? (
                              <button
                                type="button"
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] transition duration-150 active:scale-[0.98] button-press hover:bg-seven-cream hover:text-seven-background"
                                onClick={goNext}
                              >
                                {t.forms.next}
                              </button>
                            ) : null}
                          </div>
                        ))}
                      </div>
                      {errors.locationId ? <p className="text-sm font-semibold text-seven-terracotta">{errors.locationId}</p> : null}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-5 md:grid-cols-3">
                      <label className="text-sm font-semibold text-white">
                        {t.forms.date} <span className="text-seven-green">*</span>
                        <input type="date" min={today()} className={`${fieldClass} ${form.date ? activeFieldClass : ""}`} value={form.date} onChange={(event) => updateField("date", event.target.value)} required />
                        {errors.date ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.date}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        {t.forms.time} <span className="text-seven-green">*</span>
                        <div className="relative">
                          <button
                            type="button"
                            className={`${fieldClass} ${form.time ? activeFieldClass : ""} flex min-h-12 items-center justify-between text-left`}
                            onClick={() => setTimePickerOpen((current) => !current)}
                            aria-haspopup="listbox"
                            aria-expanded={timePickerOpen}
                          >
                            <span className={form.time ? "text-white" : "text-seven-muted/65"}>{form.time || t.forms.chooseTime}</span>
                            <ChevronDown size={18} className={`text-seven-green transition ${timePickerOpen ? "rotate-180" : ""}`} />
                          </button>
                          {timePickerOpen ? (
                            <div
                              className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-y-auto rounded-[8px] border border-white/10 bg-seven-card p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] [-webkit-overflow-scrolling:touch]"
                              role="listbox"
                              aria-label={t.forms.chooseTimeBooking}
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
                        {t.forms.guestsCount} <span className="text-seven-green">*</span>
                        <div className={`mt-2 flex min-h-12 items-center rounded-[8px] border border-white/10 bg-black/30 transition ${form.guests ? activeFieldClass : ""}`}>
                          <button type="button" className="grid h-12 w-12 place-items-center text-seven-green" onClick={() => changeGuests(-1)} aria-label={t.forms.decreaseGuests}>
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
                          <button type="button" className="grid h-12 w-12 place-items-center text-seven-green" onClick={() => changeGuests(1)} aria-label={t.forms.increaseGuests}>
                            <Plus size={18} />
                          </button>
                        </div>
                        {errors.guests ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.guests}</span> : null}
                      </label>
                      <fieldset className="md:col-span-3">
                        <legend className="text-sm font-semibold text-white">
                          {t.forms.chooseZone} <span className="text-seven-green">*</span>
                        </legend>
                        <div className="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={t.forms.chooseZone}>
                          {bookingZones.map((zone) => {
                            const selected = form.zone === zone.id;

                            return (
                              <button
                                key={zone.id}
                                type="button"
                                className={`flex min-h-14 items-center justify-center rounded-[8px] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.12em] transition duration-300 premium-border ${
                                  selected
                                    ? "border-seven-terracotta bg-seven-terracotta/18 text-white shadow-[0_0_0_1px_rgba(201,113,74,0.34),0_14px_34px_rgba(201,113,74,0.14)]"
                                    : "bg-black/30 text-seven-muted hover:border-seven-terracotta/45 hover:text-white"
                                }`}
                                onClick={() => {
                                  updateField("zone", zone.id);
                                  trackEvent("booking_zone_selected", { zone: zone.id });
                                }}
                                role="radio"
                                aria-checked={selected}
                              >
                                {t.forms[zone.labelKey]}
                              </button>
                            );
                          })}
                        </div>
                        {errors.zone ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.zone}</span> : null}
                      </fieldset>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="text-sm font-semibold text-white">
                        {t.forms.name} <span className="text-seven-green">*</span>
                        <input className={fieldClass} value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" required />
                        {errors.name ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.name}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white">
                        {t.forms.phone} <span className="text-seven-green">*</span>
                        <input type="tel" className={fieldClass} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+380 XX XXX XX XX" autoComplete="tel" required />
                        {errors.phone ? <span className="mt-2 block text-xs text-seven-terracotta">{errors.phone}</span> : null}
                      </label>
                      <label className="text-sm font-semibold text-white md:col-span-2">
                        {t.forms.comment}
                        <textarea
                          className={`${fieldClass} min-h-28 resize-y`}
                          value={form.comment}
                          onChange={(event) => updateField("comment", event.target.value)}
                          placeholder={t.forms.tableWishes}
                        />
                      </label>
                    </div>
                  ) : null}
                  </div>

                  {status === "error" && message ? (
                    <div className="mt-6 rounded-[8px] bg-seven-terracotta/15 p-4 text-sm leading-6 text-white premium-border" role="status" aria-live="polite">
                      {message}
                    </div>
                  ) : null}

                  {step > 0 ? (
                    <div
                      className="sticky bottom-0 z-20 mt-8 -mx-4 border-t border-white/10 bg-seven-background/95 px-4 pt-4 shadow-[0_-18px_50px_rgba(0,0,0,0.32)] md:-mx-7 md:px-7"
                      style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="button"
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition duration-150 active:scale-[0.98] premium-border premium-lift hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35"
                          onClick={goBack}
                          disabled={status === "loading"}
                        >
                          <ChevronLeft size={17} />
                          {t.forms.back}
                        </button>
                        {step < 2 ? (
                          <button
                            type="button"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] transition duration-150 active:scale-[0.98] button-press hover:bg-seven-cream hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-45"
                            onClick={goNext}
                            disabled={!isStepReady}
                          >
                            {t.forms.next}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-seven-terracotta px-8 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] transition duration-150 active:scale-[0.98] button-press hover:bg-seven-cream hover:text-seven-background disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={status === "loading" || !isStepReady}
                          >
                            {status === "loading" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" /> : <Send size={17} />}
                            {status === "loading" ? t.forms.sendingBooking : t.forms.bookAction}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </form>
              )}
            </div>

            <aside className="rounded-[8px] bg-black/30 p-5 premium-border md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-seven-green">{t.forms.yourEvening}</p>
              <div className="mt-6 space-y-5 text-sm leading-6 text-seven-muted">
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{selectedLocation ? tv(selectedLocation.displayName) : t.common.chooseVenue}</span>
                </p>
                <p className="flex gap-3">
                  <CalendarDays className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{form.date || t.forms.datePlaceholder} · {form.time || t.forms.timePlaceholder}</span>
                </p>
                <p className="flex gap-3">
                  <UserRound className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{form.guests || "0"} {t.forms.guests}</span>
                </p>
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>
                    {form.zone
                      ? t.forms[bookingZones.find((zone) => zone.id === form.zone)?.labelKey ?? "chooseZone"]
                      : t.forms.chooseZone}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-seven-terracotta" size={18} />
                  <span>{t.forms.confirmationNote}</span>
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

export function BookingButton({ className = "", label, locationId, onOpen }: BookingButtonProps) {
  const { openBookingModal } = useBookingModal();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/45 ${className}`}
      onClick={() => {
        trackEvent("book_table", { location_id: locationId ?? "not_selected" });
        onOpen?.();
        openBookingModal(locationId);
      }}
    >
      {label ?? t.common.bookTable}
    </button>
  );
}
