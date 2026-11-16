import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { ChevronLeft, ChevronRight, ArrowRight, Building2, Sparkles } from 'lucide-react';

interface HeroSliderProps {
  onNavigate?: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const { banners } = useCMSData();
  const visibleBanners = banners.filter((b) => b.visibility).sort((a, b) => a.order - b.order);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play timer
  useEffect(() => {
    if (visibleBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleBanners.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [visibleBanners.length]);

  if (visibleBanners.length === 0) return null;

  const currentBanner = visibleBanners[currentIndex] || visibleBanners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleBanners.length) % visibleBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleBanners.length);
  };

  const getDestinationLabel = (title: string, index: number) => {
    if (title.includes('FOX')) return 'FOX Harris Hotel';
    if (title.includes('Xchange') || title.includes('PX')) return 'Pekanbaru Xchange';
    if (title.includes('TMT') || title.includes('Commercial')) return 'Gedung TMT Cilandak';
    return `Destinasi Unggulan ${index + 1}`;
  };

  return (
    <section id="home" className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] w-full overflow-hidden bg-stone-950">
      {/* Background Slides with Soft Vignette Overlay */}
      {visibleBanners.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="h-full w-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
          {/* Subtle luxury overlay: gentle gradient for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/25" />
        </div>
      ))}

      {/* Main Content Stage */}
      <div className="relative z-20 mx-auto flex min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] max-w-7xl flex-col justify-between px-4 sm:px-8 py-12 sm:py-20 text-white">
        {/* Affiliate Subtitle Lineage */}
        <div className="flex items-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-stone-900/60 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-stone-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24]" />
            <span>Member of MahaDasha (PT Tiara Marga Trakindo)</span>
          </span>
        </div>

        {/* Center Editorial Hero Content */}
        <div className="my-auto max-w-3xl space-y-6 pt-6 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-stone-300">
              Luxury Hospitality & Commercial Real Estate
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-white drop-shadow-md">
              {currentBanner.title}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
            {currentBanner.subtitle}
          </p>

          {/* Action CTAs (Pill Buttons) */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="/projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/projects');
                }
              }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-7 py-3.5 text-sm font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              <span>{currentBanner.ctaText || 'Jelajahi Portofolio'}</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/about"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/about');
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/15 backdrop-blur-xs text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-all cursor-pointer"
            >
              <span>Tentang Halla Mohana</span>
            </a>
          </div>
        </div>

        {/* Bottom Destination Quick Switcher Tabs */}
        <div className="border-t border-white/15 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Quick Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {visibleBanners.map((banner, i) => {
                const isCurrent = i === currentIndex;
                const label = banner.shortTitle || getDestinationLabel(banner.title, i);

                return (
                  <button
                    key={banner.id || i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white text-stone-950 shadow-md ring-2 ring-[#8B1E24]'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white backdrop-blur-xs'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isCurrent ? 'bg-[#8B1E24]' : 'bg-stone-400'
                      }`}
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#8B1E24] hover:border-[#8B1E24] transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#8B1E24] hover:border-[#8B1E24] transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
