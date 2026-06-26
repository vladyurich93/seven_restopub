type TikTokIconProps = {
  className?: string;
  size?: number;
};

export function TikTokIcon({ className = "", size = 18 }: TikTokIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.7 6.2a5.8 5.8 0 0 1-3.6-1.3A5.9 5.9 0 0 1 13.2 1h-3.1v14.1a2.9 2.9 0 1 1-2-2.8V9.1a6 6 0 1 0 5.2 5.9V8.2a9 9 0 0 0 5.4 1.8V6.2Z" />
    </svg>
  );
}
