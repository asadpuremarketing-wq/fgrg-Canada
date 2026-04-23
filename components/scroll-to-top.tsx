"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{
            background: "#0e507b",
            border: "1px solid rgba(25,175,175,0.3)",
            color: "#19AFAF",
            boxShadow: "0 4px 20px rgba(10,15,29,0.25), 0 0 0 0 rgba(25,175,175,0)",
          }}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
