import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Scale, Award, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface LeaderItem {
  id: string;
  name: string;
  role: string;
  category: 'directors' | 'commissioners';
  photo: string;
  bio: string;
  tenure: string;
}

export const GovernanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directors' | 'commissioners'>('directors');
  const [selectedLeader, setSelectedLeader] = useState<LeaderItem | null>(null);

  const leaders: LeaderItem[] = [
    {
      id: 'ldr-1',
      name: 'Ir. Hendra Kartasasmita, M.B.A.',
      role: 'Direktur Utama',
      category: 'directors',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      bio: 'Memiliki pengalaman lebih dari 25 tahun di sektor properti komersial dan hospitalitas berskala nasional. Bergabung dengan ekosistem MahaDasha & TMT Group untuk memimpin ekspansi dan transformasi aset strategis Halla Mohana.',
      tenure: 'Menjabat sejak 2020',
    },
    {
      id: 'ldr-2',
      name: 'Bambang Suryo Wibowo, S.E., M.M.',
      role: 'Direktur Operasional & Bisnis',
      category: 'directors',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      bio: 'Ahli dalam manajemen aset ritel modern, relasi tenant internasional, serta standarisasi mutu layanan hotel berbintang di Indonesia.',
      tenure: 'Menjabat sejak 2021',
    },
    {
      id: 'ldr-3',
      name: 'Dra. Maya Indrawati, Ak., C.A.',
      role: 'Direktur Keuangan & Kepatuhan',
      category: 'directors',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      bio: 'Berpengalaman luas dalam audit keuangan konglomerasi, tata kelola GCG (Good Corporate Governance), dan manajemen risiko investasi properti.',
      tenure: 'Menjabat sejak 2019',
    },
    {
      id: 'ldr-4',
      name: 'Dr. H. Raden Soebandrio, M.Sc.',
      role: 'Presiden Komisaris',
      category: 'commissioners',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
      bio: 'Tokoh senior industri infrastruktur dan investasi nasional, memberikan arahan strategis terhadap arah diversifikasi portofolio MahaDasha dan kepatuhan jangka panjang.',
      tenure: 'Menjabat sejak 2018',
    },
    {
      id: 'ldr-5',
      name: 'Ir. Ahmad Zulkifli, M.Eng.',
      role: 'Komisaris Independen',
      category: 'commissioners',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
      bio: 'Pakar arsitektur berkelanjutan dan tata kota dengan reputasi internasional, mengawasi penerapan standar bangunan hijau (Green Building) pada seluruh proyek Halla Mohana.',
      tenure: 'Menjabat sejak 2022',
    },
  ];

  const filteredLeaders = leaders.filter((l) => l.category === activeTab);

  const gcgPillars = [
    { title: 'Transparansi', desc: 'Keterbukaan informasi relevan bagi publik & investor.' },
    { title: 'Akuntabilitas', desc: 'Pengelolaan operasional terukur & terstandarisasi.' },
    { title: 'Responsibilitas', desc: 'Kepatuhan terhadap regulasi, K3 & kepedulian sosial.' },
    { title: 'Independensi', desc: 'Pengambilan keputusan profesional bebas benturan kepentingan.' },
  ];

  return (
    <section id="governance" className="py-24 sm:py-32 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Kepemimpinan & Tata Kelola Korporat
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Dewan Komisaris & Direksi
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Dipimpin oleh jajaran profesional berpengalaman dengan integritas tinggi dalam tata kelola komersial dan perhotelan nasional.
            </p>
          </div>

          {/* Tab Switcher (Pill Style) */}
          <div className="inline-flex rounded-full bg-stone-100 p-1.5 border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('directors')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'directors'
                  ? 'bg-[#8B1E24] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Dewan Direksi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('commissioners')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'commissioners'
                  ? 'bg-[#8B1E24] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Dewan Komisaris
            </button>
          </div>
        </div>

        {/* 3-Column Executive Portrait Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="group cursor-pointer rounded-2xl border border-stone-200/90 bg-[#F8F9FA] p-6 hover:bg-white hover:border-[#8B1E24] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 4:5 Portrait with Consistent Monochromatic / Grayscale Filter */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-900 shadow-xs">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale contrast-105 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Profile Meta */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B1E24] block truncate">
                    {leader.role}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">{leader.tenure}</p>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1.5">
                    {leader.bio}
                  </p>
                </div>
              </div>

              {/* View Dossier Action */}
              <div className="pt-4 mt-5 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-[#8B1E24]">
                <span>Profil Eksekutif</span>
                <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Banner GCG (Horizontal Card, Subtle 1px Border, Split Layout) */}
        <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-8 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: GCG Commitment Statement */}
            <div className="lg:col-span-5 space-y-3 lg:border-r lg:border-stone-200 lg:pr-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B1E24]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Good Corporate Governance</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">
                Penerapan Tata Kelola Perusahaan yang Baik (GCG)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                PT Halla Mohana secara konsisten mematuhi prinsip GCG yang ditetapkan oleh MahaDasha dan Tiara Marga Trakindo (TMT Group) untuk menjamin pertumbuhan bisnis yang berkelanjutan dan berintegritas.
              </p>
            </div>

            {/* Right Column: 4 GCG Pillars 2x2 Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gcgPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-stone-200/80 bg-white p-4 space-y-1 hover:border-[#8B1E24]/30 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>{pillar.title}</span>
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

      {/* Leader Detail Modal */}
      {selectedLeader && (
        <Modal
          isOpen={!!selectedLeader}
          onClose={() => setSelectedLeader(null)}
          title="Dossier Kepemimpinan Eksekutif"
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedLeader.photo}
                alt={selectedLeader.name}
                className="h-20 w-20 rounded-2xl object-cover shadow-md shrink-0"
              />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B1E24]">
                  {selectedLeader.role}
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  {selectedLeader.name}
                </h3>
                <span className="text-xs text-stone-500 font-medium">{selectedLeader.tenure}</span>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-700">
                Biografi & Rekam Jejak Profesional
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedLeader.bio}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
