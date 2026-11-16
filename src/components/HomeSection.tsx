import React from 'react';
import { FeatureBento } from '@/components/feature-bento';
import { FIRM_INFO } from '../data/firmData';

export const HomeSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="section-anchor bg-background pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <FeatureBento
          eyebrow="NERTREN LAW ASSOCIATES"
          heading={FIRM_INFO.tagline}
          description="Nertren Law Associates is an independent litigation and advisory law practice based in Tamil Nadu, representing individuals, businesses, institutions and rights holders before courts, tribunals and statutory authorities."
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
