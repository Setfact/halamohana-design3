import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Building2, ShoppingBag, Layers, ArrowUpRight } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  const { corporateInfo } = useCMSData();
  const visibleInfo = corporateInfo.filter((ci) => ci.visibility);

  const [activeTab, setActiveTab] = useState(0);

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
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Profil Perusahaan & Ekosistem Grup
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Membangun Destinasi Komersial & Gaya Hidup Berkelas
            </h2>
          </div>

          <p className="max-w-md text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            PT Halla Mohana berdedikasi menciptakan ruang komersial bermutu tinggi di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group).
          </p>
        </div>

        {/* Asymmetrical Architectural Showcase (Image + Quote Layer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80"
                alt="Halla Mohana Corporate Property"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-300">
                  Properti Terpadu Pekanbaru
                </span>
                <p className="text-lg sm:text-xl font-bold">
                  FOX Harris Hotel Pekanbaru & Pekanbaru Xchange (PX)
                </p>
                <p className="text-xs text-stone-300">
                  Kawasan komersial terintegrasi di koridor strategis Jl. Riau No. 147 Pekanbaru
                </p>
              </div>
            </div>

            {/* Clean Floating Quote Box */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 sm:max-w-xs rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-md p-6 shadow-xl space-y-2">
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
