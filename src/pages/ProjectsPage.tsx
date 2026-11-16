import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Building2,
  Phone,
  Film,
  Utensils,
  Maximize2
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  // Gallery states for both flagship assets
  const hotelPhotos = [
    {
      url: '/images/hotel/overview-facade-landscape.jpg',
      title: 'Fasad Menara FOX Harris Hotel',
      desc: 'Menara akomodasi 12 lantai berkonsep dinamis dan modern.',
    },
    {
      url: '/images/hotel/showcase-hotel-facade.jpg',
      title: 'Perspektif Eksterior Urban',
      desc: 'Arsitektur kontemporer di koridor strategis Jl. Riau Pekanbaru.',
    },
    {
      url: '/images/hotel/pool-infinity.jpg',
      title: 'Indoor Rooftop Sky Pool',
      desc: 'Kolam renang indoor rooftop tertinggi di Kota Pekanbaru.',
    },
    {
      url: '/images/hotel/room-suite-bedroom.jpg',
      title: 'Suite Room & Bedroom',
      desc: 'Interior kamar nyaman dan modern berstandar bintang empat.',
    },
    {
      url: '/images/hotel/restaurant-wtf-main.jpg',
      title: 'Where’s The Food (WTF) Restaurant',
      desc: 'Restoran utama dengan konsep santap santai dan menu nusantara.',
    },
    {
      url: '/images/hotel/ballroom-orange-fox.jpg',
      title: 'Grand Ballroom MICE',
      desc: 'Fasilitas pertemuan representatif untuk konvensi dan pernikahan.',
    },
  ];

  const mallPhotos = [
    {
      url: '/images/mall/px-facade-integrated.jpg',
      title: 'Fasad Terpadu Pekanbaru Xchange',
      desc: 'Podium ritel 3 lantai dengan kanopi geometris modern.',
    },
    {
      url: '/images/mall/hero-px-mall.jpg',
      title: 'Entrance Plaza Pekanbaru Xchange',
      desc: 'Akses masuk utama pusat perbelanjaan dan area komersial.',
    },
    {
      url: '/images/mall/cinema-xxi.jpg',
      title: 'Cinema XXI (Lantai 3)',
      desc: 'Bioskop premium dengan fasilitas studio modern dan terkini.',
    },
    {
      url: '/images/mall/alfresco-dining.jpg',
      title: 'Alfresco Dining Corridor',
      desc: 'Area kuliner terbuka di Ground Floor untuk tempat santai komunitas.',
    },
    {
      url: '/images/mall/atrium-corridor.jpg',
      title: 'Koridor Ritel & Atrium',
      desc: 'Sirkulasi belanja yang lapang dan terhubung dengan menara hotel.',
    },
    {
      url: '/images/mall/plaza-live-event.jpg',
      title: 'Plaza Event Komunitas',
      desc: 'Panggung terbuka untuk pameran dan pertunjukan komunitas.',
    },
  ];

  const [activeHotelPhotoIdx, setActiveHotelPhotoIdx] = useState<number>(0);
  const [activeMallPhotoIdx, setActiveMallPhotoIdx] = useState<number>(0);

  return (
    <div className="bg-white min-h-screen text-[#141414]">
      {/* 1. Dedicated Corporate Hero Header */}
      <div className="relative bg-[#0F1117] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden text-left">
        <div className="absolute inset-0">
          <img
            src="/images/hotel/exterior-facade.jpg"
            alt="Kawasan Terpadu PT Halla Mohana"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#161217]/90 to-[#2A0E13]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-4">
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
            <span className="text-[#8B1E24] font-semibold">Portofolio Properti</span>
          </nav>

          <p className="text-xs tracking-widest uppercase text-stone-400 font-medium">
            Portofolio Komersial Terpadu
          </p>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              Our Projects
            </h1>
            <p className="text-base text-stone-300 leading-relaxed font-normal max-w-2xl">
              Pengembangan dan pengelolaan kawasan mixed-use terpadu di koridor strategis Jalan Riau No. 147 Pekanbaru, Riau—mengintegrasikan keramahan perhotelan bintang 4 dengan pusat perbelanjaan gaya hidup modern.
            </p>
          </div>

          <p className="text-xs text-stone-400 pt-1">
            Kawasan Terpadu 1,5 Hektar • 2 Aset Properti Utama • Senapelan, Pekanbaru
          </p>
        </div>
      </div>

      {/* 2. Section 1: FOX Harris Hotel Pekanbaru (Latar #FFFFFF, 60% Foto di Kiri, 40% Spesifikasi di Kanan) */}
      <section id="fox-hotel" className="py-20 sm:py-28 bg-white border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Kiri: 60% Foto Besar & Thumbnail Switcher (7 Kolom pada LG) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100">
                <img
                  src={hotelPhotos[activeHotelPhotoIdx].url}
                  alt={hotelPhotos[activeHotelPhotoIdx].title}
                  className="w-full aspect-[16/10] object-cover transition-opacity duration-300"
                />
              </div>

              {/* Caption & Image Switcher Gallery */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <p className="text-xs text-[#52525B] leading-relaxed">
                  <strong className="text-[#141414]">{hotelPhotos[activeHotelPhotoIdx].title}:</strong>{' '}
                  {hotelPhotos[activeHotelPhotoIdx].desc}
                </p>
                <span className="text-xs text-neutral-400 shrink-0 font-medium">
                  {activeHotelPhotoIdx + 1} / {hotelPhotos.length}
                </span>
              </div>

              {/* Thumbnails Strip (Hairline Border, Tanpa Pill Badges) */}
              <div className="grid grid-cols-6 gap-2 pt-2">
                {hotelPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHotelPhotoIdx(idx)}
                    className={`rounded overflow-hidden border transition-all cursor-pointer ${
                      activeHotelPhotoIdx === idx
                        ? 'border-[#8B1E24] ring-1 ring-[#8B1E24]'
                        : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Kanan: 40% Spesifikasi Arsitektural & Fasilitas (5 Kolom pada LG) */}
            <div className="lg:col-span-5 lg:border-l lg:border-[#E5E5E5] lg:pl-10 space-y-5">
              <div className="space-y-1">
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Hospitality & Hotel
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight">
                  FOX Harris Hotel Pekanbaru
                </h2>
                <p className="text-sm font-medium text-[#8B1E24] pt-0.5">
                  Urban Oasis Bintang 4 di Pusat Kota Pekanbaru
                </p>
              </div>

              <p className="text-base text-[#52525B] leading-relaxed font-normal">
                Hotel bintang empat berkonsep dinamis, segar, dan modern (sebelumnya beroperasi sebagai Tangram Hotel) yang dikelola bersama jaringan internasional The Ascott Limited / TAUZIA Hotels. Dirancang untuk memenuhi kebutuhan pelancong bisnis dan wisatawan urban yang mengutamakan kenyamanan, fleksibilitas, dan akses langsung ke lifestyle mall.
              </p>

              {/* Spesifikasi Arsitektural & Fasilitas (Hairline Divided Table) */}
              <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Kapasitas Kamar</span>
                  <span className="font-semibold text-[#141414]">225 Kamar & Suite Modern (12 Lantai)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Fasilitas Unggulan</span>
                  <span className="font-semibold text-[#141414] text-right">Indoor Rooftop Sky Pool Tertinggi di Pekanbaru</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Kuliner & F&B</span>
                  <span className="font-semibold text-[#141414]">Where’s The Food (WTF) Restaurant</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Fasilitas MICE</span>
                  <span className="font-semibold text-[#141414]">Grand Ballroom & 6 Ruang Rapat</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Relaksasi & Kebugaran</span>
                  <span className="font-semibold text-[#141414]">Gym, Fitness Center, & Spa</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Lokasi</span>
                  <span className="font-semibold text-[#141414] text-right">Jl. Riau No. 147, Senapelan, Pekanbaru</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Kontak Reservasi</span>
                  <span className="font-semibold text-[#8B1E24]">+62 761 741 5999</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="tel:+627617415999"
                  className="inline-flex items-center gap-2 bg-[#8B1E24] hover:bg-[#72181D] text-white px-6 py-3 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  <span>Hubungi Reservasi Hotel</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Pekanbaru Xchange (PX) (Latar #F7F7F5 Warm Off-White, 40% Deskripsi di Kiri, 60% Foto di Kanan) */}
      <section id="pekanbaru-xchange" className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Kiri: 40% Deskripsi & Anchor Tenants (5 Kolom pada LG) */}
            <div className="lg:col-span-5 lg:border-r lg:border-[#E5E5E5] lg:pr-10 space-y-5">
              <div className="space-y-1">
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Commercial Retail & Lifestyle Mall
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#141414] tracking-tight">
                  Pekanbaru Xchange (PX)
                </h2>
                <p className="text-sm font-medium text-[#8B1E24] pt-0.5">
                  Pusat Gaya Hidup, Hiburan, & Kuliner Terintegrasi
                </p>
              </div>

              <p className="text-base text-[#52525B] leading-relaxed font-normal">
                Pusat perbelanjaan dan hiburan gaya hidup modern (sebelumnya beroperasi sebagai Sadira Plaza) yang terhubung langsung dengan menara FOX Harris Hotel. Dirancang sebagai destinasi sosial komunitas urban dengan perpaduan bioskop modern, koridor kuliner alfresco, serta plaza event terbuka.
              </p>

              {/* Anchor Tenants & Spesifikasi Ritel (Hairline Divided Table) */}
              <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Anchor Tenant Utama</span>
                  <span className="font-semibold text-[#141414]">Cinema XXI (Bioskop Premium Lantai 3)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Zona Kuliner (F&B)</span>
                  <span className="font-semibold text-[#141414] text-right">Alfresco Dining Corridor di Ground Floor</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Ruang Komunitas</span>
                  <span className="font-semibold text-[#141414] text-right">Plaza Pertunjukan Komunitas & Ruang Kreatif</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Struktur Gedung</span>
                  <span className="font-semibold text-[#141414]">Podium Komersial 3 Lantai</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Konektivitas</span>
                  <span className="font-semibold text-[#141414] text-right">Akses Koridor Langsung Menuju FOX Harris Hotel</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Lokasi</span>
                  <span className="font-semibold text-[#141414] text-right">Jl. Riau No. 147, Senapelan, Pekanbaru</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] text-xs sm:text-sm">
                  <span className="text-[#52525B]">Layanan Penyewa</span>
                  <span className="font-semibold text-[#8B1E24]">Komersial & Tenant Leasing</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="inline-flex items-center gap-2 bg-[#8B1E24] hover:bg-[#72181D] text-white px-6 py-3 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  <span>Inquiri Sewa Ritel (Leasing)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Kanan: 60% Foto Besar & Thumbnail Switcher (7 Kolom pada LG) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100">
                <img
                  src={mallPhotos[activeMallPhotoIdx].url}
                  alt={mallPhotos[activeMallPhotoIdx].title}
                  className="w-full aspect-[16/10] object-cover transition-opacity duration-300"
                />
              </div>

              {/* Caption & Image Switcher Gallery */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <p className="text-xs text-[#52525B] leading-relaxed">
                  <strong className="text-[#141414]">{mallPhotos[activeMallPhotoIdx].title}:</strong>{' '}
                  {mallPhotos[activeMallPhotoIdx].desc}
                </p>
                <span className="text-xs text-neutral-400 shrink-0 font-medium">
                  {activeMallPhotoIdx + 1} / {mallPhotos.length}
                </span>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-6 gap-2 pt-2">
                {mallPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMallPhotoIdx(idx)}
                    className={`rounded overflow-hidden border transition-all cursor-pointer ${
                      activeMallPhotoIdx === idx
                        ? 'border-[#8B1E24] ring-1 ring-[#8B1E24]'
                        : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Commercial Leasing & Partnership Inquiry (#FFFFFF) */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-8 sm:p-12 space-y-4">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Kemitraan Komersial
            </p>
            <h3 className="text-2xl font-semibold text-[#141414] tracking-tight">
              Peluang Kemitraan Ritel & Sewa Komersial
            </h3>
            <p className="text-base text-[#52525B] leading-relaxed max-w-2xl">
              Buka peluang usaha Anda di koridor komersial terpadu Jalan Riau No. 147 Pekanbaru. Hubungi tim leasing kami untuk informasi ketersediaan lot gerai ritel, F&B, dan sewa ruang acara MICE di FOX Harris Hotel dan Pekanbaru Xchange.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="inline-flex items-center gap-2 bg-[#141414] hover:bg-[#8B1E24] text-white px-6 py-3 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
              >
                <span>Hubungi Tim Leasing Kami</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
