import React from 'react';
import { DISCLAIMER_BLOCKS } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const LegalDisclaimer: React.FC = () => {
  return (
    <section
      id="disclaimer"
      aria-labelledby="disclaimer-heading"
      className="section-anchor border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="disclaimer-heading"
          sectionNumber="07"
          label="Legal & Compliance"
          title="Website Disclaimer & BCI Compliance Notice"
          lead="Disclosures regarding the informational purpose of this website under the Rules of the Bar Council of India."
        />

        <div className="divide-y divide-border border-b border-border">
          {DISCLAIMER_BLOCKS.map((block, index) => (
            <article
              key={block.title}
              className={`grid grid-cols-1 gap-4 py-7 sm:py-8 lg:grid-cols-12 lg:gap-12 ${
                index === 0 ? 'pt-2 sm:pt-4' : ''
              }`}
            >
              <h3 className="lg:col-span-4 font-serif text-xl font-semibold text-foreground">
                {block.title}
              </h3>
              <p className="lg:col-span-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
