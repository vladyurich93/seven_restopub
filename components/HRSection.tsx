"use client";

import { useCareersModal } from "./CareersModal";

export function HRSection() {
  const { openCareersModal } = useCareersModal();

  return (
    <section id="careers" className="scroll-mt-28 bg-black py-16 md:py-20" aria-labelledby="careers-title">
      <div className="container-shell">
        <div className="grid gap-6 rounded-[8px] bg-[linear-gradient(135deg,rgba(201,113,74,0.12),rgba(183,225,77,0.055),rgba(255,255,255,0.02)),#1b1b1b] p-6 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-seven-green">Команда Seven</p>
            <h2 id="careers-title" className="font-display text-4xl font-black leading-none text-white md:text-5xl">
              Стати частиною команди Seven
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-seven-muted">
              Шукаємо людей, які люблять сервіс, атмосферу і живу енергію закладу.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50 md:min-w-60"
            onClick={openCareersModal}
          >
            Заповнити анкету
          </button>
        </div>
      </div>
    </section>
  );
}
