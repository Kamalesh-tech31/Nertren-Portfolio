"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.32, 0.72, 0, 1] as const;

export interface FeatureBentoProps {
  eyebrow?: string;
  heading?: string;
  description: string;
  secondaryDescription?: string;
  locationLabel: string;
  presenceTitle: string;
  presenceItems: readonly string[];
  foundationsTitle: string;
  foundationsItems: readonly string[];
  className?: string;
}

/** A bento cell with a restrained warm-bronze spotlight that follows the pointer. */
function BentoCell({
  className,
  children,
  index,
  reducedMotion,
}: {
  className?: string;
  children: ReactNode;
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.7, delay: index * 0.08, ease: EASE }
      }
      onPointerMove={(e) => {
        if (!ref.current || reducedMotion) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 transition-colors duration-300 hover:border-primary/45",
        className
      )}
    >
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 11%, transparent), transparent 70%)",
          }}
        />
      )}
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

/**
 * Three-cell editorial Bento Grid for Nertren Law Associates:
 * one large identity card (2/3 width on desktop) and two stacked detail cards (1/3 width).
 */
export function FeatureBento({
  eyebrow = "NERTREN LAW ASSOCIATES",
  heading = "Independent Litigation & Advisory Practice",
  description,
  secondaryDescription,
  locationLabel,
  presenceTitle,
  presenceItems,
  foundationsTitle,
  foundationsItems,
  className,
}: FeatureBentoProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
        {/* Large Left Cell — Firm Identity */}
        <BentoCell
          index={0}
          reducedMotion={prefersReducedMotion}
          className="lg:col-span-4 justify-between p-6 sm:p-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            <h1
              id="home-heading"
              className="mt-3.5 font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-tight text-foreground text-balance"
            >
              {heading}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
            {secondaryDescription && (
              <p className="mt-3.5 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                {secondaryDescription}
              </p>
            )}
          </div>

          <div className="mt-8 border-t border-border pt-4 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-foreground">
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              <span>{locationLabel}</span>
            </span>
          </div>
        </BentoCell>

        {/* Right Stacked Column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Small Right Card 01 — Geographical Presence */}
          <BentoCell
            index={1}
            reducedMotion={prefersReducedMotion}
            className="flex-1 p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <h2 className="font-editorial text-xl font-semibold tracking-tight text-card-foreground">
                {presenceTitle}
              </h2>
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {presenceItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-border/70 pb-2 last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </BentoCell>

          {/* Small Right Card 02 — Professional Foundations */}
          <BentoCell
            index={2}
            reducedMotion={prefersReducedMotion}
            className="flex-1 p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <h2 className="font-editorial text-xl font-semibold tracking-tight text-card-foreground">
                {foundationsTitle}
              </h2>
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm text-muted-foreground">
              {foundationsItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 border-b border-border/70 pb-1.5 last:border-b-0 last:pb-0"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </BentoCell>
        </div>
      </div>
    </div>
  );
}
