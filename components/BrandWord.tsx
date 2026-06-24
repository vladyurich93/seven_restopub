type BrandWordProps = {
  tone?: "cream" | "white" | "terracotta" | "green";
  className?: string;
};

const tones = {
  cream: "text-seven-cream",
  white: "text-white",
  terracotta: "text-seven-terracotta",
  green: "text-seven-green",
};

export function BrandWord({ tone = "cream", className = "" }: BrandWordProps) {
  return (
    <span className={`brand-word inline-block ${tones[tone]} ${className}`}>
      Seven
    </span>
  );
}
