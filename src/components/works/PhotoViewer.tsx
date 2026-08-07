import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Grid3x3, X } from 'lucide-react';
import type { Photo } from '@/types';

interface PhotoViewerProps {
  photos: Photo[];
  initialIndex: number;
  seriesTitle: string;
  onClose: () => void;
}

export default function PhotoViewer({
  photos,
  initialIndex,
  seriesTitle,
  onClose,
}: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mode, setMode] = useState<'carousel' | 'thumbnails'>('carousel');
  const [imageLoaded, setImageLoaded] = useState(false);

  const goNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToPhoto = (index: number) => {
    setImageLoaded(false);
    setCurrentIndex(index);
    setMode('carousel');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mode === 'thumbnails') {
          setMode('carousel');
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && mode === 'carousel') {
        goNext();
      } else if (e.key === 'ArrowLeft' && mode === 'carousel') {
        goPrev();
      } else if (e.key === 'g' || e.key === 'G') {
        setMode((m) => (m === 'carousel' ? 'thumbnails' : 'carousel'));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, goNext, goPrev, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-8 py-4 text-white/60">
        <div className="text-xs uppercase tracking-[0.2em]">
          {seriesTitle}
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMode(mode === 'carousel' ? 'thumbnails' : 'carousel')}
            className="hover:text-white transition-colors flex items-center gap-2 group"
            aria-label="缩略图视图"
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] hidden md:inline group-hover:text-white transition-colors">
              {mode === 'carousel' ? '缩略图' : '返回单图'}
            </span>
          </button>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors flex items-center gap-2 group"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] hidden md:inline group-hover:text-white transition-colors">
              关闭
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {mode === 'carousel' ? (
        <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 md:px-20 pb-8">
          {/* Previous Button */}
          <button
            onClick={goPrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
            aria-label="上一张"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          {/* Image */}
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <div
              className="relative"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              )}
              <img
                key={currentPhoto.id}
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className={`max-w-full transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: 'calc(100vh - 200px)' }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Caption */}
            <div
              className={`mt-4 md:mt-6 text-center transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-sm md:text-base font-light">
                {currentPhoto.title}
              </div>
              {currentPhoto.caption && (
                <div className="text-white/40 text-xs mt-1">
                  {currentPhoto.caption}
                </div>
              )}
              <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-3">
                {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
            aria-label="下一张"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      ) : (
        /* Thumbnail Grid View */
        <div className="flex-1 overflow-y-auto thumbnail-scroll px-6 md:px-10 lg:px-16 pb-8">
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6">
            全部 {photos.length} 张 · 点击查看
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToPhoto(index)}
                className={`group relative overflow-hidden bg-white/5 transition-all duration-300 ${
                  index === currentIndex ? 'ring-1 ring-white/50' : 'hover:ring-1 hover:ring-white/20'
                }`}
                style={{ animation: `imageFadeIn 0.4s ease-out ${index * 0.03}s both` }}
              >
                <div className="aspect-square flex items-center justify-center p-2">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-[10px] truncate">{photo.title}</div>
                  <div className="text-white/40 text-[9px] mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                {index === currentIndex && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-black text-[9px] font-medium">
                      {index + 1}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom hint */}
      {mode === 'carousel' && (
        <div className="hidden md:flex items-center justify-center pb-4 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          ← → 切换 · G 缩略图 · ESC 关闭
        </div>
      )}
    </div>
  );
}
