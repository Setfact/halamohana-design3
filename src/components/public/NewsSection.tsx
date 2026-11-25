import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMSData } from '@/context/CMSDataContext';
import { Calendar, ArrowRight } from 'lucide-react';
import { NewsDetailModal } from './NewsDetailModal';
import {
  ArchitecturalReveal,
  ArchitecturalStagger,
  ArchitecturalStaggerItem,
  ARCHITECTURAL_EASE,
} from '@/components/ui/MotionPrimitives';
import type { NewsItem } from '@/types';

interface NewsSectionProps {
  onNavigate?: (path: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const { newsList } = useCMSData();
  const visibleNews = newsList.filter((n) => n.visibility);
  const latestNews = visibleNews.slice(0, 3);

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (visibleNews.length === 0) return null;

  const handleItemClick = (e: React.MouseEvent<HTMLElement>, item: NewsItem) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/news/${item.url}`);
    } else {
      setSelectedNews(item);
    }
  };

  const handleViewAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/news');
    }
  };

  // Helper date formatter
  const formatDate = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
      ];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="news" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <ArchitecturalReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Publikasi &amp; Kabar Terkini
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
                Siaran Pers &amp; Berita Terbaru
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed pt-1">
                Ikuti perkembangan terkini seputar ekspansi properti, komitmen keberlanjutan ESG, serta inisiatif korporat PT Halla Mohana.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="/news"
                onClick={handleViewAll}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors group cursor-pointer"
              >
                <span>Lihat Seluruh Publikasi</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </ArchitecturalReveal>

        {/* 3-Column Editorial News Grid */}
        <ArchitecturalStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.09}>
          {latestNews.map((item) => (
            <ArchitecturalStaggerItem key={item.id}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
                onClick={(e) => handleItemClick(e, item)}
                className="group cursor-pointer h-full flex flex-col justify-between rounded-lg border border-[#E5E5E5] bg-white overflow-hidden shadow-2xs hover:border-[#8B1E24] hover:shadow-md transition-colors duration-300"
              >
                <div>
                  {/* 16:9 Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded bg-[#141414]/90 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Meta & Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#52525B] font-medium">
                      <Calendar className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>{formatDate(item.date)}</span>
                      <span>•</span>
                      <span className="uppercase tracking-wider text-[10px] text-neutral-400">Siaran Resmi</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-[#141414] group-hover:text-[#8B1E24] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2 pt-0.5">
                      {item.description ? item.description.replace(/<[^>]+>/g, '').slice(0, 130) + '...' : ''}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-3 mt-1 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8B1E24] group-hover:underline inline-flex items-center gap-1.5">
                    Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">/{item.url}</span>
                </div>
              </motion.article>
            </ArchitecturalStaggerItem>
          ))}
        </ArchitecturalStagger>
      </div>

      {/* Fallback Detail Modal if no onNavigate */}
      {!onNavigate && (
        <NewsDetailModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
};