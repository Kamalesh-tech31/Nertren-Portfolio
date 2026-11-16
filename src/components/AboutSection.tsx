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
import { Carousel, type CarouselItem } from '@/components/ui/Carousel';
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
  icon: APPROACH_ICONS[index],
}));

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="about-heading"
          sectionNumber="02"
          label="About the Firm"
          title={ABOUT_FIRM.heading}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column — Firm Background & Case Evaluation Standard */}
          <div className="min-w-0 lg:col-span-6 space-y-5">
            <p className="text-base sm:text-lg leading-relaxed text-foreground">
              {ABOUT_FIRM.lead}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {ABOUT_FIRM.bciAdherence}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {ABOUT_FIRM.philosophyNote}
            </p>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="mb-2 text-xs font-medium tracking-[0.14em] uppercase text-primary">
                Case Evaluation Standard
              </p>
              <blockquote className="font-serif text-lg sm:text-xl leading-relaxed text-foreground">
                “{ABOUT_FIRM.evaluationNotice}”
              </blockquote>
            </div>
          </div>

          {/* Right Column — Compact Eight-Card Approach Carousel */}
          <div className="min-w-0 lg:col-span-6">
            <p className="mb-4 text-xs font-medium tracking-[0.16em] uppercase text-primary">
              {APPROACH_SUBSECTION.eyebrow}
            </p>
            <Carousel
              items={CAROUSEL_ITEMS}
              baseWidth="100%"
              effect="slide"
              indicator="counter"
              frame={false}
              arrows={true}
              autoplay={false}
              loop={false}
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
