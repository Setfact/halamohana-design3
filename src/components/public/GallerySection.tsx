import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Images, Maximize2, X, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { GalleryItem } from '@/types';

export const GallerySection: React.FC = () => {
  const { gallery } = useCMSData();
  const visibleItems = gallery.filter((g) => g.visibility);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(visibleItems.map((g) => g.category)))];

  const filteredGallery =
    activeCategory === 'All'
      ? visibleItems
      : visibleItems.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F9FAFB] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header - Direct, Clean */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Dokumentasi Properti & Fasilitas
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Arsip visual fasilitas perhotelan, ruang publik mall, serta agenda penting korporat PT Halla Mohana.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-[#7A152E] text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {cat === 'All' ? 'Semua Album' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xs hover:shadow-xl transition-all"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity p-5 flex flex-col justify-end">
                <div className="space-y-1.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-300">{item.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug drop-shadow-xs line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Zoom Icon indicator */}
              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lightbox Photo */}
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={lightboxItem.imageUrl || lightboxItem.thumbnail}
                alt={lightboxItem.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Lightbox Info */}
            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Badge variant="primary" size="sm">
                  {lightboxItem.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {lightboxItem.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{lightboxItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
