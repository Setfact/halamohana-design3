import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { motion } from 'framer-motion';
import { Building2, ShoppingBag, Layers, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface ArchitecturalPerspective {
  id: 'integrated' | 'hotel' | 'mall';
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const OverviewSection: React.FC = () => {
  const { corporateInfo } = useCMSData();
  const visibleInfo = corporateInfo.filter((ci) => ci.visibility);

  const [activeTab, setActiveTab] = useState(0);
  const [activePerspective, setActivePerspective] = useState<'integrated' | 'hotel' | 'mall'>('integrated');

  const perspectives: ArchitecturalPerspective[] = [
    {
      id: 'integrated',
      label: 'Kawasan Terpadu',
      badge: 'Integrated Mixed-Use Complex (Jl. Riau 147)',
      title: 'FOX Harris Hotel Pekanbaru & Pekanbaru Xchange (PX)',
      subtitle: 'Kawasan komersial terintegrasi di koridor strategis Jl. Riau No. 147 Pekanbaru yang memadukan hotel bintang 4 dengan lifestyle mall modern.',
      imageUrl: '/images/hotel/overview-facade-landscape.jpg',
    },
    {
      id: 'hotel',
      label: 'Menara FOX Hotel',
      badge: 'Hospitality Tower • 12 Lantai • 225 Kamar',
      title: 'FOX Harris Hotel Pekanbaru — Urban Oasis',
      subtitle: 'Menara akomodasi bintang 4 dinamis dengan indoor rooftop sky pool tertinggi di Pekanbaru, Restoran WTF, spa, gym, dan Grand Ballroom.',
      imageUrl: '/images/hotel/showcase-hotel-facade.jpg',
    },
    {
      id: 'mall',
      label: 'Podium PX Mall',
      badge: 'Lifestyle Podium • Cinema XXI • Alfresco Dining',
      title: 'Pekanbaru Xchange (PX) — Lifestyle & Entertainment',
      subtitle: 'Podium ritel modern dengan fasad geometris ikonik, bioskop Cinema XXI, koridor kuliner alfresco, serta plaza event komunitas.',
      imageUrl: '/images/mall/hero-px-mall.jpg',
    },
  ];

  const currentPerspective = perspectives.find((p) => p.id === activePerspective) || perspectives[0];

  const pillars = [
    {
      title: 'Hospitality Management',
      desc: 'Pengelolaan hotel bintang empat berstandar internasional dengan sentuhan khas keramahan nusantara dan fasilitas gaya hidup modern.',
      tag: 'Hotel & Resort',
      icon: <Building2 className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      title: 'Retail & Lifestyle Mall',
      desc: 'Pengembangan pusat perbelanjaan dan rekreasi terpadu seperti Pekanbaru Xchange yang menjadi destinasi sosial komunitas perkotaan.',
      tag: 'Commercial Retail',
      icon: <ShoppingBag className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      title: 'TMT Group Ecosystem',
      desc: 'Bernaung di bawah PT Mahadana Dasha Utama (MahaDasha), memperkuat sinergi diversifikasi strategis Tiara Marga Trakindo (TMT Group).',
      tag: 'Holding Synergy',
      icon: <Layers className="h-4 w-4 text-[#8B1E24]" />,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8B1E24]/10 text-[#8B1E24]">
                <Sparkles className="h-3 w-3 fill-current text-[#8B1E24]" />
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
                Profil Perusahaan & Ekosistem Grup
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.06}
                delay={0.15}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
              >
                Membangun Destinasi Komersial & Gaya Hidup Berkelas
              </VerticalCutReveal>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md space-y-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#F8F9FA] px-3.5 py-1 text-xs font-semibold text-stone-700">
              <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
              <span>Member of MahaDasha • TMT Group</span>
            </div>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              PT Halla Mohana berdedikasi menciptakan ruang komersial bermutu tinggi di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group).
            </p>
          </motion.div>
        </div>

        {/* Asymmetrical Architectural Showcase (Image + Perspective Switcher + Quote Layer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            {/* Perspective Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mr-1">
                Eksplorasi Sudut Pandang:
              </span>
              {perspectives.map((p) => {
                const isActive = p.id === activePerspective;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePerspective(p.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#8B1E24] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg bg-stone-900 group">
              <img
                src={currentPerspective.imageUrl}
                alt={currentPerspective.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-300 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block">
                  {currentPerspective.badge}
                </span>
                <p className="text-lg sm:text-xl font-bold">
                  {currentPerspective.title}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                  {currentPerspective.subtitle}
                </p>
              </div>
            </div>

            {/* Clean Floating Quote Box */}
            <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-5 space-y-2">
              <p className="text-xs sm:text-sm text-stone-800 font-semibold italic leading-relaxed">
                "Keunggulan dalam pengelolaan aset properti komersial dan hospitalitas yang berkelanjutan untuk kemakmuran bersama."
              </p>
              <p className="text-xs text-[#8B1E24] font-bold">
                — PT Halla Mohana (MahaDasha Group)
              </p>
            </div>
          </div>

          {/* Right Column: 3 Strategic Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="pb-1 px-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                Fokus Pengembangan Strategis
              </span>
            </div>

            {pillars.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-stone-200/90 bg-[#F8F9FA] p-6 transition-all hover:border-[#8B1E24] hover:bg-white hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8B1E24] uppercase tracking-widest block">
                      {p.tag}
                    </span>
                    {p.icon}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#8B1E24] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Corporate Info Tabs */}
        {visibleInfo.length > 0 && (
          <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-wrap gap-6 border-b border-stone-200 pb-0 mb-6">
              {visibleInfo.map((info, idx) => (
                <button
                  key={info.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`pb-3 text-sm font-bold tracking-wide transition-all relative cursor-pointer ${
                    idx === activeTab
                      ? 'text-[#8B1E24] border-b-2 border-[#8B1E24]'
                      : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
                  }`}
                >
                  {info.title}
                </button>
              ))}
            </div>

            <div className="prose max-w-none text-stone-700 leading-relaxed text-sm sm:text-base">
              <div
                dangerouslySetInnerHTML={{
                  __html: visibleInfo[activeTab]?.content || '',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
