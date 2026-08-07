import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import type { Film } from '@/types';

export default function FilmsPage() {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const { films } = useContent();

  return (
    <div className="page-enter pt-28 md:pt-32">
      {/* Page Title */}
      <div className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
          电影
        </h1>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
          Films & Videos
        </div>
      </div>

      {/* Films List */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-12 md:gap-20">
          {films.map((film, index) => (
            <div
              key={film.id}
              className="group"
              style={{ animation: `imageFadeIn 0.6s ease-out ${index * 0.08}s both` }}
            >
              <button
                onClick={() => setActiveFilm(film)}
                className="block w-full text-left"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-black aspect-video mb-5 md:mb-6">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white transition-colors duration-300 group-hover:text-black ml-1" />
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
                    {film.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
                  <div>
                    <h2 className="font-serif-display text-2xl md:text-3xl font-light tracking-tight group-hover:text-foreground transition-colors">
                      {film.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-light max-w-2xl">
                      {film.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground font-light tabular-nums">
                      {film.year}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeFilm && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
          onClick={() => setActiveFilm(null)}
        >
          <button
            onClick={() => setActiveFilm(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors flex items-center gap-2 z-10"
          >
            <X className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-[0.2em]">关闭</span>
          </button>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-black mb-4 flex items-center justify-center">
              <iframe
                src={activeFilm.videoUrl}
                title={activeFilm.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-white">
              <h3 className="font-serif-display text-2xl font-light">{activeFilm.title}</h3>
              <div className="text-white/50 text-sm mt-1">
                {activeFilm.year} · {activeFilm.duration}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
