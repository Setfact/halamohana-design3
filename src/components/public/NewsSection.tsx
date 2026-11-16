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
    <section id="news" className="py-24 sm:py-32 bg-[#F8F9FA] border-b border-stone-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Publikasi & Kabar Terkini
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Siaran Pers & Berita Terbaru
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Ikuti perkembangan terkini mengenai ekspansi proyek properti, penghargaan, serta inisiatif keberlanjutan PT Halla Mohana.
            </p>
          </div>
        </div>

        {/* 3-Column Editorial News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleNews.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300"
            >
              <div>
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="rounded-full bg-stone-950/80 backdrop-blur-xs px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Article Meta & Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[#8B1E24]" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider text-[10px] text-stone-500">Siaran Resmi</span>
                  </div>

                  {/* Title max 2 lines */}
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#8B1E24] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 pt-0.5">
                    {item.description ? item.description.replace(/<[^>]+>/g, '').slice(0, 130) + '...' : ''}
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="p-6 pt-0 mt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8B1E24] group-hover:underline inline-flex items-center gap-1.5">
                  Baca Selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-mono text-stone-400">/{item.url}</span>
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
