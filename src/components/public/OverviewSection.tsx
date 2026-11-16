import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { motion } from 'framer-motion';
import { Building2, ShoppingBag, Layers } from 'lucide-react';

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
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Profil Perusahaan &amp; Ekosistem Grup
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141414] tracking-tight leading-tight">
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
            className="max-w-md space-y-2"
          >
            <p className="text-xs tracking-widest uppercase text-[#8B1E24] font-semibold">
              Member of MahaDasha • TMT Group
            </p>
            <p className="text-[#52525B] text-sm sm:text-base leading-relaxed font-normal">
              PT Halla Mohana berdedikasi menciptakan ruang komersial bermutu tinggi di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group).
            </p>
          </motion.div>
        </div>

        {/* Asymmetrical Architectural Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {/* Perspective Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium mr-1">
                Perspektif:
              </span>
              <div className="inline-flex border border-[#E5E5E5] rounded-md p-1 bg-white shrink-0">
                {perspectives.map((p) => {
                  const isActive = p.id === activePerspective;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePerspective(p.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#8B1E24] text-white'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#E5E5E5] bg-stone-900">
              <img
                src={currentPerspective.imageUrl}
                alt={currentPerspective.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-300 block">
                  {currentPerspective.badge}
                </span>
                <p className="text-lg sm:text-xl font-semibold">
                  {currentPerspective.title}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                  {currentPerspective.subtitle}
                </p>
              </div>
            </div>

            {/* Clean Floating Quote Box */}
            <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-5 space-y-1.5">
              <p className="text-xs sm:text-sm text-[#141414] font-medium italic leading-relaxed">
                "Keunggulan dalam pengelolaan aset properti komersial dan hospitalitas yang berkelanjutan untuk kemakmuran bersama."
              </p>
              <p className="text-xs text-[#8B1E24] font-semibold">
                — PT Halla Mohana (MahaDasha Group)
              </p>
            </div>
          </div>

          {/* Right Column: 3 Strategic Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="pb-1">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                Fokus Pengembangan Strategis
              </p>
            </div>

            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-5 transition-colors hover:border-[#8B1E24] hover:bg-white"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#8B1E24] uppercase tracking-widest block">
                      {p.tag}
                    </span>
                    {p.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#141414]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Corporate Info Tabs */}
        {visibleInfo.length > 0 && (
          <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap gap-6 border-b border-[#E5E5E5] pb-0 mb-4">
              {visibleInfo.map((info, idx) => (
                <button
                  key={info.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`pb-3 text-sm font-semibold tracking-wide transition-colors relative cursor-pointer ${
                    idx === activeTab
                      ? 'text-[#8B1E24] border-b-2 border-[#8B1E24]'
                      : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
                  }`}
                >
                  {info.title}
                </button>
              ))}
            </div>

            <div className="prose max-w-none text-[#52525B] leading-relaxed text-sm">
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
