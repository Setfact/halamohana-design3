import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Building2,
  Compass,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Target
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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

      {/* Corporate Info Sub-Navigation Strip */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 scrollbar-none text-xs sm:text-sm font-semibold">
            <a
              href="#overview"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Halla Mohana Overview
            </a>
            <a
              href="#vision-mission"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Vision & Mission
            </a>
            <a
              href="#core-values"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Core Values & Leadership Traits
            </a>
            <a
              href="#company-structure"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Company Structure
            </a>
            <a
              href="#code-of-conduct"
              className="text-stone-600 hover:text-[#8B1E24] whitespace-nowrap py-1 px-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Code of Conduct & Ethics
            </a>
          </div>
        </div>
      </div>

      {/* 2. Section: Halla Mohana Overview */}
      <section id="overview" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                  Halla Mohana Overview
                </h2>
                <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
                  Pengembangan Properti Komersial & Hospitalitas Terpadu Sejak 2013
                </p>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  <strong>Didirikan pada tahun 2013</strong>, <strong>PT Halla Mohana</strong> adalah perusahaan pengembang dan pengelola properti yang berfokus pada sektor perhotelan (<em>hospitality</em>) dan pusat perbelanjaan gaya hidup (<em>commercial lifestyle mall</em>). Perusahaan bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> sebagai bagian dari diversifikasi konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>.
                </p>
                <p>
                  Halla Mohana berdedikasi menciptakan ruang komersial modern dengan konsep segar yang dirancang untuk menjawab tuntutan pelancong bisnis sekaligus memenuhi kebutuhan gaya hidup masyarakat perkotaan.
                </p>
                <p>
                  Portofolio unggulan perusahaan berada di koridor strategis <strong>Jalan Riau No. 147, Senapelan, Pekanbaru</strong> dalam sebuah kawasan terpadu (<em>mixed-use commercial complex</em>) yang menggabungkan:
                </p>
                <ul className="space-y-2 text-sm text-stone-700 pt-1">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24] mt-2 shrink-0" />
                    <span>
                      <strong>FOX Harris Hotel Pekanbaru:</strong> Hotel bintang 4 berkapasitas 225 kamar & suite modern, sarana MICE, restoran WTF, serta kolam renang <em>indoor rooftop sky pool</em> tertinggi di Pekanbaru.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E24] mt-2 shrink-0" />
                    <span>
                      <strong>Pekanbaru Xchange (PX):</strong> Pusat perbelanjaan gaya hidup yang terhubung langsung dengan hotel, menghadirkan bioskop Cinema XXI, area kuliner Alfresco Dining di Ground Floor, dan panggung pertunjukan komunitas.
                    </span>
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

            {/* Right Showcase: Integrated Complex Highlight */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-stone-900 group">
                <img
                  src="/images/hotel/overview-facade-landscape.jpg"
                  alt="Kawasan Terpadu Jl. Riau No. 147 Pekanbaru"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white border border-white/20">
                    <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                    <span>Kawasan Terpadu Pekanbaru</span>
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] text-stone-300 block">
                    Jl. Riau No. 147, Senapelan
                  </span>
                  <h3 className="text-lg font-bold">FOX Harris Hotel & Pekanbaru Xchange</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Integrasi hotel bintang 4 berkapasitas 225 kamar dan lifestyle mall modern dalam satu kawasan terpadu.
                  </p>
                </div>
              </div>

              {/* Quick Summary Strip */}
              <div className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-semibold">Tahun Berdiri</span>
                  <span className="font-bold text-stone-900 text-sm">2013</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-semibold">Entitas Induk</span>
                  <span className="font-bold text-stone-900 text-sm">MahaDasha (TMT Group)</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-semibold">Fokus Bisnis</span>
                  <span className="font-bold text-stone-900 text-sm">Hospitality & Retail Mall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Vision & Mission */}
      <section id="vision-mission" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Vision & Mission
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Arah panduan strategis dan komitmen keberlanjutan PT Halla Mohana dalam menciptakan nilai tambah bagi pemegang saham, pelanggan, dan masyarakat.
            </p>
          </div>

          {/* Visi Card */}
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

          {/* Misi List */}
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

      {/* 4. Section: Core Values & Leadership Traits */}
      <section id="core-values" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Core Values & Leadership Traits
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Fondasi karakter kerja dan kepemimpinan yang menjadi pedoman seluruh insan Halla Mohana, selaras dengan standar nilai Tiara Marga Trakindo (TMT Group).
            </p>
          </div>

          {/* 4 Core Values */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 pb-2 border-b border-stone-200">
              Core Values
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {coreValues.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 space-y-2"
                >
                  <h4 className="text-base font-bold text-stone-900">
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Leadership Traits */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 pb-2 border-b border-stone-200">
              Leadership Traits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {leadershipTraits.map((t) => (
                <div
                  key={t.trait}
                  className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 space-y-2"
                >
                  <h4 className="text-base font-bold text-stone-900">
                    {t.trait}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Company Structure (Bagan Struktur Korporasi) */}
      <section id="company-structure" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-stone-200 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Company Structure
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Bagan struktur kepemilikan dan tata kelola korporasi PT Halla Mohana dalam naungan ekosistem grup usaha.
            </p>
          </div>

          {/* Corporate Ownership & Structure Chart (Bagan Pohon Vertikal Bersih) */}
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Level: TMT Group */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs text-center space-y-1">
              <span className="text-xs font-semibold text-stone-500 block">
                Induk Grup Usaha
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                PT Tiara Marga Trakindo (TMT Group)
              </h3>
              <p className="text-xs text-stone-600 max-w-xl mx-auto pt-1 leading-relaxed">
                Konglomerasi nasional terkemuka yang menaungi diversifikasi strategis lintas industri.
              </p>
            </div>

            {/* Vertical Connector Line */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-stone-300" />
              <div className="w-2 h-2 rotate-45 border-b-2 border-r-2 border-stone-400" />
            </div>

            {/* Level: MahaDasha */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs text-center space-y-1">
              <span className="text-xs font-semibold text-stone-500 block">
                Perusahaan Induk Langsung
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                PT Mahadana Dasha Utama (MahaDasha)
              </h3>
              <p className="text-xs text-stone-600 max-w-xl mx-auto pt-1 leading-relaxed">
                Pengelola portofolio bisnis dan investasi strategis non-alat berat dalam ekosistem TMT Group.
              </p>
            </div>

            {/* Vertical Connector Line */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-stone-300" />
              <div className="w-2 h-2 rotate-45 border-b-2 border-r-2 border-stone-400" />
            </div>

            {/* Level: PT Halla Mohana */}
            <div className="rounded-xl border-2 border-[#8B1E24]/30 bg-white p-5 sm:p-6 shadow-xs text-center space-y-1">
              <span className="text-xs font-bold text-[#8B1E24] block">
                Pengembang & Pengelola Properti Komersial
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                PT Halla Mohana
              </h3>
              <p className="text-xs text-stone-600 max-w-xl mx-auto pt-1 leading-relaxed">
                Didirikan pada tahun 2013, berfokus pada pengembangan dan pengelolaan aset perhotelan bintang 4 serta pusat perbelanjaan gaya hidup.
              </p>
            </div>

            {/* Fork Connector to 2 Properties */}
            <div className="flex flex-col items-center pt-1">
              <div className="w-0.5 h-6 bg-stone-300" />
              {/* Horizontal branch line */}
              <div className="w-full max-w-md h-px bg-stone-300 relative">
                <div className="absolute left-0 top-0 w-0.5 h-4 bg-stone-300" />
                <div className="absolute right-0 top-0 w-0.5 h-4 bg-stone-300" />
              </div>
            </div>

            {/* 2 Operating Property Units */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  Hospitality Unit (Pekanbaru)
                </span>
                <h4 className="text-base font-bold text-stone-900">
                  FOX Harris Hotel Pekanbaru
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Hotel bintang 4 berkapasitas 225 kamar & suite, Grand Ballroom MICE, Restoran WTF, gym, spa, dan indoor rooftop sky pool tertinggi di Pekanbaru.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  Commercial Retail Unit (Pekanbaru)
                </span>
                <h4 className="text-base font-bold text-stone-900">
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
      <section id="code-of-conduct" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-36">
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

            {/* Right Column: 4 Clean Governance Principles */}
            <div className="lg:col-span-7 space-y-3">
              {governancePrinciples.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-stone-200 bg-[#F8F9FA] p-5 border-l-2 border-l-[#8B1E24] space-y-1"
                >
                  <h4 className="text-sm font-bold text-stone-900">
                    {item.title}
                  </h4>
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
