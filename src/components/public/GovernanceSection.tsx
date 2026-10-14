import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
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

  return (
    <section id="governance" className="py-20 sm:py-28 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header - Direct, Clean (No Kicker) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Dewan Komisaris & Direksi
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Dipimpin oleh jajaran eksekutif berpengalaman dengan komitmen tata kelola korporat yang transparan, akuntabel, dan berintegritas tinggi.
            </p>
          </div>

          {/* Toggle Tab Direksi vs Komisaris */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1.5 border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('directors')}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'directors'
                  ? 'bg-[#7A152E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dewan Direksi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('commissioners')}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'commissioners'
                  ? 'bg-[#7A152E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dewan Komisaris
            </button>
          </div>
        </div>

        {/* Executive Portrait Grid (Clean: No Date Badges on Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="group cursor-pointer rounded-2xl border border-stone-200 bg-[#FBFBF9] p-5 hover:bg-white hover:border-[#7A152E] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo with Tone-Map Filter */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 shadow-2xs">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* Profile Meta */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A68253] block truncate">
                    {leader.role}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#7A152E] transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-stone-500">{leader.tenure}</p>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                    {leader.bio}
                  </p>
                </div>
              </div>

              {/* View Dossier Action */}
              <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-[#7A152E]">
                <span>Profil Eksekutif</span>
                <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Integrity Formal Statement */}
        <div className="rounded-2xl border border-stone-200 bg-[#FBFBF9] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-stone-900">
              Penerapan Good Corporate Governance (GCG)
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
              PT Halla Mohana senantiasa mematuhi prinsip transparansi, akuntabilitas, independensi, dan tanggung jawab hukum sesuai ketetapan MahaDasha & Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium shrink-0 border-l sm:border-l-2 border-stone-300 pl-4">
            <span>Standar Tata Kelola Terpadu TMT Group</span>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A68253]">
                  {selectedLeader.role}
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  {selectedLeader.name}
                </h3>
                <span className="text-xs text-stone-500">{selectedLeader.tenure}</span>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Biografi & Pengalaman Profesional
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
