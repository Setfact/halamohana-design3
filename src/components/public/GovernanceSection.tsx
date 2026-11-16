import React from 'react';
import { ShieldCheck, CheckCircle2, Building2, Layers, ArrowRight } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  const gcgPillars = [
    {
      title: 'Transparansi',
      desc: 'Keterbukaan dalam penyediaan informasi material yang relevan dan dapat diakses publik serta seluruh pemangku kepentingan.',
    },
    {
      title: 'Akuntabilitas',
      desc: 'Pengelolaan operasional hotel dan mall yang terukur, diaudit berkala, serta dapat dipertanggungjawabkan kinerjanya.',
    },
    {
      title: 'Responsibilitas',
      desc: 'Kepatuhan penuh terhadap regulasi perhotelan, standar keselamatan kerja (K3), dan tanggung jawab sosial lingkungan (CSR).',
    },
    {
      title: 'Independensi',
      desc: 'Pengambilan keputusan bisnis strategis secara objektif, profesional, dan bebas dari benturan kepentingan pihak mana pun.',
    },
  ];

  const parentEntitiesRow1 = [
    { name: 'PT Trakindo Utama', sector: 'Heavy Equipment Caterpillar' },
    { name: 'PT Mahadana Dasha Utama', sector: 'Sub-Holding & Diversifikasi' },
    { name: 'PT ABM Investama Tbk.', sector: 'Energy & Mining Solutions' },
    { name: 'PT Chandra Sakti Utama Leasing', sector: 'Commercial Financing (CSUL)' },
    { name: 'PT Radana Bhaskara Finance Tbk.', sector: 'Multifinance Solutions' },
  ];

  const parentEntitiesRow2 = [
    {
      name: 'PT Halla Mohana',
      sector: 'Hospitality & Commercial Mall',
      highlight: true,
      desc: 'Pengembang dan pengelola FOX Harris Hotel & Pekanbaru Xchange (PX).',
    },
    { name: 'PT Pastika Nirmala', sector: 'Healthcare & Facility Management' },
    { name: 'PT Karya Kharisma Mandiri', sector: 'Human Capital & Services' },
  ];

  return (
    <section id="governance" className="py-20 sm:py-28 bg-white border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Struktur Korporasi &amp; Tata Kelola
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
              Company Structure &amp; Good Corporate Governance
            </h2>
            <p className="text-base text-[#52525B] leading-relaxed pt-1">
              Kedudukan PT Halla Mohana dalam ekosistem konglomerasi PT Tiara Marga Trakindo (TMT Group) serta komitmen penerapan tata kelola korporat yang berintegritas.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="/about#company-structure"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors"
            >
              <span>Lihat Detail Struktur Korporat</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Corporate Lineage Architecture Showcase */}
        <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Induk Grup Usaha
              </p>
              <h3 className="text-lg font-semibold text-[#141414]">
                PT Tiara Marga Trakindo (TMT Group)
              </h3>
            </div>
            <p className="text-xs text-[#52525B] max-w-md">
              Konglomerasi nasional terkemuka yang menaungi 8 entitas anak perusahaan lintas industri di Indonesia.
            </p>
          </div>

          {/* Baris 1: 5 Entitas Utama */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
              Entitas Anak Perusahaan — Lini Diversifikasi Utama:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {parentEntitiesRow1.map((item) => (
                <div
                  key={item.name}
                  className="rounded-md border border-[#E5E5E5] bg-white p-3 space-y-1 shadow-2xs"
                >
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium truncate">
                    {item.sector}
                  </p>
                  <h4 className="text-xs font-semibold text-[#141414] leading-snug">
                    {item.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Baris 2: 3 Entitas Termasuk Highlight PT Halla Mohana */}
          <div className="space-y-2 pt-2">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
              Entitas Hospitality &amp; Layanan Korporat Terpadu:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {parentEntitiesRow2.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-md p-4 space-y-1 shadow-2xs transition-colors ${
                    item.highlight
                      ? 'border-2 border-[#8B1E24] bg-white'
                      : 'border border-[#E5E5E5] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        item.highlight ? 'text-[#8B1E24]' : 'text-neutral-500'
                      }`}
                    >
                      {item.sector}
                    </p>
                    {item.highlight && (
                      <span className="text-[10px] font-semibold text-[#8B1E24] border border-[#8B1E24]/30 px-1.5 py-0.5 rounded">
                        Fokus Utama
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-[#141414]">
                    {item.name}
                  </h4>
                  {item.desc && (
                    <p className="text-xs text-[#52525B] leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Pilar Good Corporate Governance (GCG) */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Standar Etika Bisnis &amp; Integritas
            </p>
            <h3 className="text-xl font-semibold text-[#141414] tracking-tight">
              Penerapan Good Corporate Governance (GCG)
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Prinsip tata kelola yang diterapkan secara konsisten dalam seluruh aktivitas pembangunan dan operasional aset properti PT Halla Mohana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gcgPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-5 space-y-2 hover:border-[#8B1E24] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8B1E24] shrink-0" />
                  <h4 className="text-sm font-semibold text-[#141414]">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
