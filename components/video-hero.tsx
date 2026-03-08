"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type VideoHeroProps = {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta: {
        label: string;
        href: string;
    };
    videoSrc: string;
    videoPoster: string;
};

export function VideoHero({
    eyebrow,
    title,
    description,
    primaryCta,
    secondaryCta,
    videoSrc,
    videoPoster,
}: VideoHeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay policy might block playback
                console.log("Autoplay prevented");
            });
        }
    }, []);

    return (
        <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden rounded-none shadow-[var(--shadow-lg)] sm:min-h-[600px] sm:rounded-[2rem]">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                <video
                    ref={videoRef}
                    className={`h-full w-full object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={videoPoster}
                    onLoadedData={() => setIsLoaded(true)}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>

                {/* Poster Image (Fallback & Loading State) */}
                {!isLoaded && (
                    <div
                        className="absolute inset-0 z-10 bg-cover bg-center"
                        style={{ backgroundImage: `url(${videoPoster})` }}
                    />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 z-20 bg-slate-900/60 transition-opacity duration-300" />
                {/* Subtle Brand Gradient Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-[var(--color-fgrf-navy)]/80 via-transparent to-[var(--color-fgrf-teal)]/40 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-30 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl transform transition-all duration-1000 translate-y-0 opacity-100">

                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold tracking-wider text-teal-200 uppercase backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        {eyebrow}
                    </div>

                    <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl font-display drop-shadow-sm">
                        {title}
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 !text-white font-semibold drop-shadow-md sm:text-xl">
                        {description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={primaryCta.href}
                            className="group relative inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_-10px_rgba(25,175,175,0.5)] transition-all hover:bg-teal-600 hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">{primaryCta.label}</span>
                            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>

                        <Link
                            href={secondaryCta.href}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                        >
                            {secondaryCta.label}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
