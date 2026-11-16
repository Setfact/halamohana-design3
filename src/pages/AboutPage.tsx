import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Building2,
  Compass,
  Award,
  ShieldCheck,
  Download,
  CheckCircle2,
  Layers,
  ArrowRight,
  GitBranch,
  Sparkles,
  Users2,
  HeartHandshake,
  TrendingUp,
  Target,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // Active pillar tab for quick navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'vision-mission' | 'values' | 'structure' | 'ethics'>('overview');

  // 4 Core Values (TMT / MahaDasha Group)
  const coreValues = [
    {
      title: 'Integrity',
      indonesian: 'Integritas',
      desc: 'Menjunjung tinggi kejujuran, etika bisnis, keadilan, dan ketepatan janji dalam setiap aspek operasional dan hubungan kemitraan.',
    },
    {
      title: 'Continuous Development',
      indonesian: 'Pengembangan Berkelanjutan',
      desc: 'Senantiasa belajar, berinovasi meningkatkan mutu fasilitas properti, teknologi gedung, dan kompetensi sumber daya manusia.',
    },
    {
      title: 'Excellence',
      indonesian: 'Keunggulan',
      desc: 'Berkomitmen memberikan standar layanan hospitality bintang empat dan manajemen ritel terbaik yang melampaui harapan pemangku kepentingan.',
    },
    {
      title: 'Compassion',
      indonesian: 'Kepedulian',
      desc: 'Peduli terhadap kesejahteraan insan korporat, keselamatan kerja (K3), masyarakat sekitar, serta kelestarian lingkungan hidup.',
    },
  ];

  // 4 Leadership Traits (Sifat Dasar Kepemimpinan TMT / MahaDasha Group)
  const leadershipTraits = [
    {
      trait: 'Competent',
      label: 'Kompeten',
      desc: 'Memiliki keahlian teknis dan kapabilitas manajerial yang unggul di bidang industri perhotelan dan properti komersial.',
    },
    {
      trait: 'Open-minded',
      label: 'Berpikiran Terbuka',
      desc: 'Mampu menerima gagasan inovatif, fleksibel terhadap perubahan zaman, dan menghargai keberagaman perspektif.',
    },
    {
      trait: 'Reliable',
      label: 'Dapat Diandalkan',
      desc: 'Konsisten dalam tindakan, berintegritas tinggi, dan senantiasa dapat dipercaya memenuhi komitmen operasional.',
    },
    {
      trait: 'Courageous',
      label: 'Berani & Tegas',
      desc: 'Berani mengambil inisiatif terukur, bertanggung jawab atas risiko bisnis, dan gigih menghadapi tantangan industri.',
    },
  ];

  // 4 Poin Misi Resmi
  const officialMissions = [
    {
      no: '01',
      idText: 'Terus menciptakan peluang kerja yang bermakna dan menantang bagi sebanyak mungkin masyarakat Indonesia.',
      enText: 'To continuously create meaningful and challenging job opportunities for as many Indonesians as possible.',
    },
    {
      no: '02',
      idText: 'Memastikan pertumbuhan yang berkelanjutan dan menguntungkan guna memaksimalkan nilai pemegang saham.',
      enText: 'To ensure sustainable and profitable growth that maximizes shareholder value.',
    },
    {
      no: '03',
      idText: 'Menyediakan solusi bernilai tambah yang mengoptimalkan kepuasan pelanggan.',
      enText: 'To provide value-added solutions that optimize customer satisfaction.',
    },
    {
      no: '04',
      idText: 'Terlibat secara aktif di dalam masyarakat sebagai warga korporat yang baik (good corporate citizen).',
      enText: 'To actively engage in communities as a good corporate citizen.',
    },
  ];

  // Bagan Struktur Korporasi (Company Structure)
  const companyStructure = [
    {
      level: 'Ultimate Holding Group',
      name: 'PT Tiara Marga Trakindo (TMT Group)',
      role: 'Induk Usaha Konglomerasi Nasional',
      badge: 'Level 1',
      desc: 'Konglomerasi terkemuka di Indonesia yang mengakar sejak 1970 dengan diversifikasi strategis lintas industri.',
    },
    {
      level: 'Sub-Holding (Strategic Investment)',
      name: 'PT Mahadana Dasha Utama (MahaDasha)',
      role: 'Pengelola Portofolio Non-Alat Berat',
      badge: 'Level 2',
      desc: 'Bernaung langsung sebagai pilar diversifikasi strategis TMT Group di sektor properti, ritel, agribisnis, dan teknologi.',
    },
    {
      level: 'Property & Hospitality Developer',
      name: 'PT Halla Mohana',
      role: 'Pengembang & Pengelola Properti Terpadu (Est. 2013)',
      badge: 'Level 3',
      desc: 'Fokus pada pembangunan dan pengelolaan aset komersial, perhotelan bintang 4, dan pusat gaya hidup modern.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Informasi Korporat (Corporate Info)"
        description="Profil resmi, visi misi, nilai-nilai luhur kepemimpinan, dan struktur tata kelola PT Halla Mohana di bawah naungan PT Mahadana Dasha Utama (MahaDasha) dan Tiara Marga Trakindo (TMT Group)."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Corporate Info' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Corporate Info Navigation Strip */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 scrollbar-none text-xs sm:text-sm font-bold">
            <a
              href="#overview"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50"
            >
              Halla Mohana Overview
            </a>
            <a
              href="#vision-mission"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50"
            >
              Vision & Mission
            </a>
            <a
              href="#core-values"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50"
            >
              Core Values & Leadership Traits
            </a>
            <a
              href="#company-structure"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50"
            >
              Company Structure
            </a>
            <a
              href="#code-of-conduct"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50"
            >
              Code of Conduct & Ethics
            </a>
          </div>
        </div>
      </div>

      {/* 2. Pilar 1: Halla Mohana Overview (Sejarah & Profil Resmi Est. 2013) */}
      <section id="overview" className="py-20 sm:py-28 bg-white border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
                  Pilar 1 — Halla Mohana Overview
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                  Pengembangan Properti Komersial & Hospitalitas Terpadu Sejak 2013
                </h2>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  <strong>Didirikan pada tahun 2013</strong>, <strong>PT Halla Mohana</strong> adalah perusahaan pengembang dan pengelola properti yang berfokus pada sektor perhotelan (<em>hospitality</em>) dan pusat perbelanjaan gaya hidup (<em>commercial lifestyle mall</em>). Perusahaan bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> sebagai bagian integral dari diversifikasi konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>.
                </p>
                <p>
                  Halla Mohana berdedikasi menciptakan ruang komersial modern dengan konsep segar (<em>fresh concepts</em>) yang dirancang untuk menjawab tuntutan pelancong bisnis (<em>business travelers</em>) sekaligus memenuhi kebutuhan gaya hidup masyarakat perkotaan (<em>urban lifestyle requirements</em>).
                </p>
                <p>
                  Portofolio unggulan perusahaan terkonsentrasi di koridor strategis <strong>Jalan Riau No. 147, Senapelan, Pekanbaru</strong> dalam sebuah kawasan terpadu (<em>mixed-use commercial complex</em>) yang menggabungkan:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-stone-700">
                  <li>
                    <strong>FOX Hotel Pekanbaru (FOX Harris Hotel)</strong>: Hotel bintang 4 dengan 225 kamar dan suite modern, sarana MICE, restoran WTF, serta kolam renang <em>indoor rooftop sky pool</em> tertinggi di Pekanbaru (sebelumnya beroperasi sebagai Tangram Hotel).
                  </li>
                  <li>
                    <strong>Pekanbaru Xchange (PX)</strong>: Pusat perbelanjaan dan rekreasi keluarga yang terhubung langsung dengan hotel, menghadirkan bioskop Cinema XXI, Alfresco Dining di Ground Floor, dan panggung pertunjukan komunitas (sebelumnya dikenal sebagai Sadira Plaza).
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects');
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24] hover:bg-[#72181D] text-white px-6 py-3 text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer"
                >
                  <span>Lihat Portofolio Properti</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 px-6 py-3 text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  <span>Kontak Perusahaan</span>
                </a>
              </div>
            </div>

            {/* Right Showcase: Head Office & Integrated Complex Highlight */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80"
                  alt="Gedung TMT 1 Head Office"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                    <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                    <span>Head Office (Jakarta Selatan)</span>
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block">
                    Gedung TMT 1, Cilandak
                  </span>
                  <h3 className="text-lg font-bold">Pusat Koordinasi Korporat Halla Mohana</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Bernaung di kompleks perkantoran pusat Tiara Marga Trakindo (TMT Group), Jakarta Selatan.
                  </p>
                </div>
              </div>

              {/* Quick Badge strip */}
              <div className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Tahun Berdiri</span>
                  <span className="font-bold text-stone-900 text-sm">2013</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Entitas Induk</span>
                  <span className="font-bold text-stone-900 text-sm">MahaDasha (TMT)</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Fokus Bisnis</span>
                  <span className="font-bold text-stone-900 text-sm">Hospitality & Mall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pilar 2: Vision & Mission (Bilingual Resmi) */}
      <section id="vision-mission" className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Pilar 2 — Vision & Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Arah Strategis & Misi Keberlanjutan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Visi dan misi resmi PT Halla Mohana yang memandu setiap langkah operasional, penciptaan lapangan kerja, dan imbal hasil jangka panjang bagi pemegang saham.
            </p>
          </div>

          {/* Visi Card (Full Width Architectural Frame) */}
          <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm space-y-4 border-l-4 border-l-[#8B1E24]">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#8B1E24]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1E24]">
                Visi Perusahaan (Corporate Vision)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 leading-snug">
              "Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."
            </h3>

            <p className="text-sm sm:text-base text-stone-500 italic font-medium pt-1">
              "Deliver innovative products and services, in hospitality business to create a positive return for shareholders."
            </p>
          </div>

          {/* Misi 4 Poin Resmi Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#8B1E24]" />
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Misi Perusahaan (Corporate Mission)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {officialMissions.map((m) => (
                <div
                  key={m.no}
                  className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-3 shadow-2xs hover:border-[#8B1E24] hover:shadow-md transition-all group"
                >
                  <span className="text-xs font-black text-[#8B1E24] tracking-widest block font-mono">
                    MISI #{m.no}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {m.idText}
                  </p>
                  <p className="text-xs text-stone-500 italic leading-relaxed pt-1 border-t border-stone-100">
                    "{m.enText}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pilar 3: Core Values & Leadership Traits */}
      <section id="core-values" className="py-20 sm:py-28 bg-white border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Pilar 3 — Budaya Perusahaan
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Core Values & Leadership Traits
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Fondasi karakter kerja dan kepemimpinan yang menjadi landasan seluruh insan Halla Mohana, diselaraskan dengan standar grup Tiara Marga Trakindo (TMT).
            </p>
          </div>

          {/* 4 Core Values */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Nilai-Nilai Inti (4 Core Values)
              </h3>
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Standar TMT / MahaDasha Group
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-stone-200/90 bg-[#F8F9FA] p-6 space-y-3 hover:border-[#8B1E24] hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24] block">
                      {v.indonesian}
                    </span>
                    <h4 className="text-lg font-black text-stone-900 group-hover:text-[#8B1E24] transition-colors">
                      {v.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Leadership Traits */}
          <div className="space-y-6 pt-6 border-t border-stone-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Sifat Kepemimpinan (4 Leadership Traits)
              </h3>
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Pedoman Insan Halla Mohana
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipTraits.map((t) => (
                <div
                  key={t.trait}
                  className="rounded-2xl border border-stone-200/90 bg-[#F8F9FA] p-6 space-y-2 hover:border-[#8B1E24] hover:bg-white hover:shadow-md transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 block">
                    {t.label}
                  </span>
                  <h4 className="text-base font-black text-stone-900 group-hover:text-[#8B1E24] transition-colors">
                    {t.trait}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pilar 4: Company Structure (Bagan Struktur Organisasi & Kepemilikan Resmi) */}
      <section id="company-structure" className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Pilar 4 — Company Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Struktur Korporasi & Hubungan Kepemilikan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Bagan resmi hubungan kepemilikan saham dan hirarki manajerial di bawah konglomerasi Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          {/* Visual Architecture Tree of Ownership */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companyStructure.map((s, idx) => (
                <div
                  key={s.name}
                  className="relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-3 shadow-xs hover:border-[#8B1E24] hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-0.5 rounded-full">
                      {s.badge}
                    </span>
                    <span className="text-xs font-semibold text-stone-400">
                      {s.level}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-stone-900 leading-snug">
                    {s.name}
                  </h4>

                  <p className="text-xs font-bold text-stone-700">
                    {s.role}
                  </p>

                  <p className="text-xs text-stone-500 leading-relaxed font-normal pt-1 border-t border-stone-100">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Downward Connecting Branch Indicator */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-[#8B1E24]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B1E24]">
                  Level 4 — Unit Operasional Properti Komersial Terpadu
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="rounded-xl border border-stone-100 bg-[#F8F9FA] p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24]">
                    Hospitality Unit (Pekanbaru)
                  </span>
                  <h5 className="text-base font-black text-stone-900">
                    FOX Hotel Pekanbaru (FOX Harris Hotel)
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    225 kamar & suite, ballroom MICE, WTF Restaurant, gym, spa, dan kolam renang indoor rooftop sky pool tertinggi di kota Pekanbaru.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-100 bg-[#F8F9FA] p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E24]">
                    Commercial Retail Unit (Pekanbaru)
                  </span>
                  <h5 className="text-base font-black text-stone-900">
                    Pekanbaru Xchange (PX Mall)
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pusat perbelanjaan dan gaya hidup perkotaan terintegrasi dengan bioskop Cinema XXI, Alfresco Dining GF, serta area event komunitas terbuka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pilar 5: Code of Business Conduct & Ethics (Tata Kelola Perusahaan) */}
      <section id="code-of-conduct" className="py-20 sm:py-28 bg-white border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
                Pilar 5 — Tata Kelola Perusahaan
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                Code of Business Conduct & Ethics (GCG)
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                PT Halla Mohana senantiasa mematuhi standar etika bisnis, kepatuhan hukum, dan prinsip Good Corporate Governance (GCG) yang ditetapkan oleh MahaDasha dan Tiara Marga Trakindo (TMT Group).
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Kepatuhan Hukum & Regulasi:</strong> Mengutamakan standar keselamatan gedung, sertifikasi K3, efisiensi energi ramah lingkungan, dan transparansi laporan keuangan.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Perlindungan Pemangku Kepentingan:</strong> Menjunjung tinggi perlakuan adil kepada para penyewa (tenants), tamu hotel, mitra kerja, dan masyarakat sekitar.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Pilar GCG Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 space-y-2">
                  <span className="text-xs font-black text-[#8B1E24] uppercase tracking-wider block">
                    01. Transparansi
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">Keterbukaan Informasi</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Penyediaan informasi material yang akurat, jelas, dan tepat waktu bagi pemegang saham dan pemangku kepentingan.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 space-y-2">
                  <span className="text-xs font-black text-[#8B1E24] uppercase tracking-wider block">
                    02. Akuntabilitas
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">Kinerja Terukur</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pengelolaan perusahaan secara efektif dengan fungsi pengawasan dan pertanggungjawaban yang jelas.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 space-y-2">
                  <span className="text-xs font-black text-[#8B1E24] uppercase tracking-wider block">
                    03. Responsibilitas
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">Kepatuhan & Sosial</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Kepatuhan penuh pada hukum dan tanggung jawab terhadap lingkungan serta masyarakat (Good Corporate Citizen).
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 space-y-2">
                  <span className="text-xs font-black text-[#8B1E24] uppercase tracking-wider block">
                    04. Independensi
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">Profesionalitas Murni</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pengelolaan bebas dari tekanan atau benturan kepentingan yang tidak sesuai dengan ketentuan perundang-undangan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
