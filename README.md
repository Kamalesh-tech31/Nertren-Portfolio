# Nertren Law Associates — Portfolio

An independent litigation and advisory practice portfolio for Nertren Law Associates, based in Tamil Nadu, India. The application is a single-page responsive informational website built to comply with Bar Council of India (BCI) rules.

---

## Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation & Motion:** Framer Motion
- **Icons:** Lucide React & Hugeicons
- **Design System:** shadcn-inspired accessible component architecture

---

## Sections Included

1. **Home Section:** Hero presentation with firm location and Bento Grid showcasing geographical presence and professional foundations.
2. **About the Firm:** Firm history, sole proprietorship governance, Bar Council of India compliance statement, and 8-card Professional Approach Carousel.
3. **Advocate Profiles:** 3D perspective carousel and detail modals for Adv. T. Kavin Kumar (Founder), Adv. V. Pavithra (Associate Counsel), and Adv. Malathi A (Associate Counsel).
4. **Client Engagement Journey:** 7-stage chronological engagement timeline from initial consultation to matter closure.
5. **Courts & Jurisdiction:** 6 jurisdictional forum profiles covering Madras High Court, District Courts, Tribunals, Statutory Forums, and IP/Waqf boards.
6. **Confidentiality:** Advocate-client privilege and non-disclosure standards.
7. **Website Disclaimer & BCI Compliance Notice:** Regulatory disclosure articles adhering to Bar Council of India Rules.
8. **Privacy Policy & Terms of Use:** Information handling and terms of website access.
9. **Frequently Asked Questions (FAQ):** Accordion-style categorized practice, internship, and professional inquiries.
10. **Mega Footer:** Comprehensive office contact info, jurisdiction reference, quick anchors, and copyright.

---

## Prerequisites

- **Node.js:** v18.0.0 or higher (tested on Node v22.20.0)
- **npm:** v9.0.0 or higher (or compatible package manager)

---

## Installation & Setup

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd "Nertren Portfolio"
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Or `bun install` if running in an environment with Bun installed)*

3. Environment Variables (Optional):
   Copy `.env.example` to `.env.local` if configuring optional external API services or the production domain:
   ```bash
   cp .env.example .env.local
   ```

---

## Available Scripts

- **`npm run dev`**: Starts the Vite local development server on `http://localhost:3000/`.
- **`npm run build`**: Runs the production build outputting to the `dist/` directory with automated SEO asset generation.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs TypeScript type checking (`tsc --noEmit`).
- **`cmd /c npx tsx --test src/utils/*.test.ts`**: Runs all automated unit tests (navigation, firm data integrity, and technical SEO validation).

---

## SEO & Search Engine Configuration

The project features a domain-independent, configurable technical SEO foundation tailored for a professional legal practice adhering to Bar Council of India rules.

### 1. SEO Files Added & Modified
- **`index.html`**: Factual metadata including primary page title (`Nertren Law Associates | Independent Litigation & Advisory Practice`), concise meta description, viewport, `robots: index, follow`, theme colour (`#49362D`), Open Graph tags, and Twitter Card declarations.
- **`public/favicon.svg`**: Vector-crisp brand monogram icon styled in firm deep cocoa and pale sand colours.
- **`public/robots.txt`**: Base crawler rules allowing legitimate search engines to crawl public pages without blocking CSS, JavaScript, or images.
- **`src/utils/seo.ts`**: Pure utilities for URL validation, crawler directives, single-page XML sitemap generation, and Schema.org `LegalService` structured data.
- **`src/utils/seo.test.ts`**: Comprehensive automated unit test suite verifying URL parsing, robots directives, sitemap XML format, and JSON-LD schema validity.
- **`vite.config.ts`**: Integrated `seoPlugin()` that dynamically injects canonical tags, social metadata, and Schema.org JSON-LD, while generating `dist/robots.txt` and `dist/sitemap.xml` upon production build.

### 2. Centralised Domain Configuration (`VITE_SITE_URL`)
The domain setup is controlled by a single environment variable:
```env
VITE_SITE_URL=https://www.nertren.in
```

