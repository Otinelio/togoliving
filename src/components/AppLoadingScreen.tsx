import { motion } from "framer-motion";

export function AppLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ocean"
    >
      <div className="text-center">
        <div className="font-display text-3xl md:text-4xl font-bold tracking-wide">
          <span className="text-white">TOGO</span>
          <span className="text-turquoise">LIVING</span>
        </div>
        <div className="mx-auto mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full w-1/2 rounded-full bg-turquoise"
            initial={{ x: "-120%" }}
            animate={{ x: "240%" }}
            transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}
