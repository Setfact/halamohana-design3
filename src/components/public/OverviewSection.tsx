import React from 'react';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import {
  ArchitecturalReveal,
  ImageFrameReveal,
} from '@/components/ui/MotionPrimitives';
import { ArrowRight } from 'lucide-react';

interface OverviewSectionProps {
  onNavigate?: (path: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate }) => {
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Short Corporate Narrative & Vision Quote */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <ArchitecturalReveal delay={0.05}>
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Profil Singkat • PT Halla Mohana
                </p>
              </ArchitecturalReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141414] tracking-tight leading-tight">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.05}
                  delay={0.12}
                  transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                >
                  Membangun Destinasi Komersial & Hospitalitas Berkelanjutan
                </VerticalCutReveal>
              </h2>
            </div>

            <ArchitecturalReveal delay={0.18}>
              <p className="text-[#52525B] text-base leading-relaxed font-normal">
                Didirikan pada tahun 2013, PT Halla Mohana adalah pengembang dan pengelola aset properti komersial serta perhotelan (<em>hospitality</em>) di bawah naungan <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> dan bagian dari konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>. Kami berfokus menghadirkan fasilitas modern dan ruang urban inovatif yang memadukan keunggulan operasional hotel bintang 4 dengan pusat perbelanjaan gaya hidup terpadu di kawasan strategis Jl. Riau No. 147 Pekanbaru.
              </p>
            </ArchitecturalReveal>

            {/* Concise Vision Quote Box */}
            <ArchitecturalReveal delay={0.25}>
              <div className="rounded-md border-l-2 border-[#8B1E24] bg-[#F7F7F5] p-4 sm:p-5 space-y-1.5">
                <p className="text-xs sm:text-sm text-[#141414] font-medium italic leading-relaxed">
                  &ldquo;Menghadirkan produk dan layanan inovatif di bisnis perhotelan dan komersial untuk menciptakan pertumbuhan berkelanjutan serta imbal hasil positif bagi pemegang saham.&rdquo;
                </p>
                <p className="text-xs font-semibold text-[#8B1E24]">
                  — Visi Korporat PT Halla Mohana
                </p>
              </div>
            </ArchitecturalReveal>

            {/* Single CTA Button */}
            <ArchitecturalReveal delay={0.3}>
              <div className="pt-2">
                <a
                  href="/about"
                  onClick={(e) => handleNavigate(e, '/about')}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-6 py-3.5 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  <span>Selengkapnya Tentang Kami</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ArchitecturalReveal>
          </div>

          {/* Right Column: Architectural Visual Highlight */}
          <div className="lg:col-span-5">
            <ImageFrameReveal delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#E5E5E5] bg-stone-100 shadow-2xs group">
                <img
                  src="/images/New-Asset/Hotel/Lobby.png"
                  alt="Interior Lobi Arsitektural FOX Harris Hotel Pekanbaru — PT Halla Mohana"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-300 block">
                    Kawasan Terpadu Jl. Riau No. 147 Pekanbaru
                  </span>
                  <p className="text-base sm:text-lg font-semibold leading-snug">
                    FOX Harris Hotel &amp; Pekanbaru Xchange (PX)
                  </p>
                  <p className="text-xs text-stone-300">
                    Didirikan 2013 • Member of MahaDasha (TMT Group)
                  </p>
                </div>
              </div>
            </ImageFrameReveal>
          </div>

        </div>
      </div>
    </section>
  );
};