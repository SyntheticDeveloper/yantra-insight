import { motion } from "framer-motion";

export function YantraLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
          <defs>
            <linearGradient id="yg" x1="0" x2="32" y1="0" y2="32">
              <stop offset="0%" stopColor="oklch(0.78 0.19 245)" />
              <stop offset="100%" stopColor="oklch(0.6 0.18 280)" />
            </linearGradient>
          </defs>
          <path d="M16 2 L29 9 L29 23 L16 30 L3 23 L3 9 Z" fill="url(#yg)" opacity="0.18" />
          <path d="M16 2 L29 9 L29 23 L16 30 L3 23 L3 9 Z" stroke="url(#yg)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3.5" fill="url(#yg)" />
          <circle cx="16" cy="16" r="6.5" stroke="url(#yg)" strokeWidth="1" opacity="0.5" />
        </svg>
      </motion.div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">Yantra</span>
      </div>
    </div>
  );
}
