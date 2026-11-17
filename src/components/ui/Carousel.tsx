import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import './Carousel.css';

export interface CarouselItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  icon?: IconSvgElement;
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number | string;
  aspectRatio?: number;
  effect?: 'slide';
  indicator?: 'counter' | 'dots';
  frame?: boolean;
  arrows?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  draggable?: boolean;
  theme?: 'light';
  ariaLabel?: string;
  onIndexChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  baseWidth = '100%',
  aspectRatio,
  effect = 'slide',
  indicator = 'counter',
  frame = false,
  arrows = true,
  autoplay = false,
  autoplayInterval = 5000,
  loop = false,
  draggable = true,
  theme = 'light',
  ariaLabel = 'Approach cards carousel',
  onIndexChange,
}) => {
  const count = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;
      let resolved = nextIndex;
      if (loop) {
        resolved = ((nextIndex % count) + count) % count;
      } else {
        resolved = Math.max(0, Math.min(count - 1, nextIndex));
      }
      setCurrentIndex(resolved);
      onIndexChange?.(resolved);
    },
    [count, loop, onIndexChange]
  );

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, autoplayInterval);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayInterval, count]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || count <= 1) return;
    pointerStartXRef.current = e.clientX;
    pointerIdRef.current = e.pointerId;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartXRef.current === null) return;
    const delta = e.clientX - pointerStartXRef.current;
    setDragOffsetPx(delta);
  };

  const handlePointerFinish = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartXRef.current === null) return;
    const delta = e.clientX - pointerStartXRef.current;
    const viewportWidth = viewportRef.current?.clientWidth || 320;
    const threshold = Math.min(80, viewportWidth * 0.18);

    if (delta < -threshold) {
      goTo(currentIndex + 1);
    } else if (delta > threshold) {
      goTo(currentIndex - 1);
    }

    if (pointerIdRef.current !== null && e.currentTarget.hasPointerCapture(pointerIdRef.current)) {
      e.currentTarget.releasePointerCapture(pointerIdRef.current);
    }
    pointerStartXRef.current = null;
    pointerIdRef.current = null;
    setIsDragging(false);
    setDragOffsetPx(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(count - 1);
    }
  };

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < count - 1;

  const containerStyle: React.CSSProperties = {
    width: typeof baseWidth === 'number' ? `${baseWidth}px` : baseWidth,
  };

  return (
    <div
      className="rb-carousel"
      data-theme={theme}
      data-effect={effect}
      style={containerStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="rb-carousel-shell" data-frame={frame ? 'true' : 'false'}>
        <div
          ref={viewportRef}
          className="rb-carousel-viewport"
          data-draggable={draggable ? 'true' : 'false'}
          data-dragging={isDragging ? 'true' : 'false'}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerFinish}
          onPointerCancel={handlePointerFinish}
        >
          <div
            className="rb-carousel-track"
            style={{
              transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffsetPx}px), 0, 0)`,
              transition: isDragging
                ? 'none'
                : 'transform 380ms cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="rb-carousel-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${count}: ${item.title}`}
                aria-hidden={idx !== currentIndex}
              >
                <article
                  className="rb-carousel-card"
                  style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
                >
                  {item.imageSrc && (
                    <div className="rb-carousel-media-frame">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt || item.title}
                        loading={idx > 1 ? 'lazy' : undefined}
                        className={`rb-carousel-media-img ${item.imageClassName || ''}`.trim()}
                      />
                    </div>
                  )}

                  <div className="rb-carousel-card-content">
                    <div className="rb-carousel-card-header">
                      <span className="rb-carousel-number">
                        Principle {item.number}
                      </span>
                      {item.icon && (
                        <span className="rb-carousel-icon-badge" aria-hidden="true">
                          <HugeiconsIcon
                            icon={item.icon}
                            size={18}
                            strokeWidth={1.6}
                          />
                        </span>
                      )}
                    </div>

                    <div className="rb-carousel-card-body">
                      <h4 className="rb-carousel-title">{item.title}</h4>
                      <p className="rb-carousel-description">{item.description}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="rb-carousel-controls">
          {indicator === 'counter' ? (
            <div className="rb-carousel-counter" aria-live="polite">
              <strong>{String(currentIndex + 1).padStart(2, '0')}</strong> /{' '}
              {String(count).padStart(2, '0')}
            </div>
          ) : (
            <div className="rb-carousel-dots">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  data-active={idx === currentIndex ? 'true' : 'false'}
                  className="rb-carousel-dot"
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
          )}

          {arrows && (
            <div className="rb-carousel-arrows">
              <button
                type="button"
                className="rb-carousel-arrow-btn"
                aria-label="Previous approach card"
                disabled={!canGoPrev}
                onClick={() => goTo(currentIndex - 1)}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="rb-carousel-arrow-btn"
                aria-label="Next approach card"
                disabled={!canGoNext}
                onClick={() => goTo(currentIndex + 1)}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