- **When `VITE_SITE_URL` is empty or unconfigured (Default)**:
  - No invalid canonical tag or placeholder domain is rendered.
  - Social tags and Schema.org JSON-LD omit external URL properties while retaining verified factual firm details.
  - `dist/robots.txt` outputs valid crawl directives without a `Sitemap:` line.
  - No `sitemap.xml` with placeholder domains is generated.
  - The build logs an informative build warning reminding you that the production URL has not yet been set.

- **When `VITE_SITE_URL` is set to a valid HTTPS domain**:
  - Automatically injects `<link rel="canonical" href="https://<your-domain>/" />`.
  - Injects absolute Open Graph (`og:url`, `og:image`) and Twitter Card image URLs pointing to `/images/law-office.png`.
  - Automatically generates `dist/sitemap.xml` referencing the genuine root URL (`<loc>https://<your-domain>/</loc>`).
  - Appends `Sitemap: https://<your-domain>/sitemap.xml` to `dist/robots.txt`.
  - Adds the canonical website URL and image URL to the Schema.org `LegalService` structured data.

### 3. What to Update After Purchasing the Custom Domain
1. When the custom domain is acquired (e.g. `https://www.nertren.in`):
   - Set `VITE_SITE_URL=https://www.nertren.in` in your deployment environment variables (e.g., Netlify, Vercel, Cloud Run, GitHub Actions, or `.env.local`).
2. Run the production build (`npm run build`).
3. Deploy the resulting `dist/` directory.

### 4. Google Search Console Setup & Sitemap Submission
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Add your custom domain as a property (either **Domain** verification via DNS TXT record or **URL prefix** verification via HTML tag/file).
3. Once ownership is verified, navigate to the **Sitemaps** section in the left sidebar.
4. Under *Add a new sitemap*, enter `sitemap.xml` (e.g., `https://www.nertren.in/sitemap.xml`).
5. Click **Submit**. Google will process the sitemap and index the firm's single-page web presence.

---

## Project Structure

```text
├── .env.example             # Template for environment variables (including VITE_SITE_URL)
├── .gitignore               # Git exclusion patterns
├── index.html               # Main HTML entry point with complete SEO & social meta
├── metadata.json            # Application metadata
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build, server, and technical SEO plugin
├── public/
│   ├── favicon.svg          # Brand monogram favicon in SVG format
│   ├── robots.txt           # Base crawler directives
│   └── images/              # Verified local photo assets
│       ├── law-office.png   # Law office photograph (hero & social sharing image)
│       ├── advocates/       # Portrait photographs for the 3 advocate profiles
│       └── approach/        # Photographic assets for the 8 approach principles
├── src/
│   ├── App.tsx              # Main application component assembling all sections
│   ├── index.css            # Global Tailwind CSS 4 theme and base styles
│   ├── main.tsx             # React root mounting point
│   ├── components/          # Page sections & UI components
│   │   ├── AboutSection.tsx
│   │   ├── AdvocateProfiles.tsx
│   │   ├── ClientEngagement.tsx
│   │   ├── CourtsSection.tsx
│   │   ├── DisclaimerGate.tsx
│   │   ├── faq-search.tsx
│   │   ├── FaqSection.tsx
│   │   ├── feature-bento.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomeSection.tsx
│   │   ├── journey-timeline.tsx
│   │   ├── LegalInformationDialog.tsx
│   │   ├── Navbar.tsx
│   │   ├── perspective-carousel.tsx
│   │   ├── SectionHeader.tsx
│   │   └── ui/
│   ├── data/
│   │   └── firmData.ts      # Structured firm records, advocates, FAQs, timeline data
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn / clsx merge)
│   └── utils/
│       ├── navigation.ts    # Navigation logic, scroll state, timeline calculations
│       ├── navigation.test.ts # Automated unit tests for navigation and data integrity
│       ├── seo.ts           # Technical SEO utilities (URL validation, sitemap, robots, schema)
│       └── seo.test.ts      # Automated unit tests for technical SEO utilities
```
