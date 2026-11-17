import React from 'react';
import { PerspectiveCarousel } from '@/components/perspective-carousel';
import { ADVOCATES } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const AdvocateProfiles: React.FC = () => {
  return (
    <section
      id="advocates"
      aria-labelledby="advocates-heading"
      className="section-anchor border-t border-border bg-background py-14 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="advocates-heading"
          sectionNumber="03"
          label="Our Advocates"
          title="Our Advocates"
          lead="Meet the professionals associated with Nertren Law Associates."
        />

        <PerspectiveCarousel profiles={ADVOCATES} autoplay={false} />
      </div>
    </section>
  );
};
