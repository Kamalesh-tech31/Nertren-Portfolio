import React from 'react';
import {
  Building2,
  Gavel,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import {
  COURTS_CARDS,
  COURTS_INFO,
  type CourtIconKey,
} from '../data/firmData';
import { SectionHeader } from './SectionHeader';

const COURT_ICONS: Record<CourtIconKey, React.ReactNode> = {
  landmark: <Landmark className="size-5" aria-hidden="true" />,
  building: <Building2 className="size-5" aria-hidden="true" />,
  scale: <Scale className="size-5" aria-hidden="true" />,
  gavel: <Gavel className="size-5" aria-hidden="true" />,
  shield: <ShieldCheck className="size-5" aria-hidden="true" />,
  scroll: <ScrollText className="size-5" aria-hidden="true" />,
};

export const CourtsSection: React.FC = () => {
  return (
    <section
      id="courts"
      aria-labelledby="courts-heading"
      className="section-anchor border-t border-border bg-background py-14 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="courts-heading"
          title={COURTS_INFO.heading}
          lead={COURTS_INFO.supportingText}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COURTS_CARDS.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
            >
              <span className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                {COURT_ICONS[card.icon]}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-6 text-center">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            {COURTS_INFO.coordinationNote}
          </p>
        </div>
      </div>
    </section>
  );
};
