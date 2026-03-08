"use client";

import Image from "next/image";
import { useState } from "react";

type MediaGridProps = {
  title: string;
  intro: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export function MediaGrid({ title, intro, images }: MediaGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? images : images.slice(0, 8);

  return (
    <section className="section-tone-white space-y-4 rounded-3xl border border-slate-200 p-6 md:p-8">
      <h2>{title}</h2>
      <p className="max-w-3xl text-slate-700">{intro}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((image, index) => (
          <article key={`${image.src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="h-40 w-full object-cover transition duration-200 ease-in-out hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={68}
            />
          </article>
        ))}
      </div>
      {!showAll ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="btn-secondary"
          aria-expanded={showAll}
        >
          Show more
        </button>
      ) : null}
    </section>
  );
}
