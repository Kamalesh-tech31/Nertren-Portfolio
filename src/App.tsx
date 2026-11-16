import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { AdvocateProfiles } from './components/AdvocateProfiles';
import { ClientEngagement } from './components/ClientEngagement';
import { CourtsSection } from './components/CourtsSection';
import { ConfidentialitySection } from './components/ConfidentialitySection';
import { LegalDisclaimer } from './components/LegalDisclaimer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HomeSection />
        <AboutSection />
        <AdvocateProfiles />
        <ClientEngagement />
        <CourtsSection />
        <ConfidentialitySection />
        <LegalDisclaimer />
        <PrivacyPolicy />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
