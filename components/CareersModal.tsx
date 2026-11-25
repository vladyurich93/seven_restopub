"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
export { careerPositionOptions } from "@/data/careers";

const CareersDialog = dynamic(() => import("./CareersDialog"), {
  ssr: false,
  loading: () => <p role="status" className="fixed bottom-24 right-5 z-[160] rounded-lg bg-seven-card p-4 text-sm text-white">Відкриваємо анкету…</p>,
});
const Context = createContext<{ openCareersModal: (source?: string) => void } | null>(null);
export function useCareersModal() {
  const value = useContext(Context);
  if (!value) throw new Error("useCareersModal must be used within CareersModalProvider");
  return value;
}
export function CareersModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; source: string } | null>(null);
  const { language } = useLanguage();
  const openCareersModal = (source = "header") => {
    trackEvent("hr_form_start", { source, language });
    setState({ open: true, source });
  };
  return <Context.Provider value={{ openCareersModal }}>
    {children}
    {state ? <CareersDialog open={state.open} source={state.source} onClose={() => setState(current => current ? { ...current, open: false } : null)} /> : null}
  </Context.Provider>;
}
