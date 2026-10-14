import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Tag, Share2 } from 'lucide-react';
import type { NewsItem } from '@/types';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <Modal isOpen={!!news} onClose={onClose} title={news.title} maxWidth="4xl">
      <div className="space-y-6">
        {/* Featured Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4 text-xs text-slate-500">
          <Badge variant="primary" size="sm">
            {news.category}
          </Badge>
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {news.date}
          </span>
          <span>•</span>
          <span className="font-mono text-slate-400">Slug: /{news.url}</span>
        </div>

        {/* Rich Text Body */}
        <div
          className="prose max-w-none text-slate-800 leading-relaxed text-sm sm:text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + '#' + news.url);
              alert('Tautan berita disalin ke clipboard!');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#7A152E] transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Bagikan Berita Ini
          </button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};
