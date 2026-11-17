import React from 'react';
import { PerspectiveCarousel } from './perspective-carousel';
import { ADVOCATES } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const AdvocateProfiles: React.FC = () => {
  return (
    <section
      id="advocates"
      aria-labelledby="advocates-heading"
      className="section-anchor border-t border-border bg-background py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="advocates-heading"
          title="Our Advocates"
          lead="Meet the professionals associated with Nertren Law Associates."
        />

        <PerspectiveCarousel profiles={ADVOCATES} autoplay={true} interval={5000} />
      </div>
    </section>
  );
};
