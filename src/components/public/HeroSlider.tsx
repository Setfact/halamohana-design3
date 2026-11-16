import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { ChevronLeft, ChevronRight, ArrowRight, Building2 } from 'lucide-react';

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
    if (title.includes('Kawasan') || title.includes('Terpadu') || title.includes('Commercial')) return 'Kawasan Terpadu';
    return `Destinasi ${index + 1}`;
  };

  return (
    <section id="home" className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] w-full overflow-hidden bg-[#0F1117] text-left">
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
          {/* Subtle luxury architectural overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#0F1117]/60 to-[#0F1117]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/90 via-transparent to-[#0F1117]/30" />
        </div>
      ))}

      {/* Main Content Stage */}
      <div className="relative z-20 mx-auto flex min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] max-w-7xl flex-col justify-between px-4 sm:px-8 py-12 sm:py-20 text-white">
        {/* Lineage Text (No Pill Badge) */}
        <div className="pt-2">
          <p className="text-xs tracking-widest uppercase text-stone-300 font-medium">
            Member of MahaDasha • PT Tiara Marga Trakindo
          </p>
        </div>

        {/* Center Editorial Hero Content */}
        <div className="my-auto max-w-3xl space-y-6 pt-6 pb-6">
          <div className="space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-400 font-medium">
              Hospitality &amp; Commercial Real Estate
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] tracking-tight text-white">
              {currentBanner.title}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal">
            {currentBanner.subtitle}
          </p>

          {/* Action CTAs (Precision Architectural Buttons) */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="/projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/projects');
                }
              }}
              className="inline-flex items-center gap-2.5 rounded-md bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-6 py-3.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              <span>Explore Projects</span>
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
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 hover:bg-white/15 text-white px-6 py-3.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
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
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-white text-[#141414] border border-white'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
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
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 border border-white/20 text-white hover:bg-[#8B1E24] hover:border-[#8B1E24] transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 border border-white/20 text-white hover:bg-[#8B1E24] hover:border-[#8B1E24] transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
