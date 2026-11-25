import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArchitecturalReveal,
  ARCHITECTURAL_EASE,
} from '@/components/ui/MotionPrimitives';
import {
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  // Hotel: 6 unique photos - Lobby, Pool Lounge, Deluxe King, Deluxe Twin, Bar, WTF Restaurant Buffet
  const hotelPhotos = [
    {
      url: '/images/New-Asset/Hotel/Lobby.png',
      title: 'Main Lobby & Front Desk FOX Harris Hotel',
      desc: 'Area resepsionis kontemporer dengan panel kayu arsitektural hangat di koridor Jl. Riau.',
    },
    {
      url: '/images/New-Asset/Hotel/Pool Lounge.jpg',
      title: 'Rooftop Sky Lounge & Bean Bag Terrace',
      desc: 'Area bersantai rooftop bergaya urban dengan pemandangan cakrawala kota Pekanbaru di malam hari.',
    },
    {
      url: '/images/New-Asset/Hotel/Deluxe.png',
      title: 'Kamar Deluxe King Bed',
      desc: 'Interior kamar nyaman dan modern berstandar bintang empat dengan meja kerja ergonomis.',
    },
    {
      url: '/images/New-Asset/Hotel/Deluxe - Twin.png',
      title: 'Kamar Deluxe Twin Bed',
      desc: 'Pilihan kamar twin modern yang ideal untuk delegasi bisnis maupun perjalanan keluarga.',
    },
    {
      url: '/images/New-Asset/Hotel/bar.png',
      title: 'Lobby Bar & Executive Lounge',
      desc: 'Area bar modern dengan pencahayaan arsitektural hangat untuk bersantai dan temu bisnis.',
    },
    {
      url: '/images/New-Asset/Hotel/WTF Restaurant.jpg',
      title: "Where's The Food (WTF) Restaurant — Buffet Area",
      desc: 'Sajian hidangan nusantara dan internasional dalam suasana restoran hangat bergaya resort tropis.',
    },
  ];

  // Mall: 6 unique photos — PX Mall facade, ATRIUM, XXI 1, Wingstop, FRUIT CITY, Kiddyhope
  const mallPhotos = [
    {
      url: '/images/New-Asset/Mall Photo/PX MALL.png',
      title: 'Fasad Kawasan Terpadu Pekanbaru Xchange (PX)',
      desc: 'Fasad melengkung bermotif geometris ikonik yang terhubung langsung dengan menara FOX Harris Hotel.',
    },
    {
      url: '/images/New-Asset/Mall Photo/ATRIUM.png',
      title: 'Main Atrium & Layanan Informasi Pelanggan',
      desc: 'Koridor atrium yang lapang dan terang dengan integrasi akses langsung menuju area hotel.',
    },
    {
      url: '/images/New-Asset/Mall Photo/XXI 1.png',
      title: 'Cinema XXI Entertainment (Lantai 3)',
      desc: 'Bioskop premier modern dengan studio berkualitas tinggi dan area refreshment.',
    },
    {
      url: '/images/New-Asset/Mall Photo/Wingstop.png',
      title: 'Wingstop Dining Promenade',
      desc: 'Area bersantap modern di bawah struktur atap kaca yang terang bagi keluarga dan komunitas.',
    },
    {
      url: '/images/New-Asset/Mall Photo/FRUIT CITY.png',
      title: 'Fruit City — Fresh Market & Lifestyle Grocery',
      desc: 'Toko segar bergaya lifestyle dengan produk buah pilihan dan kebutuhan konsumsi premium.',
    },
    {
      url: '/images/New-Asset/Mall Photo/Kiddyhope.png',
      title: 'Kiddyhope — Kids Education & Playground Zone',
      desc: 'Zona bermain dan edukasi anak berstandar internasional di dalam kawasan mal terpadu.',
    },
  ];

  const [activeHotelPhotoIdx, setActiveHotelPhotoIdx] = useState<number>(0);
  const [activeMallPhotoIdx, setActiveMallPhotoIdx] = useState<number>(0);

  return (
    <div className="bg-white min-h-screen text-[#141414]">
      {/* 1. Dedicated Corporate Hero Header */}
      <div className="relative bg-[#0F1117] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden text-left">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/New-Asset/Hotel/Pool Lounge.jpg"
            alt="Interior Arsitektural PT Halla Mohana"
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
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-4"
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
        </motion.div>
      </div>

      {/* 2. Section 1: FOX Harris Hotel Pekanbaru */}
      <section id="fox-hotel" className="py-20 sm:py-28 bg-white border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Kiri: 60% Foto Besar & Thumbnail Switcher */}
            <ArchitecturalReveal className="lg:col-span-7 space-y-4" direction="left" distance={16}>
              <div className="relative rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100 aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hotelPhotos[activeHotelPhotoIdx].url}
                    src={hotelPhotos[activeHotelPhotoIdx].url}
                    alt={hotelPhotos[activeHotelPhotoIdx].title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: ARCHITECTURAL_EASE }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
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

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-6 gap-2 pt-2">
                {hotelPhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHotelPhotoIdx(idx)}
                    className={`relative rounded overflow-hidden border transition-all cursor-pointer ${
                      activeHotelPhotoIdx === idx
                        ? 'border-[#8B1E24] ring-1 ring-[#8B1E24]'
                        : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </ArchitecturalReveal>

            {/* Kanan: 40% Spesifikasi */}
            <ArchitecturalReveal className="lg:col-span-5 lg:border-l lg:border-[#E5E5E5] lg:pl-10 space-y-5" delay={0.12}>
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

              {/* Spesifikasi Arsitektural */}
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
                  <span className="font-semibold text-[#141414]">Where's The Food (WTF) Restaurant</span>
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
            </ArchitecturalReveal>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Pekanbaru Xchange (PX) */}
      <section id="pekanbaru-xchange" className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Kiri: 40% Deskripsi */}
            <ArchitecturalReveal className="lg:col-span-5 lg:border-r lg:border-[#E5E5E5] lg:pr-10 space-y-5">
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

              {/* Anchor Tenants & Spesifikasi */}
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
            </ArchitecturalReveal>

            {/* Kanan: 60% Foto Besar & Thumbnail Switcher */}
            <ArchitecturalReveal className="lg:col-span-7 space-y-4" delay={0.12}>
              <div className="relative rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100 aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mallPhotos[activeMallPhotoIdx].url}
                    src={mallPhotos[activeMallPhotoIdx].url}
                    alt={mallPhotos[activeMallPhotoIdx].title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: ARCHITECTURAL_EASE }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
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
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </ArchitecturalReveal>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Commercial Leasing & Partnership Inquiry */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E5E5E5] text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <ArchitecturalReveal>
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
          </ArchitecturalReveal>
        </div>
      </section>
    </div>
  );
};
