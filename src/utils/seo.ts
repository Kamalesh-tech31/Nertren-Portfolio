import { OFFICE_CONTACT } from '../data/firmData.ts';

/**
 * Validates and normalises a production site URL.
 * Rejects empty strings, whitespace, localhost, and non-http(s) protocols.
 * Strips any trailing slashes to guarantee clean canonical concatenation.
 */
export function validateSiteUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    // Disallow local or private development hosts as production canonical domains
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.local') ||
      hostname === '0.0.0.0'
    ) {
      return null;
    }
    // Return protocol + host + pathname (without trailing slash)
    const normalized = `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(/\/+$/, '');
    return normalized;
  } catch {
    return null;
  }
}

/**
 * Generates the content for robots.txt.
 * Includes the Sitemap directive only if a valid production site URL is provided.
 */
export function generateRobotsTxt(siteUrl?: string | null): string {
  const validUrl = validateSiteUrl(siteUrl);
  const lines = [
    '# robots.txt for Nertren Law Associates',
    '# Allow all legitimate search engine crawlers access to public content',
    'User-agent: *',
    'Allow: /',
  ];

  if (validUrl) {
    lines.push('', `# XML Sitemap directive`, `Sitemap: ${validUrl}/sitemap.xml`);
  }

  return `${lines.join('\n')}\n`;
}

/**
 * Generates sitemap.xml.
 * Returns null if no valid production URL is configured (preventing placeholder / fake domains).
 * For a single-page website, index only the canonical root URL without in-page section hashes.
 */
export function generateSitemapXml(siteUrl?: string | null): string | null {
  const validUrl = validateSiteUrl(siteUrl);
  if (!validUrl) return null;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${validUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export interface LegalServiceStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  areaServed: Array<{
    '@type': string;
    name: string;
  }>;
  url?: string;
  image?: string;
}

/**
 * Generates Schema.org LegalService structured data using only verified firm facts.
 * Omits 'url' and 'image' when no valid production URL is supplied.
 */
export function generateStructuredData(siteUrl?: string | null): LegalServiceStructuredData {
  const validUrl = validateSiteUrl(siteUrl);

  const data: LegalServiceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Nertren Law Associates',
    description:
      'Independent litigation and advisory law practice based in Tamil Nadu, India, representing individuals, businesses, and institutions before courts, tribunals, and statutory authorities.',
    email: OFFICE_CONTACT.email,
    telephone: '+91-9688775599',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '190/3, NTK Complex, Gobi Main Road',
      addressLocality: 'Erode District',
      addressRegion: 'Tamil Nadu',
      postalCode: '638458',
      addressCountry: 'IN',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Tamil Nadu',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
  };

  if (validUrl) {
    data.url = `${validUrl}/`;
    data.image = `${validUrl}/images/law-office.png`;
  }

  return data;
}
