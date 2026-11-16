import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { motion } from 'framer-motion';
import {
  Building2,
  Compass,
  CheckCircle2,
  ArrowRight,
  Target,
  Sparkles,
  ShieldCheck
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

  // Culture Segmented Pill Tabs control (Core Values vs Leadership Traits)
  const [activeCultureTab, setActiveCultureTab] = useState<'values' | 'traits'>('values');

  // Scroll-Spy detection with passive listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // offset for sticky main header + sub-navbar
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

  // 4 Core Values (TMT / MahaDasha Group)
  const coreValues = [
    {
      title: 'Integrity',
      desc: 'Menjunjung tinggi kejujuran, etika bisnis, dan ketepatan janji dalam setiap aspek operasional dan hubungan kemitraan.',
    },
    {
      title: 'Continuous Development',
      desc: 'Senantiasa belajar dan berinovasi untuk meningkatkan mutu fasilitas properti dan kompetensi sumber daya manusia.',
    },
    {
      title: 'Excellence',
      desc: 'Memberikan standar layanan hospitality bintang empat dan pengelolaan ritel terbaik bagi seluruh pemangku kepentingan.',
    },
    {
      title: 'Compassion',
      desc: 'Peduli terhadap keselamatan kerja (K3), kesejahteraan insan korporat, masyarakat, serta kelestarian lingkungan.',
    },
  ];

  // 4 Leadership Traits (Pedoman Kepemimpinan TMT / MahaDasha Group)
  const leadershipTraits = [
    {
      trait: 'Competent',
      desc: 'Memiliki keahlian teknis dan kapabilitas manajerial yang unggul di industri hospitality dan properti komersial.',
    },
    {
      trait: 'Open-minded',
      desc: 'Mampu menerima gagasan inovatif, adaptif terhadap perkembangan, dan menghargai keberagaman perspektif.',
    },
    {
      trait: 'Reliable',
      desc: 'Konsisten dalam tindakan, berintegritas tinggi, serta dapat dipercaya memenuhi seluruh komitmen.',
    },
    {
      trait: 'Courageous',
      desc: 'Berani mengambil inisiatif terukur, bertanggung jawab atas keputusan, dan gigih menghadapi tantangan industri.',
    },
  ];

  // 4 Poin Misi Resmi (Bahasa Indonesia Formal Tanpa Teks Bertumpuk)
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
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Corporate Info"
        description="Profil resmi, visi, misi, nilai luhur kepemimpinan, dan tata kelola PT Halla Mohana dalam ekosistem MahaDasha dan Tiara Marga Trakindo (TMT Group)."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Corporate Info' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Modern Sticky Sub-Navbar ala Vercel / 21st.dev (Scroll-Spy & Horizontal Swipeable) */}
      <div className="sticky top-[68px] sm:top-[74px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
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
                      ? 'border-[#8B1E24] text-[#8B1E24] font-bold'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {nav.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 2. Section: Halla Mohana Overview (AboutSection3 Layout & VerticalCutReveal) */}
      <section
        id="overview"
        className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          {/* Top Overlay Header (di atas lekukan SVG) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Kiri: Aksen bintang/mark marun (#8B1E24) + label uppercase CORPORATE OVERVIEW */}
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#8B1E24]/10 text-[#8B1E24]">
                <Sparkles className="h-4 w-4 fill-current text-[#8B1E24]" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#8B1E24]">
                Corporate Overview
              </span>
            </div>

            {/* Kanan: Badge afiliasi korporat bersih (Member of MahaDasha • TMT Group) dengan ikon gedung/korporat */}
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#F8F9FA] px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs">
              <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
              <span>Member of MahaDasha • TMT Group</span>
            </div>
          </div>

          {/* Architectural Clipped Image (#clip-inverted) */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-stone-900 shadow-xl group">
            {/* Hidden SVG with #clip-inverted */}
            <svg className="w-0 h-0 absolute -top-[9999px] -left-[9999px] pointer-events-none" aria-hidden="true">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0.04 C 0,0.018 0.025,0 0.055,0 H 0.61 C 0.64,0 0.665,0.018 0.665,0.04 V 0.12 C 0.665,0.145 0.69,0.165 0.72,0.165 H 0.945 C 0.975,0.165 1,0.185 1,0.21 V 0.96 C 1,0.982 0.975,1 0.945,1 H 0.055 C 0.025,1 0,0.982 0,0.96 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.4/1] min-h-[300px] sm:min-h-[360px] md:min-h-[420px] overflow-hidden"
              style={{ clipPath: 'url(#clip-inverted)' }}
            >
              <img
                src="/images/hotel/overview-facade-landscape.jpg"
                alt="Kawasan Terpadu PT Halla Mohana - FOX Harris Hotel & Pekanbaru Xchange"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white space-y-1.5 max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white/90 border border-white/15">
                  <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                  <span>Kawasan Terpadu Jl. Riau No. 147, Pekanbaru</span>
                </span>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  FOX Harris Hotel & Pekanbaru Xchange (PX)
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 font-normal leading-relaxed">
                  Integrasi hotel bintang 4 dengan lifestyle mall modern dalam satu kawasan komersial terpadu seluas 1,5 hektar.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-stone-200 bg-[#F8F9FA] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Sisi Kiri: 2013 (Tahun Didirikan) | 225 Kamar (Hotel Bintang 4) */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 divide-x divide-stone-200">
              <div className="pr-4">
                <span className="block text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">2013</span>
                <span className="block text-xs uppercase font-semibold text-stone-500 tracking-wider mt-0.5">Tahun Didirikan</span>
              </div>
              <div className="pl-8 sm:pl-12">
                <span className="block text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">225 Kamar</span>
                <span className="block text-xs uppercase font-semibold text-stone-500 tracking-wider mt-0.5">Hotel Bintang 4 & Suite</span>
              </div>
            </div>

            {/* Sisi Kanan: Angka marun besar (#8B1E24): 2 ASET TERPADU dan 100% Sinergi MahaDasha & TMT Group */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 lg:border-l lg:border-stone-200 lg:pl-12">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#8B1E24] tracking-tight">2</span>
                <span className="block text-xs uppercase font-bold text-stone-800 tracking-wider mt-0.5">ASET TERPADU</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#8B1E24] tracking-tight">100%</span>
                <span className="block text-xs uppercase font-bold text-stone-800 tracking-wider mt-0.5">Sinergi MahaDasha & TMT Group</span>
              </div>
            </div>
          </motion.div>

          {/* 3-Column Editorial Content Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4 items-start">
            {/* Kolom Kiri (md:col-span-2) */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.05}
                  delay={0.15}
                  transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                >
                  Menghadirkan Standar Baru Hospitalitas & Gaya Hidup Urban.
                </VerticalCutReveal>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Didirikan pada tahun 2013, <strong>PT Halla Mohana</strong> bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> sebagai unit bisnis properti sekaligus pilar diversifikasi strategis konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong> di sektor properti komersial.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  Fokus pengembangan perseroan terwujud dalam pengelolaan kawasan terpadu di koridor strategis <strong>Jalan Riau No. 147, Pekanbaru</strong> yang memadukan hotel bintang 4 modern <strong>FOX Harris Hotel Pekanbaru</strong> (225 kamar) dengan pusat perbelanjaan dan hiburan gaya hidup <strong>Pekanbaru Xchange (PX)</strong>.
                </motion.p>
              </div>
            </div>

            {/* Kolom Kanan (md:col-span-1 text-right) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5 flex flex-col md:items-end md:text-right md:border-l md:border-stone-200 md:pl-8"
            >
              <div className="space-y-1.5">
                <h3 className="text-xl font-black tracking-tight text-[#8B1E24]">
                  PT HALLA MOHANA
                </h3>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Hospitality & Commercial Property Development
                </p>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  Pilar properti MahaDasha Group yang berkomitmen pada inovasi tata ruang perkotaan, keselamatan kerja prima, dan kepuasan pelanggan berkelanjutan.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects');
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#171717] hover:bg-[#8B1E24] text-white px-6 py-3.5 text-xs font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <span>EKSPLORASI PROYEK KAMI</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Section: Vision & Mission */}
      <section
        id="vision-mission"
        className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Vision & Mission
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Arah panduan strategis dan komitmen keberlanjutan PT Halla Mohana dalam menciptakan nilai tambah bagi pemegang saham, pelanggan, dan masyarakat.
            </p>
          </div>

          {/* Visi Card (Clean & Elegant) */}
          <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs space-y-3 border-l-4 border-l-[#8B1E24]">
            <div className="flex items-center gap-2 text-[#8B1E24]">
              <Target className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Visi Perusahaan
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              "Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."
            </h3>
          </div>

          {/* Misi 2x2 Grid (Tanpa Badge MISI #01 atau Teks Bilingual Bertumpuk) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <Compass className="h-4 w-4 text-[#8B1E24]" />
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Misi Perusahaan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {officialMissions.map((missionText, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 border-l-2 border-l-[#8B1E24] shadow-xs"
                >
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                    {missionText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Core Values & Leadership Traits with Segmented Pill Tabs */}
      <section
        id="core-values"
        className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-stone-200">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Core Values & Leadership Traits
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Fondasi karakter kerja dan kepemimpinan yang menjadi pedoman insan Halla Mohana, diselaraskan dengan standar grup Tiara Marga Trakindo (TMT).
              </p>
            </div>

            {/* Segmented Pill Tabs Control (Vercel / 21st.dev Style) */}
            <div className="inline-flex items-center p-1 rounded-full bg-stone-100 border border-stone-200 shrink-0">
              <button
                type="button"
                onClick={() => setActiveCultureTab('values')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCultureTab === 'values'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Core Values (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveCultureTab('traits')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCultureTab === 'traits'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Leadership Traits (4)
              </button>
            </div>
          </div>

          {/* Conditional Display Based on Segmented Control */}
          {activeCultureTab === 'values' ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Empat Nilai Inti Perusahaan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {coreValues.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 space-y-2 hover:border-[#8B1E24]/30 hover:bg-white hover:shadow-xs transition-all"
                  >
                    <h3 className="text-base font-bold text-stone-900">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Empat Karakter Kepemimpinan Unggul
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {leadershipTraits.map((t) => (
                  <div
                    key={t.trait}
                    className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 space-y-2 hover:border-[#8B1E24]/30 hover:bg-white hover:shadow-xs transition-all"
                  >
                    <h3 className="text-base font-bold text-stone-900">
                      {t.trait}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Section: Company Structure (Bagan Hirarki Visual Clean Tree Connector) */}
      <section
        id="company-structure"
        className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Company Structure
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Bagan struktur kepemilikan dan tata kelola korporasi PT Halla Mohana dalam naungan ekosistem grup usaha.
            </p>
          </div>

          {/* Clean Tree Connector Bagan Organisasi */}
          <div className="max-w-3xl mx-auto py-2">
            {/* Level: TMT Group */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs text-center max-w-lg mx-auto space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Induk Grup Usaha
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                PT Tiara Marga Trakindo (TMT Group)
              </h3>
              <p className="text-xs text-stone-600 pt-0.5 leading-relaxed">
                Konglomerasi nasional terkemuka yang menaungi diversifikasi strategis lintas industri.
              </p>
            </div>

            {/* Vertical Connector Line 1 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-stone-300" />
              <div className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-stone-400 -mt-1" />
            </div>

            {/* Level: MahaDasha */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs text-center max-w-lg mx-auto space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Perusahaan Induk Langsung
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                PT Mahadana Dasha Utama (MahaDasha)
              </h3>
              <p className="text-xs text-stone-600 pt-0.5 leading-relaxed">
                Pengelola portofolio bisnis dan investasi strategis non-alat berat dalam ekosistem TMT Group.
              </p>
            </div>

            {/* Vertical Connector Line 2 */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-stone-300" />
              <div className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-stone-400 -mt-1" />
            </div>

            {/* Level: PT Halla Mohana */}
            <div className="rounded-2xl border-2 border-[#8B1E24]/30 bg-white p-6 shadow-xs text-center max-w-lg mx-auto space-y-1">
              <span className="text-[11px] font-bold text-[#8B1E24] uppercase tracking-wider block">
                Pengembang & Pengelola Properti Komersial
              </span>
              <h3 className="text-2xl font-bold text-stone-900">
                PT Halla Mohana
              </h3>
              <p className="text-xs text-stone-600 pt-0.5 leading-relaxed">
                Didirikan pada tahun 2013, berfokus pada pengembangan dan pengelolaan aset perhotelan bintang 4 serta pusat perbelanjaan gaya hidup.
              </p>
            </div>

            {/* Symmetrical Fork Connector (Bercabang Dua ke Unit Properti Pekanbaru) */}
            <div className="relative pt-2">
              <div className="w-0.5 h-6 bg-stone-300 mx-auto" />
              <div className="max-w-xl mx-auto h-0.5 bg-stone-300 relative">
                <div className="absolute left-0 top-0 w-0.5 h-6 bg-stone-300" />
                <div className="absolute left-[-4px] top-5 w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-stone-400" />
                <div className="absolute right-0 top-0 w-0.5 h-6 bg-stone-300" />
                <div className="absolute right-[-4px] top-5 w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-stone-400" />
              </div>
            </div>

            {/* 2 Symmetrical Property Units */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 max-w-2xl mx-auto">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs text-center space-y-1.5 hover:border-[#8B1E24]/40 transition-colors">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Hospitality Unit (Pekanbaru)
                </span>
                <h4 className="text-lg font-bold text-stone-900">
                  FOX Harris Hotel Pekanbaru
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Hotel bintang 4 berkapasitas 225 kamar & suite, Grand Ballroom MICE, Restoran WTF, gym, spa, dan indoor rooftop sky pool tertinggi di Pekanbaru.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs text-center space-y-1.5 hover:border-[#8B1E24]/40 transition-colors">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Commercial Retail Unit (Pekanbaru)
                </span>
                <h4 className="text-lg font-bold text-stone-900">
                  Pekanbaru Xchange (PX)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pusat perbelanjaan gaya hidup terintegrasi dengan bioskop Cinema XXI, koridor kuliner Alfresco Dining di Ground Floor, dan area event komunitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Code of Business Conduct & Ethics */}
      <section
        id="code-of-conduct"
        className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Governance Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                  Code of Business Conduct & Ethics
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  PT Halla Mohana senantiasa mematuhi standar etika bisnis, kepatuhan hukum, dan tata kelola perusahaan yang baik (Good Corporate Governance / GCG) yang ditetapkan oleh MahaDasha dan Tiara Marga Trakindo (TMT Group).
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Kepatuhan Regulasi & K3:</strong> Mengutamakan standar keselamatan gedung, sertifikasi K3, efisiensi energi ramah lingkungan, dan transparansi laporan operasional.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Perlindungan Pemangku Kepentingan:</strong> Menjunjung tinggi perlakuan adil kepada para mitra bisnis, penyewa (tenants), tamu hotel, dan masyarakat sekitar.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Clean Editorial Governance Principles */}
            <div className="lg:col-span-7 space-y-3">
              {governancePrinciples.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 border-l-2 border-l-[#8B1E24] space-y-1"
                >
                  <h3 className="text-sm font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
