import React from 'react';
import {
  CheckCircle2,
  FilePenLine,
  FileSearch,
  Landmark,
  MessageCircle,
  RefreshCw,
  Scale,
} from 'lucide-react';
import { JourneyTimeline, type JourneyStep } from './journey-timeline';
import { ENGAGEMENT_NOTICE, ENGAGEMENT_STAGES } from '../data/firmData';

const STAGE_ICONS: React.ReactNode[] = [
  <MessageCircle key="stage-01" aria-hidden="true" />,
  <FileSearch key="stage-02" aria-hidden="true" />,
  <Scale key="stage-03" aria-hidden="true" />,
  <FilePenLine key="stage-04" aria-hidden="true" />,
  <Landmark key="stage-05" aria-hidden="true" />,
  <RefreshCw key="stage-06" aria-hidden="true" />,
  <CheckCircle2 key="stage-07" aria-hidden="true" />,
];

const ENGAGEMENT_STEPS: JourneyStep[] = ENGAGEMENT_STAGES.map((stage, index) => ({
  date: `STAGE ${stage.step}`,
  title: stage.title,
  description: stage.description,
  icon: STAGE_ICONS[index],
}));

export const ClientEngagement: React.FC = () => {
  return (
    <section
      id="client-engagement"
      aria-labelledby="engagement-heading"
      className="section-anchor border-t border-border bg-[#F2EBE3]/35 py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <JourneyTimeline
          eyebrow="CLIENT ENGAGEMENT PROCESS"
          title="A Structured Approach to Every Matter"
          description="Every legal matter progresses through a carefully structured lifecycle, from initial consultation and legal assessment to representation and matter closure."
          steps={ENGAGEMENT_STEPS}
        />

        <div className="mx-auto mt-8 sm:mt-10 max-w-4xl rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
          <p className="mb-2 text-xs font-semibold tracking-[0.14em] uppercase text-primary">
            Commencement of Representation
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-foreground">
            {ENGAGEMENT_NOTICE}
          </p>
        </div>
      </div>
    </section>
  );
};
