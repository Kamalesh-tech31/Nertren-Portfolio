import React from 'react';

interface SectionHeaderProps {
  headingId?: string;
  sectionNumber?: string;
  label?: string;
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
    <div className="mb-7 sm:mb-8 border-b border-border pb-4 sm:pb-5">
      {label ? (
        <p className="mb-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-primary tabular-nums">
          {sectionNumber ? `${sectionNumber} · ` : ''}{label}
        </p>
      ) : null}
      <h2
        id={headingId}
        className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}
    </div>
  );
};
