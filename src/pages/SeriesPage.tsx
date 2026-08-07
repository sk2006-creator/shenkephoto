import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Series } from '@/types';
import PhotoViewer from '@/components/works/PhotoViewer';

interface SeriesPageProps {
  seriesData: Series;
  onBack: () => void;
}

export default function SeriesPage({ seriesData, onBack }: SeriesPageProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <div className="page-enter pt-28 md:pt-32">
      {/* Back */}
      <button
        onClick={onBack}
        className="px-6 md:px-10 lg:px-16 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        返回摄影
      </button>

      {/* Series Header */}
      <div className="px-6 md:px-10 lg:px-16 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
              {seriesData.title}
            </h1>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
              {seriesData.titleEn}
            </div>
          </div>
          <div className="flex items-center gap-8 md:gap-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">年份</div>
              <div className="text-lg font-light mt-1">{seriesData.year}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">作品数</div>
              <div className="text-lg font-light mt-1">{seriesData.photos.length}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-light">
          {seriesData.description}
        </p>
      </div>

      {/* Photo Grid */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {seriesData.photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setViewerIndex(index)}
              className="group relative overflow-hidden bg-muted"
              style={{ animation: `imageFadeIn 0.6s ease-out ${index * 0.05}s both` }}
            >
              <div className="aspect-square flex items-center justify-center p-3 md:p-4">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="text-white text-sm font-light">{photo.title}</div>
                  {photo.caption && (
                    <div className="text-white/60 text-xs mt-1">{photo.caption}</div>
                  )}
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">
                    {String(index + 1).padStart(2, '0')} / {String(seriesData.photos.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
              {/* Number badge */}
              <div className="absolute top-3 left-3 text-white/70 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Viewer */}
      {viewerIndex !== null && (
        <PhotoViewer
          photos={seriesData.photos}
          initialIndex={viewerIndex}
          seriesTitle={seriesData.title}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
