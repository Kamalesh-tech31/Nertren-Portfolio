"use client";

import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Cpu, Radio, ShieldAlert } from "lucide-react";
import { cn } from "../lib/utils";
import { computeTimelineProgress, getTimelineStepState } from "../utils/navigation";

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
  const seen = useInView(ref, { margin: "-20% 0px -20% 0px" });

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
      className="relative grid grid-cols-[3rem_1fr] items-center gap-x-5 md:grid-cols-[1fr_8rem_1fr] md:gap-x-0"
    >
      {/* Circular Stage Marker — Centered precisely on the connector curve */}
      <div
        className={cn(
          "z-10 col-start-1 grid size-12 place-items-center rounded-full border-2 bg-card transition-all duration-500 md:col-start-2 md:size-14 md:justify-self-center shadow-xs",
          isActive
            ? "border-[#76543D] ring-4 ring-[#76543D]/15 scale-105"
            : isHighlighted
              ? "border-[#A77C52] bg-card"
              : "border-[#D8C2AA]/70 bg-card"
        )}
      >
        <span
          className={cn(
            "grid size-8 place-items-center rounded-full transition-all duration-500 md:size-9 [&_svg]:size-4 md:[&_svg]:size-4.5",
            isActive
              ? "bg-[#76543D] text-white"
              : isHighlighted
                ? "bg-[#A77C52] text-white"
                : "bg-[#F2EBE3] text-muted-foreground"
          )}
        >
          {step.icon}
        </span>
      </div>

      {/* Stage Content Card — Positioned with consistent horizontal separation from the path */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={
          reducedMotion || isHighlighted
            ? { opacity: 1, y: 0 }
            : { opacity: 0.35, y: 8 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }
        }
        className={cn(
          "col-start-2 min-w-0 md:max-w-md",
          right
            ? "md:col-start-3 md:pl-14 md:text-left"
            : "md:col-start-1 md:row-start-1 md:justify-self-end md:pr-14 md:text-right"
        )}
      >
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300",
            isActive
              ? "text-[#76543D]"
              : isHighlighted
                ? "text-[#A77C52]"
                : "text-muted-foreground"
          )}
        >
          {step.date}
        </p>

        {/* Increased Heading Size */}
        <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#49362D] text-balance leading-snug">
          {step.title}
        </h3>

        {/* Increased Description Size with comfortable reading style */}
        <div
          className={cn(
            "mt-2 rounded-2xl border bg-card p-4 sm:p-5 text-left text-sm sm:text-[15px] leading-relaxed text-[#64748B] transition-all duration-500 shadow-xs",
            isActive
              ? "border-[#76543D]/50 ring-1 ring-[#76543D]/10"
              : isHighlighted
                ? "border-[#A77C52]/40"
                : "border-border"
          )}
        >
          <p>{step.description}</p>
        </div>
      </motion.div>
    </li>
  );
}

/**
 * Continuous Curved (S-shaped / Zigzag) 7-Stage Timeline.
 * Connects all stages with an elegant, slender SVG curved path on desktop and vertical track on mobile.
 * Starts precisely at center of Stage 01 and terminates at center of Stage 07.
 */
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

  // SVG pronounced S-curved path: starts at Stage 01 center (50, 0),
  // alternates left and right across stages, and terminates precisely at Stage 07 center (50, 1000).
  const desktopCurvedPath =
    "M 50,0 C 58,55 58,112 50,167 C 42,222 42,278 50,333 C 58,388 58,445 50,500 C 42,555 42,612 50,667 C 58,722 58,778 50,833 C 42,888 42,945 50,1000";

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A77C52]">
          {eyebrow}
        </p>
        <h2
          id="engagement-heading"
          className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#49362D] text-balance"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#64748B] max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-8 sm:mt-10 max-w-4xl py-2 sm:py-3">
        {/* Desktop Curved SVG Path Connector — Starts at Stage 01 center and ends at Stage 07 center */}
        <div
          className="pointer-events-none absolute left-0 right-0 hidden md:block"
          style={{ top: "28px", bottom: "28px" }}
        >
          <svg
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="size-full overflow-visible"
            aria-hidden="true"
          >
            {/* Background passive curve */}
            <path
              d={desktopCurvedPath}
              fill="none"
              stroke="#D8C2AA"
              strokeWidth="1.75"
              strokeOpacity="0.5"
            />
            {/* Active animated curve */}
            <motion.path
              d={desktopCurvedPath}
              fill="none"
              stroke="#76543D"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: prefersReducedMotion ? 1 : progressPercent / 100 }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            />
          </svg>
        </div>

        {/* Mobile Vertical Track Connector — positioned comfortably beside text */}
        <div
          className="pointer-events-none absolute left-[23px] w-[1.75px] bg-[#D8C2AA]/50 md:hidden"
          style={{ top: "24px", bottom: "24px" }}
        >
          <motion.div
            className="w-full bg-[#76543D]"
            initial={{ height: 0 }}
            animate={{ height: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>

        {/* Stages List with compact 20-30% tighter spacing */}
        <ol
          aria-label="Client Engagement Stages"
          className="relative flex flex-col gap-6 md:gap-7"
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
