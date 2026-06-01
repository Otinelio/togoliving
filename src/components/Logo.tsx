import { Link } from "@tanstack/react-router";

export function Logo({ className = "", size = "text-2xl" }: { className?: string; size?: string }) {
  return (
    <Link
      to="/"
      className={`font-display font-bold ${size} ${className} relative inline-flex items-baseline gap-0.5`}
    >
      <span className="text-ocean">TOGO</span>
      <span className="text-turquoise">LIVING</span>
      <svg
        viewBox="0 0 120 8"
        className="absolute -bottom-1 left-0 w-full h-2"
        aria-hidden
      >
        <path
          d="M0,4 C20,0 40,8 60,4 C80,0 100,8 120,4"
          stroke="#40E0D0"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </Link>
  );
}
