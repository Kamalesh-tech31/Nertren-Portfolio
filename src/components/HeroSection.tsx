import React from 'react';
import { MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="section-anchor relative w-full overflow-hidden flex items-center justify-center min-h-[580px] sm:min-h-[640px] md:min-h-[720px] md:h-[90vh] max-h-[960px]"
    >
      {/* Background — professional law office workspace image covering entire hero */}
      <div
        className="absolute inset-0 bg-cover transition-transform duration-700"
        style={{
          backgroundImage: "url('/images/law-office.png')",
          backgroundPosition: 'center 38%',
        }}
        aria-hidden="true"
      />

      {/* Dark restrained multi-stop overlay for crisp headline readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(24, 17, 13, 0.80) 0%, rgba(36, 25, 20, 0.66) 45%, rgba(20, 14, 11, 0.90) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Hero Content — vertically centered with balanced breathing room */}
      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <p
          className="mb-4 text-xs font-semibold tracking-[0.24em] uppercase"
          style={{ color: '#D8C2AA' }}
        >
          Nertren Law Associates
        </p>

        <h1
          id="home-heading"
          className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.65rem] max-w-4xl text-balance"
        >
          Independent Litigation &amp; Advisory Practice
        </h1>

        <p
          className="mt-5 sm:mt-6 text-base sm:text-lg font-normal leading-relaxed max-w-2xl text-balance"
          style={{ color: 'rgba(242, 235, 227, 0.92)' }}
        >
          A Tamil Nadu-based legal practice representing individuals, entrepreneurs, businesses,
          institutions and rights holders before courts, tribunals and statutory authorities.
        </p>

        {/* Subtle geographical presence indicator */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-medium tracking-wider uppercase text-[#D8C2AA]/90 border-t border-white/10 pt-5 sm:pt-6">
          <MapPin className="size-3.5 text-[#A77C52]" aria-hidden="true" />
          <span>Headquartered in Erode District</span>
          <span className="text-white/30">·</span>
          <span>Chennai Appearances</span>
          <span className="text-white/30">·</span>
          <span>Madras High Court</span>
        </div>
      </div>
    </section>
  );
};
