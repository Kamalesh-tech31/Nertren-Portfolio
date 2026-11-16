import React from 'react';

interface SectionHeaderProps {
  headingId?: string;
  sectionNumber: string;
  label: string;
  title: string;
  lead?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  headingId,
  sectionNumber,
  label,
  title,
  lead,
}) => {
  return (
    <div className="mb-10 sm:mb-12 border-b border-border pb-6 sm:pb-8">
      <p className="mb-3 text-xs font-medium tracking-[0.16em] uppercase text-primary tabular-nums">
        {sectionNumber} <span aria-hidden="true">·</span> {label}
      </p>
      <h2
        id={headingId}
        className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}
    </div>
  );
};
