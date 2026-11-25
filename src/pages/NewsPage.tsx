import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMSData } from '@/context/CMSDataContext';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  ArchitecturalStagger,
  ArchitecturalStaggerItem,
  ARCHITECTURAL_EASE,
} from '@/components/ui/MotionPrimitives';
import { Calendar, ArrowLeft, Share2, Copy, Check, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import type { NewsItem } from '@/types';

interface NewsPageProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

const ARCHIVE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, currentPath = '/news' }) => {
  const { newsList } = useCMSData();
  const visibleNews = useMemo(() => newsList.filter((n) => n.visibility), [newsList]);

  // Extract article slug if currentPath is /news/:slug
  const activeSlug = useMemo(() => {
    if (currentPath.startsWith('/news/') && currentPath.length > 6) {
      return currentPath.replace('/news/', '').trim();
    }
    return null;
  }, [currentPath]);

  // Find currently selected article by slug
  const activeArticle = useMemo(() => {
    if (!activeSlug) return null;
    return visibleNews.find((item) => item.url === activeSlug || item.id === activeSlug) || null;
  }, [activeSlug, visibleNews]);

  // Category and Year filtering states
  // Categories: 'News' | 'Press Release' | 'All'
  const [selectedCategory, setSelectedCategory] = useState<'News' | 'Press Release'>('News');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(2026);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync category and year if viewing an article
  useEffect(() => {
    if (activeArticle) {
      const year = new Date(activeArticle.date).getFullYear();
      if (!isNaN(year)) {
        setSelectedYear(year);
      }
      if (activeArticle.category.toLowerCase().includes('press') || activeArticle.category.toLowerCase().includes('release')) {
        setSelectedCategory('Press Release');
      } else {
        setSelectedCategory('News');
      }
    }
  }, [activeArticle]);

  // Format date helper: "15 Januari 2026"
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

  // Filtered news items for the right grid
  const filteredNews = useMemo(() => {
    return visibleNews.filter((item) => {
      // 1. Category filter
      const catLower = item.category.toLowerCase();
      let matchesCategory = false;
      if (selectedCategory === 'Press Release') {
        matchesCategory = catLower.includes('press') || catLower.includes('release') || catLower.includes('siaran');
      } else {
        matchesCategory = !catLower.includes('press') && !catLower.includes('release');
      }

      // 2. Year filter
      let matchesYear = true;
      if (selectedYear !== 'all') {
        const itemYear = new Date(item.date).getFullYear();
        matchesYear = itemYear === selectedYear;
      }

      return matchesCategory && matchesYear;
    });
  }, [visibleNews, selectedCategory, selectedYear]);

  // Category total count helpers
  const countByCategory = (cat: 'News' | 'Press Release') => {
    return visibleNews.filter((item) => {
      const catLower = item.category.toLowerCase();
      if (cat === 'Press Release') {
        return catLower.includes('press') || catLower.includes('release') || catLower.includes('siaran');
      }
      return !catLower.includes('press') && !catLower.includes('release');
    }).length;
  };

  // Navigation handlers
  const handleSelectArticle = (item: NewsItem) => {
    onNavigate(`/news/${item.url}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    onNavigate('/news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: 'News' | 'Press Release') => {
    setSelectedCategory(cat);
    if (activeArticle) {
      onNavigate('/news');
    }
  };

  const handleYearClick = (year: number | 'all') => {
    setSelectedYear(year);
    if (activeArticle) {
      onNavigate('/news');
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success('Tautan artikel berhasil disalin!');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      toast.error('Gagal menyalin tautan');
    });
  };

  return (
    <div className="bg-white text-left selection:bg-[#8B1E24] selection:text-white">
      {/* 1. Header Banner with Architectural Visual Backdrop */}
      <PageHeader
        category="Publikasi & Media Rilis"
        title="Kabar & Siaran Pers"
        description="Pusat rilis media resmi, wawasan keberlanjutan ESG, dan perkembangan korporat PT Halla Mohana di bawah naungan MahaDasha & TMT Group."
        breadcrumbs={
          activeArticle
            ? [
                { label: 'Beranda', href: '/' },
                { label: 'Kabar & Siaran Pers', href: '/news' },
                { label: activeArticle.title },
              ]
            : [
                { label: 'Beranda', href: '/' },
                { label: 'Kabar & Siaran Pers' },
              ]
        }
        imageUrl="/images/New-Asset/Hotel/Restaurant%202.png"
        onNavigate={onNavigate}
      />

      {/* 2. Main 2-Column Container (Sidebar Filter + Content Area) */}
      <section className="py-12 sm:py-16 bg-[#FFFFFF] border-b border-[#E5E5E5] min-h-[700px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ======================================================== */}
            {/* LEFT SIDEBAR (Col 1: ~25% width on desktop)              */}
            {/* Follows Pakuwon News reference layout                     */}
            {/* ======================================================== */}
            <aside className="lg:col-span-3 xl:col-span-3">
              {/* Desktop Sticky Sidebar */}
              <div className="hidden lg:block sticky top-28 space-y-6 select-none">
                <div className="space-y-4">
                  {/* Category: Press Release */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick('Press Release')}
                      className={`w-full flex items-center justify-between text-left py-2 font-semibold text-base transition-colors group cursor-pointer ${
                        selectedCategory === 'Press Release'
                          ? 'text-[#141414]'
                          : 'text-stone-600 hover:text-[#8B1E24]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#8B1E24] text-xs font-bold">
                          {selectedCategory === 'Press Release' ? '▼' : '▶'}
                        </span>
                        <span>Press Release</span>
                      </span>
                      <span className="text-xs text-stone-400 font-normal">
                        ({countByCategory('Press Release')})
                      </span>
                    </button>

                    {/* Sub-years for Press Release when active */}
                    {selectedCategory === 'Press Release' && (
                      <div className="ml-5 mt-2 pl-2 border-l border-stone-200 space-y-1">
                        <button
                          onClick={() => handleYearClick('all')}
                          className={`block w-full text-left py-1 text-xs transition-colors cursor-pointer ${
                            selectedYear === 'all'
                              ? 'border-l-2 border-[#8B1E24] -ml-[9px] pl-3 text-[#8B1E24] font-bold'
                              : 'text-stone-500 hover:text-[#8B1E24]'
                          }`}
                        >
                          Semua Tahun
                        </button>
                        {ARCHIVE_YEARS.slice(0, 5).map((yr) => (
                          <button
                            key={yr}
                            onClick={() => handleYearClick(yr)}
                            className={`block w-full text-left py-1 text-xs transition-colors cursor-pointer ${
                              selectedYear === yr
                                ? 'border-l-2 border-[#8B1E24] -ml-[9px] pl-3 text-[#8B1E24] font-bold'
                                : 'text-stone-600 hover:text-[#8B1E24]'
                            }`}
                          >
                            {yr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Category: News */}
                  <div>
                    <button
                      onClick={() => handleCategoryClick('News')}
                      className={`w-full flex items-center justify-between text-left py-2 font-semibold text-base transition-colors group cursor-pointer ${
                        selectedCategory === 'News'
                          ? 'text-[#141414]'
                          : 'text-stone-600 hover:text-[#8B1E24]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#8B1E24] text-xs font-bold">
                          {selectedCategory === 'News' ? '▼' : '▶'}
                        </span>
                        <span>News</span>
                      </span>
                      <span className="text-xs text-stone-400 font-normal">
                        ({countByCategory('News')})
                      </span>
                    </button>

                    {/* Archive Years Indented under News */}
                    {selectedCategory === 'News' && (
                      <div className="ml-5 mt-2 pl-2 border-l border-stone-200 space-y-1.5">
                        <button
                          onClick={() => handleYearClick('all')}
                          className={`block w-full text-left py-1 text-xs transition-colors cursor-pointer ${
                            selectedYear === 'all'
                              ? 'border-l-2 border-[#8B1E24] -ml-[9px] pl-3 text-[#8B1E24] font-bold'
                              : 'text-stone-500 hover:text-[#8B1E24]'
                          }`}
                        >
                          Semua Arsip Berita
                        </button>
                        {ARCHIVE_YEARS.map((yr) => {
                          const isActive = selectedYear === yr;
                          return (
                            <button
                              key={yr}
                              onClick={() => handleYearClick(yr)}
                              className={`block w-full text-left py-1 text-xs tracking-wider transition-colors cursor-pointer ${
                                isActive
                                  ? 'border-l-2 border-[#8B1E24] -ml-[9px] pl-3 text-[#8B1E24] font-bold'
                                  : 'text-stone-600 hover:text-[#8B1E24]'
                              }`}
                            >
                              {yr}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Corporate Trust Badge */}
                <div className="pt-6 border-t border-[#E5E5E5] text-xs text-stone-500 space-y-1.5">
                  <p className="font-semibold text-stone-800">Media &amp; Publikasi Resmi</p>
                  <p className="text-[11px] leading-relaxed text-stone-400">
                    Setiap rilis informasi diverifikasi oleh Divisi Komunikasi Korporat PT Halla Mohana &amp; MahaDasha Group.
                  </p>
                </div>
              </div>

              {/* Mobile / Tablet Horizontal Filter Strip */}
              <div className="block lg:hidden space-y-3 pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCategoryClick('Press Release')}
                    className={`flex-1 py-2 text-xs font-semibold text-center rounded border transition-colors cursor-pointer ${
                      selectedCategory === 'Press Release'
                        ? 'border-[#8B1E24] bg-[#8B1E24] text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    Press Release ({countByCategory('Press Release')})
                  </button>
                  <button
                    onClick={() => handleCategoryClick('News')}
                    className={`flex-1 py-2 text-xs font-semibold text-center rounded border transition-colors cursor-pointer ${
                      selectedCategory === 'News'
                        ? 'border-[#8B1E24] bg-[#8B1E24] text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    News ({countByCategory('News')})
                  </button>
                </div>

                {/* Horizontal Scrollable Years for Mobile */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => handleYearClick('all')}
                    className={`px-3 py-1.5 rounded text-xs shrink-0 cursor-pointer font-medium transition-colors ${
                      selectedYear === 'all'
                        ? 'bg-[#8B1E24] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Semua Tahun
                  </button>
                  {ARCHIVE_YEARS.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => handleYearClick(yr)}
                      className={`px-3 py-1.5 rounded text-xs shrink-0 cursor-pointer font-medium transition-colors ${
                        selectedYear === yr
                          ? 'bg-[#8B1E24] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ======================================================== */}
            {/* RIGHT CONTENT AREA (Col 2: ~75% width on desktop)        */}
            {/* Swaps between Grid List or Full Article Detail View      */}
            {/* ======================================================== */}
            <main className="lg:col-span-9 xl:col-span-9">
              <AnimatePresence mode="wait">
              {activeArticle ? (
                /* ---------------------------------------------------- */
                /* ARTICLE DETAIL VIEW (Matches Screenshot 2 Layout)    */
                /* ---------------------------------------------------- */
                <motion.article
                  key={`detail-${activeArticle.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
                  className="space-y-6"
                >
                  {/* Back to List Navigation */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                    <button
                      onClick={handleBackToGrid}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E24] hover:underline cursor-pointer group"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Kembali ke Semua {selectedCategory}
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#8B1E24] cursor-pointer"
                      title="Salin tautan artikel"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Salin Tautan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Article Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141414] tracking-tight leading-tight">
                    {activeArticle.title}
                  </h1>

                  {/* Date Meta (e.g. Date : 15 January 2026) */}
                  <div className="flex items-center gap-2 text-xs text-[#52525B] font-medium">
                    <span className="text-[#141414]">Date : {formatDate(activeArticle.date)}</span>
                    <span>•</span>
                    <span className="text-[#8B1E24] font-semibold uppercase tracking-wider">
                      {activeArticle.category}
                    </span>
                  </div>

                  {/* Large Featured Photograph Frame */}
                  <div className="overflow-hidden rounded border border-[#E5E5E5] bg-stone-100 shadow-2xs">
                    <img
                      src={activeArticle.imageUrl}
                      alt={activeArticle.title}
                      className="w-full h-auto max-h-[620px] object-cover"
                    />
                  </div>

                  {/* Rich Article Body Content */}
                  <div
                    className="prose prose-stone max-w-none text-base text-[#52525B] leading-relaxed space-y-4 pt-2"
                    dangerouslySetInnerHTML={{ __html: activeArticle.description }}
                  />

                  {/* Bottom Corporate Signature & Action Bar */}
                  <div className="pt-8 mt-10 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-stone-400">
                      <span>Diterbitkan oleh PT Halla Mohana (MahaDasha &amp; TMT Group)</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                      >
                        <Share2 className="h-3.5 w-3.5 text-stone-500" />
                        Bagikan Rilis
                      </button>
                      <button
                        onClick={handleBackToGrid}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#8B1E24] hover:bg-[#72181D] rounded transition-colors cursor-pointer"
                      >
                        Lihat Berita Lainnya
                      </button>
                    </div>
                  </div>
                </motion.article>
              ) : (
                /* ---------------------------------------------------- */
                /* GRID VIEW (Matches Screenshot 1 Layout)             */
                /* ---------------------------------------------------- */
                <motion.div
                  key={`grid-${selectedCategory}-${selectedYear}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
                  className="space-y-6"
                >
                  {/* Filter Status Subhead */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-2 text-xs text-[#52525B]">
                      <span className="font-semibold text-[#141414] uppercase tracking-wider">
                        {selectedCategory}
                      </span>
                      <span>•</span>
                      <span>
                        {selectedYear === 'all' ? 'Semua Tahun' : `Tahun ${selectedYear}`}
                      </span>
                      <span className="text-stone-400">
                        ({filteredNews.length} Publikasi)
                      </span>
                    </div>

                    {selectedYear !== 'all' && (
                      <button
                        onClick={() => handleYearClick('all')}
                        className="text-xs text-[#8B1E24] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Tampilkan Semua
                      </button>
                    )}
                  </div>

                  {/* Square Card Grid (2 Columns on Desktop) */}
                  {filteredNews.length > 0 ? (
                    <ArchitecturalStagger className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.07}>
                      {filteredNews.map((item) => (
                        <ArchitecturalStaggerItem key={item.id}>
                          <motion.article
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                            onClick={() => handleSelectArticle(item)}
                            className="group relative aspect-square w-full overflow-hidden rounded border border-[#E5E5E5] bg-stone-900 cursor-pointer shadow-2xs hover:border-[#8B1E24] transition-colors duration-300"
                          >
                            {/* Full Background Photograph */}
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Gradient Overlays for High-Contrast Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 group-hover:from-black/98 transition-colors" />

                            {/* Top Header Tag inside Card */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/90">
                              <span className="text-[11px] font-medium tracking-widest uppercase text-white/80">
                                PT Halla Mohana
                              </span>
                              <span className="text-[10px] tracking-wider uppercase bg-black/55 px-2 py-0.5 rounded text-white/95">
                                {item.category}
                              </span>
                            </div>

                            {/* Bottom Typography & Title Overlay inside Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-2 text-white">
                              <p className="text-[11px] text-white/70 font-medium tracking-wide">
                                {formatDate(item.date)}
                              </p>

                              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-snug group-hover:text-red-100 transition-colors line-clamp-3">
                                {item.title}
                              </h3>

                              <div className="pt-2 flex items-center text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                                <span className="inline-flex items-center gap-1.5 group-hover:underline">
                                  Baca Rilis Lengkap <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </div>
                          </motion.article>
                        </ArchitecturalStaggerItem>
                      ))}
                    </ArchitecturalStagger>
                  ) : (
                    /* Empty Archive State */
                    <div className="py-20 text-center space-y-4 border border-dashed border-[#E5E5E5] rounded bg-[#F7F7F5]">
                      <div className="max-w-md mx-auto space-y-2 px-4">
                        <p className="text-sm font-semibold text-[#141414]">
                          Belum ada publikasi pada arsip tahun {selectedYear}.
                        </p>
                        <p className="text-xs text-[#52525B] leading-relaxed">
                          Silakan pilih tahun arsip lainnya atau klik tombol di bawah untuk melihat seluruh arsip {selectedCategory}.
                        </p>
                        <div className="pt-3">
                          <button
                            onClick={() => handleYearClick('all')}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#8B1E24] hover:bg-[#72181D] rounded transition-colors cursor-pointer"
                          >
                            Tampilkan Semua Tahun ({countByCategory(selectedCategory)})
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};