import React from 'react';
import { HeroSlider } from '@/components/public/HeroSlider';
import { OverviewSection } from '@/components/public/OverviewSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { GovernanceSection } from '@/components/public/GovernanceSection';
import { StatsSection } from '@/components/public/StatsSection';
import { NewsSection } from '@/components/public/NewsSection';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* 1. Hero Showcase Slider */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Overview & Strategic Pillars */}
      <OverviewSection />

      {/* 3. Flagship Projects Showcase */}
      <ProjectsSection />

      {/* 4. Experience & Asset Stats */}
      <StatsSection />

      {/* 5. Board of Governance (Dewan Komisaris & Direksi) */}
      <GovernanceSection />

      {/* 6. Latest News Preview */}
      <NewsSection />

      {/* 7. Direct Concierge & Inquiry CTA Band */}
      <section className="bg-[#141824] text-white py-16 sm:py-20 border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Tertarik Bermitra atau Menyewa Ruang Komersial?
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Hubungi tim representatif PT Halla Mohana di Jakarta atau Pekanbaru untuk informasi kemitraan tenant ritel, pemesanan MICE, dan kerjasama korporat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              onClick={() => onNavigate('/contact')}
            >
              Hubungi Tim Kami
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => onNavigate('/about')}
            >
              Tentang Holding
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
