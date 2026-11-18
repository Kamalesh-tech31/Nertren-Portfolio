# Nertren Law Associates — Portfolio Website

A responsive portfolio website for **Nertren Law Associates**, an independent litigation and advisory law practice based in Tamil Nadu, India. The site presents the firm, its professional approach, associated advocates, client-engagement process, court and forum presence, and visitor information in a restrained, professional interface.

> This website is an informational portfolio. Its content is not legal advice and does not, by itself, create an advocate–client relationship.

## Overview

The website is designed to make the firm's profile and publicly approved information easy to explore. It uses a warm legal-office visual identity built around **white and off-white surfaces, bronze and brown accents, and slate text**, with **Manrope** as the primary typeface.

## Website Sections

### Home / Hero
- Full-width photographic hero with the firm's identity and a concise practice description.
- Floating navigation for moving between the main sections.
- Brief location and court-presence highlights.

### About the Firm
- Introduces Nertren Law Associates as a sole-proprietorship practice founded by Advocate Kavin Kumar.
- Summarises the firm's stated approach to litigation and advisory work.
- Includes an eight-item professional-approach carousel:

1. Meticulous preparation
2. Comprehensive legal research
3. Careful assessment of facts
4. Procedural compliance
5. Strategic advocacy
6. Individual attention to every matter
7. Professional accountability
8. Transparency and timely updates

### Advocates
- Presents the three professionals associated with the firm:
  - **Adv. T. Kavin Kumar** — Founder & Proprietor
  - **Adv. V. Pavithra** — Associate Counsel
  - **Adv. Malathi A** — Associate Counsel
- Uses an interactive profile carousel and profile-detail popup.
- Enrollment details are shown in the relevant profile details rather than used as decorative labels on the card fronts.

### Client Engagement
A seven-stage timeline explains the firm's stated matter-engagement process:

1. Initial consultation
2. Document review and conflict assessment
3. Legal assessment and strategic advice
4. Drafting and filing
5. Court representation
6. Periodic updates
7. Matter closure

The timeline uses a scroll-responsive progress path and highlighted stage markers. Formal representation is described as commencing only after the conflict check is cleared, professional engagement is accepted, and applicable requirements are met.

### Courts & Jurisdiction
The section groups the firm's stated appearances and work across six areas:

- High Court of Judicature at Madras
- District and subordinate courts across Tamil Nadu
- Courts and tribunals in Chennai
- Statutory authorities and quasi-judicial forums
- Intellectual-property-related forums
- Waqf and Hindu Religious and Charitable Endowments (HR&CE) authorities

Descriptions are intended to reflect the firm's supplied portfolio information. They should not be read as a guarantee that a particular matter can be undertaken or that a particular forum has jurisdiction over every dispute.

### Frequently Asked Questions
- Live search across questions and answers.
- Topic filters for Practice & Jurisdiction, Internships & Professional Association, and Professional Information.
- Expandable answers with one question open at a time.
- Search-match highlighting and a clear-filters state.

### Legal & Professional Information
- A first-visit disclaimer and agreement interaction.
- A continuous legal-information document containing:
  - Confidentiality
  - Website Disclaimer & BCI Compliance
  - Privacy Policy
  - Terms of Use
- Sidebar anchor navigation scrolls to the corresponding section within the same document.

### Footer & Contact
- Firm summary and section navigation.
- Office address, email and telephone details.
- Embedded Google Maps view and a directions link.
- Links to legal and professional information.

## Design & Interaction

- **Typography:** Manrope, used as the primary interface typeface.
- **Palette:** white/off-white backgrounds, warm bronze and brown accents, and slate-toned body text.
- **Navigation:** floating, rounded navigation bar with active-section indication.
- **Motion:** restrained reveal, carousel and scroll-progress interactions.
- **Responsive behaviour:** layouts are adapted for desktop and smaller screens.
- **Accessibility considerations:** semantic controls, readable contrast, keyboard interaction and modal focus/scroll handling should be maintained as the project evolves.

## Technology

The project is a client-side frontend built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

The interface also uses reusable React UI components and theme-based styling. Exact package versions are defined in the project's package manifest and lockfile.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Install dependencies

