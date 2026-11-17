import React from 'react';
import { FaqSearch } from './faq-search';

export const FaqSection: React.FC = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-anchor border-t border-border bg-[#F2EBE3]/35 py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <FaqSearch showHeader={true} />
      </div>
    </section>
  );
};
