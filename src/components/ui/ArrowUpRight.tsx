// Drawn as SVG because iOS renders the "↗" character as a colour emoji.
export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block h-[0.85em] w-[0.85em] shrink-0 align-[-0.1em] ${className}`}
    >
      <path d="M4.5 11.5 11.5 4.5M5.75 4.5h5.75v5.75" />
    </svg>
  );
}
