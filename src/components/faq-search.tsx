import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ_CATEGORIES } from '../data/firmData';

export interface FlatFaqItem {
  id: string;
  categoryId: string;
  topic: string;
  question: string;
  answer: string[];
  bullets?: string[];
}

export const FLATTENED_FAQS: FlatFaqItem[] = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({
    id: item.id,
    categoryId: category.id,
    topic: category.title,
    question: item.question,
    answer: item.answer,
    bullets: item.bullets,
  }))
);

export const FAQ_TOPICS = [
  'All',
  'Practice & Jurisdiction',
  'Internships & Professional Association',
  'Professional Information',
] as const;

export type FaqTopic = (typeof FAQ_TOPICS)[number];

function HighlightText({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) {
    return <>{text}</>;
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark
            key={index}
            className="rounded bg-primary/25 px-0.5 font-medium text-foreground"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export interface FaqSearchProps {
  items?: FlatFaqItem[];
  className?: string;
  showHeader?: boolean;
}

export const FaqSearch: React.FC<FaqSearchProps> = ({
  items = FLATTENED_FAQS,
  className,
  showHeader = true,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTopic = selectedTopic === 'All' || item.topic === selectedTopic;
      if (!matchesTopic) return false;
      if (!q) return true;

      const searchableText = [
        item.question,
        ...item.answer,
        ...(item.bullets || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [items, selectedTopic, query]);

  // When filters or search queries change such that the open item is hidden, collapse it
  useEffect(() => {
    if (openItemId && !results.some((r) => r.id === openItemId)) {
      setOpenItemId(null);
    }
  }, [results, openItemId]);

  const toggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const handleClearFilters = () => {
    setQuery('');
    setSelectedTopic('All');
    setOpenItemId(null);
  };

  return (
    <div className={cn('w-full', className)}>
      {showHeader && (
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-primary">
            INFORMATION &amp; GUIDANCE
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Find general information regarding the firm&apos;s professional practice, jurisdiction, internship criteria and professional correspondence.
          </p>
        </div>
      )}

      {/* Live Search and Topic Filter Controls */}
      <div className="mx-auto mt-10 max-w-2xl space-y-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search questions"
            className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {query.trim().length > 0 && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Topic Filters */}
        <div
          role="group"
          aria-label="Filter questions by topic"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {FAQ_TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                aria-pressed={isSelected}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                )}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Rows */}
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border border-t border-b border-border">
        {results.map((item) => {
          const isOpen = openItemId === item.id;
          const buttonId = `faq-btn-${item.id}`;
          const panelId = `faq-panel-${item.id}`;

          return (
            <div key={item.id} className="py-1">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium leading-snug text-foreground">
                    <HighlightText text={item.question} query={query} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-200',
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
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pr-4 sm:pr-10 space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item.answer.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          <HighlightText text={paragraph} query={query} />
                        </p>
                      ))}

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1.5 text-sm sm:text-base text-foreground/90">
                          {item.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                              <span>
                                <HighlightText text={bullet} query={query} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Empty State */}
        {results.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              No questions match your search. Try another keyword or clear the filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 inline-flex items-center rounded-full border border-primary/40 bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
