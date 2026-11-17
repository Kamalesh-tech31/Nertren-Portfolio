import React from 'react';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { FIRM_INFO, OFFICE_CONTACT } from '../data/firmData';
import { PRIMARY_NAV_ITEMS } from '../utils/navigation';

const LEGAL_LINKS = [
  { id: 'confidentiality', label: 'Confidentiality', hash: '#/confidentiality' },
  { id: 'disclaimer', label: 'Website Disclaimer & BCI Compliance', hash: '#/disclaimer' },
  { id: 'privacy', label: 'Privacy Policy', hash: '#/privacy' },
  { id: 'terms', label: 'Terms of Use', hash: '#/terms' },
];

export const Footer: React.FC = () => {
  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const googleMapsEmbedSrc =
    'https://maps.google.com/maps?q=190%2F3%2C+NTK+Complex%2C+Gobi+Main+Road%2C+Erode+District%2C+Tamil+Nadu+638458%2C+India&output=embed&z=14';

  const googleMapsLink =
    'https://maps.google.com/maps?q=190/3,+NTK+Complex,+Gobi+Main+Road,+Erode+District,+Tamil+Nadu+638458,+India';

  return (
    <footer className="border-t border-[#D8C2AA] bg-white pt-10 pb-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* Two Primary Columns Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 pb-8 border-b border-[#D8C2AA]/70">
          {/* LEFT COLUMN: Identity, Office details & Navigation (~48%) */}
          <div className="min-w-0 lg:col-span-6 space-y-6">
            <div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-[#49362D]">
                {FIRM_INFO.name}
              </p>
              <p className="mt-2 text-xs font-semibold tracking-wider uppercase text-[#A77C52]">
                {FIRM_INFO.tagline}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#64748B] max-w-lg">
                An independent litigation and advisory law practice based in Tamil Nadu, India,
                representing clients before courts, tribunals, and statutory authorities.
              </p>
            </div>

            {/* Office Address & Direct Contact */}
            <div id="contact" className="section-anchor space-y-2.5 text-sm rounded-xl border border-[#D8C2AA]/60 bg-card p-4 sm:p-5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#A77C52] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#76543D]">
                    {OFFICE_CONTACT.officeLabel}
                  </span>
                  <p className="mt-0.5 leading-relaxed text-[#49362D]">
                    {OFFICE_CONTACT.fullAddress}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-[#A77C52] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${OFFICE_CONTACT.email}`}
                    className="text-[#49362D] hover:text-[#76543D] underline underline-offset-2 hover:decoration-[#A77C52]"
                  >
                    {OFFICE_CONTACT.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#A77C52] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${OFFICE_CONTACT.mobile}`}
                    className="text-[#49362D] hover:text-[#76543D] tabular-nums underline underline-offset-2 hover:decoration-[#A77C52]"
                  >
                    {OFFICE_CONTACT.mobile}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links & Legal Information */}
            <div className="grid grid-cols-2 gap-6 pt-1">
              <div>
                <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#76543D]">
                  Navigation
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                  {PRIMARY_NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleSmoothScroll(e, item.id)}
                        className="text-[#64748B] hover:text-[#49362D] transition-colors underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#76543D]">
                  Legal &amp; Compliance
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                  {LEGAL_LINKS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.hash}
                        className="text-[#64748B] hover:text-[#49362D] transition-colors underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Prominent Interactive Google Maps Embed (~52%) */}
          <div className="min-w-0 lg:col-span-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-[#A77C52]" aria-hidden="true" />
                <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#76543D]">
                  Principal Office Location
                </h3>
              </div>

              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76543D] hover:text-[#49362D] transition-colors underline underline-offset-4 decoration-[#A77C52]"
              >
                <span>Open in Google Maps / Directions</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Prominent Map Container */}
            <div className="relative w-full h-[290px] sm:h-[330px] lg:h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#D8C2AA] bg-card shadow-xs">
              <iframe
                title="Nertren Law Associates office location"
                src={googleMapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps showing office location at NTK Complex, Gobi Main Road, Erode District"
              />
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Nertren Law Associates. All rights reserved.</p>
          <p className="text-balance">
            Advocate regulations: Information published strictly in compliance with Bar Council of India rules.
          </p>
        </div>
      </div>
    </footer>
  );
};
