import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}
