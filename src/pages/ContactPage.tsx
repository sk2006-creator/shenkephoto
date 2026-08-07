import { useContent } from '@/hooks/useContent';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { artist, contactInfo } = useContent();
  return (
    <div className="page-enter pt-28 md:pt-32 min-h-screen flex items-center">
      <div className="px-6 md:px-10 lg:px-16 w-full">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            联络
          </h1>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
            Contact
          </div>
        </div>

        <div className="max-w-3xl">
          {/* Email */}
          <div
            className="mb-16"
            style={{ animation: 'imageFadeIn 0.6s ease-out 0.1s both' }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              电子邮箱
            </div>
            <a
              href={`mailto:${artist.email}`}
              className="inline-flex items-center gap-4 font-serif-display text-3xl md:text-5xl font-light tracking-tight hover:text-muted-foreground transition-colors group"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              {artist.email}
            </a>
          </div>

          {/* Studio Location */}
          <div
            className="mb-16"
            style={{ animation: 'imageFadeIn 0.6s ease-out 0.2s both' }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              工作室
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
              <div className="space-y-2">
                <div className="text-lg font-light">{contactInfo.studioLocation}</div>
                <div className="text-sm text-muted-foreground font-light">
                  {contactInfo.studioNote}
                </div>
              </div>
            </div>
          </div>

          {/* Representation */}
          <div
            className="mb-16"
            style={{ animation: 'imageFadeIn 0.6s ease-out 0.3s both' }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              代理与合作
            </div>
            <div className="space-y-3">
              {contactInfo.galleries.map((g, i) => (
                <div key={i} className="text-base font-light">
                  {g.name}
                  <span className="text-muted-foreground text-sm ml-3">{g.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Media Inquiries */}
          <div
            style={{ animation: 'imageFadeIn 0.6s ease-out 0.4s both' }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              媒体咨询
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-lg">
              {contactInfo.mediaInquiry}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
