import { Link } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { WaveDivider } from "./WaveDivider";

const Instagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Facebook = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative bg-ocean text-white mt-24">
      <div className="absolute -top-1 inset-x-0">
        <WaveDivider color="#1E3A5F" flip />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="font-display text-2xl font-bold">
              <span className="text-white">TOGO</span>
              <span className="text-turquoise">LIVING</span>
            </div>
            <p className="font-accent text-turquoise mt-3 text-lg">L'Ocean a votre Porte</p>
            <p className="text-white/70 text-sm mt-4 max-w-xs">
              Villa balneaire tropicale a Kpogan Agbetsiko, entre Lome et Aneho.
              Acces direct a la plage, piscine vue mer et restaurant aux saveurs du monde.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-turquoise">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Accueil"],
                ["/hebergements", "Hebergements"],
                ["/restaurant", "Restaurant & Bar"],
                ["/galerie", "Galerie"],
                ["/a-propos", "A Propos"],
                ["/contact", "Contact"],
                ["/reserver", "Reserver"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/80 hover:text-turquoise transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-turquoise">Contact</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-turquoise shrink-0" /><a href="tel:+22893872088" className="hover:text-turquoise">+228 93 87 20 88</a></li>
              <li className="flex items-start gap-3"><Mail size={16} className="mt-0.5 text-turquoise shrink-0" /><a href="mailto:contact@togoliving.net" className="hover:text-turquoise">contact@togoliving.net</a></li>
              <li className="flex items-start gap-3"><Globe size={16} className="mt-0.5 text-turquoise shrink-0" /><span>togoliving.net</span></li>
              <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-turquoise shrink-0" /><span>Kpogan Agbetsiko, Route N2, Lome, Togo</span></li>
            </ul>

            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com/togoliving" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-turquoise hover:text-ocean transition" aria-label="Instagram">
                <Instagram width={18} height={18} />
              </a>
              <a href="https://facebook.com/togoliving" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-turquoise hover:text-ocean transition" aria-label="Facebook">
                <Facebook width={18} height={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px bg-gold/40 my-8" />
        <p className="text-center text-white/60 text-xs">
          © 2025 TOGOLIVING — Tous droits reserves
        </p>
      </div>
    </footer>
  );
}
