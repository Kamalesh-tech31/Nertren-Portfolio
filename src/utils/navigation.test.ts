import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRIMARY_NAV_ITEMS,
  LEGAL_NAV_ITEMS,
  computeNavbarVisibility,
  getActiveSectionId,
  mapActivePrimaryNavId,
  computeTimelineProgress,
  getTimelineStepState,
} from './navigation';
import {
  ADVOCATES,
  ADVOCATE_PHOTO_MAPPING,
  APPROACH_CARDS,
  COURTS_CARDS,
  FAQ_CATEGORIES,
  ENGAGEMENT_STAGES,
  OFFICE_CONTACT,
  DISCLAIMER_BLOCKS,
} from '../data/firmData';

test('navigation has exact 7 required primary items and 3 legal compliance items', () => {
  assert.equal(PRIMARY_NAV_ITEMS.length, 7);
  assert.deepEqual(
    PRIMARY_NAV_ITEMS.map((item) => ({ id: item.id, label: item.label })),
    [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'advocates', label: 'Advocates' },
      { id: 'client-engagement', label: 'Engagement' },
      { id: 'courts', label: 'Courts' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ]
  );
  assert.equal(LEGAL_NAV_ITEMS.length, 3);
});

test('navbar stays visible near top of page regardless of scroll direction', () => {
  const res = computeNavbarVisibility({
    currentScrollY: 30,
    previousScrollY: 10,
    currentlyVisible: true,
    isMenuOpen: false,
  });
  assert.equal(res.visible, true);
  assert.equal(res.hasScrolled, true);
});

test('navbar hides when scrolling downward past threshold and reappears when scrolling upward', () => {
  const scrollDown = computeNavbarVisibility({
    currentScrollY: 280,
    previousScrollY: 200,
    currentlyVisible: true,
    isMenuOpen: false,
  });
  assert.equal(scrollDown.visible, false);
  assert.equal(scrollDown.nextPreviousScrollY, 280);

  const minorJitter = computeNavbarVisibility({
    currentScrollY: 284,
    previousScrollY: 280,
    currentlyVisible: false,
    isMenuOpen: false,
  });
  assert.equal(minorJitter.visible, false);

  const scrollUp = computeNavbarVisibility({
    currentScrollY: 240,
    previousScrollY: 280,
    currentlyVisible: false,
    isMenuOpen: false,
  });
  assert.equal(scrollUp.visible, true);
  assert.equal(scrollUp.nextPreviousScrollY, 240);
});

test('navbar remains visible when mobile menu is open even during scroll', () => {
  const res = computeNavbarVisibility({
    currentScrollY: 400,
    previousScrollY: 100,
    currentlyVisible: false,
    isMenuOpen: true,
  });
  assert.equal(res.visible, true);
});

test('getActiveSectionId resolves current section accurately based on scroll offset', () => {
  const positions = [
    { id: 'home', top: 0 },
    { id: 'about', top: 640 },
    { id: 'advocates', top: 1280 },
    { id: 'faq', top: 3200 },
    { id: 'contact', top: 4100 },
  ];

  assert.equal(getActiveSectionId(positions, 0), 'home');
  assert.equal(getActiveSectionId(positions, 540), 'about');
  assert.equal(getActiveSectionId(positions, 1200), 'advocates');
  assert.equal(getActiveSectionId(positions, 3500), 'faq');
  assert.equal(getActiveSectionId(positions, 4200), 'contact');
});

test('mapActivePrimaryNavId handles primary and legal disclosure sections cleanly', () => {
  assert.equal(mapActivePrimaryNavId('faq'), 'faq');
  assert.equal(mapActivePrimaryNavId('contact'), 'contact');
  assert.equal(mapActivePrimaryNavId('disclaimer'), '');
});

test('timeline progress and step state compute accurately across 7 stages', () => {
  assert.equal(computeTimelineProgress(-1, 7), 0);
  assert.equal(
    Number(computeTimelineProgress(0, 7).toFixed(2)),
    Number(((0.5 / 7) * 100).toFixed(2))
  );
  assert.equal(
    Number(computeTimelineProgress(6, 7).toFixed(2)),
    Number(((6.5 / 7) * 100).toFixed(2))
  );

  assert.equal(getTimelineStepState(0, 3, 3), 'completed');
  assert.equal(getTimelineStepState(3, 3, 3), 'active');
  assert.equal(getTimelineStepState(4, 3, 3), 'upcoming');
});

test('firm data preserves exact factual records, six court cards, and nine FAQs', () => {
  assert.equal(ADVOCATES.length, 3);
  assert.equal(ADVOCATES[0].enrolmentNumber, 'M.S.3172/2021');
  assert.equal(ADVOCATES[1].enrolmentNumber, 'M.S.738/2022');
  assert.equal(ADVOCATES[2].enrolmentNumber, 'M.S.167/2024');
  assert.equal(Object.keys(ADVOCATE_PHOTO_MAPPING).length, 3);
  assert.ok(ADVOCATES.every((a) => a.imageSrc.startsWith('/images/advocates/')));
  assert.equal(APPROACH_CARDS.length, 8);
  assert.equal(COURTS_CARDS.length, 6);
  assert.equal(ENGAGEMENT_STAGES.length, 7);
  assert.equal(OFFICE_CONTACT.email, 'advocates@nertren.in');
  assert.equal(OFFICE_CONTACT.mobile, '09688775599');
  assert.equal(DISCLAIMER_BLOCKS.length, 5);
  assert.equal(FAQ_CATEGORIES.length, 3);
  assert.equal(
    FAQ_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0),
    9
  );
});
