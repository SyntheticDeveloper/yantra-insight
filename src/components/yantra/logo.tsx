import { motion } from "framer-motion";

export function YantraLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-md ring-1 ring-border/60"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.jpeg"
          alt="Yantra"
          width={size}
          height={size}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">Yantra</span>
      </div>
    </div>
  );
}
