import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import type { Series } from '@/types';

interface WorksPageProps {
  onSeriesClick: (seriesId: string) => void;
}

export default function WorksPage({ onSeriesClick }: WorksPageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { series } = useContent();

  return (
    <div className="page-enter pt-28 md:pt-32">
      {/* Page Title */}
      <div className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
          摄影
        </h1>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
          Photography · {series.length} Series
        </div>
      </div>

      {/* Series List */}
      <div className="flex flex-col">
        {series.map((s: Series, index: number) => (
          <button
            key={s.id}
            onClick={() => onSeriesClick(s.id)}
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative border-t border-border last:border-b overflow-hidden"
          >
            <div className="px-6 md:px-10 lg:px-16 py-8 md:py-12 flex items-center justify-between">
              {/* Left: Cover thumbnail + Index + Title */}
              <div className="flex items-center gap-6 md:gap-10">
                {/* Cover thumbnail - always visible, original ratio in square bg */}
                <div className="hidden md:flex w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-muted items-center justify-center p-1">
                  {s.cover && (
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-serif-display text-2xl md:text-4xl lg:text-5xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {s.title}
                  </h2>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                    {s.titleEn}
                  </div>
                </div>
              </div>

              {/* Right: Year + Photo Count */}
              <div className="flex items-center gap-6 md:gap-12">
                <div className="text-right">
                  <div className="text-sm md:text-base text-muted-foreground font-light">
                    {s.photos.length} 张
                  </div>
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-light tabular-nums">
                  {s.year}
                </div>
                <div className="hidden md:block w-8 h-8 flex items-center justify-center">
                  <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 text-lg">
                    →
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile cover image - original ratio in square bg */}
            <div className="md:hidden px-6 pb-6">
              {s.cover && (
                <div className="w-full aspect-[3/2] flex items-center justify-center bg-muted p-3">
                  <img
                    src={s.cover}
                    alt={s.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            {/* Hover Preview Image - large floating preview on desktop, original ratio */}
            <div
              className={`hidden md:block absolute right-6 md:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-32 md:w-48 lg:w-64 aspect-square bg-muted flex items-center justify-center p-2 pointer-events-none transition-all duration-500 ${
                hoveredId === s.id
                  ? 'opacity-95 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-8 scale-95'
              }`}
              style={{ zIndex: 10 }}
            >
              <img
                src={s.cover}
                alt={s.title}
                className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
