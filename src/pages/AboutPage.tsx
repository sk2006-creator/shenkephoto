import { useContent } from '@/hooks/useContent';

export default function AboutPage() {
  const { artist } = useContent();
  return (
    <div className="page-enter pt-28 md:pt-32">
      <div className="px-6 md:px-10 lg:px-16">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            阅历
          </h1>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
            About the Artist
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  style={{ animation: 'imageFadeIn 0.8s ease-out' }}
                />
              </div>
              <div className="mt-4">
                <div className="font-serif-display text-2xl font-light">{artist.name}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  {artist.nameEn}
                </div>
                <div className="text-sm text-muted-foreground mt-2 font-light">
                  摄影艺术家 · 杭州 / 柏林
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            {/* Bio */}
            <section className="mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                生平
              </div>
              <div className="space-y-6">
                {artist.bio.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-base leading-relaxed text-foreground/80 font-light"
                    style={{ animation: `imageFadeIn 0.6s ease-out ${i * 0.1}s both` }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                教育
              </div>
              <div className="flex flex-col gap-3">
                {artist.education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-6 border-b border-border pb-3"
                  >
                    <span className="text-sm font-light tabular-nums text-muted-foreground w-16 shrink-0">
                      {edu.year}
                    </span>
                    <span className="text-sm md:text-base font-light">{edu.detail}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Solo Exhibitions */}
            <section className="mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                个展
              </div>
              <div className="flex flex-col gap-3">
                {artist.soloExhibitions.map((ex, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 border-b border-border pb-3"
                  >
                    <span className="col-span-2 text-sm font-light tabular-nums text-muted-foreground">
                      {ex.year}
                    </span>
                    <span className="col-span-5 text-sm md:text-base font-light">{ex.title}</span>
                    <span className="col-span-5 text-sm text-muted-foreground font-light">
                      {ex.venue}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Group Exhibitions */}
            <section className="mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                联展
              </div>
              <div className="flex flex-col gap-3">
                {artist.groupExhibitions.map((ex, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 border-b border-border pb-3"
                  >
                    <span className="col-span-2 text-sm font-light tabular-nums text-muted-foreground">
                      {ex.year}
                    </span>
                    <span className="col-span-5 text-sm md:text-base font-light">{ex.title}</span>
                    <span className="col-span-5 text-sm text-muted-foreground font-light">
                      {ex.venue}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section className="mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                获奖
              </div>
              <div className="flex flex-col gap-3">
                {artist.awards.map((aw, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-6 border-b border-border pb-3"
                  >
                    <span className="text-sm font-light tabular-nums text-muted-foreground w-16 shrink-0">
                      {aw.year}
                    </span>
                    <span className="text-sm md:text-base font-light">{aw.title}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
