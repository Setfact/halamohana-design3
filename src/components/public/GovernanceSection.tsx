import React from 'react';
import { GitBranch, ShieldCheck, CheckCircle2, Building2, ShoppingBag, Layers, Award } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  const gcgPillars = [
    {
      title: 'Transparansi',
      code: '01',
      desc: 'Keterbukaan dalam penyediaan informasi material yang relevan dan dapat diakses publik.',
    },
    {
      title: 'Akuntabilitas',
      code: '02',
      desc: 'Pengelolaan operasional properti yang terukur, diaudit, dan dapat dipertanggungjawabkan.',
    },
    {
      title: 'Responsibilitas',
      code: '03',
      desc: 'Kepatuhan terhadap regulasi perhotelan, standar K3, serta tanggung jawab sosial lingkungan.',
    },
    {
      title: 'Independensi',
      code: '04',
      desc: 'Pengambilan keputusan strategis secara objektif, bebas benturan kepentingan pihak mana pun.',
    },
  ];

  const structureTree = [
    {
      tier: 'Level 1 — Induk Usaha Konglomerasi',
      company: 'PT Tiara Marga Trakindo (TMT Group)',
      role: 'Ultimate Holding Group',
      desc: 'Grup konglomerasi nasional terkemuka yang menaungi lini bisnis terintegrasi di Indonesia.',
      icon: <Layers className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      tier: 'Level 2 — Sub-Holding Strategic Investment',
      company: 'PT Mahadana Dasha Utama (MahaDasha)',
      role: 'Pengelola Portofolio Non-Alat Berat',
      desc: 'Mengelola diversifikasi strategis TMT Group di sektor properti, ritel, agribisnis, dan teknologi.',
      icon: <Award className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      tier: 'Level 3 — Pengembang Properti Terpadu',
      company: 'PT Halla Mohana (Est. 2013)',
      role: 'Property Development & Asset Management',
      desc: 'Entitas pengembang dan pengelola perhotelan bintang 4 serta pusat perbelanjaan komersial modern.',
      icon: <Building2 className="h-5 w-5 text-[#8B1E24]" />,
    },
  ];

  return (
    <section id="governance" className="py-24 sm:py-32 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Struktur Korporasi & Tata Kelola
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Company Structure & Tata Kelola Resmi
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Struktur silsilah kepemilikan dan standar integritas PT Halla Mohana di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8B1E24]/10 px-4 py-1.5 text-xs font-bold text-[#8B1E24] border border-[#8B1E24]/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Standar Tata Kelola TMT Group</span>
            </span>
          </div>
        </div>

        {/* 3-Level Group Ownership Hierarchy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {structureTree.map((item, idx) => (
            <div
              key={item.company}
              className="relative rounded-2xl border border-stone-200/90 bg-[#F8F9FA] p-6 sm:p-8 space-y-3 shadow-2xs hover:border-[#8B1E24] hover:bg-white hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-stone-200 shadow-2xs group-hover:border-[#8B1E24]/40 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 font-mono">
                  HIRARKI 0{idx + 1}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E24] block">
                  {item.tier}
                </span>
                <h3 className="text-lg font-black text-stone-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                  {item.company}
                </h3>
                <p className="text-xs font-bold text-stone-700">
                  {item.role}
                </p>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed font-normal pt-2 border-t border-stone-200/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Level 4: Unit Operasional Terintegrasi */}
        <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-[#8B1E24]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1E24]">
                Level 4 — Unit Operasional Properti Komersial Terpadu (Pekanbaru)
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium hidden sm:inline-block">
              Jl. Riau No. 147, Senapelan, Pekanbaru
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-2 hover:border-[#8B1E24]/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24]">
                  Hospitality Unit
                </span>
                <span className="text-[11px] text-stone-400 font-medium">Bintang 4</span>
              </div>
              <h4 className="text-base font-black text-stone-900">
                FOX Hotel Pekanbaru (FOX Harris Hotel)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                225 kamar & suite, ballroom MICE, Where's The Food (WTF) Restaurant, spa, gym, dan indoor rooftop sky pool tertinggi di Pekanbaru (eks-Tangram Hotel).
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-2 hover:border-[#8B1E24]/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24]">
                  Commercial Retail Unit
                </span>
                <span className="text-[11px] text-stone-400 font-medium">Lifestyle Mall</span>
              </div>
              <h4 className="text-base font-black text-stone-900">
                Pekanbaru Xchange (PX Mall)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pusat perbelanjaan dan rekreasi modern terintegrasi langsung dengan FOX Hotel, bioskop Cinema XXI, Alfresco Dining GF, serta panggung komunitas kreatif (eks-Sadira Plaza).
              </p>
            </div>
          </div>
        </div>

        {/* Banner GCG (Code of Business Conduct & Ethics) */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs border-l-4 border-l-[#8B1E24]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: GCG Commitment Statement */}
            <div className="lg:col-span-5 space-y-3 lg:border-r lg:border-stone-200 lg:pr-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24] block">
                Etika Bisnis & Kepatuhan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">
                Code of Business Conduct & Ethics (GCG)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                PT Halla Mohana secara konsisten mematuhi prinsip Good Corporate Governance (GCG) standar MahaDasha & TMT Group guna menjamin integritas kemitraan, keselamatan kerja (K3), serta perlindungan pemangku kepentingan secara transparan.
              </p>
            </div>

            {/* Right Column: 4 GCG Pillars */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gcgPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-stone-200/80 bg-[#F8F9FA] p-4 space-y-1 hover:border-[#8B1E24]/30 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>{pillar.code}. {pillar.title}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
