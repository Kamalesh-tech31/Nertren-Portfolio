import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { AdvocateProfiles } from './components/AdvocateProfiles';
import { ClientEngagement } from './components/ClientEngagement';
import { CourtsSection } from './components/CourtsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import {
  LegalInformationDialog,
  type LegalTabId,
} from './components/LegalInformationDialog';

export default function App() {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTabId>('confidentiality');

  const handleOpenLegalModal = (tab: LegalTabId) => {
    setActiveLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleCloseLegalModal = () => {
    setIsLegalModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>

      <Navbar onOpenLegalModal={handleOpenLegalModal} />

      <main id="main-content">
        <HomeSection />
        <AboutSection />
        <AdvocateProfiles />
        <ClientEngagement />
        <CourtsSection />
        <FaqSection />
      </main>

      <Footer onOpenLegalModal={handleOpenLegalModal} />

      <LegalInformationDialog
        isOpen={isLegalModalOpen}
        activeTab={activeLegalTab}
        onClose={handleCloseLegalModal}
        onTabChange={setActiveLegalTab}
      />
    </div>
  );
}
