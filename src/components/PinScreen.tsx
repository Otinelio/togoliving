import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "./Logo";

type Props = {
  title: string;
  expectedPin: string;
  onUnlock: () => void;
  children?: ReactNode;
};

export function PinScreen({ title, expectedPin, onUnlock }: Props) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const press = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (next === expectedPin) {
        setTimeout(onUnlock, 150);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setPin(""); }, 400);
      }
    }
  };

  const erase = () => setPin(pin.slice(0, -1));

  return (
    <div className="min-h-screen bg-ocean flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-turquoise blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-blue blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-white px-6 py-3 rounded-xl shadow-lg">
            <Logo size="h-12" />
          </div>
        </div>

        <h1 className="font-display text-3xl text-white text-center mb-2">{title}</h1>
        <p className="text-turquoise text-center font-accent text-lg mb-8">Entrez votre code PIN</p>

        <motion.div
          animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="flex gap-3 justify-center mb-8"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-display ${
                pin[i]
                  ? "border-turquoise bg-turquoise/20 text-white"
                  : "border-white/20 bg-white/5 text-white/40"
              }`}
            >
              {pin[i] ? "•" : ""}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {["1","2","3","4","5","6","7","8","9"].map((d) => (
            <button
              key={d}
              onClick={() => press(d)}
              className="h-16 rounded-2xl bg-white/10 hover:bg-turquoise hover:text-ocean text-white text-2xl font-display transition active:scale-95"
            >
              {d}
            </button>
          ))}
          <div />
          <button
            onClick={() => press("0")}
            className="h-16 rounded-2xl bg-white/10 hover:bg-turquoise hover:text-ocean text-white text-2xl font-display transition active:scale-95"
          >
            0
          </button>
          <button
            onClick={erase}
            className="h-16 rounded-2xl bg-white/5 hover:bg-white/15 text-white/80 flex items-center justify-center transition active:scale-95"
            aria-label="Effacer"
          >
            <Delete size={22} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
