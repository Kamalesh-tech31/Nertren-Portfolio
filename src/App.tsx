import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AdvocateProfiles } from './components/AdvocateProfiles';
import { ClientEngagement } from './components/ClientEngagement';
import { CourtsSection } from './components/CourtsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DisclaimerGate } from './components/DisclaimerGate';
import { LegalInformationDialog } from './components/LegalInformationDialog';

type LegalRoute = 'confidentiality' | 'disclaimer' | 'privacy' | 'terms' | null;

function getLegalRoute(hash: string): LegalRoute {
  const h = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (h === 'confidentiality') return 'confidentiality';
  if (h === 'disclaimer') return 'disclaimer';
  if (h === 'privacy') return 'privacy';
  if (h === 'terms') return 'terms';
  return null;
}

export default function App() {
  const [legalRoute, setLegalRoute] = useState<LegalRoute>(() =>
    getLegalRoute(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => {
      setLegalRoute(getLegalRoute(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleCloseLegal = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setLegalRoute(null);
  };

  // ── Main site with Continuous Legal Document Modal ──────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* First-visit disclaimer gate */}
      <DisclaimerGate />

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* Full-width photographic hero */}
        <HeroSection />

        <AboutSection />
        <AdvocateProfiles />
        <ClientEngagement />
        <CourtsSection />
        <FaqSection />
      </main>

      <Footer />

      {/* Continuous Documentation-Style Legal Information Modal */}
      <LegalInformationDialog
        isOpen={Boolean(legalRoute)}
        initialSection={legalRoute}
        onClose={handleCloseLegal}
      />
    </div>
  );
}
