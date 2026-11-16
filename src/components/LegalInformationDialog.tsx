import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Scale, FileText, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CONFIDENTIALITY_INFO,
  DISCLAIMER_BLOCKS,
  LEGAL_POLICIES,
} from '../data/firmData';

export type LegalTabId = 'confidentiality' | 'disclaimer' | 'privacy' | 'terms';

export interface LegalTabOption {
  id: LegalTabId;
  label: string;
  shortLabel: string;
}

export const LEGAL_TABS: LegalTabOption[] = [
  {
    id: 'confidentiality',
    label: 'Confidentiality',
    shortLabel: 'Confidentiality',
  },
  {
    id: 'disclaimer',
    label: 'Website Disclaimer & BCI Compliance',
    shortLabel: 'BCI Disclaimer',
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    shortLabel: 'Privacy Policy',
  },
  {
    id: 'terms',
    label: 'Terms of Use',
    shortLabel: 'Terms of Use',
  },
];

export interface LegalInformationDialogProps {
  isOpen: boolean;
  activeTab: LegalTabId;
  onClose: () => void;
  onTabChange: (tab: LegalTabId) => void;
}

export const LegalInformationDialog: React.FC<LegalInformationDialogProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  // Capture trigger element before modal opens, manage scroll lock and focus
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        document.body.style.overflow = originalOverflow;
        triggerElementRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Scroll content area back to top when active tab changes
  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6 md:p-8 backdrop-blur-sm transition-opacity"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-heading"
        aria-describedby="legal-dialog-desc"
        className="relative flex w-full max-w-4xl flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-7 sm:py-5 bg-card shrink-0">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-primary">
              NERTREN LAW ASSOCIATES
            </p>
            <h2
              id="legal-dialog-heading"
              className="mt-1 font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground"
            >
              LEGAL &amp; PROFESSIONAL INFORMATION
            </h2>
            <p
              id="legal-dialog-desc"
              className="mt-1 text-xs sm:text-sm text-muted-foreground"
            >
              Information regarding professional confidentiality, website disclaimers, privacy and terms of use.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close legal and professional information dialog"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {/* Mobile Horizontal Tabs Selector */}
        <div
          role="tablist"
          aria-label="Legal Sections Navigation"
          className="flex md:hidden overflow-x-auto border-b border-border bg-muted/30 px-3 py-2 gap-1.5 shrink-0 scrollbar-none"
        >
          {LEGAL_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`legal-tab-mobile-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`legal-panel-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {tab.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Modal Body: Two-column layout on Desktop/Tablet */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar on Desktop */}
          <nav
            role="tablist"
            aria-label="Legal document navigation"
            className="hidden md:flex w-64 lg:w-72 flex-col border-r border-border bg-muted/20 p-4 shrink-0 space-y-1.5"
          >
            {LEGAL_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`legal-tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`legal-panel-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    isSelected
                      ? 'border-l-2 border-primary bg-card font-semibold text-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  <span className="leading-snug">{tab.label}</span>
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-primary"
                    />
                  )}
                </button>
              );
            })}

            <div className="mt-auto pt-6 border-t border-border/70 text-xs text-muted-foreground leading-relaxed px-2">
              <p>
                All legal statements comply with the Bar Council of India Rules.
              </p>
            </div>
          </nav>

          {/* Right Content Area: Independently Scrollable */}
          <main
            ref={contentAreaRef}
            tabIndex={0}
            aria-label="Legal section document content"
            className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-8 bg-card focus-visible:outline-none"
          >
            {activeTab === 'confidentiality' && (
              <section
                id="legal-panel-confidentiality"
                role="tabpanel"
                aria-labelledby="legal-tab-confidentiality"
                className="space-y-6 max-w-2xl"
              >
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Lock className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-primary">
                      Section 01 · Professional Standards
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                      {CONFIDENTIALITY_INFO.heading}
                    </h3>
                  </div>
                </div>

                <div className="prose prose-brown max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                    {CONFIDENTIALITY_INFO.statement}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Advocate-client communications are privileged under Indian law, subject strictly to ethical obligations and legal procedure.
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'disclaimer' && (
              <section
                id="legal-panel-disclaimer"
                role="tabpanel"
                aria-labelledby="legal-tab-disclaimer"
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Scale className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-primary">
                      Section 02 · Regulatory Disclosures
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                      Website Disclaimer &amp; BCI Compliance
                    </h3>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {DISCLAIMER_BLOCKS.map((block) => (
                    <article key={block.title} className="py-5 first:pt-0 last:pb-0 space-y-2">
                      <h4 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                        {block.title}
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {block.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'privacy' && (
              <section
                id="legal-panel-privacy"
                role="tabpanel"
                aria-labelledby="legal-tab-privacy"
                className="space-y-6 max-w-2xl"
              >
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-primary">
                      Section 03 · Information Practice
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                      {LEGAL_POLICIES.privacyPolicy.title}
                    </h3>
                  </div>
                </div>

                <div className="prose prose-brown max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {LEGAL_POLICIES.privacyPolicy.body}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Note: This statement represents the firm’s currently documented privacy practice. Further specific notices may apply upon entering into a formal client engagement.
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'terms' && (
              <section
                id="legal-panel-terms"
                role="tabpanel"
                aria-labelledby="legal-tab-terms"
                className="space-y-6 max-w-2xl"
              >
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <FileText className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-primary">
                      Section 04 · Website Terms
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                      {LEGAL_POLICIES.termsOfUse.title}
                    </h3>
                  </div>
                </div>

                <div className="prose prose-brown max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {LEGAL_POLICIES.termsOfUse.body}
                  </p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
