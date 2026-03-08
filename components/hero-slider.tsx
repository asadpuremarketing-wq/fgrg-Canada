"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Slide = {
    eyebrow: string;
    title: string;
    body: string;
    imageSrc: string;
};

type HeroSliderProps = {
    slides: Slide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative h-[650px] w-full overflow-hidden bg-slate-900 text-white">
            {slides.map((slide, index) => {
                const isActive = index === current;
                return (
                    <div
                        key={index}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        aria-hidden={!isActive}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src={slide.imageSrc}
                                alt=""
                                fill
                                priority={index === 0}
                                className="object-cover opacity-30 sm:opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent" />
                        </div>

                        {/* Content Container */}
                        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                            <div className={`max-w-2xl transform transition-all duration-1000 ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-3 py-1 text-sm font-medium text-[var(--brand-accent)] backdrop-blur-sm">
                                    {slide.eyebrow}
                                </div>
                                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
                                    {slide.title}
                                </h1>
                                <p className="mb-8 text-lg leading-8 text-slate-300">
                                    {slide.body}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/donate"
                                        className="rounded-lg bg-[var(--brand-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    >
                                        Donate Now
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Learn More <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === current
                            ? "w-8 bg-[var(--brand-accent)]"
                            : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === current ? "true" : "false"}
                    />
                ))}
            </div>
        </section>
    );
}
