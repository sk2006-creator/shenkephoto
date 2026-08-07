import { useContent } from '@/hooks/useContent';

export default function WritingPage() {
  const { writingItems } = useContent();
  // Sort by date descending
  const sorted = [...writingItems].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const months = ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return `${d.getFullYear()}年${months[d.getMonth()]}`;
  };

  return (
    <div className="page-enter pt-28 md:pt-32">
      {/* Page Title */}
      <div className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
          写作
        </h1>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
          Writings
        </div>
      </div>

      {/* Writing List */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="flex flex-col">
          {sorted.map((item, index) => (
            <article
              key={item.id}
              className="group border-t border-border last:border-b py-8 md:py-10 hover:bg-muted/40 transition-colors duration-300"
              style={{ animation: `imageFadeIn 0.5s ease-out ${index * 0.04}s both` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Date */}
                <div className="md:col-span-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {formatDate(item.date)}
                  </div>
                </div>

                {/* Title + Excerpt */}
                <div className="md:col-span-7">
                  <h2 className="text-lg md:text-xl font-light leading-snug group-hover:text-foreground transition-colors">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light max-w-2xl">
                      {item.excerpt}
                    </p>
                  )}
                </div>

                {/* Author + Media */}
                <div className="md:col-span-3 md:text-right">
                  <div className="text-sm font-light">{item.author}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.media}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-xs text-muted-foreground font-light">
          共 {sorted.length} 篇文章 · 按日期倒序排列
        </div>
      </div>
    </div>
  );
}
