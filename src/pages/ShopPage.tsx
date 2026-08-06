import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import type { ShopItem } from '@/types';

const categories = [
  { id: 'all', label: '全部', labelEn: 'All' },
  { id: 'book', label: '书籍', labelEn: 'Books' },
  { id: 'print', label: '限量作品', labelEn: 'Prints' },
  { id: 'merchandise', label: '延伸产品', labelEn: 'Merchandise' },
] as const;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { shopItems } = useContent();

  const filtered = activeCategory === 'all'
    ? shopItems
    : shopItems.filter((item) => item.category === activeCategory);

  return (
    <div className="page-enter pt-28 md:pt-32">
      {/* Page Title */}
      <div className="px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
          商店
        </h1>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
          Shop
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 md:px-10 lg:px-16 mb-12">
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative ${
                activeCategory === cat.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Shop Grid */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((item: ShopItem, index) => (
            <div
              key={item.id}
              className="group"
              style={{ animation: `imageFadeIn 0.5s ease-out ${index * 0.06}s both` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-muted aspect-[4/5] mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {item.edition && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-foreground">
                    {item.edition}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-light leading-snug">{item.title}</h3>
                  <div className="text-sm font-light whitespace-nowrap tabular-nums">
                    {item.currency}{item.price}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {categories.find((c) => c.id === item.category)?.labelEn}
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-light line-clamp-2">
                  {item.description}
                </p>

                {/* Buy button */}
                <button className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group/btn">
                  查看详情
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
