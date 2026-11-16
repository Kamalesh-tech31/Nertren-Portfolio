import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ALL_SECTION_IDS,
  LEGAL_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  computeNavbarVisibility,
  getActiveSectionId,
  mapActivePrimaryNavId,
} from '../utils/navigation';
import type { LegalTabId } from './LegalInformationDialog';

export interface NavbarProps {
  onOpenLegalModal?: (tab: LegalTabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLegalModal }) => {
  const [visible, setVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeNavId, setActiveNavId] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const prevScrollYRef = useRef(0);
  const visibleRef = useRef(true);
  const isMenuOpenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (isMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const resolveActiveSectionFromScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 80) {
        setActiveNavId('home');
        return;
      }

      const positions = ALL_SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.getBoundingClientRect().top + currentY : Number.POSITIVE_INFINITY,
        };
      }).filter((item) => Number.isFinite(item.top));

      const rawActive = getActiveSectionId(positions, currentY, 150);
      setActiveNavId(mapActivePrimaryNavId(rawActive));
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const result = computeNavbarVisibility({
        currentScrollY: currentY,
        previousScrollY: prevScrollYRef.current,
        currentlyVisible: visibleRef.current,
        isMenuOpen: isMenuOpenRef.current,
      });

      prevScrollYRef.current = result.nextPreviousScrollY;
      if (visibleRef.current !== result.visible) {
        visibleRef.current = result.visible;
        setVisible(result.visible);
      }
      setHasScrolled(result.hasScrolled);
      resolveActiveSectionFromScroll();
    };

    const visibleElements = new Set<string>();
    let observer: IntersectionObserver | null = null;

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibleElements.add(entry.target.id);
            } else {
              visibleElements.delete(entry.target.id);
            }
          }

          if (window.scrollY <= 80) {
            setActiveNavId('home');
            return;
          }

          if (visibleElements.size > 0) {
            const orderedFirst = ALL_SECTION_IDS.find((id) => visibleElements.has(id));
            if (orderedFirst) {
              setActiveNavId(mapActivePrimaryNavId(orderedFirst));
            }
          }
        },
        {
          rootMargin: '-22% 0px -55% 0px',
          threshold: [0, 0.1],
        }
      );

      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resolveActiveSectionFromScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resolveActiveSectionFromScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const handleLegalLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tabId: string
  ) => {
    event.preventDefault();
    setIsMenuOpen(false);
    if (onOpenLegalModal) {
      onOpenLegalModal(tabId as LegalTabId);
    }
  };

  return (
    <>
      <header
        data-visible={visible ? 'true' : 'false'}
        className={cn(
          'pointer-events-none fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 transition-transform duration-300 ease-out',
          visible ? 'translate-y-0' : '-translate-y-[calc(100%+1.5rem)]'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 sm:gap-6 rounded-full border border-border bg-card/95 px-5 sm:px-7 backdrop-blur-sm transition-shadow duration-200',
            hasScrolled || isMenuOpen
              ? 'shadow-[0_4px_20px_rgba(56,47,41,0.08)]'
              : 'shadow-[0_2px_10px_rgba(56,47,41,0.04)]'
          )}
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-serif text-[13px] sm:text-[15px] font-semibold tracking-[0.07em] text-foreground whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            NERTREN LAW ASSOCIATES
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-4 xl:gap-5"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative whitespace-nowrap shrink-0 py-1.5 text-[12.5px] xl:text-[13px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground/75 hover:text-foreground'
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary transition-opacity duration-200',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-40 bg-background pt-24 pb-10 px-6 overflow-y-auto lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="mx-auto max-w-lg">
            <ul className="divide-y divide-border border-t border-b border-border">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeNavId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex min-h-[48px] items-center justify-between py-3 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                        isActive
                          ? 'text-foreground font-semibold'
                          : 'text-foreground/80 hover:text-foreground'
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-xs font-medium tracking-[0.12em] uppercase text-primary">
                          Active
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-2">
              <p className="mb-3 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                Legal &amp; Compliance
              </p>
              <ul className="divide-y divide-border border-t border-b border-border">
                {LEGAL_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLegalLinkClick(e, item.id)}
                      className="flex min-h-[44px] items-center py-2.5 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
