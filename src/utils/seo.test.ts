import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateSiteUrl,
  generateRobotsTxt,
  generateSitemapXml,
  generateStructuredData,
} from './seo';

test('validateSiteUrl accepts clean absolute HTTPS production URLs', () => {
  assert.equal(validateSiteUrl('https://www.nertren.in'), 'https://www.nertren.in');
  assert.equal(validateSiteUrl('https://www.nertren.in/'), 'https://www.nertren.in');
  assert.equal(validateSiteUrl('  https://nertrenlaw.com  '), 'https://nertrenlaw.com');
  assert.equal(validateSiteUrl('https://legal.example.com/law'), 'https://legal.example.com/law');
});

test('validateSiteUrl rejects empty values, whitespace, localhost, and non-http URLs', () => {
  assert.equal(validateSiteUrl(''), null);
  assert.equal(validateSiteUrl('   '), null);
  assert.equal(validateSiteUrl(undefined), null);
  assert.equal(validateSiteUrl(null), null);
  assert.equal(validateSiteUrl('localhost'), null);
  assert.equal(validateSiteUrl('http://localhost:3000'), null);
  assert.equal(validateSiteUrl('http://127.0.0.1:3000'), null);
  assert.equal(validateSiteUrl('ftp://example.com'), null);
  assert.equal(validateSiteUrl('just-a-string'), null);
});

test('generateRobotsTxt outputs valid directives without sitemap when URL unconfigured', () => {
  const robots = generateRobotsTxt();
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(!robots.includes('Sitemap:'));
});

test('generateRobotsTxt includes sitemap directive when valid production URL configured', () => {
  const robots = generateRobotsTxt('https://www.nertren.in');
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Sitemap: https://www.nertren.in/sitemap.xml'));
});

test('generateSitemapXml returns null when URL unconfigured to prevent placeholder domains', () => {
  assert.equal(generateSitemapXml(), null);
  assert.equal(generateSitemapXml(''), null);
  assert.equal(generateSitemapXml('http://localhost:3000'), null);
});

test('generateSitemapXml produces valid single-page XML sitemap when valid URL provided', () => {
  const sitemap = generateSitemapXml('https://www.nertren.in');
  assert.ok(sitemap);
  assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(sitemap.includes('<loc>https://www.nertren.in/</loc>'));
  // Single page website: must NOT include in-page hash anchors
  assert.ok(!sitemap.includes('#'));
});

test('generateStructuredData includes verified LegalService details and conditions URL', () => {
  const unconfiguredData = generateStructuredData();
  assert.equal(unconfiguredData['@type'], 'LegalService');
  assert.equal(unconfiguredData.name, 'Nertren Law Associates');
  assert.equal(unconfiguredData.email, 'advocates@nertren.in');
  assert.equal(unconfiguredData.telephone, '+91-9688775599');
  assert.equal(unconfiguredData.address.streetAddress, '190/3, NTK Complex, Gobi Main Road');
  assert.equal(unconfiguredData.address.addressLocality, 'Erode District');
  assert.equal(unconfiguredData.address.addressRegion, 'Tamil Nadu');
  assert.equal(unconfiguredData.address.postalCode, '638458');
  assert.equal(unconfiguredData.address.addressCountry, 'IN');
  assert.equal(unconfiguredData.url, undefined);
  assert.equal(unconfiguredData.image, undefined);

  // Serializes to valid JSON without error
  const unconfiguredJson = JSON.stringify(unconfiguredData);
  assert.doesNotThrow(() => JSON.parse(unconfiguredJson));

  const configuredData = generateStructuredData('https://www.nertren.in');
  assert.equal(configuredData.url, 'https://www.nertren.in/');
  assert.equal(configuredData.image, 'https://www.nertren.in/images/law-office.png');
  const configuredJson = JSON.stringify(configuredData);
  assert.doesNotThrow(() => JSON.parse(configuredJson));
});
