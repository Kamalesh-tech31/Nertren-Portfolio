export interface NavItem {
  id: string;
  label: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'advocates', label: 'Advocates' },
  { id: 'client-engagement', label: 'Engagement' },
  { id: 'courts', label: 'Courts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const LEGAL_NAV_ITEMS: NavItem[] = [
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'disclaimer', label: 'Website Disclaimer & BCI Compliance Notice' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Use' },
];

export const ALL_SECTION_IDS: string[] = [
  'home',
  'about',
  'advocates',
  'client-engagement',
  'courts',
  'faq',
  'contact',
];

export interface ScrollStateInput {
  currentScrollY: number;
  previousScrollY: number;
  currentlyVisible: boolean;
  isMenuOpen: boolean;
  topThreshold?: number;
  deltaThreshold?: number;
}

export interface ScrollStateOutput {
  visible: boolean;
  hasScrolled: boolean;
  nextPreviousScrollY: number;
}

export function computeNavbarVisibility({
  currentScrollY,
  previousScrollY,
  currentlyVisible,
  isMenuOpen,
  topThreshold = 48,
  deltaThreshold = 8,
}: ScrollStateInput): ScrollStateOutput {
  const safeCurrentY = Math.max(0, currentScrollY);
  const hasScrolled = safeCurrentY > 12;

  if (isMenuOpen || safeCurrentY <= topThreshold) {
    return {
      visible: true,
      hasScrolled,
      nextPreviousScrollY: safeCurrentY,
    };
  }

  const delta = safeCurrentY - previousScrollY;

  if (Math.abs(delta) < deltaThreshold) {
    return {
      visible: currentlyVisible,
      hasScrolled,
      nextPreviousScrollY: previousScrollY,
    };
  }

  return {
    visible: delta < 0,
    hasScrolled,
    nextPreviousScrollY: safeCurrentY,
  };
}

export interface SectionPosition {
  id: string;
  top: number;
}

export function getActiveSectionId(
  sections: SectionPosition[],
  scrollY: number,
  headerOffset = 128
): string {
  if (sections.length === 0) {
    return 'home';
  }

  const sorted = [...sections].sort((a, b) => a.top - b.top);
  const targetY = Math.max(0, scrollY) + headerOffset;

  let activeId = sorted[0].id;
  for (const section of sorted) {
    if (section.top <= targetY) {
      activeId = section.id;
    } else {
      break;
    }
  }

  return activeId;
}

export function mapActivePrimaryNavId(activeSectionId: string): string {
  const isPrimary = PRIMARY_NAV_ITEMS.some((item) => item.id === activeSectionId);
  if (isPrimary) {
    return activeSectionId;
  }
  return '';
}

export type TimelineStepState = 'completed' | 'active' | 'upcoming';

export function computeTimelineProgress(
  reachedIndex: number,
  totalSteps: number
): number {
  if (totalSteps <= 0 || reachedIndex < 0) {
    return 0;
  }
  const clamped = Math.min(reachedIndex, totalSteps - 1);
  return Math.min(100, ((clamped + 0.5) / totalSteps) * 100);
}

export function getTimelineStepState(
  stepIndex: number,
  reachedIndex: number,
  activeIndex: number
): TimelineStepState {
  if (stepIndex === activeIndex) {
    return 'active';
  }
  if (stepIndex <= reachedIndex) {
    return 'completed';
  }
  return 'upcoming';
}
