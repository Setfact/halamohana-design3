import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { GovernanceSection } from '@/components/public/GovernanceSection';
import { useCMSData } from '@/context/CMSDataContext';
import { Building2, Compass, Award, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { corporateInfo } = useCMSData();
  const visibleInfo = corporateInfo.filter((ci) => ci.visibility);

  const coreValues = [
    {
      title: 'Integrity',
      desc: 'Menjunjung tinggi kejujuran, etika bisnis, dan komitmen dalam setiap interaksi korporat dan kemitraan.',
    },
    {
      title: 'Continuous Development',
      desc: 'Senantiasa berinovasi meningkatkan mutu fasilitas properti, teknologi gedung, dan kecakapan SDM.',
    },
    {
      title: 'Excellence',
      desc: 'Memberikan standar layanan hospitality bintang empat dan manajemen ritel bertaraf internasional.',
    },
    {
      title: 'Compassion',
      desc: 'Peduli terhadap kesejahteraan komunitas lokal, keselamatan kerja, serta pelestarian lingkungan hidup.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Profil & Ekosistem Korporat"
        description="PT Halla Mohana berdedikasi menciptakan ruang komersial dan perhotelan bermutu tinggi di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group)."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Tentang Halla Mohana' },
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. Sejarah & Filosofi Perusahaan */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                Dedikasi Tiga Dekade Membangun Ruang Hidup & Komersial Bernilai Tinggi
              </h2>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Didirikan pada tahun 1989, PT Halla Mohana memulai perjalanannya sebagai bagian penting dari diversifikasi bisnis Tiara Marga Trakindo (TMT Group). Berfokus pada pengembangan dan pengelolaan properti komersial, perusahaan terus berevolusi menghadirkan proyek-proyek strategis yang terintegrasi.
                </p>
                <p>
                  Melalui kepemilikan dan pengelolaan <strong>FOX Harris Hotel Pekanbaru</strong> dan pusat perbelanjaan <strong>Pekanbaru Xchange (PX)</strong>, Halla Mohana membuktikan kepiawaiannya dalam memadukan keramahan nusantara berstandar internasional dengan ekosistem gaya hidup urban yang dinamis.
                </p>
                <p>
                  Di bawah payung PT Mahadana Dasha Utama (MahaDasha), Halla Mohana senantiasa bersinergi dengan unit-unit usaha TMT Group lainnya untuk menciptakan nilai tambah berkelanjutan bagi para pemangku kepentingan dan masyarakat luas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Download className="h-4 w-4" />}
                  iconPosition="left"
                  onClick={() => alert('Mengunduh Company Profile PT Halla Mohana (PDF)...')}
                >
                  Unduh Profil Korporat (PDF)
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('/projects')}
                >
                  Lihat Portofolio Properti
                </Button>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80"
                  alt="Head Office Gedung TMT Jakarta"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold text-[#A68253] uppercase tracking-wider block">
                    Headquarters
                  </span>
                  <h3 className="text-lg font-bold">Gedung TMT 1, Cilandak, Jakarta</h3>
                  <p className="text-xs text-stone-300">Pusat operasional dan koordinasi strategis TMT Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi, Misi & Nilai Inti Perusahaan */}
      <section className="py-20 sm:py-28 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Visi */}
            <div className="rounded-2xl border border-stone-200 bg-[#FBFBF9] p-8 sm:p-10 space-y-4 border-l-4 border-l-[#7A152E]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A152E]">
                Visi Kami
              </span>
              <h3 className="text-2xl font-black text-stone-900 leading-snug">
                Menjadi Pengembang & Pengelola Properti Pilihan Utama
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Diakui secara nasional atas keunggulan kualitas fasilitas, kepuasan pelanggan, serta kontribusi positif terhadap perkembangan kawasan komersial di Indonesia.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-2xl border border-stone-200 bg-[#FBFBF9] p-8 sm:p-10 space-y-4 border-l-4 border-l-[#A68253]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A68253]">
                Misi Kami
              </span>
              <h3 className="text-2xl font-black text-stone-900 leading-snug">
                Menghadirkan Nilai Tambah Melalui Layanan Prima
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Mengembangkan dan mengoperasikan properti dengan standar keselamatan, efisiensi energi, dan keramahan kelas dunia demi kemakmuran seluruh pemangku kepentingan.
              </p>
            </div>
          </div>

          {/* Corporate Core Values */}
          <div className="space-y-8 pt-6 border-t border-stone-200">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Nilai-Nilai Luhur Korporat (Core Values)
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Fondasi budaya kerja yang menjadi pedoman seluruh insan Halla Mohana dalam berkarya dan berkolaborasi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-stone-200 bg-[#FBFBF9] p-6 space-y-2 hover:border-[#7A152E] hover:bg-white transition-all shadow-2xs"
                >
                  <h4 className="text-base font-bold text-stone-900 text-[#7A152E]">
                    {v.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dewan Komisaris & Direksi (Full Governance Component) */}
      <GovernanceSection />

      {/* 5. Arsip Publikasi Resmi Dinamis dari CMS */}
      {visibleInfo.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-stone-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-8">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Informasi Resmi & Publikasi Tambahan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleInfo.map((info) => (
                <div
                  key={info.id}
                  className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4"
                >
                  <h4 className="text-lg font-bold text-[#7A152E]">
                    {info.title}
                  </h4>
                  <div
                    className="prose prose-sm max-w-none text-stone-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: info.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