```bash
git clone https://github.com/Kamalesh-tech31/Nertren-Portfolio.git
cd Nertren-Portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal. Open that address in your browser.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

If the repository's package scripts differ, use the scripts declared in `package.json`.

## Project Structure

The main application code and static assets are organised around the following directories. Individual filenames may change as the project develops.

```text
Nertren-Portfolio/
├── public/          # Public static assets, including website images
├── src/             # React application and UI components
├── index.html       # Vite application entry HTML
├── package.json     # Scripts and dependencies
├── package-lock.json
├── bun.lock         # Bun lockfile, if using Bun
├── tsconfig.json
└── vite.config.ts
```

## Content & Legal Notice

- Firm-specific descriptions, advocate details, practice areas, office information and internship-related answers should be checked against the firm's latest approved source document before publication.
- Do not add unverified claims about case outcomes, success rates, professional credentials, services, or court appearances.
- The legal-information pages are informational website disclosures. They should be reviewed and approved by the firm or its legal reviewer before the site is published or relied upon.
- The website should not imply solicitation, advertising, an invitation to engage, or an advocate–client relationship through its content or interactions.
- Do not commit passwords, API keys, private client documents or confidential case information to the repository.

## Deployment

<<<<<<< feature/legal-modal-searchable-faq
3. Environment Variables (Optional):
   Copy `.env.example` to `.env.local` if configuring optional external API services or the production domain:
   ```bash
   cp .env.example .env.local
   ```
=======
The project can be deployed to a static-site hosting platform that supports Vite builds. Configure the hosting provider to:
>>>>>>> main

- Install dependencies using `npm install`.
- Build using `npm run build`.
- Publish the generated `dist/` directory.

Set up the provider's single-page application fallback if client-side routes are added in the future. No deployment URL is specified here because a live production URL has not been confirmed.

<<<<<<< feature/legal-modal-searchable-faq
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
=======
## Repository
>>>>>>> main

**GitHub:** [Kamalesh-tech31/Nertren-Portfolio](https://github.com/Kamalesh-tech31/Nertren-Portfolio)

## Contact Information Displayed on the Website

<<<<<<< feature/legal-modal-searchable-faq
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
=======
**Nertren Law Associates**  
190/3, NTK Complex, Gobi Main Road, Erode District – 638458, Tamil Nadu, India  
Email: advocates@nertren.in  
Phone: 09688775599  
Website: [www.nertren.in](https://www.nertren.in)

---

© 2026 Nertren Law Associates. All rights reserved.
>>>>>>> mainNertren Law Associates — Portfolio Website
A responsive portfolio website for Nertren Law Associates, an independent litigation and advisory law practice based in Tamil Nadu, India. The site presents the firm, its professional approach, associated advocates, client-engagement process, court and forum presence, and visitor information in a restrained, professional interface.
This website is an informational portfolio. Its content is not legal advice and does not, by itself, create an advocate–client relationship.

Overview
The website is designed to make the firm's profile and publicly approved information easy to explore. It uses a warm legal-office visual identity built around white and off-white surfaces, bronze and brown accents, and slate text, with Manrope as the primary typeface.
Website Sections
Home / Hero
- Full-width photographic hero with the firm's identity and a concise practice description.
- Floating navigation for moving between the main sections.
- Brief location and court-presence highlights.
About the Firm
- Introduces Nertren Law Associates as a sole-proprietorship practice founded by Advocate Kavin Kumar.
- Summarises the firm's stated approach to litigation and advisory work.
- Includes an eight-item professional-approach carousel:
  1. Meticulous preparation
  2. Comprehensive legal research
  3. Careful assessment of facts
  4. Procedural compliance
  5. Strategic advocacy
  6. Individual attention to every matter
  7. Professional accountability
  8. Transparency and timely updates
Advocates
- Presents the three professionals associated with the firm:
  - Adv. T. Kavin Kumar — Founder & Proprietor
  - Adv. V. Pavithra — Associate Counsel
  - Adv. Malathi A — Associate Counsel
- Uses an interactive profile carousel and profile-detail popup.
- Enrollment details are shown in the relevant profile details rather than used as decorative labels on the card fronts.
Client Engagement
A seven-stage timeline explains the firm's stated matter-engagement process:
1. Initial consultation
2. Document review and conflict assessment
3. Legal assessment and strategic advice
4. Drafting and filing
5. Court representation
6. Periodic updates
7. Matter closure
The timeline uses a scroll-responsive progress path and highlighted stage markers. Formal representation is described as commencing only after the conflict check is cleared, professional engagement is accepted, and applicable requirements are met.
Courts & Jurisdiction
The section groups the firm's stated appearances and work across six areas:
- High Court of Judicature at Madras
- District and subordinate courts across Tamil Nadu
- Courts and tribunals in Chennai
- Statutory authorities and quasi-judicial forums
- Intellectual-property-related forums
- Waqf and Hindu Religious and Charitable Endowments (HR&CE) authorities
Descriptions are intended to reflect the firm's supplied portfolio information. They should not be read as a guarantee that a particular matter can be undertaken or that a particular forum has jurisdiction over every dispute.
Frequently Asked Questions
- Live search across questions and answers.
- Topic filters for Practice & Jurisdiction, Internships & Professional Association, and Professional Information.
- Expandable answers with one question open at a time.
- Search-match highlighting and a clear-filters state.
Legal & Professional Information
- A first-visit disclaimer and agreement interaction.
- A continuous legal-information document containing:
  - Confidentiality
  - Website Disclaimer & BCI Compliance
  - Privacy Policy
  - Terms of Use
- Sidebar anchor navigation scrolls to the corresponding section within the same document.
Footer & Contact
- Firm summary and section navigation.
- Office address, email and telephone details.
- Embedded Google Maps view and a directions link.
- Links to legal and professional information.
Design & Interaction
- Typography: Manrope, used as the primary interface typeface.
- Palette: white/off-white backgrounds, warm bronze and brown accents, and slate-toned body text.
- Navigation: floating, rounded navigation bar with active-section indication.
- Motion: restrained reveal, carousel and scroll-progress interactions.
- Responsive behaviour: layouts are adapted for desktop and smaller screens.
- Accessibility considerations: semantic controls, readable contrast, keyboard interaction and modal focus/scroll handling should be maintained as the project evolves.
Technology
The project is a client-side frontend built with:
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
The interface also uses reusable React UI components and theme-based styling. Exact package versions are defined in the project's package manifest and lockfile.
Getting Started
Prerequisites
- Node.js and npm installed.
- Git installed.
Install dependencies
git clone https://github.com/Kamalesh-tech31/Nertren-Portfolio.git
cd Nertren-Portfolio
npm install
Run locally
npm run dev
Vite will print the local development URL in the terminal. Open that address in your browser.
Create a production build
npm run build
Preview the production build
npm run preview
If the repository's package scripts differ, use the scripts declared in package.json.
Project Structure
The main application code and static assets are organised around the following directories. Individual filenames may change as the project develops.
Nertren-Portfolio/
├── public/          # Public static assets, including website images
├── src/             # React application and UI components
├── index.html       # Vite application entry HTML
├── package.json     # Scripts and dependencies
├── package-lock.json
├── bun.lock         # Bun lockfile, if using Bun
├── tsconfig.json
└── vite.config.ts
Content & Legal Notice
- Firm-specific descriptions, advocate details, practice areas, office information and internship-related answers should be checked against the firm's latest approved source document before publication.
- Do not add unverified claims about case outcomes, success rates, professional credentials, services, or court appearances.
- The legal-information pages are informational website disclosures. They should be reviewed and approved by the firm or its legal reviewer before the site is published or relied upon.
- The website should not imply solicitation, advertising, an invitation to engage, or an advocate–client relationship through its content or interactions.
- Do not commit passwords, API keys, private client documents or confidential case information to the repository.
Deployment
The project can be deployed to a static-site hosting platform that supports Vite builds. Configure the hosting provider to:
- Install dependencies using npm install.
- Build using npm run build.
- Publish the generated dist/ directory.
Set up the provider's single-page application fallback if client-side routes are added in the future. No deployment URL is specified here because a live production URL has not been confirmed.
Repository
GitHub: Kamalesh-tech31/Nertren-Portfolio
Contact Information Displayed on the Website
Nertren Law Associates
190/3, NTK Complex, Gobi Main Road, Erode District – 638458, Tamil Nadu, India
Email: advocates@nertren.in
Phone: 09688775599
Website: www.nertren.in
© 2026 Nertren Law Associates. All rights reserved.
