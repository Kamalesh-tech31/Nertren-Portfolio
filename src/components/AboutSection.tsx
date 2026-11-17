import React from 'react';
import {
  BookOpen01Icon,
  ClipboardIcon,
  Compass01Icon,
  FileSearchIcon,
  FileValidationIcon,
  JusticeScale01Icon,
  Message01Icon,
  Shield01Icon,
} from '@hugeicons/core-free-icons';
import { Carousel, type CarouselItem } from './ui/Carousel';
import { ABOUT_FIRM, APPROACH_CARDS, APPROACH_SUBSECTION } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

const APPROACH_ICONS = [
  FileSearchIcon,
  BookOpen01Icon,
  JusticeScale01Icon,
  FileValidationIcon,
  ClipboardIcon,
  Compass01Icon,
  Message01Icon,
  Shield01Icon,
];

const CAROUSEL_ITEMS: CarouselItem[] = APPROACH_CARDS.map((card, index) => ({
  id: card.id,
  number: card.number,
  title: card.title,
  description: card.description,
  imageSrc: card.imageSrc,
  imageAlt: card.imageAlt,
  imageClassName: card.imageClassName,
  icon: APPROACH_ICONS[index],
}));

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor border-t border-border bg-[#F2EBE3]/40 py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="about-heading"
          title={ABOUT_FIRM.heading}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Column — Firm Background & Case Evaluation Standard */}
          <div className="min-w-0 lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-foreground">
              Nertren Law Associates is a sole proprietorship law practice founded by Advocate Kavin Kumar and based in Tamil Nadu. The firm represents individuals, entrepreneurs, businesses, companies, trusts, institutions and rights holders before courts, tribunals and statutory authorities.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Combining traditional litigation and advisory practice with an understanding of intellectual property matters, the firm approaches each engagement with careful preparation and attention to its legal and factual circumstances.
            </p>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="mb-2 text-xs font-semibold tracking-[0.14em] uppercase text-primary">
                Case Evaluation Standard
              </p>
              <blockquote className="text-lg sm:text-xl leading-relaxed text-foreground italic">
                &ldquo;{ABOUT_FIRM.evaluationNotice}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column — Compact Eight-Card Approach Carousel */}
          <div className="min-w-0 lg:col-span-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-primary">
              {APPROACH_SUBSECTION.eyebrow}
            </p>
            <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {APPROACH_SUBSECTION.supportingText}
            </p>
            <Carousel
              items={CAROUSEL_ITEMS}
              baseWidth="100%"
              effect="slide"
              indicator="counter"
              frame={false}
              arrows={true}
              autoplay={true}
              autoplayInterval={3000}
              loop={true}
              draggable={true}
              theme="light"
              ariaLabel="Eight cards outlining how Nertren Law Associates approaches every matter"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
