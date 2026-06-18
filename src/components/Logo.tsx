import { Link } from "@tanstack/react-router";
import { ASSETS } from "@/lib/assets";

export function Logo({ className = "", size = "h-12" }: { className?: string; size?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={ASSETS.logo}
        alt="TOGOLIVING Logo"
        className={`${size} w-auto`}
      />
    </Link>
  );
}
