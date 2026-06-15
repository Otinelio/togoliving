import { Link } from "@tanstack/react-router";
import logoImg from "@/Assets/images/Residence_Togoliving_logo.png";

export function Logo({ className = "", size = "h-12" }: { className?: string; size?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={logoImg}
        alt="TOGOLIVING Logo"
        className={`${size} w-auto`}
      />
    </Link>
  );
}
