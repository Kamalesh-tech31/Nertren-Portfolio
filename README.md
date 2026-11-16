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
   Copy `.env.example` to `.env.local` if configuring optional external API services:
   ```bash
   cp .env.example .env.local
   ```

---

## Available Scripts

- **`npm run dev`**: Starts the Vite local development server on `http://localhost:3000/`.
- **`npm run build`**: Runs the production build outputting to the `dist/` directory.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs TypeScript type checking (`tsc --noEmit`).

---

## Project Structure

```text
├── .env.example             # Template for environment variables
├── .gitignore               # Git exclusion patterns
├── index.html               # Main HTML entry point
├── metadata.json            # Application metadata
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build and server configuration
├── src/
│   ├── App.tsx              # Main application component assembling all sections
│   ├── index.css            # Global Tailwind CSS 4 theme and base styles
│   ├── main.tsx             # React root mounting point
│   ├── components/          # Page sections & UI components
│   │   ├── AboutSection.tsx
│   │   ├── AdvocateProfiles.tsx
│   │   ├── ClientEngagement.tsx
│   │   ├── ConfidentialitySection.tsx
│   │   ├── CourtsSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── feature-bento.tsx
│   │   ├── Footer.tsx
│   │   ├── HomeSection.tsx
│   │   ├── journey-timeline.tsx
│   │   ├── LegalDisclaimer.tsx
│   │   ├── Navbar.tsx
│   │   ├── perspective-carousel.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── SectionHeader.tsx
│   │   └── ui/
│   │       ├── Carousel.css
│   │       └── Carousel.tsx
│   ├── data/
│   │   └── firmData.ts      # Structured firm records, advocates, FAQs, timeline data
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn / clsx merge)
│   └── utils/
│       ├── navigation.ts    # Navigation logic, scroll state, timeline calculations
│       └── navigation.test.ts # Automated unit tests for navigation and data integrity
```
