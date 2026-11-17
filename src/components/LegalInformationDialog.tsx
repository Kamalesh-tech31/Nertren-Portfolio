import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  CONFIDENTIALITY_INFO,
  DISCLAIMER_BLOCKS,
  LEGAL_POLICIES,
} from '../data/firmData';

export type LegalSectionId = 'confidentiality' | 'disclaimer' | 'privacy' | 'terms';

export interface LegalSectionOption {
  id: LegalSectionId;
  label: string;
  shortLabel: string;
}

export const LEGAL_SECTIONS: LegalSectionOption[] = [
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
  initialSection?: string | null;
  onClose: () => void;
}

export const LegalInformationDialog: React.FC<LegalInformationDialogProps> = ({
  isOpen,
  initialSection,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<LegalSectionId>('confidentiality');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  // Manage body scroll lock and focus
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        document.body.style.overflow = originalOverflow;
        triggerElementRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Scroll to initial section when opening
  useEffect(() => {
    if (!isOpen) return;

    const targetId =
      initialSection && LEGAL_SECTIONS.some((s) => s.id === initialSection)
        ? (initialSection as LegalSectionId)
        : 'confidentiality';

    setActiveSection(targetId);

    const timer = setTimeout(() => {
      const targetElement = document.getElementById(`legal-section-${targetId}`);
      if (targetElement && contentAreaRef.current) {
        isScrollingProgrammatically.current = true;
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 600);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen, initialSection]);

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

  // Scroll spy to highlight active section in sidebar
  const handleContentScroll = () => {
    if (isScrollingProgrammatically.current || !contentAreaRef.current) return;

    const containerTop = contentAreaRef.current.getBoundingClientRect().top;
    const threshold = containerTop + 140;

    let current = activeSection;
    for (const sec of LEGAL_SECTIONS) {
      const el = document.getElementById(`legal-section-${sec.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = sec.id;
        }
      }
    }

    if (current !== activeSection) {
      setActiveSection(current);
    }
  };

  const handleNavClick = (sectionId: LegalSectionId) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(`legal-section-${sectionId}`);
    if (targetElement && contentAreaRef.current) {
      isScrollingProgrammatically.current = true;
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 600);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-3 sm:p-6 md:p-8 backdrop-blur-sm transition-opacity"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-heading"
        aria-describedby="legal-dialog-desc"
        className="relative flex w-full max-w-[1080px] flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[86vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-7 sm:py-5 bg-card shrink-0">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-primary">
              NERTREN LAW ASSOCIATES
            </p>
            <h2
              id="legal-dialog-heading"
              className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#49362D]"
            >
              Legal &amp; Professional Information
            </h2>
            <p
              id="legal-dialog-desc"
              className="mt-1 text-xs sm:text-sm text-muted-foreground"
            >
              Complete documentation on professional confidentiality, regulatory compliance, privacy, and website terms.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close legal information dialog"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {/* Mobile Horizontal Anchor Bar */}
        <div
          role="navigation"
          aria-label="Mobile Legal Document Navigation"
          className="flex md:hidden overflow-x-auto border-b border-border bg-muted/30 px-3 py-2 gap-1.5 shrink-0 scrollbar-none"
        >
          {LEGAL_SECTIONS.map((sec) => {
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleNavClick(sec.id)}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {sec.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Modal Body: Left Sticky Sidebar + Right Continuous Vertically Scrollable Document */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          {/* Left Sticky Sidebar on Desktop/Tablet (25-28% width) */}
          <nav
            aria-label="Legal document sidebar navigation"
            className="hidden md:flex w-64 lg:w-72 flex-col border-r border-border bg-muted/20 p-5 shrink-0 space-y-1.5"
          >
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A77C52]">
              Document Sections
            </p>
            {LEGAL_SECTIONS.map((sec) => {
              const isSelected = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    isSelected
                      ? 'border-l-3 border-[#76543D] bg-card font-semibold text-[#49362D] shadow-xs'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  <span className="leading-snug">{sec.label}</span>
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-[#76543D]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Content Area: One Continuous Document */}
          <main
            ref={contentAreaRef}
            onScroll={handleContentScroll}
            tabIndex={0}
            aria-label="Continuous legal document content"
            className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-12 bg-card focus-visible:outline-none scroll-smooth"
          >
            {/* Section 1: Confidentiality */}
            <section
              id="legal-section-confidentiality"
              aria-labelledby="legal-heading-confidentiality"
              className="space-y-4 scroll-mt-6"
            >
              <div className="border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A77C52]">
                  Section 01
                </span>
                <h3
                  id="legal-heading-confidentiality"
                  className="mt-1 text-2xl font-bold tracking-tight text-[#49362D]"
                >
                  Professional Standards &amp; Confidentiality
                </h3>
              </div>

              <div className="prose prose-brown max-w-none">
                <p className="text-base leading-relaxed text-[#49362D]">
                  {CONFIDENTIALITY_INFO.statement}
                </p>
              </div>
            </section>

            {/* Section 2: Website Disclaimer & BCI Compliance */}
            <section
              id="legal-section-disclaimer"
              aria-labelledby="legal-heading-disclaimer"
              className="space-y-4 scroll-mt-6 border-t border-border pt-10"
            >
              <div className="border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A77C52]">
                  Section 02
                </span>
                <h3
                  id="legal-heading-disclaimer"
                  className="mt-1 text-2xl font-bold tracking-tight text-[#49362D]"
                >
                  Website Disclaimer &amp; BCI Compliance
                </h3>
              </div>

              <div className="divide-y divide-border">
                {DISCLAIMER_BLOCKS.map((block) => (
                  <article key={block.title} className="py-4 sm:py-5 first:pt-0 last:pb-0 space-y-2">
                    <h4 className="text-base sm:text-lg font-semibold text-[#49362D]">
                      {block.title}
                    </h4>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#64748B]">
                      {block.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 3: Privacy Policy */}
            <section
              id="legal-section-privacy"
              aria-labelledby="legal-heading-privacy"
              className="space-y-4 scroll-mt-6 border-t border-border pt-10"
            >
              <div className="border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A77C52]">
                  Section 03
                </span>
                <h3
                  id="legal-heading-privacy"
                  className="mt-1 text-2xl font-bold tracking-tight text-[#49362D]"
                >
                  Information Practice &amp; Privacy Policy
                </h3>
              </div>

              <div className="prose prose-brown max-w-none">
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#64748B]">
                  {LEGAL_POLICIES.privacyPolicy.body}
                </p>
              </div>
            </section>

            {/* Section 4: Terms of Use */}
            <section
              id="legal-section-terms"
              aria-labelledby="legal-heading-terms"
              className="space-y-4 scroll-mt-6 border-t border-border pt-10"
            >
              <div className="border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A77C52]">
                  Section 04
                </span>
                <h3
                  id="legal-heading-terms"
                  className="mt-1 text-2xl font-bold tracking-tight text-[#49362D]"
                >
                  Terms of Use
                </h3>
              </div>

              <div className="prose prose-brown max-w-none">
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#64748B]">
                  {LEGAL_POLICIES.termsOfUse.body}
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
