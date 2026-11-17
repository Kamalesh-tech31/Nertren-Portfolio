import React, { useEffect, useState } from 'react';

/** Versioned key — bump the version suffix to re-show the gate after content changes. */
const STORAGE_KEY = 'nertren_disclaimer_accepted_v1';

function getAccepted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function setAccepted(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // storage unavailable — gate will re-show on next visit
  }
}

export const DisclaimerGate: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getAccepted()) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setAccepted();
    setVisible(false);
  };

  // Keyboard: Escape should not close (no unintended bypass); Enter/Space on button
  useEffect(() => {
    if (!visible) return;
    // Lock body scroll while gate is shown
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-gate-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(26,20,16,0.78)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="relative flex flex-col w-[94vw] max-w-[920px] max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-5">
          {/* Firm name */}
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-1">
            Nertren Law Associates
          </p>

          {/* Title */}
          <h2
            id="disclaimer-gate-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4"
          >
            Disclaimer &amp; Compliance Notice
          </h2>

          <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Under the rules of the Bar Council of India, advocates are strictly prohibited from
              soliciting work or advertising, directly or indirectly.
            </p>
            <p>
              This website is intended solely to provide general informational text regarding
              Nertren Law Associates, its professional background, and its selected areas of
              practice. The information is made available exclusively at the specific request of
              users seeking information, and should not be interpreted as legal advice,
              solicitation, advertisement, invitation, or inducement of any kind.
            </p>
            <p>
              Accessing this website or viewing its content does not create or constitute an
              advocate-client relationship between the visitor and the firm or its advocates.
              Visitors should obtain independent legal advice from a qualified practitioner before
              acting upon any information obtained from this website.
            </p>
            <p>
              By clicking <strong className="font-semibold text-foreground">Agree and Enter</strong>,
              you acknowledge that access is sought completely voluntarily for purely informational
              purposes, and that there has been no solicitation or inducement of any kind by
              Nertren Law Associates or its members.
            </p>
          </div>
        </div>

        {/* Fixed Modal Footer */}
        <div className="border-t border-border bg-card/95 px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary shadow-sm"
            autoFocus
          >
            Agree and Enter
          </button>
        </div>
      </div>
    </div>
  );
};
