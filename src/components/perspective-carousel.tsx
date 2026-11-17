"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../lib/utils";
import type { AdvocateProfile } from "../data/firmData";

function PortraitMedia({
  profile,
  isCenter = false,
  className,
}: {
  profile: AdvocateProfile;
  isCenter?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const isConfirmed = profile.photo?.isConfirmed ?? true;
  const src = (profile.imageSrc || profile.photo?.src || "").trim();

  if (!src || failed || !isConfirmed) {
    return (
      <div
        className={cn(
          "flex size-full flex-col items-center justify-center bg-muted px-6 text-center",
          className
        )}
      >
        <div className="flex size-20 sm:size-24 items-center justify-center rounded-full border border-primary/40 bg-card shadow-xs">
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-foreground">
            {profile.initials}
          </span>
        </div>
        <p className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {profile.roleTitle}
        </p>
        <p className="mt-1 text-xs text-muted-foreground tabular-nums">
          Enrolment: {profile.enrolmentNumber}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={profile.photo?.alt || `Portrait of ${profile.name}`}
      draggable={false}
      loading={isCenter ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        filter: isCenter ? "none" : "blur(5px)",
        opacity: isCenter ? 1 : 0.52,
        transform: "translateZ(0)",
        imageRendering: "auto",
        objectFit: "cover",
        objectPosition: "top center",
        transition: "filter 0.45s ease, opacity 0.45s ease",
      }}
      className={cn(
        "size-full object-cover object-[top_center] will-change-[filter,opacity]",
        isCenter ? "opacity-100 filter-none" : "opacity-50",
        className
      )}
    />
  );
}

export interface PerspectiveCarouselProps {
  profiles: AdvocateProfile[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * 3D Perspective Coverflow Carousel for Advocate Profiles.
 * Centers the active portrait, supports drag, arrow buttons, and keyboard navigation,
 * and triggers a restrained 3D flip + accessible profile modal on selection.
 */
export function PerspectiveCarousel({
  profiles,
  autoplay = true,
  interval = 5000,
  className,
}: PerspectiveCarouselProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const n = profiles.length;
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [modalProfile, setModalProfile] = useState<AdvocateProfile | null>(null);

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!autoplay || n <= 1 || isHovered || modalProfile !== null || prefersReducedMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % n), interval);
    return () => window.clearInterval(id);
  }, [autoplay, interval, n, isHovered, modalProfile, prefersReducedMotion]);

  useEffect(() => {
    if (!modalProfile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalProfile(null);
        setFlippedId(null);
        lastFocusedRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalProfile]);

  const go = (to: number) => {
    setFlippedId(null);
    setIndex(((to % n) + n) % n);
  };

  const openProfile = (profile: AdvocateProfile, triggerEl?: HTMLElement | null) => {
    lastFocusedRef.current =
      triggerEl || (document.activeElement as HTMLElement | null);
    setFlippedId(profile.id);
    setModalProfile(profile);
  };

  const closeModal = () => {
    setModalProfile(null);
    setFlippedId(null);
    lastFocusedRef.current?.focus();
  };

  return (
    <>
      <div
        className={cn("w-full overflow-hidden py-5 sm:py-6 outline-none", className)}
        tabIndex={0}
        aria-label="Advocate profiles perspective carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
      >
        <motion.div
          className="relative mx-auto h-[24rem] sm:h-[25.5rem] w-full max-w-4xl [perspective:1400px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -55) go(index + 1);
            else if (info.offset.x > 55) go(index - 1);
          }}
        >
          {profiles.map((profile, i) => {
            let d = i - index;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const abs = Math.abs(d);
            const isCenter = d === 0;
            const isFlipped = isCenter && flippedId === profile.id;

            return (
              <motion.div
                key={profile.id}
                animate={
                  prefersReducedMotion
                    ? {
                        x: `${d * 56}%`,
                        scale: isCenter ? 1 : 0.88,
                        opacity: abs > 1 ? 0 : isCenter ? 1 : 0.72,
                      }
                    : {
                        x: `${d * 60}%`,
                        z: -abs * 130,
                        rotateY: isCenter ? 0 : d > 0 ? -34 : 34,
                        scale: isCenter ? 1 : 0.86,
                        opacity: abs > 1 ? 0 : 1 - abs * 0.24,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 165, damping: 24 }
                }
                style={{
                  zIndex: 10 - abs,
                  pointerEvents: abs > 1 ? "none" : "auto",
                  transformStyle: "preserve-3d",
                }}
                className="absolute inset-y-0 left-1/2 -ml-[8.25rem] w-[16.5rem] sm:-ml-[9.75rem] sm:w-[19.5rem]"
              >
                <motion.div
                  animate={{ rotateY: isFlipped && !prefersReducedMotion ? 180 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.32, 0.72, 0, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative size-full"
                >
                  {/* Front Face — Portrait Card */}
                  <figure
                    style={{ backfaceVisibility: "hidden" }}
                    onClick={(e) => {
                      if (!isCenter) {
                        go(i);
                      } else {
                        openProfile(profile, e.currentTarget);
                      }
                    }}
                    className={cn(
                      "absolute inset-0 flex flex-col overflow-hidden rounded-3xl border bg-card shadow-[0_14px_34px_rgba(56,47,41,0.09)] transition-colors",
                      isCenter
                        ? "cursor-pointer border-primary/50"
                        : "cursor-pointer border-border hover:border-primary/40"
                    )}
                  >
                    <div className="relative flex-1 overflow-hidden bg-muted">
                      <PortraitMedia profile={profile} isCenter={isCenter} />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/70 to-transparent"
                      />
                    </div>

                    <figcaption className="relative border-t border-border bg-card px-5 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        {profile.roleTitle}
                      </p>

                      <p className="mt-1 font-editorial text-xl font-semibold tracking-tight text-foreground">
                        {profile.name}
                      </p>

                      {isCenter && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProfile(profile, e.currentTarget);
                          }}
                          className="mt-3 inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          View Profile
                        </button>
                      )}
                    </figcaption>
                  </figure>

                  {/* Back Face — Short Introduction (revealed during 3D flip) */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-primary/50 bg-card p-6 shadow-[0_14px_34px_rgba(56,47,41,0.1)]"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {profile.roleTitle}
                      </p>
                      <h3 className="mt-1.5 font-editorial text-2xl font-semibold text-foreground">
                        {profile.name}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {profile.shortIntro}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => openProfile(profile)}
                        className="rounded-full border border-primary bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground"
                      >
                        Full Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous advocate profile"
            onClick={() => go(index - 1)}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {profiles.map((profile, i) => (
              <button
                key={profile.id}
                type="button"
                aria-label={`Select ${profile.name}`}
                aria-pressed={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  i === index
                    ? "w-7 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next advocate profile"
            onClick={() => go(index + 1)}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Accessible direct selector bar for keyboard & touch convenience */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {profiles.map((profile, i) => {
            const active = i === index;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={(e) => {
                  if (!active) {
                    go(i);
                  } else {
                    openProfile(profile, e.currentTarget);
                  }
                }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {profile.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Profile Modal */}
      {modalProfile && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/45 p-4 sm:p-6 backdrop-blur-[2px]"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="advocate-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label="Close advocate profile"
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-5">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                  <PortraitMedia profile={modalProfile} isCenter={true} />
                </div>
              </div>

              <div className="sm:col-span-7 space-y-5 pr-4 sm:pr-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {modalProfile.roleTitle}
                  </p>
                  <h3
                    id="advocate-modal-title"
                    className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-foreground"
                  >
                    {modalProfile.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-muted-foreground tabular-nums">
                    Bar Council Enrolment:{" "}
                    <span className="text-foreground">
                      {modalProfile.enrolmentNumber}
                    </span>
                  </p>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  {modalProfile.bio.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {modalProfile.qualifications &&
                  modalProfile.qualifications.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        Qualifications
                      </h4>
                      <ul className="mt-2.5 space-y-1.5 text-sm text-foreground">
                        {modalProfile.qualifications.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="border-t border-border pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {modalProfile.practiceLabel}
                  </h4>
                  <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-sm text-foreground">
                    {modalProfile.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span
                          className="size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
