import { useState, useEffect } from 'react';
import type { PageId } from '@/types';
import { useContent } from '@/hooks/useContent';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { id: PageId; label: string; labelEn: string }[] = [
  { id: 'works', label: '摄影', labelEn: 'Photography' },
  { id: 'films', label: '电影', labelEn: 'Films' },
  { id: 'press', label: '媒体', labelEn: 'Press' },
  { id: 'writing', label: '写作', labelEn: 'Writing' },
  { id: 'shop', label: '商店', labelEn: 'Shop' },
  { id: 'about', label: '阅历', labelEn: 'About' },
  { id: 'contact', label: '联络', labelEn: 'Contact' },
];

/** Map detail pages back to their parent nav item */
function getParentPage(page: PageId): PageId {
  if (page === 'pressDetail') return 'press';
  if (page === 'writingDetail') return 'writing';
  return page;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { artist } = useContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  const activeParent = getParentPage(currentPage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20">
          {/* Logo / Artist Name */}
          <button
            onClick={() => handleNav('home')}
            className="text-left group"
          >
            <div className="font-serif-display text-xl md:text-2xl font-medium tracking-wide leading-none text-foreground">
              {artist.name}
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
              {artist.nameEn}
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link ${activeParent === item.id ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <span className={`block w-5 h-px bg-foreground transition-transform duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-foreground transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-foreground transition-transform duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white md:hidden flex flex-col items-center justify-center gap-6"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-lg tracking-[0.15em] transition-colors ${
                activeParent === item.id ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}
              style={{ animation: `pageEnter 0.4s ease-out ${i * 0.05}s both` }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
