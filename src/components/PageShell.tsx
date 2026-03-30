import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="pointer-events-none fixed right-4 top-4 z-50 sm:absolute sm:right-6 sm:top-6 lg:right-8 lg:top-8">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
