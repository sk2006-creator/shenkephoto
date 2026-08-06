import type { PageId } from '@/types';
import { artist } from '@/data/artist';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Artist */}
          <div>
            <div className="font-serif-display text-xl font-medium">{artist.name}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
              {artist.nameEn}
            </div>
            <div className="text-sm text-muted-foreground mt-4 leading-relaxed">
              当代摄影 · 以影像回应社会问题
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              导航
            </div>
            <div className="flex flex-col gap-2">
              {([
                { id: 'works', label: '作品' },
                { id: 'press', label: '印刷与传播' },
                { id: 'shop', label: '商店' },
                { id: 'films', label: '影片' },
                { id: 'about', label: '艺术家介绍' },
                { id: 'contact', label: '联系方式' },
              ] as { id: PageId; label: string }[]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left w-fit"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              联系
            </div>
            <a
              href={`mailto:${artist.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
            >
              {artist.email}
            </a>
            <div className="text-sm text-muted-foreground mt-2">
              杭州 · 柏林
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {artist.name}. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Site design · contemporary minimalist
          </div>
        </div>
      </div>
    </footer>
  );
}
