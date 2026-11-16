import React from 'react';
import { LEGAL_POLICIES } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const PrivacyPolicy: React.FC = () => {
  const { privacyPolicy, termsOfUse } = LEGAL_POLICIES;

  return (
    <section
      id="privacy-terms"
      aria-labelledby="privacy-terms-heading"
      className="section-anchor border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="privacy-terms-heading"
          sectionNumber="08"
          label="Legal & Compliance"
          title="Privacy Policy & Terms of Use"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <article className="border-t border-border pt-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {privacyPolicy.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {privacyPolicy.body}
            </p>
          </article>

          <article className="border-t border-border pt-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {termsOfUse.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {termsOfUse.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
