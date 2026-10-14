import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    }, 7000);
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

  const slideShortTitles = [
    'FOX Harris Hotel',
    'Pekanbaru Xchange',
    'Gedung TMT Cilandak',
  ];

  return (
    <section id="home" className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] w-full overflow-hidden bg-stone-950">
      {/* Background Slides with Cinema Fade */}
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
          {/* Subtle architectural vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
        </div>
      ))}

      {/* Main Content Stage */}
      <div className="relative z-20 mx-auto flex min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] max-w-7xl flex-col justify-between px-4 sm:px-8 py-12 sm:py-20 text-white">
        {/* Subtle Corporate Lineage Header */}
        <div className="text-xs text-stone-300 font-medium tracking-wide">
          <span>PT Halla Mohana</span>
          <span className="mx-2 text-stone-500">•</span>
          <span>A Subsidiary of MahaDasha (PT Tiara Marga Trakindo)</span>
        </div>

        {/* Center Hero Editorial Content - Confident, Direct Typography */}
        <div className="my-auto max-w-3xl space-y-5 pt-4 pb-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-white drop-shadow-md">
            {currentBanner.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
            {currentBanner.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="/projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/projects');
                }
              }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-2xl"
              >
                {currentBanner.ctaText || 'Jelajahi Portofolio'}
              </Button>
            </a>
            <a
              href="/about"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/about');
                }
              }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/15 bg-white/5 backdrop-blur-xs"
              >
                Tentang Halla Mohana
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Destination Switcher */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Quick Clean Destination Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {visibleBanners.map((_, i) => {
                const isCurrent = i === currentIndex;
                const label = slideShortTitles[i] || `Destinasi ${i + 1}`;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-white text-stone-950 font-bold shadow-md'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white backdrop-blur-xs'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#7A152E] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#7A152E] transition-colors"
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
