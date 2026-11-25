import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArchitecturalReveal,
  ArchitecturalStagger,
  ArchitecturalStaggerItem,
  ImageFrameReveal,
  ARCHITECTURAL_EASE,
} from '@/components/ui/MotionPrimitives';
import {
  Building2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
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
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/New-Asset/Hotel/Restaurant%201.png"
            alt="PT Halla Mohana Corporate Architecture"
            initial={{ scale: 1.07, opacity: 0.14 }}
            animate={{ scale: 1, opacity: 0.28 }}
            transition={{ duration: 1.1, ease: ARCHITECTURAL_EASE }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#161217]/90 to-[#2A0E13]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ARCHITECTURAL_EASE }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-4 text-left"
        >
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
        </motion.div>
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
                  className={`relative pb-3 font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#8B1E24]'
                      : 'text-[#52525B] hover:text-[#141414]'
                  }`}
                >
                  {nav.label}
                  {isActive && (
                    <motion.span
                      layoutId="about-subnav-indicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E24]"
                    />
                  )}
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
            <ImageFrameReveal className="lg:col-span-7 text-left">
              <div className="rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100 group">
                <img
                  src="/images/New-Asset/Mall%20Photo/PX%20MALL.png"
                  alt="Kawasan Terpadu FOX Harris Hotel Pekanbaru & Pekanbaru Xchange"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-[#52525B] mt-2.5 leading-relaxed">
                Kawasan komersial terpadu seluas 1,5 hektar di koridor Jalan Riau No. 147, Senapelan, Pekanbaru.
              </p>
            </ImageFrameReveal>

            {/* Kolom Kanan: 5 Kolom pada LG (Satu Judul Utama Bersih & Narasi Resmi) */}
            <ArchitecturalReveal className="lg:col-span-5 text-left space-y-4" delay={0.1}>
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
            </ArchitecturalReveal>
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
          <ArchitecturalReveal>
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
          </ArchitecturalReveal>

          {/* Visi Card Berlatar Gelap Elegan */}
          <ArchitecturalReveal delay={0.08}>
            <div className="rounded-lg bg-[#141414] p-8 sm:p-10 text-white border-l-4 border-l-[#8B1E24] text-left shadow-xs">
              <p className="text-xs tracking-widest uppercase text-stone-400 font-medium">
                Visi Perusahaan
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-2 leading-relaxed tracking-tight max-w-3xl">
                "Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."
              </h3>
            </div>
          </ArchitecturalReveal>

          {/* Misi 2x2 Grid Kartu Putih Bersih */}
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Misi Perusahaan
            </p>
            <ArchitecturalStagger className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.08}>
              {officialMissions.map((missionText, idx) => (
                <ArchitecturalStaggerItem key={idx}>
                  <div className="h-full rounded-lg border border-[#E5E5E5] bg-white p-6 border-l-2 border-l-[#8B1E24] text-left shadow-xs hover:border-[#8B1E24] transition-colors">
                    <p className="text-sm sm:text-base text-[#141414] leading-relaxed font-normal">
                      {missionText}
                    </p>
                  </div>
                </ArchitecturalStaggerItem>
              ))}
            </ArchitecturalStagger>
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
          <ArchitecturalReveal>
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

              {/* Segmented Switcher Minimalis dengan Smooth Sliding Indicator */}
              <div className="inline-flex border border-[#E5E5E5] rounded-md p-1 bg-[#F7F7F5] shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveCultureTab('values')}
                  className={`relative px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeCultureTab === 'values'
                      ? 'text-[#141414]'
                      : 'text-[#52525B] hover:text-[#141414]'
                  }`}
                >
                  {activeCultureTab === 'values' && (
                    <motion.span
                      layoutId="culture-tab-indicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded bg-white shadow-xs"
                    />
                  )}
                  <span className="relative z-10">Core Values (4)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCultureTab('traits')}
                  className={`relative px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeCultureTab === 'traits'
                      ? 'text-[#141414]'
                      : 'text-[#52525B] hover:text-[#141414]'
                  }`}
                >
                  {activeCultureTab === 'traits' && (
                    <motion.span
                      layoutId="culture-tab-indicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded bg-white shadow-xs"
                    />
                  )}
                  <span className="relative z-10">Leadership Traits (4)</span>
                </button>
              </div>
            </div>
          </ArchitecturalReveal>

          {/* Kartu Budaya Bersih dengan AnimatePresence Crossfade */}
          <AnimatePresence mode="wait">
            {activeCultureTab === 'values' ? (
              <motion.div
                key="values-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                className="space-y-3"
              >
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Empat Nilai Inti Perusahaan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {coreValues.map((v) => (
                    <motion.div
                      key={v.title}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25, ease: ARCHITECTURAL_EASE }}
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="traits-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                className="space-y-3"
              >
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Empat Karakter Kepemimpinan Unggul
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {leadershipTraits.map((t) => (
                    <motion.div
                      key={t.trait}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25, ease: ARCHITECTURAL_EASE }}
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

          {/* Interactive Bento & Nested Accordion Container (Zero Connector Lines) */}
          <div className="space-y-6 pt-2">
            {/* 1. Collapsed State: Full-Width Split Card for Induk Utama TMT Group */}
            <div
              onClick={() => setIsTmtExpanded(!isTmtExpanded)}
              className={`w-full rounded-2xl border bg-white p-6 sm:p-8 shadow-xs border-t-[4px] border-t-[#141414] transition-all cursor-pointer hover:shadow-md ${
                isTmtExpanded ? 'border-stone-400 ring-2 ring-stone-900/5' : 'border-[#E5E5E5]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Column: Heading, Lineage & Description */}
                <div className="max-w-3xl space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-0.5 bg-[#141414]" />
                    <p className="text-xs tracking-widest uppercase text-neutral-500 font-semibold">
                      Induk Grup Usaha • Ultimate Holding Group
                    </p>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-[#141414] tracking-tight">
                    PT Tiara Marga Trakindo (TMT Group)
                  </h3>

                  <p className="text-sm text-[#52525B] leading-relaxed max-w-2xl font-normal">
                    Konglomerasi investasi nasional terkemuka yang menaungi 8 entitas anak perusahaan strategis lintas sektor industri di Indonesia—mulai dari alat berat, energi, pembiayaan komersial, hingga hospitalitas dan properti.
                  </p>
                </div>

                {/* Right Column: Interactive Trigger Button */}
                <div className="shrink-0 flex items-center">
                  <div className="inline-flex items-center gap-2.5 rounded-lg border border-[#E5E5E5] bg-stone-50 px-5 py-3 text-xs font-semibold text-[#141414] transition-all hover:bg-stone-100 hover:border-stone-300">
                    <Building2 className="h-4 w-4 text-[#8B1E24]" />
                    <span>{isTmtExpanded ? 'Sembunyikan 8 Entitas Bisnis' : 'Lihat 8 Entitas Bisnis'}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-600 transition-transform duration-300 ${
                        isTmtExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Level 2: Bento Grid 8 Anak Perusahaan TMT Group (Expanded State) */}
            <AnimatePresence>
              {isTmtExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* 4-Column Responsive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {/* 1. PT Trakindo Utama (Warm Amber) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#D97706] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#D97706] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#B45309] font-semibold">
                          Heavy Equipment
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Trakindo Utama
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Solusi alat berat dan mesin industri Caterpillar terdepan di Indonesia sejak tahun 1970.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        Caterpillar Dealership
                      </div>
                    </div>

                    {/* 2. PT Mahadana Dasha Utama / MahaDasha (Slate Blue - Sub-Holding Trigger) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMahadashaExpanded(!isMahadashaExpanded);
                      }}
                      className={`rounded-xl border bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#2563EB] transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
                        isMahadashaExpanded
                          ? 'border-blue-400 ring-2 ring-blue-500/15 shadow-md bg-blue-50/20'
                          : 'border-[#E5E5E5]'
                      }`}
                    >
                      <div>
                        <div className="w-6 h-0.5 bg-[#2563EB] mb-2.5" />
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] tracking-wider uppercase text-[#1D4ED8] font-semibold">
                            Sub-Holding
                          </p>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                            Sub-Holding
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Mahadana Dasha Utama
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Pengelola portofolio diversifikasi usaha terpadu, investasi strategis, dan akselerator pertumbuhan holding.
                        </p>
                      </div>

                      {/* Interactive Button inside MahaDasha Card */}
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
                          <span>{isMahadashaExpanded ? 'Tutup Portofolio' : 'Lihat Pilar Bisnis'}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-blue-700 font-medium">
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              isMahadashaExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                      </div>
                    </div>

                    {/* 3. PT ABM Investama Tbk. (Sage Green) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#059669] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#059669] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#047857] font-semibold">
                          Energy Solutions
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT ABM Investama Tbk.
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Solusi energi terintegrasi, pertambangan, dan rantai pasok logistik dari hulu hingga hilir (IDX: ABMM).
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        Energy &amp; Mining
                      </div>
                    </div>

                    {/* 4. PT Chandra Sakti Utama Leasing (Dusty Cyan) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#0284C7] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#0284C7] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#0369A1] font-semibold">
                          Financial Services
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Chandra Sakti Utama Leasing
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Layanan pembiayaan komersial, sewa guna usaha alat berat, dan anjak piutang (CSULfinance).
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        CSULfinance
                      </div>
                    </div>

                    {/* 5. PT Radana Bhaskara Finance Tbk. (Muted Terracotta / Rose) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#E11D48] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#E11D48] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#BE123C] font-semibold">
                          Multifinance
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Radana Bhaskara Finance Tbk.
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Solusi pembiayaan multiguna, anjak piutang, dan fasilitas dana produktif komersial (Radana Finance).
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        Radana Finance
                      </div>
                    </div>

                    {/* 6. PT Pastika Nirmala (Muted Teal) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#0D9488] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#0D9488] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#0F766E] font-semibold">
                          Healthcare &amp; Facilities
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Pastika Nirmala
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Penyedia layanan kesehatan modern terpadu dan pengelolaan fasilitas rumah sakit terpercaya di Indonesia.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        Healthcare Solutions
                      </div>
                    </div>

                    {/* 7. PT Karya Kharisma Mandiri (Dusty Indigo) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#4F46E5] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#4F46E5] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#4338CA] font-semibold">
                          Human Capital Services
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Karya Kharisma Mandiri
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Layanan manajemen talenta korporat, rekrutmen profesional, dan solusi alih daya sumber daya manusia.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        Human Capital
                      </div>
                    </div>

                    {/* 8. PT Mitra Solusi Telematika (Muted Violet) */}
                    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 text-left shadow-xs border-t-[3px] border-t-[#7C3AED] hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-0.5 bg-[#7C3AED] mb-2.5" />
                        <p className="text-[11px] tracking-wider uppercase text-[#6D28D9] font-semibold">
                          ICT &amp; Digital Solutions
                        </p>
                        <h4 className="text-base font-semibold text-[#141414] mt-1.5 leading-snug">
                          PT Mitra Solusi Telematika
                        </h4>
                        <p className="text-xs text-[#52525B] leading-relaxed mt-2">
                          Solusi infrastruktur teknologi informasi, komunikasi data, keamanan siber, dan transformasi digital korporat (MST).
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-neutral-400 font-medium">
                        MST Telematika
                      </div>
                    </div>
                  </div>

                  {/* 3. Level 3: Nested Expansion Khusus Sub-Holding (MahaDasha -> PT Halla Mohana -> Unit Bisnis) */}
                  <AnimatePresence>
                    {isMahadashaExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden pt-2"
                      >
                        <div className="rounded-2xl border border-[#E5E5E5] bg-[#F2F2EF] p-6 sm:p-8 space-y-6 text-left">
                          {/* Drawer Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#8B1E24]" />
                                <p className="text-xs tracking-widest uppercase text-[#8B1E24] font-semibold">
                                  Portofolio Diversifikasi MahaDasha • Pilar Hospitalitas &amp; Properti Komersial
                                </p>
                              </div>
                              <p className="text-xs text-[#52525B]">
                                Struktur kepemilikan sub-holding PT Mahadana Dasha Utama yang memayungi PT Halla Mohana serta aset operasional terpadu di Kota Pekanbaru.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsMahadashaExpanded(false)}
                              className="text-xs font-semibold text-neutral-500 hover:text-[#141414] transition-colors self-start sm:self-auto cursor-pointer"
                            >
                              Tutup Panel ✕
                            </button>
                          </div>

                          {/* Drawer Content: Split Layout */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Left Column (5 cols): PT Halla Mohana Flagship Card */}
                            <div className="lg:col-span-5 rounded-xl border-2 border-[#8B1E24] bg-white p-6 shadow-sm flex flex-col justify-between">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs tracking-wider uppercase text-[#8B1E24] font-semibold">
                                    Pilar Utama Website • Unit Bisnis Fokus
                                  </p>
                                  <span className="text-[10px] uppercase font-semibold text-white bg-[#8B1E24] px-2 py-0.5 rounded">
                                    Anak Usaha
                                  </span>
                                </div>

                                <div>
                                  <h4 className="text-xl font-semibold text-[#141414]">
                                    PT Halla Mohana
                                  </h4>
                                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                                    Hospitality &amp; Commercial Retail Property Development
                                  </p>
                                </div>

                                <p className="text-xs text-[#52525B] leading-relaxed">
                                  Didirikan pada tahun 2013 sebagai anak perusahaan PT Mahadana Dasha Utama (MahaDasha) dan bagian dari ekosistem TMT Group. Berfokus pada pengembangan, pembangunan, dan pengelolaan perhotelan bintang 4 serta pusat perbelanjaan komersial modern terpadu.
                                </p>

                                <div className="pt-2 border-t border-[#F0F0EE] space-y-1">
                                  <p className="text-[11px] text-neutral-500">
                                    <strong className="text-neutral-700">Head Office:</strong> Gedung TMT 1 Lt. 1, Cilandak, Jakarta Selatan
                                  </p>
                                  <p className="text-[11px] text-neutral-500">
                                    <strong className="text-neutral-700">Kawasan Terpadu:</strong> Jl. Riau No. 147, Senapelan, Pekanbaru
                                  </p>
                                </div>
                              </div>

                              <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                                <img
                                  src="/images/logo/logo.png"
                                  alt="PT Halla Mohana Logo"
                                  className="h-8 w-auto object-contain"
                                />
                                <a
                                  href="/projects"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate('/projects');
                                  }}
                                  className="text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Eksplorasi Properti</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>

                            {/* Right Column (7 cols): 2 Operating Property Units */}
                            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Unit 1: FOX Harris Hotel Pekanbaru */}
                              <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-xs border-l-4 border-l-[#8B1E24] flex flex-col justify-between hover:shadow-sm transition-shadow">
                                <div className="space-y-3">
                                  <div className="h-36 w-full overflow-hidden rounded-lg border border-[#E5E5E5] bg-stone-100">
                                    <img
                                      src="/images/New-Asset/Hotel/Deluxe%20-%202.png"
                                      alt="FOX Harris Hotel Pekanbaru"
                                      loading="lazy"
                                      decoding="async"
                                      className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                                      Hospitality Unit • Pekanbaru
                                    </p>
                                    <h5 className="text-base font-semibold text-[#141414] mt-0.5">
                                      FOX Harris Hotel Pekanbaru
                                    </h5>
                                  </div>

                                  <p className="text-xs text-[#52525B] leading-relaxed">
                                    Hotel bintang 4 berkapasitas 225 kamar &amp; suite (12 lantai), indoor rooftop sky pool tertinggi di Pekanbaru, restoran Where’s The Food (WTF), Grand Ballroom, dan 6 ruang rapat.
                                  </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                                  <a
                                    href="/projects"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onNavigate('/projects');
                                    }}
                                    className="text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Lihat Fasilitas &amp; Kamar</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </div>

                              {/* Unit 2: Pekanbaru Xchange (PX) */}
                              <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-xs border-l-4 border-l-[#8B1E24] flex flex-col justify-between hover:shadow-sm transition-shadow">
                                <div className="space-y-3">
                                  <div className="h-36 w-full overflow-hidden rounded-lg border border-[#E5E5E5] bg-stone-100">
                                    <img
                                      src="/images/New-Asset/Mall%20Photo/J.co.png"
                                      alt="Pekanbaru Xchange"
                                      loading="lazy"
                                      decoding="async"
                                      className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                                      Commercial Retail Unit • Pekanbaru
                                    </p>
                                    <h5 className="text-base font-semibold text-[#141414] mt-0.5">
                                      Pekanbaru Xchange (PX)
                                    </h5>
                                  </div>

                                  <p className="text-xs text-[#52525B] leading-relaxed">
                                    Lifestyle mall 3 lantai terintegrasi langsung dengan menara FOX Harris Hotel, dilengkapi bioskop Cinema XXI, koridor kuliner Alfresco Dining, dan plaza event komunitas.
                                  </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                                  <a
                                    href="/projects"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onNavigate('/projects');
                                    }}
                                    className="text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Lihat Ritel &amp; Tenan</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </a>
                                </div>
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
            <ArchitecturalReveal className="lg:col-span-7 space-y-3" delay={0.1}>
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium mb-3">
                Empat Pilar Pokok Tata Kelola Perusahaan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {governancePrinciples.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: ARCHITECTURAL_EASE }}
                    className="rounded-lg border border-[#E5E5E5] bg-white p-5 border-l-2 border-l-[#8B1E24] text-left shadow-xs space-y-1.5"
                  >
                    <h3 className="text-sm font-semibold text-[#141414]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ArchitecturalReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
