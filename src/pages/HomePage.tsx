import { useState, useRef, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import type { PageId } from '@/types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSeriesClick: (seriesId: string) => void;
}

const navItems: { id: PageId; label: string; labelEn: string }[] = [
  { id: 'works', label: '摄影', labelEn: 'Photography' },
  { id: 'films', label: '电影', labelEn: 'Films' },
  { id: 'press', label: '媒体', labelEn: 'Press' },
  { id: 'writing', label: '写作', labelEn: 'Writing' },
  { id: 'shop', label: '商店', labelEn: 'Shop' },
  { id: 'about', label: '艺术家介绍', labelEn: 'About' },
  { id: 'contact', label: '联系方式', labelEn: 'Contact' },
];

export default function HomePage({ onNavigate, onSeriesClick }: HomePageProps) {
  const { series, artist } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-select first photo from first series
  const firstSeries = series[0];
  const firstPhoto = firstSeries?.photos?.[0];

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ animation: 'fadeIn 0.8s ease-out' }}
    >
      {/* --- Top bar --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 lg:px-16 h-16 md:h-20">
        {/* Left: English name only, bold gray */}
        <div className="text-lg md:text-xl font-bold tracking-[0.1em] uppercase text-[#888888] select-none">
          {artist.nameEn}
        </div>

        {/* Right: Hamburger menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setMenuOpen(true)}
            className="flex flex-col items-end gap-[6px] py-3 pl-6 group"
            aria-label="菜单"
          >
            <span className={`block h-[2px] bg-[#666666] rounded-full transition-all duration-300 ease-out ${
              menuOpen ? 'w-5 rotate-0' : 'w-7'
            }`} />
            <span className={`block h-[2px] bg-[#666666] rounded-full transition-all duration-300 ease-out ${
              menuOpen ? 'w-4 opacity-0 scale-x-0' : 'w-5 opacity-100'
            }`} />
            <span className={`block h-[2px] bg-[#666666] rounded-full transition-all duration-300 ease-out ${
              menuOpen ? 'w-5 rotate-0' : 'w-4'
            }`} />
          </button>

          {/* Dropdown menu */}
          <div
            onMouseLeave={() => setMenuOpen(false)}
            className={`absolute right-0 top-full mt-3 bg-white/95 backdrop-blur-md shadow-lg border border-[#e0e0e0] py-3 px-1 min-w-[200px] transition-all duration-300 ease-out origin-top-right ${
              menuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="w-full text-left px-5 py-2.5 flex items-center justify-between group/item hover:bg-[#f5f5f5] transition-colors duration-200"
                style={{ animation: menuOpen ? `fadeIn 0.3s ease-out ${i * 0.04}s both` : 'none' }}
              >
                <span className="text-sm tracking-[0.08em] text-[#444444] group-hover/item:text-[#111111] transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#aaaaaa] group-hover/item:text-[#888888] transition-colors">
                  {item.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Centered artwork image --- */}
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

      {/* --- Enter button at bottom --- */}
      <button
        onClick={() => onNavigate('works')}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#999999] hover:text-[#444444] transition-colors flex flex-col items-center gap-3"
      >
        <span>Enter</span>
        <span className="block w-px h-8 bg-[#cccccc]" />
      </button>
    </div>
  );
}
