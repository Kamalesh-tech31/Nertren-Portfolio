import React from 'react';
import { CONFIDENTIALITY_INFO } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const ConfidentialitySection: React.FC = () => {
  return (
    <section
      id="confidentiality"
      aria-labelledby="confidentiality-heading"
      className="section-anchor border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="confidentiality-heading"
          sectionNumber="06"
          label="Professional Standards"
          title={CONFIDENTIALITY_INFO.heading}
        />

        <div className="max-w-3xl">
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            {CONFIDENTIALITY_INFO.statement}
          </p>
        </div>
      </div>
    </section>
  );
};
