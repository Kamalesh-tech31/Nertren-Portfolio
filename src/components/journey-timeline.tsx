"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Cpu, Radio, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { computeTimelineProgress, getTimelineStepState } from "@/utils/navigation";

export type JourneyStep = {
  icon?: ReactNode;
  date: string;
  title: string;
  description: string;
};

const DEFAULT_STEPS: JourneyStep[] = [
  { icon: <AlertTriangle />, date: "Minute 0", title: "A report comes in", description: "A citizen flags a problem from their phone. It lands in the queue with a location and a photo." },
  { icon: <Cpu />, date: "Minute 1", title: "It is triaged", description: "The system reads the report, scores how urgent it is and routes it to the right team." },
  { icon: <ShieldAlert />, date: "Minute 5", title: "A responder accepts", description: "The nearest available responder confirms. The reporter sees who is on the way." },
  { icon: <Radio />, date: "Minute 20", title: "Live updates", description: "Progress streams back as the work happens, so nobody has to ask for a status." },
  { icon: <CheckCircle2 />, date: "Same day", title: "Closed and verified", description: "The reporter confirms the fix. The case closes and feeds the next triage score." },
];

function Step({
  step,
  index,
  reachedIndex,
  activeIndex,
  onEnter,
  onLeave,
  reducedMotion,
}: {
  step: JourneyStep;
  index: number;
  reachedIndex: number;
  activeIndex: number;
  onEnter: (i: number) => void;
  onLeave: (i: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (seen) {
      onEnter(index);
    } else {
      onLeave(index);
    }
  }, [seen, index, onEnter, onLeave]);

  const effectiveReached = reducedMotion ? Number.MAX_SAFE_INTEGER : reachedIndex;
  const stepState = getTimelineStepState(index, effectiveReached, activeIndex);
  const isHighlighted = stepState === "active" || stepState === "completed";
  const isActive = stepState === "active";
  const right = index % 2 === 1;

  return (
    <li
      ref={ref}
      data-step-state={stepState}
      className="relative grid grid-cols-[3.5rem_1fr] items-start gap-x-4 md:grid-cols-[1fr_5rem_1fr] md:gap-x-0"
    >
      <span
        className={cn(
          "z-10 col-start-1 grid size-12 place-items-center rounded-2xl border bg-card transition-colors duration-500 md:col-start-2 md:size-16 md:justify-self-center",
          isActive
            ? "border-primary"
            : isHighlighted
              ? "border-primary/50"
              : "border-border"
        )}
      >
        <span
          className={cn(
            "grid size-8 place-items-center rounded-xl transition-all duration-500 md:size-10 [&_svg]:size-4 md:[&_svg]:size-5",
            isActive
              ? "scale-105 bg-primary text-primary-foreground"
              : isHighlighted
                ? "bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground"
          )}
        >
          {step.icon}
        </span>
      </span>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={
          reducedMotion || isHighlighted
            ? { opacity: 1, y: 0 }
            : { opacity: 0.28, y: 14 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.32, 0.72, 0, 1] }
        }
        className={cn(
          "col-start-2 min-w-0 md:max-w-sm",
          right
            ? "md:col-start-3 md:pl-10"
            : "md:col-start-1 md:row-start-1 md:justify-self-end md:pr-10 md:text-right"
        )}
      >
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest transition-colors duration-300",
            isHighlighted ? "text-primary" : "text-muted-foreground"
          )}
        >
          {step.date}
        </p>
        <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-foreground text-balance">
          {step.title}
        </h3>
        <p
          className={cn(
            "mt-2 rounded-2xl border bg-card p-4 sm:p-5 text-left text-sm leading-relaxed text-muted-foreground transition-colors duration-500",
            isActive
              ? "border-primary/55"
              : isHighlighted
                ? "border-primary/35"
                : "border-border"
          )}
        >
          {step.description}
        </p>
      </motion.div>
    </li>
  );
}

/** A vertical timeline. The line fills and the markers light up as each step scrolls into the middle of the view. */
export function JourneyTimeline({
  eyebrow = "From report to response",
  title = "Every report, followed all the way through",
  description,
  steps = DEFAULT_STEPS,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: JourneyStep[];
  className?: string;
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [reachedIndex, setReachedIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const line = useRef<HTMLSpanElement>(null);

  const onEnter = useCallback((i: number) => {
    setActiveIndex(i);
    setReachedIndex((prev) => (i > prev ? i : prev));
  }, []);

  const onLeave = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? -1 : prev));
  }, []);

  const progressPercent = prefersReducedMotion
    ? 100
    : computeTimelineProgress(reachedIndex, steps.length);

  useEffect(() => {
    if (line.current) {
      line.current.style.height = `${progressPercent}%`;
    }
  }, [progressPercent]);

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h2
          id="engagement-heading"
          className="mt-2.5 font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-10 sm:mt-12 max-w-4xl">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-6 top-4 w-[2px] -translate-x-1/2 bg-border md:left-1/2"
        >
          <span
            ref={line}
            className={cn(
              "block w-full bg-primary",
              prefersReducedMotion ? "" : "transition-[height] duration-700 ease-out"
            )}
            style={{ height: `${progressPercent}%` }}
          />
        </span>
        <ol
          aria-label="Client Engagement Stages"
          className="relative flex flex-col gap-10 md:gap-14"
        >
          {steps.map((s, i) => (
            <Step
              key={s.date}
              step={s}
              index={i}
              reachedIndex={reachedIndex}
              activeIndex={activeIndex}
              onEnter={onEnter}
              onLeave={onLeave}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
