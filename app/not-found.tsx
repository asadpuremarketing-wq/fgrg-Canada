import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl"
        style={{ background: "rgba(25,175,175,0.1)" }}
      >
        <span className="text-4xl font-bold" style={{ color: "#19AFAF" }}>404</span>
      </div>

      <h1 className="mb-3 text-3xl font-bold" style={{ color: "#0e507b" }}>
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-slate-500 leading-relaxed">
        The page you are looking for may have been moved, deleted, or does not exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
