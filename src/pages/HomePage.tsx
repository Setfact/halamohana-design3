import React from 'react';
import { HeroSlider } from '@/components/public/HeroSlider';
import { OverviewSection } from '@/components/public/OverviewSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { GovernanceSection } from '@/components/public/GovernanceSection';
import { NewsSection } from '@/components/public/NewsSection';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Hero Showcase Slider with Property Quick Switcher */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Overview & Ekosistem Grup (Company Profile & Strategic Pillars) */}
      <OverviewSection />

      {/* 3. Flagship Projects Showcase + 4-Column Corporate Achievement Metrics */}
      <ProjectsSection />

      {/* 4. Board of Governance (Dewan Direksi & Komisaris) + Horizontal GCG Banner */}
      <GovernanceSection />

      {/* 5. Latest Corporate News & Press Releases (16:9 Thumbnail, 3-Columns) */}
      <NewsSection />

      {/* 6. Direct Concierge & Inquiry CTA Band (Jakarta Head Office & Pekanbaru Site Office) */}
      <section className="bg-[#111622] text-white py-20 sm:py-24 border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] bg-[#8B1E24]/10 px-3 py-1 rounded-full border border-[#8B1E24]/30 inline-block">
                Layanan Kemitraan & Sewa Komersial
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Tertarik Bermitra atau Menyewa Ruang Komersial?
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
                Hubungi tim representatif PT Halla Mohana di Jakarta atau Pekanbaru untuk informasi kemitraan tenant ritel, reservasi MICE Ballroom, dan kerjasama korporat terpadu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-7 py-3.5 text-sm font-bold tracking-wide shadow-xl transition-all cursor-pointer"
              >
                <span>Hubungi Tim Kami</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/about');
                }}
                className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 px-6 py-3.5 text-sm font-semibold tracking-wide transition-all cursor-pointer"
              >
                <span>Tentang Holding</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
