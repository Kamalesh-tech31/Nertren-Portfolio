import React from 'react';
import { FeatureBento } from '@/components/feature-bento';
import { FIRM_INFO } from '../data/firmData';

export const HomeSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="section-anchor bg-background pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <FeatureBento
          eyebrow="NERTREN LAW ASSOCIATES"
          heading={FIRM_INFO.tagline}
          description={FIRM_INFO.introLead}
          secondaryDescription={FIRM_INFO.approachSummary}
          locationLabel="Erode District, Tamil Nadu, India."
          presenceTitle="Geographical Presence"
          presenceItems={FIRM_INFO.geographicalPresence}
          foundationsTitle="Professional Foundations"
          foundationsItems={[
            'Professional Integrity.',
            'Legal Scholarship.',
            'Client Confidentiality.',
            'Diligent Preparation.',
            'Responsible Advocacy.',
          ]}
        />
      </div>
    </section>
  );
};
