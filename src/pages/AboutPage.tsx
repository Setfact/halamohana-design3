import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Compass,
  CheckCircle2,
  ArrowRight,
  Target,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Award,
  Heart,
  Zap,
  TrendingUp,
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

  // Culture Segmented Pill Tabs control (Core Values vs Leadership Traits)
  const [activeCultureTab, setActiveCultureTab] = useState<'values' | 'traits'>('values');

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

  // 4 Core Values (TMT / MahaDasha Group)
  const coreValues = [
    {
      title: 'Integrity',
      desc: 'Menjunjung tinggi kejujuran, etika bisnis, dan ketepatan janji dalam setiap aspek operasional dan hubungan kemitraan.',
      icon: <ShieldCheck className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      title: 'Continuous Development',
      desc: 'Senantiasa belajar dan berinovasi untuk meningkatkan mutu fasilitas properti dan kompetensi sumber daya manusia.',
      icon: <TrendingUp className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      title: 'Excellence',
      desc: 'Memberikan standar layanan hospitality bintang empat dan pengelolaan ritel terbaik bagi seluruh pemangku kepentingan.',
      icon: <Award className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      title: 'Compassion',
      desc: 'Peduli terhadap keselamatan kerja (K3), kesejahteraan insan korporat, masyarakat, serta kelestarian lingkungan.',
      icon: <Heart className="h-5 w-5 text-[#8B1E24]" />,
    },
  ];

  // 4 Leadership Traits (Pedoman Kepemimpinan TMT / MahaDasha Group)
  const leadershipTraits = [
    {
      trait: 'Competent',
      desc: 'Memiliki keahlian teknis dan kapabilitas manajerial yang unggul di industri hospitality dan properti komersial.',
      icon: <CheckCircle2 className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      trait: 'Open-minded',
      desc: 'Mampu menerima gagasan inovatif, adaptif terhadap perkembangan, dan menghargai keberagaman perspektif.',
      icon: <Compass className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      trait: 'Reliable',
      desc: 'Konsisten dalam tindakan, berintegritas tinggi, serta dapat dipercaya memenuhi seluruh komitmen.',
      icon: <ShieldCheck className="h-5 w-5 text-[#8B1E24]" />,
    },
    {
      trait: 'Courageous',
      desc: 'Berani mengambil inisiatif terukur, bertanggung jawab atas keputusan, dan gigih menghadapi tantangan industri.',
      icon: <Zap className="h-5 w-5 text-[#8B1E24]" />,
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
      icon: <Eye className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      title: 'Akuntabilitas',
      desc: 'Pengelolaan perusahaan secara terukur dengan kejelasan fungsi, pelaksanaan, dan pertanggungjawaban organ korporat.',
      icon: <FileCheck className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      title: 'Responsibilitas',
      desc: 'Kepatuhan terhadap hukum, regulasi ketenagakerjaan, sertifikasi K3, serta tanggung jawab sosial dan lingkungan.',
      icon: <ShieldCheck className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      title: 'Independensi',
      desc: 'Pengambilan keputusan secara objektif dan profesional tanpa benturan kepentingan serta bebas dari tekanan pihak manapun.',
      icon: <Scale className="h-4 w-4 text-[#8B1E24]" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Luxury Corporate Hero Banner (Kembalikan Kedalaman Visual Mewah) */}
      <div className="relative bg-[#0F1117] text-white py-16 sm:py-24 overflow-hidden border-b border-stone-800">
        {/* Architectural Photo Background with Deep Charcoal-Maroon Gradient */}
        <div className="absolute inset-0">
          <img
            src="/images/hotel/hero-corporate-wide.jpg"
            alt="PT Halla Mohana Corporate Architecture"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#161217]/90 to-[#2A0E13]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-5">
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
            <span className="text-[#A68253] font-semibold">Corporate Info</span>
          </nav>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-stone-200 border border-white/15">
            <Sparkles className="h-3.5 w-3.5 text-[#A68253]" />
            <span className="tracking-widest uppercase text-[11px]">Profil Korporat & Struktur Ekosistem Grup</span>
          </div>

          {/* Title & Description */}
          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Corporate Info
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal max-w-2xl">
              Profil resmi, visi strategis, nilai luhur kepemimpinan, dan tata kelola PT Halla Mohana dalam ekosistem Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-stone-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900/80 px-3 py-1.5 border border-stone-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24]" />
              <span>Didirikan 2013</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900/80 px-3 py-1.5 border border-stone-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24]" />
              <span>Hospitality & Commercial Lifestyle Mall</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900/80 px-3 py-1.5 border border-stone-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24]" />
              <span>Member of MahaDasha (TMT Group)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navbar ala Vercel (Scroll-Spy & Horizontal Swipeable) */}
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

      {/* 2. Section: Halla Mohana Overview (#FFFFFF, Bebas Bug SVG Hitam & Teks Ganda) */}
      <section
        id="overview"
        className="py-16 sm:py-24 bg-white border-b border-stone-200/90 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Kolom Kiri: 7 Kolom pada LG (Foto Terpadu + Floating Stats Glass Card) */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden border border-stone-200 bg-stone-900 group">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/images/hotel/overview-facade-landscape.jpg"
                    alt="Kawasan Terpadu PT Halla Mohana - FOX Harris Hotel & Pekanbaru Xchange"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Gradient Overlay Lembut */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Badge Lokasi Kawasan Terpadu */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-950/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold text-white border border-white/20">
                    <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                    <span>Kawasan Terpadu Jl. Riau No. 147, Pekanbaru</span>
                  </span>
                </div>

                {/* Floating Glass Stats Card di Sudut Bawah Foto */}
                <div className="p-4 sm:p-5">
                  <div className="rounded-xl border border-white/40 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xl">
                    <div className="grid grid-cols-3 divide-x divide-stone-200 text-center">
                      <div className="px-2">
                        <span className="block text-xl sm:text-2xl font-black text-stone-900">2013</span>
                        <span className="block text-[10px] sm:text-xs uppercase font-semibold text-stone-500 mt-0.5">Tahun Berdiri</span>
                      </div>
                      <div className="px-2">
                        <span className="block text-xl sm:text-2xl font-black text-[#8B1E24]">225 Kamar</span>
                        <span className="block text-[10px] sm:text-xs uppercase font-semibold text-stone-500 mt-0.5">Hotel Bintang 4</span>
                      </div>
                      <div className="px-2">
                        <span className="block text-xl sm:text-2xl font-black text-stone-900">2 Aset</span>
                        <span className="block text-[10px] sm:text-xs uppercase font-semibold text-stone-500 mt-0.5">Kawasan Terpadu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 5 Kolom pada LG (Satu Judul Utama Bersih & Narasi Resmi) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24]/10 px-3 py-1 text-xs font-bold text-[#8B1E24]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24]" />
                <span>CORPORATE OVERVIEW • MEMBER OF TMT GROUP</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Menghadirkan Standar Baru Hospitalitas & Gaya Hidup Urban
              </h2>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Didirikan pada tahun 2013, <strong>PT Halla Mohana</strong> adalah perusahaan pengembang dan pengelola properti yang berfokus pada sektor perhotelan (<em>hospitality</em>) dan pusat perbelanjaan gaya hidup (<em>commercial lifestyle mall</em>). Perusahaan bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> sebagai bagian dari diversifikasi konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>.
                </p>
                <p>
                  Portofolio unggulan perseroan berada di koridor strategis <strong>Jalan Riau No. 147, Senapelan, Pekanbaru</strong> dalam sebuah kawasan terpadu (<em>mixed-use commercial complex</em>) seluas 1,5 hektar yang memadukan hotel bintang 4 modern <strong>FOX Harris Hotel Pekanbaru</strong> (225 kamar & suite) dengan pusat perbelanjaan gaya hidup <strong>Pekanbaru Xchange (PX)</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects');
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24] hover:bg-[#72181D] text-white px-6 py-3.5 text-xs font-bold tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <span>Eksplorasi Proyek Kami</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Vision & Mission (#F4F5F7, Dimensi Elegan Berlatar Gelap & Kartu Putih) */}
      <section
        id="vision-mission"
        className="py-16 sm:py-24 bg-[#F4F5F7] border-b border-stone-200/90 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Vision & Mission
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Arah panduan strategis dan komitmen keberlanjutan PT Halla Mohana dalam menciptakan nilai tambah bagi pemegang saham, pelanggan, dan masyarakat.
            </p>
          </div>

          {/* Visi Card Berlatar Gelap Elegan (#18181B dengan aksen marun/emas) */}
          <div className="rounded-2xl bg-[#18181B] p-8 sm:p-10 text-white shadow-lg border-l-4 border-l-[#8B1E24] relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-56 h-56 rounded-full bg-[#8B1E24]/15 blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#A68253]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#A68253]">
                  Visi Perusahaan • Strategic Direction
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight">
                "Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."
              </h3>
            </div>
          </div>

          {/* Misi 2x2 Grid Kartu Putih Bersih Berbayang Halus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <Compass className="h-4 w-4 text-[#8B1E24]" />
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Misi Perusahaan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {officialMissions.map((missionText, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-[#8B1E24]/40 transition-all border-l-4 border-l-[#8B1E24]"
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

      {/* 4. Section: Core Values & Leadership Traits (#FFFFFF, Segmented Control & Hover Lift) */}
      <section
        id="core-values"
        className="py-16 sm:py-24 bg-white border-b border-stone-200/90 scroll-mt-[140px]"
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

            {/* Segmented Pill Tabs Control */}
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

          {/* Kartu Budaya Berbayang Halus dengan Ikon Badge Marun */}
          {activeCultureTab === 'values' ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Empat Nilai Inti Perusahaan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {coreValues.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#8B1E24]/10 flex items-center justify-center">
                      {v.icon}
                    </div>
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
                    className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#8B1E24]/10 flex items-center justify-center">
                      {t.icon}
                    </div>
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

      {/* 5. Section: Company Structure (#F4F5F7, Rebuilt Sesuai Bagan Resmi TMT Group) */}
      <section
        id="company-structure"
        className="py-16 sm:py-24 bg-[#F4F5F7] border-b border-stone-200/90 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
                Sinergi Kepemilikan & Portofolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Company Structure
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Struktur korporasi resmi Tiara Marga Trakindo (TMT Group) yang menaungi 8 entitas anak perusahaan, dengan PT Halla Mohana sebagai pilar hospitality dan commercial property.
              </p>
            </div>

            {/* Mobile Scroll Hint Badge */}
            <div className="lg:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-500 border border-stone-200 shadow-2xs">
                <span>Geser ke samping untuk bagan lengkap</span>
                <ArrowRight className="h-3 w-3 text-[#8B1E24]" />
              </span>
            </div>
          </div>

          {/* Interactive Tree Diagram Container dengan Horizontal Scroll di Layar Kecil */}
          <div className="overflow-x-auto pb-6 scrollbar-thin">
            <div className="min-w-[960px] max-w-6xl mx-auto space-y-6 pt-2">
              {/* Top Node: TIARA MARGA TRAKINDO (TMT Group) */}
              <div className="flex justify-center">
                <div className="rounded-2xl border border-stone-700 bg-[#18181B] text-white p-6 shadow-xl text-center w-[460px] relative">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#A68253] mb-2 border border-white/10">
                    Induk Grup Usaha • Group Holding
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    TIARA MARGA TRAKINDO (TMT Group)
                  </h3>
                  <p className="text-xs text-stone-300 pt-1 leading-relaxed">
                    Konglomerasi nasional terkemuka yang menaungi 8 entitas anak perusahaan lintas sektor industri.
                  </p>
                </div>
              </div>

              {/* Batang Pohon Konektor Vertikal dari TMT ke Garis Distribusi */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-stone-300" />
                <div className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-stone-400 -mt-1" />
              </div>

              {/* Garis Distribusi Horizontal Utama untuk Baris 1 (5 Entitas Utama) */}
              <div className="relative px-6">
                <div className="h-0.5 bg-stone-300 w-full" />
                
                {/* 5 Titik Turun ke Baris 1 */}
                <div className="grid grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-stone-300" />
                      <div className="w-2 h-2 rotate-45 border-b border-r border-stone-400 -mt-1" />
                    </div>
                  ))}
                </div>

                {/* Baris 1: 5 Entitas Utama Sejajar */}
                <div className="grid grid-cols-5 gap-4 pt-1">
                  {/* 1. PT Trakindo Utama */}
                  <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center border-t-4 border-t-amber-500 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                      Heavy Equipment
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                      PT Trakindo Utama
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      Solusi alat berat dan mesin industri Caterpillar terdepan di Indonesia.
                    </p>
                  </div>

                  {/* 2. PT Mahadana Dasha Utama */}
                  <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center border-t-4 border-t-blue-900 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                      Sub-Holding
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                      PT Mahadana Dasha Utama (MahaDasha)
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      Pengelola portofolio diversifikasi usaha dan investasi terintegrasi.
                    </p>
                  </div>

                  {/* 3. PT ABM Investama Tbk. */}
                  <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center border-t-4 border-t-emerald-700 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Energy Solutions
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                      PT ABM Investama Tbk.
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      Solusi energi dan pertambangan terintegrasi dari hulu hingga hilir.
                    </p>
                  </div>

                  {/* 4. PT Chandra Sakti Utama Leasing */}
                  <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center border-t-4 border-t-sky-600 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                      Financial Services
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                      PT Chandra Sakti Utama Leasing
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      Layanan pembiayaan sewa guna usaha komersial (CSULfinance).
                    </p>
                  </div>

                  {/* 5. PT Radana Bhaskara Finance Tbk. */}
                  <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center border-t-4 border-t-rose-600 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                      Multifinance
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                      PT Radana Bhaskara Finance Tbk.
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      Solusi pembiayaan multiguna dan modal kerja (Radana Finance).
                    </p>
                  </div>
                </div>
              </div>

              {/* Garis Distribusi Cabang Bawah (3 Entitas: PT Halla Mohana, PT Pastika Nirmala, PT Karya Kharisma Mandiri) */}
              <div className="pt-6">
                {/* Connector dari garis induk TMT ke cabang 3 entitas bawah */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-stone-300" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6">
                  <div className="h-0.5 bg-stone-300 w-full" />
                  
                  {/* 3 Titik Turun */}
                  <div className="grid grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-stone-300" />
                        <div className="w-2 h-2 rotate-45 border-b border-r border-stone-400 -mt-1" />
                      </div>
                    ))}
                  </div>

                  {/* Baris 2: 3 Entitas Sejajar */}
                  <div className="grid grid-cols-3 gap-6 pt-1">
                    {/* 1. PT Halla Mohana (Highlight Utama Korporat) */}
                    <div className="rounded-2xl border-2 border-[#8B1E24] bg-white p-5 shadow-lg relative ring-4 ring-[#8B1E24]/10 hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#8B1E24] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          Highlight Utama
                        </span>
                        <span className="text-[10px] font-bold uppercase text-[#8B1E24] tracking-wider">
                          Hospitality & Retail
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-stone-900 leading-snug">
                        PT Halla Mohana
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed mt-1">
                        Didirikan tahun 2013, berfokus pada pembangunan dan pengelolaan hotel bintang 4 serta lifestyle mall.
                      </p>

                      {/* Logo Resmi hm Halla Mohana */}
                      <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-center">
                        <img
                          src="/images/logo/logo.png"
                          alt="Logo PT Halla Mohana"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* 2. PT Pastika Nirmala */}
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-center border-t-4 border-t-teal-600 hover:shadow-md transition-shadow">
                      <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                        Healthcare & Facilities
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 mt-1 leading-snug">
                        PT Pastika Nirmala
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Penyedia layanan kesehatan modern dan pengelolaan fasilitas rumah sakit terpercaya.
                      </p>
                    </div>

                    {/* 3. PT Karya Kharisma Mandiri */}
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-center border-t-4 border-t-indigo-600 hover:shadow-md transition-shadow">
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                        Human Capital Services
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 mt-1 leading-snug">
                        PT Karya Kharisma Mandiri
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1">
                        Layanan pengelolaan talenta, rekrutmen profesional, dan alih daya sumber daya manusia.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Branch dari PT Halla Mohana ke 2 Unit Properti Operasional Pekanbaru */}
                <div className="pt-6 max-w-4xl mx-auto">
                  {/* Garis turun khusus dari kolom PT Halla Mohana (kolom kiri) */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-[#8B1E24]" />
                      <div className="w-2.5 h-2.5 rotate-45 border-b-2 border-r-2 border-[#8B1E24] -mt-1" />
                    </div>
                    <div />
                    <div />
                  </div>

                  {/* Fork Garis ke 2 Properti */}
                  <div className="relative w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Unit 1: FOX Harris Hotel Pekanbaru */}
                      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs hover:border-[#8B1E24] hover:shadow-md transition-all space-y-1.5 border-l-4 border-l-[#8B1E24]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E24]">
                            Hospitality Unit
                          </span>
                          <span className="text-[10px] font-semibold text-stone-500">Jl. Riau No. 147</span>
                        </div>
                        <h5 className="text-sm font-bold text-stone-900">
                          FOX Harris Hotel Pekanbaru
                        </h5>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Hotel bintang 4 berkapasitas 225 kamar & suite modern, Grand Ballroom, WTF Restaurant, dan indoor rooftop sky pool tertinggi di Pekanbaru.
                        </p>
                      </div>

                      {/* Unit 2: Pekanbaru Xchange (PX) */}
                      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs hover:border-[#8B1E24] hover:shadow-md transition-all space-y-1.5 border-l-4 border-l-[#8B1E24]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E24]">
                            Commercial Retail Unit
                          </span>
                          <span className="text-[10px] font-semibold text-stone-500">Jl. Riau No. 147</span>
                        </div>
                        <h5 className="text-sm font-bold text-stone-900">
                          Pekanbaru Xchange (PX)
                        </h5>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Pusat perbelanjaan gaya hidup modern terintegrasi dengan bioskop Cinema XXI, koridor kuliner Alfresco Dining, dan panggung pertunjukan komunitas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Code of Business Conduct & Ethics (#FFFFFF, Dimensi Tata Kelola 2 Kolom) */}
      <section
        id="code-of-conduct"
        className="py-16 sm:py-24 bg-white border-b border-stone-200/90 scroll-mt-[140px]"
        style={{ scrollMarginTop: '140px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Kolom Kiri: 5 Kolom pada LG (Narasi Komitmen GCG & Kepatuhan) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
                  Good Corporate Governance (GCG)
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                  Code of Business Conduct & Ethics
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  PT Halla Mohana senantiasa mematuhi standar etika bisnis, kepatuhan hukum, dan tata kelola perusahaan yang baik yang ditetapkan oleh MahaDasha dan Tiara Marga Trakindo (TMT Group).
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="rounded-xl border border-stone-200 bg-[#F4F5F7] p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Kepatuhan Regulasi & K3:</strong> Mengutamakan standar keselamatan gedung, sertifikasi K3, efisiensi energi ramah lingkungan, dan transparansi laporan operasional.
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-[#F4F5F7] p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8B1E24] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>Perlindungan Pemangku Kepentingan:</strong> Menjunjung tinggi perlakuan adil kepada para mitra bisnis, penyewa (tenants), tamu hotel, dan masyarakat sekitar.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 7 Kolom pada LG (4 Pilar Tata Kelola dalam Kartu Putih Berbayang) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Empat Pilar Pokok Tata Kelola Perusahaan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {governancePrinciples.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-[#8B1E24]/30 transition-all border-l-4 border-l-[#8B1E24] space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#8B1E24]/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
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
