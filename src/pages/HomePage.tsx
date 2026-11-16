import React from 'react';
import { HeroSlider } from '@/components/public/HeroSlider';
import { OverviewSection } from '@/components/public/OverviewSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { NewsSection } from '@/components/public/NewsSection';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white text-left selection:bg-[#8B1E24] selection:text-white">
      {/* 1. Hero Visual Slider (Kawasan Terpadu, FOX Harris Hotel, PX Mall) */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Section About Us / Profil Singkat (Ringkas, Elegan, 1 Paragraf & Visi Quote) */}
      <OverviewSection onNavigate={onNavigate} />

      {/* 3. Section Featured Properties / Portofolio Utama (2 Kartu Visual Berdampingan) */}
      <ProjectsSection onNavigate={onNavigate} />

      {/* 4. Latest News & Press Releases (3 Kartu Ringkas Editorial) */}
      <NewsSection onNavigate={onNavigate} />

      {/* 5. Direct Concierge & Inquiry CTA Band (Jakarta Head Office & Pekanbaru Site Office) */}
      <section className="bg-[#0F1117] text-white py-20 sm:py-24 border-t border-stone-800 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs tracking-widest uppercase text-neutral-400 font-medium">
                Layanan Kemitraan &amp; Sewa Komersial
              </p>
              <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Tertarik Bermitra atau Menyewa Ruang Komersial?
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal pt-1">
                Hubungi tim representatif PT Halla Mohana di Jakarta atau Pekanbaru untuk informasi kemitraan tenant ritel mall, reservasi MICE Grand Ballroom, dan kerjasama korporat terpadu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="inline-flex items-center gap-2.5 rounded-md bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-6 py-3.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-2 rounded-md border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 px-6 py-3.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
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