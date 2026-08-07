import { useContent } from '@/hooks/useContent';
import type { PageId } from '@/types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSeriesClick: (seriesId: string) => void;
}

export default function HomePage({ onNavigate, onSeriesClick }: HomePageProps) {
  const { series, artist } = useContent();

  // Auto-select first photo from first series
  const firstSeries = series[0];
  const firstPhoto = firstSeries?.photos?.[0];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ animation: 'fadeIn 0.8s ease-out' }}
    >
      {/* Centered artwork image */}
      {firstPhoto && firstSeries ? (
        <button
          onClick={() => onSeriesClick(firstSeries.id)}
          className="group relative block"
          style={{ animation: 'imageFadeIn 1.2s ease-out 0.2s both' }}
        >
          <div className="relative overflow-hidden">
            <img
              src={firstPhoto.src}
              alt={firstPhoto.title || firstSeries.title}
              className="max-h-[70vh] max-w-[80vw] w-auto h-auto object-contain"
              style={{ filter: 'brightness(0.95)' }}
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-end justify-center pb-8">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                <div className="text-white text-sm font-light tracking-wide">
                  {firstSeries.title}
                </div>
                <div className="text-white/60 text-[10px] uppercase tracking-[0.2em] mt-1">
                  {firstSeries.titleEn} · {firstSeries.year}
                </div>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <div className="text-center">
          <div className="font-serif-display text-2xl text-muted-foreground">Loading...</div>
        </div>
      )}

      {/* Artist name at top */}
      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 text-center">
        <div className="font-serif-display text-lg md:text-xl font-light tracking-wide">
          {artist.name}
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
          {artist.nameEn}
        </div>
      </div>

      {/* Enter button at bottom */}
      <button
        onClick={() => onNavigate('works')}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-3"
      >
        <span>Enter</span>
        <span className="block w-px h-8 bg-muted-foreground/40"></span>
      </button>
    </div>
  );
}
