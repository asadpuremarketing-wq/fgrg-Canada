"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl border px-4 py-3" style={{ borderColor: "rgba(25,175,175,0.25)", background: "rgba(25,175,175,0.08)" }}>
        <CheckCircle2 size={16} style={{ color: "#19AFAF", flexShrink: 0 }} />
        <p className="text-sm font-medium" style={{ color: "#4dd9d9" }}>
          You&apos;re subscribed. Thank you!
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
        className="min-w-0 flex-1 rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 disabled:opacity-50"
        style={{
          background: "rgba(255,255,255,0.05)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(25,175,175,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(25,175,175,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50"
        style={{ background: "#19AFAF", color: "white" }}
      >
        {isSubmitting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Send size={15} />
        )}
      </button>
    </form>
  );
}
