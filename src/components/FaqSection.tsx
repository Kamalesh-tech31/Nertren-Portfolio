import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ_CATEGORIES } from '../data/firmData';
import { SectionHeader } from './SectionHeader';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-anchor border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          headingId="faq-heading"
          sectionNumber="09"
          label="Frequently Asked Questions"
          title="Frequently Asked Questions"
          lead="General informational answers regarding the firm's practice areas, court appearances, internship criteria, and professional correspondence."
        />

        <div className="space-y-12">
          {FAQ_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-primary tabular-nums">
                  Category {category.code}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="lg:col-span-8 divide-y divide-border border-t border-b border-border">
                {category.items.map((item) => {
                  const isOpen = Boolean(openIds[item.id]);
                  const panelId = `${item.id}-panel`;
                  const buttonId = `${item.id}-button`;

                  return (
                    <div key={item.id} className="py-1">
                      <h4>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <span className="font-serif text-lg sm:text-xl font-medium leading-snug text-foreground">
                            {item.question}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              'grid size-8 shrink-0 place-items-center rounded-full border transition-colors',
                              isOpen
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-card text-primary'
                            )}
                          >
                            {isOpen ? (
                              <Minus className="size-4" />
                            ) : (
                              <Plus className="size-4" />
                            )}
                          </span>
                        </button>
                      </h4>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!isOpen}
                        className="pb-5 pr-4 sm:pr-10 space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground"
                      >
                        {item.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-2 space-y-1.5 text-sm sm:text-base text-foreground/90">
                            {item.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                                  aria-hidden="true"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
