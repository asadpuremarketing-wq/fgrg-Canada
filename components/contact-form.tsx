"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function ContactForm() {
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [message, setMessage]         = useState("");
  const [subject, setSubject]         = useState("");
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot
  const [loadedAt]                    = useState(() => Date.now()); // timing token
  const [errors, setErrors]           = useState<FormErrors>({});
  const [status, setStatus]           = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Prevent form submission if JS is disabled (non-JS bots) - aria-live region
  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (form) form.setAttribute("data-js", "true");
  }, []);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (name.trim().length < 2)           e.name    = "Please enter your full name (at least 2 characters).";
    if (!emailPattern.test(email.trim())) e.email   = "Please enter a valid email address.";
    if (message.trim().length < 10)       e.message = "Message must be at least 10 characters.";
    return e;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name)         nameRef.current?.focus();
      else if (validationErrors.email)   emailRef.current?.focus();
      else if (validationErrors.message) messageRef.current?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          name.trim(),
          email:         email.trim().toLowerCase(),
          message:       message.trim(),
          subject:       subject.trim(),
          companyWebsite: companyWebsite.trim(), // honeypot
          _t:            String(loadedAt),        // timing token
        }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unable to submit at this time. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName(""); setEmail(""); setMessage(""); setSubject(""); setCompanyWebsite("");
      setErrors({});
    } catch {
      setErrorMessage("Connection error. Please check your network and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-5 rounded-3xl px-8 py-16 text-center"
        style={{
          background: "linear-gradient(160deg, #f0fafa 0%, #f8fcff 100%)",
          border: "1px solid rgba(25,175,175,0.18)",
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(25,175,175,0.12)" }}
        >
          <CheckCircle2 size={32} style={{ color: "#19AFAF" }} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display" style={{ color: "#0e507b" }}>
            Message Received
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Thank you for reaching out to FGRF Canada. We&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <button onClick={() => setStatus("idle")} className="btn-secondary mt-2">
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      id="contact-form"
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl p-7 space-y-5"
      aria-label="Contact FGRF Canada"
      style={{
        background: "white",
        border: "1px solid rgba(25,175,175,0.1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      <h2 className="text-xl font-bold font-display" style={{ color: "#0e507b", fontSize: "1.35rem" }}>
        Send Us a Message
      </h2>

      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="block text-sm font-semibold" style={{ color: "#374151" }}>
          Full Name <span aria-hidden="true" style={{ color: "#19AFAF" }}>*</span>
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          type="text"
          required
          aria-required="true"
          autoComplete="name"
          placeholder="Your full name"
          maxLength={100}
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
          className="form-input"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#dc2626" }}>
            <AlertCircle size={12} /> {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="block text-sm font-semibold" style={{ color: "#374151" }}>
          Email Address <span aria-hidden="true" style={{ color: "#19AFAF" }}>*</span>
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          name="email"
          type="email"
          required
          aria-required="true"
          autoComplete="email"
          placeholder="your@email.com"
          maxLength={254}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          className="form-input"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#dc2626" }}>
            <AlertCircle size={12} /> {errors.email}
          </p>
        )}
      </div>

      {/* Subject (optional) */}
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="block text-sm font-semibold" style={{ color: "#374151" }}>
          Subject <span className="text-xs font-normal" style={{ color: "#94a3b8" }}>(optional)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          placeholder="Briefly describe your inquiry"
          maxLength={200}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="form-input"
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-sm font-semibold" style={{ color: "#374151" }}>
          Message <span aria-hidden="true" style={{ color: "#19AFAF" }}>*</span>
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          placeholder="How can we help you?"
          maxLength={3000}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
          className="form-input resize-none"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center">
          {errors.message ? (
            <p id="message-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#dc2626" }}>
              <AlertCircle size={12} /> {errors.message}
            </p>
          ) : <span />}
          <span className="text-xs" style={{ color: message.length > 2700 ? "#f59e0b" : "#94a3b8" }}>
            {message.length}/3000
          </span>
        </div>
      </div>

      {/* Honeypot - hidden from real users, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="companyWebsite"
          type="text"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* API error */}
      {status === "error" && (
        <div
          className="flex items-start gap-3 rounded-xl p-4"
          style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
          <p className="text-sm" style={{ color: "#991b1b" }}>{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending&hellip;
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
        Your information is kept private and will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
