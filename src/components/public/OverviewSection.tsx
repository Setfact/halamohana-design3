import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';

export const OverviewSection: React.FC = () => {
  const { corporateInfo } = useCMSData();
  const visibleInfo = corporateInfo.filter((ci) => ci.visibility);

  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Hospitality Management',
      desc: 'Pengelolaan hotel bintang empat berstandar internasional dengan sentuhan khas keramahan nusantara dan fasilitas gaya hidup modern.',
      tag: 'Hotel & Resort',
    },
    {
      title: 'Retail & Lifestyle Mall',
      desc: 'Pengembangan pusat perbelanjaan dan rekreasi terpadu seperti Pekanbaru Xchange yang menjadi destinasi sosial komunitas perkotaan.',
      tag: 'Commercial Retail',
    },
    {
      title: 'TMT Group Ecosystem',
      desc: 'Bernaung di bawah PT Mahadana Dasha Utama (MahaDasha), memperkuat sinergi diversifikasi strategis Tiara Marga Trakindo (TMT Group).',
      tag: 'Holding Synergy',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header - Direct, Bold, Clean (No Kicker) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Membangun Destinasi Komersial & Gaya Hidup Berkelas
            </h2>
          </div>

          <p className="max-w-md text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            PT Halla Mohana berdedikasi menciptakan ruang komersial bermutu tinggi yang memenuhi tuntutan pebisnis modern tanpa mengabaikan suasana hangat ramah keluarga.
          </p>
        </div>

        {/* Asymmetrical Architectural Showcase (Image + Quote Layer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80"
                alt="Halla Mohana Corporate Property"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs text-[#A68253] font-semibold uppercase tracking-wider">
                  Properti Unggulan Pekanbaru
                </span>
                <p className="text-lg sm:text-xl font-bold">
                  FOX Harris Hotel Pekanbaru & Pekanbaru Xchange (PX)
                </p>
              </div>
            </div>

            {/* Clean Floating Quote Box */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 sm:max-w-xs rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-md p-6 shadow-xl space-y-2">
              <p className="text-sm text-stone-800 font-semibold italic leading-relaxed">
                "Keunggulan dalam pengelolaan aset properti komersial dan hospitalitas yang berkelanjutan untuk kemakmuran bersama."
              </p>
              <p className="text-xs text-stone-500 font-medium">
                — PT Halla Mohana
              </p>
            </div>
          </div>

          {/* Right Column: 3 Strategic Pillars (Clean: No Icons, No [01] Tags) */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-stone-200 bg-[#FBFBF9] p-6 transition-all hover:border-[#7A152E] hover:bg-white hover:shadow-md"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#A68253] uppercase tracking-wider block">
                    {p.tag}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#7A152E] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Corporate Info Tabs */}
        {visibleInfo.length > 0 && (
          <div className="rounded-2xl border border-stone-200 bg-[#FBFBF9] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-wrap gap-4 border-b border-stone-200 pb-0 mb-6">
              {visibleInfo.map((info, idx) => (
                <button
                  key={info.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`pb-3 text-sm font-bold tracking-wide transition-all relative ${
                    idx === activeTab
                      ? 'text-[#7A152E] border-b-2 border-[#7A152E]'
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
