"use client";

import { useRef, useState } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      nextErrors.message = "Please enter a message with at least 10 characters.";
    }

    return nextErrors;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.email) {
        emailInputRef.current?.focus();
      } else if (validationErrors.message) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          companyWebsite: companyWebsite.trim(),
        }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus(data.error ?? "Unable to submit at this time.");
        return;
      }

      setStatus(data.message ?? "Thank you. Your message was received.");
      setName("");
      setEmail("");
      setMessage("");
      setCompanyWebsite("");
      setErrors({});
    } catch {
      setStatus("Unable to submit at this time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card space-y-4 p-6">
      <h2>Contact Form</h2>

      <div className="space-y-1">
        <label htmlFor="contact-name" className="text-sm font-medium text-slate-800">
          Name <span aria-hidden="true">*</span>
          <span className="sr-only">required</span>
        </label>
        <input
          ref={nameInputRef}
          id="contact-name"
          name="name"
          type="text"
          required
          aria-required="true"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" aria-live="polite" className="text-sm text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-email" className="text-sm font-medium text-slate-800">
          Email <span aria-hidden="true">*</span>
          <span className="sr-only">required</span>
        </label>
        <input
          ref={emailInputRef}
          id="contact-email"
          name="email"
          type="email"
          required
          aria-required="true"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" role="alert" aria-live="polite" className="text-sm text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-message" className="text-sm font-medium text-slate-800">
          Message <span aria-hidden="true">*</span>
          <span className="sr-only">required</span>
        </label>
        <textarea
          ref={messageInputRef}
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" aria-live="polite" className="text-sm text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="hidden">
        <label htmlFor="contact-company-website">Company website</label>
        <input
          id="contact-company-website"
          name="companyWebsite"
          type="text"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {status ? (
        <p role="status" aria-live="polite" className="text-sm text-slate-700">
          {status}
        </p>
      ) : null}
    </form>
  );
}
