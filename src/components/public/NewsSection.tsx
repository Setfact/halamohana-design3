import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { NewsDetailModal } from './NewsDetailModal';
import type { NewsItem } from '@/types';

export const NewsSection: React.FC = () => {
  const { newsList } = useCMSData();
  const visibleNews = newsList.filter((n) => n.visibility);

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (visibleNews.length === 0) return null;

  return (
    <section id="news" className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Publikasi &amp; Kabar Terkini
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
              Siaran Pers &amp; Berita Terbaru
            </h2>
            <p className="text-base text-[#52525B] leading-relaxed pt-1">
              Ikuti perkembangan terkini mengenai ekspansi proyek properti, agenda operasional, serta inisiatif korporat PT Halla Mohana.
            </p>
          </div>
        </div>

        {/* 3-Column Editorial News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer flex flex-col justify-between rounded-lg border border-[#E5E5E5] bg-white overflow-hidden shadow-2xs hover:border-[#8B1E24] transition-colors"
            >
              <div>
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded bg-[#141414]/85 px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Article Meta & Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#52525B] font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[#8B1E24]" />
                    <span>{item.date}</span>
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
                  Baca Selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-mono text-neutral-400">/{item.url}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </section>
  );
};
