import React from 'react';
import { FIRM_INFO, OFFICE_CONTACT } from '../data/firmData';
import { LEGAL_NAV_ITEMS, PRIMARY_NAV_ITEMS } from '../utils/navigation';
import type { LegalTabId } from './LegalInformationDialog';

export interface FooterProps {
  onOpenLegalModal?: (tab: LegalTabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const handleLegalItemClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    tabId: string
  ) => {
    event.preventDefault();
    if (onOpenLegalModal) {
      onOpenLegalModal(tabId as LegalTabId);
    }
  };

  return (
    <footer className="border-t border-border bg-background pt-12 pb-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-8 border-b border-border">
          <div className="min-w-0 sm:col-span-2 lg:col-span-4 space-y-4">
            <p className="font-serif text-2xl font-semibold text-foreground">
              {FIRM_INFO.name}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              An independent litigation and advisory law practice based in Tamil Nadu, India, representing clients before courts, tribunals, and statutory authorities.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-2">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-primary">
              Sections
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-primary">
              Legal &amp; Compliance
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLegalItemClick(e, item.id)}
                    className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="contact"
            className="section-anchor min-w-0 sm:col-span-2 lg:col-span-3 space-y-3 text-sm"
          >
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-primary">
              Office
            </h2>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {OFFICE_CONTACT.officeLabel}
              </p>
              <p className="mt-1 leading-relaxed text-foreground">
                {OFFICE_CONTACT.fullAddress}
              </p>
            </div>
            <p className="break-words">
              <span className="text-muted-foreground">Email: </span>
              <a
                href={`mailto:${OFFICE_CONTACT.email}`}
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {OFFICE_CONTACT.email}
              </a>
            </p>
            <p className="tabular-nums">
              <span className="text-muted-foreground">Mobile: </span>
              <a
                href={`tel:${OFFICE_CONTACT.mobile}`}
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {OFFICE_CONTACT.mobile}
              </a>
            </p>
            <p className="break-words">
              <span className="text-muted-foreground">Website: </span>
              <a
                href={OFFICE_CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {OFFICE_CONTACT.website}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nertren Law Associates. All rights reserved.</p>
          <p>Informational portfolio of Nertren Law Associates.</p>
        </div>
      </div>
    </footer>
  );
};
