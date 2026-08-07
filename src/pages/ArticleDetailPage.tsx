import type { PressItem, WritingItem, Attachment } from '@/types';

interface ArticleDetailPageProps {
  article: PressItem | WritingItem;
  backLabel: string;
  onBack: () => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function renderAttachments(attachments: Attachment[]) {
  if (!attachments || attachments.length === 0) return null;
  return (
    <div className="mt-16 pt-10 border-t border-border">
      <h3 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-6">
        附件下载
      </h3>
      <div className="flex flex-col gap-3">
        {attachments.map((att, i) => (
          <a
            key={i}
            href={att.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-3 border border-border rounded-sm hover:bg-muted/50 transition-colors"
          >
            <span className="text-lg">📄</span>
            <span className="text-sm font-light group-hover:text-foreground transition-colors">
              {att.fileName}
            </span>
            <span className="ml-auto text-xs text-muted-foreground">下载 →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ArticleDetailPage({ article, backLabel, onBack }: ArticleDetailPageProps) {
  return (
    <div className="page-enter pt-28 md:pt-32">
      <div className="px-6 md:px-10 lg:px-16 max-w-3xl mx-auto">
        {/* Back link */}
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block"
        >
          ← {backLabel}
        </button>

        {/* Article Header */}
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-3xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-muted-foreground font-light">
            <span>{article.author}</span>
            <span className="text-border">|</span>
            <span>{article.media}</span>
            <span className="text-border">|</span>
            <time>{formatDate(article.date)}</time>
          </div>
        </header>

        {/* Article Body */}
        {article.body ? (
          <div className="article-body prose-custom max-w-3xl">
            <div
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </div>
        ) : (
          <div className="max-w-3xl text-muted-foreground font-light leading-relaxed">
            {article.excerpt}
          </div>
        )}

        {/* Attachments */}
        {renderAttachments(article.attachments || [])}

        {/* External Link */}
        {article.url && (
          <div className="mt-12 pt-10 border-t border-border">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              查看原文 →
            </a>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </div>
  );
}
