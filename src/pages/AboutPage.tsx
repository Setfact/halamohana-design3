import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  TrendingUp,
  Award,
  Heart,
  Zap,
  Eye,
  Scale,
  FileCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // Navigation IDs for Scroll-Spy
  const navSections = [
    { id: 'overview', label: 'Halla Mohana Overview' },
    { id: 'vision-mission', label: 'Vision & Mission' },
    { id: 'core-values', label: 'Core Values & Leadership Traits' },
    { id: 'company-structure', label: 'Company Structure' },
    { id: 'code-of-conduct', label: 'Code of Conduct & Ethics' },
  ];

  // Active section for Scroll-Spy indicator
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Culture Segmented Tabs control (Core Values vs Leadership Traits)
  const [activeCultureTab, setActiveCultureTab] = useState<'values' | 'traits'>('values');

  // Company Structure Accordion States (Collapsible by default)
  const [isTmtExpanded, setIsTmtExpanded] = useState<boolean>(false);
  const [isMahadashaExpanded, setIsMahadashaExpanded] = useState<boolean>(false);

  // Scroll-Spy detection with passive listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for sticky header + sub-navbar
      for (let i = navSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(navSections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // 4 Core Values (Standar Grup TMT / MahaDasha)
  const coreValues = [
    {
      title: 'Integrity',
      tag: 'Nilai Inti 1',
      desc: 'Menjunjung tinggi kejujuran, etika bisnis, dan ketepatan janji dalam setiap aspek operasional dan hubungan kemitraan.',
    },
    {
      title: 'Continuous Development',
      tag: 'Nilai Inti 2',
      desc: 'Senantiasa belajar dan berinovasi untuk meningkatkan mutu fasilitas properti dan kompetensi sumber daya manusia.',
    },
    {
      title: 'Excellence',
      tag: 'Nilai Inti 3',
      desc: 'Memberikan standar layanan hospitality bintang empat dan pengelolaan ritel terbaik bagi seluruh pemangku kepentingan.',
    },
    {
      title: 'Compassion',
      tag: 'Nilai Inti 4',
      desc: 'Peduli terhadap keselamatan kerja (K3), kesejahteraan insan korporat, masyarakat, serta kelestarian lingkungan.',
    },
  ];

  // 4 Leadership Traits (Pedoman Kepemimpinan Grup TMT / MahaDasha)
  const leadershipTraits = [
    {
      trait: 'Competent',
      tag: 'Karakter 1',
      desc: 'Memiliki keahlian teknis dan kapabilitas manajerial yang unggul di industri hospitality dan properti komersial.',
    },
    {
      trait: 'Open-minded',
      tag: 'Karakter 2',
      desc: 'Mampu menerima gagasan inovatif, adaptif terhadap perkembangan, dan menghargai keberagaman perspektif.',
    },
    {
      trait: 'Reliable',
      tag: 'Karakter 3',
      desc: 'Konsisten dalam tindakan, berintegritas tinggi, serta dapat dipercaya memenuhi seluruh komitmen.',
    },
    {
      trait: 'Courageous',
      tag: 'Karakter 4',
      desc: 'Berani mengambil inisiatif terukur, bertanggung jawab atas keputusan, dan gigih menghadapi tantangan industri.',
    },
  ];

  // 4 Poin Misi Resmi
  const officialMissions = [
    'Menciptakan peluang kerja yang bermakna dan menantang bagi sebanyak mungkin masyarakat Indonesia.',
    'Memastikan pertumbuhan yang berkelanjutan dan menguntungkan guna memaksimalkan nilai pemegang saham.',
    'Menyediakan solusi bernilai tambah yang mengoptimalkan kepuasan pelanggan.',
    'Terlibat secara aktif di dalam masyarakat sebagai warga korporat yang baik (good corporate citizen).',
  ];

  // 4 Prinsip Tata Kelola (GCG)
  const governancePrinciples = [
    {
      title: 'Transparansi',
      desc: 'Keterbukaan dalam menyajikan informasi material yang akurat, jelas, dan tepat waktu bagi pemegang saham dan pemangku kepentingan.',
    },
    {
      title: 'Akuntabilitas',
      desc: 'Pengelolaan perusahaan secara terukur dengan kejelasan fungsi, pelaksanaan, dan pertanggungjawaban organ korporat.',
    },
    {
      title: 'Responsibilitas',
      desc: 'Kepatuhan terhadap hukum, regulasi ketenagakerjaan, sertifikasi K3, serta tanggung jawab sosial dan lingkungan.',
    },
    {
      title: 'Independensi',
      desc: 'Pengambilan keputusan secara objektif dan profesional tanpa benturan kepentingan serta bebas dari tekanan pihak manapun.',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-[#141414]">
      {/* 1. Hero Banner Korporat (Arsitektural, Berwibawa, Tanpa Badge Kapsul) */}
      <div className="relative bg-[#0F1117] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hotel/hero-corporate-wide.jpg"
            alt="PT Halla Mohana Corporate Architecture"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#161217]/90 to-[#2A0E13]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-4 text-left">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-400 font-medium">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Beranda
            </a>
            <ChevronRight className="h-3.5 w-3.5 text-stone-600 shrink-0" />
            <span className="text-[#8B1E24] font-semibold">Corporate Info</span>
          </nav>

          <p className="text-xs tracking-widest uppercase text-stone-400 font-medium">
            Profil Korporat & Struktur Ekosistem
          </p>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              Corporate Info
            </h1>
            <p className="text-base text-stone-300 leading-relaxed font-normal max-w-2xl">
              Profil resmi, visi strategis, nilai luhur kepemimpinan, dan tata kelola PT Halla Mohana dalam ekosistem PT Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          <p className="text-xs text-stone-400 pt-1">
            Didirikan tahun 2013 • Anak Perusahaan MahaDasha (TMT Group) • Kawasan Terpadu Jl. Riau No. 147 Pekanbaru
          </p>
        </div>
      </div>

      {/* Sticky Sub-Navbar (Garis Pemisah Hairline, Tanpa Pill Badges) */}
      <div className="sticky top-[68px] sm:top-[74px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <nav
            aria-label="Sub navigasi Corporate Info"
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none whitespace-nowrap text-xs sm:text-sm pt-3"
          >
            {navSections.map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={`#${nav.id}`}
                  onClick={(e) => scrollToSection(e, nav.id)}
                  className={`pb-3 -mb-[1px] border-b-2 font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#8B1E24] text-[#8B1E24]'
                      : 'border-transparent text-[#52525B] hover:text-[#141414]'
                  }`}
                >
                  {nav.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 2. Section: Halla Mohana Overview (#FFFFFF, Rata Kiri Editorial) */}
      <section
        id="overview"
        className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5] scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Kolom Kiri: 7 Kolom pada LG (Foto Terpadu Arsitektural Bersih) */}
            <div className="lg:col-span-7 text-left">
              <div className="rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100">
                <img
                  src="/images/hotel/overview-facade-landscape.jpg"
                  alt="Kawasan Terpadu FOX Harris Hotel Pekanbaru & Pekanbaru Xchange"
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
              <p className="text-xs text-[#52525B] mt-2.5 leading-relaxed">
                Kawasan komersial terpadu seluas 1,5 hektar di koridor Jalan Riau No. 147, Senapelan, Pekanbaru.
              </p>
            </div>

            {/* Kolom Kanan: 5 Kolom pada LG (Satu Judul Utama Bersih & Narasi Resmi) */}
            <div className="lg:col-span-5 text-left space-y-4">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Corporate Overview
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight leading-tight">
                Menghadirkan Standar Baru Hospitalitas & Gaya Hidup Urban
              </h2>

              <div className="space-y-3.5 text-base text-[#52525B] leading-relaxed font-normal">
                <p>
                  Didirikan pada tahun 2013, <strong>PT Halla Mohana</strong> adalah perusahaan pengembang dan pengelola properti yang berfokus pada sektor perhotelan (<em>hospitality</em>) dan pusat perbelanjaan gaya hidup (<em>commercial lifestyle mall</em>). Perusahaan bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> sebagai bagian dari diversifikasi konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>.
                </p>
                <p>
                  Portofolio unggulan perseroan berada di koridor strategis <strong>Jalan Riau No. 147, Senapelan, Pekanbaru</strong> dalam sebuah kawasan terpadu (<em>mixed-use commercial complex</em>) yang mengintegrasikan hotel bintang empat <strong>FOX Harris Hotel Pekanbaru</strong> (225 kamar & suite) dengan pusat perbelanjaan gaya hidup <strong>Pekanbaru Xchange (PX)</strong>.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects');
                  }}
                  className="inline-flex items-center gap-2 bg-[#8B1E24] hover:bg-[#72181D] text-white px-6 py-3 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  <span>Eksplorasi Portofolio Properti</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Vision & Mission (#F7F7F5 Warm Off-White) */}
      <section
        id="vision-mission"
        className="py-16 sm:py-24 bg-[#F7F7F5] border-b border-[#E5E5E5] scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10 text-left">
          <div className="max-w-2xl space-y-1">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Arah Strategis & Keberlanjutan
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight">
              Vision & Mission
            </h2>
            <p className="text-base text-[#52525B] leading-relaxed pt-1">
              Arah panduan strategis dan komitmen keberlanjutan PT Halla Mohana dalam menciptakan nilai tambah bagi pemegang saham, pelanggan, dan masyarakat.
            </p>
          </div>

          {/* Visi Card Berlatar Gelap Elegan */}
          <div className="rounded-lg bg-[#141414] p-8 sm:p-10 text-white border-l-4 border-l-[#8B1E24] text-left shadow-xs">
            <p className="text-xs tracking-widest uppercase text-stone-400 font-medium">
              Visi Perusahaan
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-2 leading-relaxed tracking-tight max-w-3xl">
              "Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."
            </h3>
          </div>

          {/* Misi 2x2 Grid Kartu Putih Bersih */}
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Misi Perusahaan
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {officialMissions.map((missionText, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#E5E5E5] bg-white p-6 border-l-2 border-l-[#8B1E24] text-left shadow-xs"
                >
                  <p className="text-sm sm:text-base text-[#141414] leading-relaxed font-normal">
                    {missionText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Core Values & Leadership Traits (#FFFFFF) */}
      <section
        id="core-values"
        className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5] scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10 text-left">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-[#E5E5E5]">
            <div className="max-w-2xl space-y-1">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Budaya & Standar Kepemimpinan
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight">
                Core Values & Leadership Traits
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed pt-1">
                Fondasi karakter kerja dan kepemimpinan yang menjadi pedoman insan Halla Mohana, diselaraskan dengan standar grup Tiara Marga Trakindo (TMT Group).
              </p>
            </div>

            {/* Segmented Switcher Minimalis */}
            <div className="inline-flex border border-[#E5E5E5] rounded-md p-1 bg-[#F7F7F5] shrink-0">
              <button
                type="button"
                onClick={() => setActiveCultureTab('values')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeCultureTab === 'values'
                    ? 'bg-white text-[#141414] shadow-xs'
                    : 'text-[#52525B] hover:text-[#141414]'
                }`}
              >
                Core Values (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveCultureTab('traits')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeCultureTab === 'traits'
                    ? 'bg-white text-[#141414] shadow-xs'
                    : 'text-[#52525B] hover:text-[#141414]'
                }`}
              >
                Leadership Traits (4)
              </button>
            </div>
          </div>

          {/* Kartu Budaya Bersih Tanpa Ikon Klise */}
          {activeCultureTab === 'values' ? (
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Empat Nilai Inti Perusahaan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {coreValues.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-lg border border-[#E5E5E5] bg-white p-6 text-left shadow-xs hover:border-[#8B1E24] transition-colors space-y-2"
                  >
                    <p className="text-[11px] tracking-widest uppercase text-[#8B1E24] font-semibold">
                      {v.tag}
                    </p>
                    <h3 className="text-base font-semibold text-[#141414]">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal pt-1">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Empat Karakter Kepemimpinan Unggul
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {leadershipTraits.map((t) => (
                  <div
                    key={t.trait}
                    className="rounded-lg border border-[#E5E5E5] bg-white p-6 text-left shadow-xs hover:border-[#8B1E24] transition-colors space-y-2"
                  >
                    <p className="text-[11px] tracking-widest uppercase text-[#8B1E24] font-semibold">
                      {t.tag}
                    </p>
                    <h3 className="text-base font-semibold text-[#141414]">
                      {t.trait}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal pt-1">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Section: Company Structure (#F7F7F5, Bagan Hierarki 8 Anak Perusahaan TMT Group - Collapsible & Muted Color Accents) */}
      <section
        id="company-structure"
        className="py-16 sm:py-24 bg-[#F7F7F5] border-b border-[#E5E5E5] scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#E5E5E5]">
            <div className="max-w-3xl space-y-1">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Struktur Kepemilikan Korporasi
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight">
                Company Structure
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed pt-1">
                Bagan kepemilikan resmi PT Tiara Marga Trakindo (TMT Group) yang menaungi 8 anak perusahaan, dengan PT Halla Mohana sebagai pilar pengembangan dan pengelolaan hospitality dan properti komersial.
              </p>
            </div>

            {/* Quick Action Toggle Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsTmtExpanded(true);
                  setIsMahadashaExpanded(true);
                }}
                className="px-3.5 py-1.5 rounded-md border border-[#E5E5E5] bg-white text-xs font-semibold text-[#141414] hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Buka Semua
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTmtExpanded(false);
                  setIsMahadashaExpanded(false);
                }}
                className="px-3.5 py-1.5 rounded-md border border-[#E5E5E5] bg-white text-xs font-semibold text-[#141414] hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Tutup Semua
              </button>
            </div>
          </div>

          {/* Container Bagan Hierarki */}
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[960px] max-w-6xl mx-auto space-y-0 pt-2">
              {/* Top Node: PT Tiara Marga Trakindo (TMT Group) */}
              <div className="flex justify-center">
                <div
                  onClick={() => setIsTmtExpanded(!isTmtExpanded)}
                  className={`rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-xs text-left w-[460px] border-t-2 border-t-[#141414] transition-all cursor-pointer hover:shadow-md ${
                    isTmtExpanded ? 'ring-1 ring-slate-300' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] tracking-widest uppercase text-neutral-500 font-medium">
                      Induk Grup Usaha • Ultimate Holding Group
                    </p>
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 bg-stone-100 px-2 py-0.5 rounded">
                      8 Entitas
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#141414] mt-1.5">
                    PT Tiara Marga Trakindo (TMT Group)
                  </h3>
                  <p className="text-xs text-[#52525B] pt-1 leading-relaxed">
                    Konglomerasi nasional terkemuka yang menaungi 8 entitas anak perusahaan lintas sektor industri di Indonesia.
                  </p>

                  {/* Interactive Button inside Parent Card */}
                  <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8B1E24] flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{isTmtExpanded ? 'Sembunyikan Struktur Anak Perusahaan' : 'Buka Struktur Anak Perusahaan (8 Entitas)'}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                      <span>{isTmtExpanded ? 'Tutup' : 'Buka'}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isTmtExpanded ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              </div>

              {/* AnimatePresence for Level 1 Subsidiaries */}
              <AnimatePresence>
                {isTmtExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    {/* Solid Vertical Connector Line from Parent Node (Standard 2px thickness, Slate Neutral, No Arrowheads) */}
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-8 bg-slate-300" />
                    </div>

                    {/* Continuous Solid Connector Bar for the 5 Columns */}
                    <div className="grid grid-cols-5 gap-4">
                      {/* Column 1 Connector: starts from center to right */}
                      <div className="relative h-6 flex justify-center">
                        <div className="absolute top-0 right-0 left-1/2 h-[2px] bg-slate-300 -mr-2" />
                        <div className="w-[2px] h-full bg-slate-300" />
                      </div>
                      {/* Column 2 Connector: full horizontal span */}
                      <div className="relative h-6 flex justify-center">
                        <div className="absolute top-0 -left-2 -right-2 h-[2px] bg-slate-300" />
                        <div className="w-[2px] h-full bg-slate-300" />
                      </div>
                      {/* Column 3 Connector (Center): full horizontal span connected to vertical stem */}
                      <div className="relative h-6 flex justify-center">
                        <div className="absolute top-0 -left-2 -right-2 h-[2px] bg-slate-300" />
                        <div className="w-[2px] h-full bg-slate-300" />
                      </div>
                      {/* Column 4 Connector: full horizontal span */}
                      <div className="relative h-6 flex justify-center">
                        <div className="absolute top-0 -left-2 -right-2 h-[2px] bg-slate-300" />
                        <div className="w-[2px] h-full bg-slate-300" />
                      </div>
                      {/* Column 5 Connector: starts from left to center */}
                      <div className="relative h-6 flex justify-center">
                        <div className="absolute top-0 left-0 right-1/2 h-[2px] bg-slate-300 -ml-2" />
                        <div className="w-[2px] h-full bg-slate-300" />
                      </div>
                    </div>

                    {/* Baris 1: 5 Entitas Utama Sejajar (Clean White Cards + Subtle Muted Top Borders) */}
                    <div className="grid grid-cols-5 gap-4">
                      {/* 1. PT Trakindo Utama (Warm Amber Accent) */}
                      <div className="rounded-lg border border-[#E5E5E5] bg-white p-4 text-left shadow-xs border-t-2 border-t-[#D97706] hover:shadow-sm transition-shadow">
                        <div className="w-5 h-0.5 bg-[#D97706] mb-2" />
                        <p className="text-[11px] tracking-widest uppercase text-[#B45309] font-medium">
                          Heavy Equipment
                        </p>
                        <h4 className="text-sm font-semibold text-[#141414] mt-1">
                          PT Trakindo Utama
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                          Solusi alat berat dan mesin industri Caterpillar terdepan di Indonesia.
                        </p>
                      </div>

                      {/* 2. PT Mahadana Dasha Utama (Slate Blue Accent + Interactive Sub-Holding Toggle) */}
                      <div
                        onClick={() => setIsMahadashaExpanded(!isMahadashaExpanded)}
                        className={`rounded-lg border border-[#E5E5E5] bg-white p-4 text-left shadow-xs border-t-2 border-t-[#3B82F6] transition-all cursor-pointer hover:shadow-sm ${
                          isMahadashaExpanded ? 'ring-1 ring-blue-300' : ''
                        }`}
                      >
                        <div className="w-5 h-0.5 bg-[#3B82F6] mb-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] tracking-widest uppercase text-[#1D4ED8] font-medium">
                            Sub-Holding
                          </p>
                          <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                            3 Entitas
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#141414] mt-1">
                          PT Mahadana Dasha Utama (MahaDasha)
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                          Pengelola portofolio diversifikasi usaha dan investasi terintegrasi.
                        </p>

                        {/* Interactive Toggle Button inside MahaDasha Card */}
                        <div className="mt-3 pt-2.5 border-t border-[#E5E5E5] flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-blue-700">
                            {isMahadashaExpanded ? 'Tutup Portofolio' : 'Buka Portofolio'}
                          </span>
                          <ChevronDown className={`h-3.5 w-3.5 text-blue-700 transition-transform duration-300 ${isMahadashaExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* 3. PT ABM Investama Tbk. (Sage Green Accent) */}
                      <div className="rounded-lg border border-[#E5E5E5] bg-white p-4 text-left shadow-xs border-t-2 border-t-[#10B981] hover:shadow-sm transition-shadow">
                        <div className="w-5 h-0.5 bg-[#10B981] mb-2" />
                        <p className="text-[11px] tracking-widest uppercase text-[#047857] font-medium">
                          Energy Solutions
                        </p>
                        <h4 className="text-sm font-semibold text-[#141414] mt-1">
                          PT ABM Investama Tbk.
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                          Solusi energi dan pertambangan terintegrasi dari hulu hingga hilir.
                        </p>
                      </div>

                      {/* 4. PT Chandra Sakti Utama Leasing (Dusty Cyan Accent) */}
                      <div className="rounded-lg border border-[#E5E5E5] bg-white p-4 text-left shadow-xs border-t-2 border-t-[#0EA5E9] hover:shadow-sm transition-shadow">
                        <div className="w-5 h-0.5 bg-[#0EA5E9] mb-2" />
                        <p className="text-[11px] tracking-widest uppercase text-[#0369A1] font-medium">
                          Financial Services
                        </p>
                        <h4 className="text-sm font-semibold text-[#141414] mt-1">
                          PT Chandra Sakti Utama Leasing
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                          Layanan pembiayaan dan sewa guna usaha komersial (CSULfinance).
                        </p>
                      </div>

                      {/* 5. PT Radana Bhaskara Finance Tbk. (Muted Terracotta Accent) */}
                      <div className="rounded-lg border border-[#E5E5E5] bg-white p-4 text-left shadow-xs border-t-2 border-t-[#F43F5E] hover:shadow-sm transition-shadow">
                        <div className="w-5 h-0.5 bg-[#F43F5E] mb-2" />
                        <p className="text-[11px] tracking-widest uppercase text-[#BE123C] font-medium">
                          Multifinance
                        </p>
                        <h4 className="text-sm font-semibold text-[#141414] mt-1">
                          PT Radana Bhaskara Finance Tbk.
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                          Solusi pembiayaan multiguna dan modal kerja (Radana Finance).
                        </p>
                      </div>
                    </div>

                    {/* Level 2: AnimatePresence for MahaDasha Sub-Holding Cluster */}
                    <AnimatePresence>
                      {isMahadashaExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden pt-1"
                        >
                          {/* Connector Stem down from MahaDasha (No arrowheads) */}
                          <div className="flex flex-col items-center pt-3">
                            <div className="w-[2px] h-7 bg-slate-300" />
                          </div>

                          {/* 3-Column Solid Connector Bar for the Diversified Entities */}
                          <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-3 gap-6">
                              {/* Column 1: center to right */}
                              <div className="relative h-6 flex justify-center">
                                <div className="absolute top-0 right-0 left-1/2 h-[2px] bg-slate-300 -mr-3" />
                                <div className="w-[2px] h-full bg-slate-300" />
                              </div>
                              {/* Column 2: full span */}
                              <div className="relative h-6 flex justify-center">
                                <div className="absolute top-0 -left-3 -right-3 h-[2px] bg-slate-300" />
                                <div className="w-[2px] h-full bg-slate-300" />
                              </div>
                              {/* Column 3: left to center */}
                              <div className="relative h-6 flex justify-center">
                                <div className="absolute top-0 left-0 right-1/2 h-[2px] bg-slate-300 -ml-3" />
                                <div className="w-[2px] h-full bg-slate-300" />
                              </div>
                            </div>

                            {/* Baris 2: 3 Entitas Sejajar (Clean White Cards + Distinct Muted Accents) */}
                            <div className="grid grid-cols-3 gap-6">
                              {/* 1. PT Halla Mohana (Maroon Accent + Highlighted) */}
                              <div className="rounded-lg border-2 border-[#8B1E24] bg-white p-5 text-left shadow-xs border-t-2 border-t-[#8B1E24]">
                                <div className="w-5 h-0.5 bg-[#8B1E24] mb-2" />
                                <p className="text-[11px] tracking-widest uppercase text-[#8B1E24] font-semibold">
                                  Hospitality &amp; Commercial Retail
                                </p>

                                <h4 className="text-base font-semibold text-[#141414] mt-1">
                                  PT Halla Mohana
                                </h4>
                                <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                                  Didirikan tahun 2013, berfokus pada pembangunan dan pengelolaan hotel bintang 4 serta commercial lifestyle mall.
                                </p>

                                {/* Logo Resmi hm Halla Mohana */}
                                <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-start">
                                  <img
                                    src="/images/logo/logo.png"
                                    alt="PT Halla Mohana Logo"
                                    className="h-7 w-auto object-contain"
                                  />
                                </div>
                              </div>

                              {/* 2. PT Pastika Nirmala (Muted Teal Accent) */}
                              <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-2 border-t-[#14B8A6] hover:shadow-sm transition-shadow">
                                <div className="w-5 h-0.5 bg-[#14B8A6] mb-2" />
                                <p className="text-[11px] tracking-widest uppercase text-[#0F766E] font-medium">
                                  Healthcare &amp; Facilities
                                </p>
                                <h4 className="text-sm font-semibold text-[#141414] mt-1">
                                  PT Pastika Nirmala
                                </h4>
                                <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                                  Penyedia layanan kesehatan modern dan pengelolaan fasilitas rumah sakit terpercaya.
                                </p>
                              </div>

                              {/* 3. PT Karya Kharisma Mandiri (Dusty Indigo Accent) */}
                              <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-2 border-t-[#6366F1] hover:shadow-sm transition-shadow">
                                <div className="w-5 h-0.5 bg-[#6366F1] mb-2" />
                                <p className="text-[11px] tracking-widest uppercase text-[#4F46E5] font-medium">
                                  Human Capital Services
                                </p>
                                <h4 className="text-sm font-semibold text-[#141414] mt-1">
                                  PT Karya Kharisma Mandiri
                                </h4>
                                <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                                  Layanan pengelolaan talenta, rekrutmen profesional, dan alih daya sumber daya manusia.
                                </p>
                              </div>
                            </div>

                            {/* Sub-Branch: 2 Unit Properti Operasional di Pekanbaru di bawah PT Halla Mohana */}
                            <div className="pt-2">
                              {/* Solid Connector Stem from PT Halla Mohana (col 1, No arrowheads) */}
                              <div className="grid grid-cols-3 gap-6">
                                <div className="flex flex-col items-center">
                                  <div className="w-[2px] h-6 bg-slate-300" />
                                </div>
                                <div />
                                <div />
                              </div>

                              {/* 2 Unit Properti di Pekanbaru */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Unit 1: FOX Harris Hotel Pekanbaru */}
                                <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-l-2 border-l-[#8B1E24]">
                                  <p className="text-[11px] tracking-widest uppercase text-neutral-500 font-medium">
                                    Hospitality Unit • Pekanbaru
                                  </p>
                                  <h5 className="text-sm font-semibold text-[#141414] mt-1">
                                    FOX Harris Hotel Pekanbaru
                                  </h5>
                                  <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                                    Hotel bintang 4 berkapasitas 225 kamar &amp; suite modern, Grand Ballroom, WTF Restaurant, dan indoor rooftop sky pool tertinggi di Pekanbaru.
                                  </p>
                                </div>

                                {/* Unit 2: Pekanbaru Xchange (PX) */}
                                <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-l-2 border-l-[#8B1E24]">
                                  <p className="text-[11px] tracking-widest uppercase text-neutral-500 font-medium">
                                    Commercial Retail Unit • Pekanbaru
                                  </p>
                                  <h5 className="text-sm font-semibold text-[#141414] mt-1">
                                    Pekanbaru Xchange (PX)
                                  </h5>
                                  <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                                    Pusat perbelanjaan gaya hidup modern terintegrasi dengan bioskop Cinema XXI, koridor kuliner Alfresco Dining, dan area pertunjukan komunitas.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Code of Business Conduct & Ethics (#FFFFFF) */}
      <section
        id="code-of-conduct"
        className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5] scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Kolom Kiri: 5 Kolom pada LG */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Tata Kelola Perusahaan
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight leading-tight">
                Code of Business Conduct & Ethics
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed font-normal">
                PT Halla Mohana senantiasa mematuhi standar etika bisnis, kepatuhan hukum, dan tata kelola perusahaan yang baik yang ditetapkan oleh MahaDasha dan Tiara Marga Trakindo (TMT Group).
              </p>

              <div className="space-y-3 pt-2">
                <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-5 text-left">
                  <h4 className="text-sm font-semibold text-[#141414]">
                    Kepatuhan Regulasi & K3
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                    Mengutamakan standar keselamatan gedung, sertifikasi K3, efisiensi energi ramah lingkungan, dan transparansi laporan operasional.
                  </p>
                </div>
                <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-5 text-left">
                  <h4 className="text-sm font-semibold text-[#141414]">
                    Perlindungan Pemangku Kepentingan
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed mt-1">
                    Menjunjung tinggi perlakuan adil kepada para mitra bisnis, penyewa (tenants), tamu hotel, dan masyarakat sekitar.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 7 Kolom pada LG (4 Pilar GCG) */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium mb-3">
                Empat Pilar Pokok Tata Kelola Perusahaan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {governancePrinciples.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-[#E5E5E5] bg-white p-5 border-l-2 border-l-[#8B1E24] text-left shadow-xs space-y-1.5"
                  >
                    <h3 className="text-sm font-semibold text-[#141414]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
