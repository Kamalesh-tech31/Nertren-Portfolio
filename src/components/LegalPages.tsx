import React from 'react';
import { CONFIDENTIALITY_INFO, DISCLAIMER_BLOCKS, LEGAL_POLICIES } from '../data/firmData';

interface LegalPageShellProps {
  onBack: () => void;
  children: React.ReactNode;
  title: string;
  label: string;
}

function LegalPageShell({ onBack, children, title, label }: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border bg-background py-5 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Nertren Law Associates
          </span>
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            ← Back to website
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <p className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase text-primary">
          {label}
        </p>
        <h1 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}

function LegalBody({ text }: { text: string }) {
  return (
    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{text}</p>
  );
}

function LegalDivider() {
  return <hr className="border-border" />;
}

// ─── Individual page renderers ───────────────────────────────────────────────

export function ConfidentialityPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPageShell onBack={onBack} label="Professional Standards" title="Confidentiality">
      <LegalBody text={CONFIDENTIALITY_INFO.statement} />
    </LegalPageShell>
  );
}

export function DisclaimerPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPageShell
      onBack={onBack}
      label="Regulatory Disclosures"
      title="Website Disclaimer & BCI Compliance"
    >
      {DISCLAIMER_BLOCKS.map((block, i) => (
        <React.Fragment key={block.title}>
          <div>
            <h2 className="mb-2 text-base font-semibold text-foreground">{block.title}</h2>
            <LegalBody text={block.body} />
          </div>
          {i < DISCLAIMER_BLOCKS.length - 1 && <LegalDivider />}
        </React.Fragment>
      ))}
    </LegalPageShell>
  );
}

export function PrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPageShell onBack={onBack} label="Information Practice" title="Privacy Policy">
      <LegalBody text={LEGAL_POLICIES.privacyPolicy.body} />
    </LegalPageShell>
  );
}

export function TermsPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPageShell onBack={onBack} label="Website Terms" title="Terms of Use">
      <LegalBody text={LEGAL_POLICIES.termsOfUse.body} />
    </LegalPageShell>
  );
}
