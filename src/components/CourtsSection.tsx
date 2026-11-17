import React from 'react';
import {
  Building2,
  Gavel,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import {
  COURTS_CARDS,
  COURTS_INFO,
  type CourtIconKey,
} from '../data/firmData';
import { SectionHeader } from './SectionHeader';

const COURT_ICONS: Record<CourtIconKey, React.ReactNode> = {
  landmark: <Landmark className="size-4" aria-hidden="true" />,
  building: <Building2 className="size-4" aria-hidden="true" />,
  scale: <Scale className="size-4" aria-hidden="true" />,
  gavel: <Gavel className="size-4" aria-hidden="true" />,
  shield: <ShieldCheck className="size-4" aria-hidden="true" />,
  scroll: <ScrollText className="size-4" aria-hidden="true" />,
};

export const CourtsSection: React.FC = () => {
  const cardMap = Object.fromEntries(COURTS_CARDS.map((c) => [c.id, c]));

  const madrasHighCourt = cardMap['madras-high-court'];
  const districtCourts = cardMap['district-subordinate-courts'];
  const chennaiCourts = cardMap['chennai-courts-tribunals'];
  const statutoryForums = cardMap['statutory-quasi-judicial'];
  const ipForums = cardMap['ip-forums'];
  const waqfHrce = cardMap['waqf-hrce-authorities'];

  return (
    <section
      id="courts"
      aria-labelledby="courts-heading"
      className="section-anchor border-t border-border bg-white py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="courts-heading"
          title={COURTS_INFO.heading}
          lead={COURTS_INFO.supportingText}
        />

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Feature Panel: High Court of Judicature at Madras (Spans 2 columns on desktop) */}
          {madrasHighCourt && (
            <article
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D8C2AA]/70 bg-[#F2EBE3]/55 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs md:col-span-2"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-[#A77C52]/12 text-[#A77C52]">
                    {COURT_ICONS[madrasHighCourt.icon]}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A77C52]">
                    Apex State Forum
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-[#49362D]">
                  {madrasHighCourt.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#64748B] max-w-2xl">
                  {madrasHighCourt.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#D8C2AA]/40 pt-3 text-xs font-semibold uppercase tracking-wider text-[#76543D]">
                Constitutional &amp; Appellate Remedies · Articles 226 &amp; 227
              </div>
            </article>
          )}

          {/* 2. District & Subordinate Courts */}
          {districtCourts && (
            <article
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D8C2AA]/70 bg-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs"
            >
              <div>
                <span className="grid size-8 place-items-center rounded-lg bg-[#A77C52]/10 text-[#A77C52]">
                  {COURT_ICONS[districtCourts.icon]}
                </span>

                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug tracking-tight text-[#49362D]">
                  {districtCourts.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                  {districtCourts.description}
                </p>
              </div>
            </article>
          )}

          {/* 3. Courts & Tribunals in Chennai */}
          {chennaiCourts && (
            <article
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D8C2AA]/70 bg-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs"
            >
              <div>
                <span className="grid size-8 place-items-center rounded-lg bg-[#A77C52]/10 text-[#A77C52]">
                  {COURT_ICONS[chennaiCourts.icon]}
                </span>

                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug tracking-tight text-[#49362D]">
                  {chennaiCourts.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                  {chennaiCourts.description}
                </p>
              </div>
            </article>
          )}

          {/* 4. Statutory Authorities & Quasi-Judicial Forums */}
          {statutoryForums && (
            <article
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D8C2AA]/70 bg-[#F2EBE3]/45 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs"
            >
              <div>
                <span className="grid size-8 place-items-center rounded-lg bg-[#A77C52]/10 text-[#A77C52]">
                  {COURT_ICONS[statutoryForums.icon]}
                </span>

                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug tracking-tight text-[#49362D]">
                  {statutoryForums.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                  {statutoryForums.description}
                </p>
              </div>
            </article>
          )}

          {/* 5. Intellectual Property Related Forums */}
          {ipForums && (
            <article
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D8C2AA]/70 bg-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs"
            >
              <div>
                <span className="grid size-8 place-items-center rounded-lg bg-[#A77C52]/10 text-[#A77C52]">
                  {COURT_ICONS[ipForums.icon]}
                </span>

                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug tracking-tight text-[#49362D]">
                  {ipForums.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                  {ipForums.description}
                </p>
              </div>
            </article>
          )}

          {/* 6. Waqf & HR&CE Authorities (Spans all 3 columns across bottom on desktop) */}
          {waqfHrce && (
            <article
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#D8C2AA]/70 bg-[#F2EBE3]/55 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A77C52]/60 hover:shadow-xs md:col-span-2 lg:col-span-3"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#A77C52]/12 text-[#A77C52]">
                  {COURT_ICONS[waqfHrce.icon]}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-[#49362D]">
                    {waqfHrce.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#64748B] max-w-3xl">
                    {waqfHrce.description}
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* Regional Coordination Note */}
        <div className="mx-auto mt-7 max-w-3xl rounded-xl border border-border bg-card p-4 sm:p-5 text-center shadow-xs">
          <p className="text-xs sm:text-sm leading-relaxed text-[#64748B]">
            {COURTS_INFO.coordinationNote}
          </p>
        </div>
      </div>
    </section>
  );
};
