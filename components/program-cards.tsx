"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Heart, GraduationCap, Flame, HandHeart } from "lucide-react";

type ProgramCard = {
  title: string;
  excerpt: string;
  complianceNote: string;
  href: string;
};

type ProgramCardsProps = {
  title: string;
  intro: string;
  cards: ProgramCard[];
};

const ICONS = [Heart, Droplets, GraduationCap, Flame, HandHeart];

const CARD_PHOTOS = [
  { src: "/images/food-bank.jpg",           alt: "Community food bank and meal program" },
  { src: "/images/education-children.jpeg",  alt: "Youth education and literacy program" },
  { src: "/images/volunteers-community.jpeg", alt: "Community support volunteers" },
  { src: "/images/food-bank.jpg",         alt: "Senior care and support" },
  { src: "/images/donation-giving.jpeg",      alt: "Charitable giving program" },
];

export function ProgramCards({ title, intro, cards }: ProgramCardsProps) {
  return (
    <section className="section-padding px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-brand-navy max-w-xl">{title}</h2>
            <div className="w-24 h-2 bg-brand-teal rounded-full" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl lg:pb-2"
          >
            {intro}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            const photo = CARD_PHOTOS[i % CARD_PHOTOS.length];
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative h-full flex flex-col rounded-[2.5rem] bg-white border border-slate-100 hover:border-brand-teal transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 30%, rgba(6,40,64,0.6) 100%)" }}
                  />
                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-6">
                    <div className="h-11 w-11 rounded-2xl flex items-center justify-center bg-brand-navy text-white group-hover:bg-brand-teal transition-colors duration-500 shadow-xl">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col flex-1 p-7 space-y-4">
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed flex-1">
                    {card.excerpt}
                  </p>

                  <div className="pt-4 mt-auto border-t border-slate-50 space-y-4">
                    <div className="flex items-center gap-2 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compliance Verified</span>
                    </div>
                    <Link
                      href={card.href}
                      className="group/link flex items-center gap-3 text-brand-navy font-bold hover:text-brand-teal transition-colors"
                    >
                      <span>View Impact</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 group-hover/link:bg-brand-teal group-hover/link:text-white transition-all">
                        <ArrowRight size={16} aria-hidden="true" className="group-hover/link:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
