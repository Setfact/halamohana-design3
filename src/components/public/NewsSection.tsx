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

  const featured = visibleNews[0];
  const others = visibleNews.slice(1);

  return (
    <section id="news" className="py-20 sm:py-28 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Header - Direct, Clean */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Kabar Terbaru & Siaran Pers
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Ikuti perkembangan terkini mengenai ekspansi proyek properti, penghargaan, dan inisiatif keberlanjutan PT Halla Mohana.
            </p>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleNews.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300"
            >
              <div>
                {/* Article Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-md bg-stone-950/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Article Meta & Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[#A68253]" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider text-[10px] text-stone-500">Siaran Resmi</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#7A152E] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {item.description ? item.description.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : ''}
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="p-6 pt-0 mt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#7A152E] group-hover:underline inline-flex items-center gap-1">
                  Baca Selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-mono text-stone-400">/{item.url}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </section>
  );
};
