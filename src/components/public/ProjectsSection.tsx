import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import {
  ArchitecturalReveal,
  ArchitecturalStagger,
  ArchitecturalStaggerItem,
  ARCHITECTURAL_EASE,
} from '@/components/ui/MotionPrimitives';

interface ProjectsSectionProps {
  onNavigate?: (path: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const handleNavigate = (e: React.MouseEvent<HTMLElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const featuredProperties = [
    {
      id: 'fox-hotel',
      title: 'FOX Harris Hotel Pekanbaru',
      category: 'Hospitality & Hotel',
      location: 'Jl. Riau No. 147, Senapelan, Pekanbaru, Riau',
      imageUrl: '/images/New-Asset/Hotel/Deluxe.png',
      description: 'Hotel modern bintang 4 dengan 225 kamar & suite, indoor rooftop sky pool tertinggi di Pekanbaru, Grand Ballroom MICE, dan Restoran WTF.',
      actionText: 'Jelajahi Fasilitas & Kamar',
    },
    {
      id: 'px-mall',
      title: 'Pekanbaru Xchange (PX)',
      category: 'Commercial Retail & Lifestyle Mall',
      location: 'Jl. Riau No. 147, Senapelan, Pekanbaru, Riau',
      imageUrl: '/images/New-Asset/Mall%20Photo/Wingstop.png',
      description: 'Pusat perbelanjaan dan rekreasi modern terintegrasi dengan bioskop Cinema XXI, kuliner modern Wingstop & J.CO, hingga destinasi hiburan keluarga.',
      actionText: 'Jelajahi Ritel & Tenan',
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <ArchitecturalReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Portofolio Pilihan
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
                Destinasi Properti Unggulan
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed pt-1">
                Kawasan mixed-use terpadu di koridor strategis Jl. Riau No. 147 Pekanbaru yang menyinergikan akomodasi hotel bintang 4 dengan pusat perbelanjaan gaya hidup modern.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="/projects"
                onClick={(e) => handleNavigate(e, '/projects')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E24] hover:text-[#72181D] transition-colors group cursor-pointer"
              >
                <span>Lihat Seluruh Portofolio</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </ArchitecturalReveal>

        {/* 2-Column Large Visual Cards Grid */}
        <ArchitecturalStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10" staggerDelay={0.12}>
          {featuredProperties.map((property) => (
            <ArchitecturalStaggerItem key={property.id}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
                onClick={(e) => handleNavigate(e, '/projects')}
                className="group cursor-pointer h-full flex flex-col justify-between rounded-lg border border-[#E5E5E5] bg-white overflow-hidden shadow-2xs hover:border-[#8B1E24] hover:shadow-md transition-colors duration-300"
              >
                <div>
                  {/* 16:10 High-Resolution Architectural Photo Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded bg-[#141414]/90 px-3 py-1 text-[11px] font-semibold text-white uppercase tracking-wider">
                        {property.category}
                      </span>
                    </div>
                  </div>

                  {/* Property Content Snippet */}
                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#52525B] font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#8B1E24] shrink-0" />
                      <span>{property.location}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#141414] group-hover:text-[#8B1E24] transition-colors leading-snug">
                      {property.title}
                    </h3>

                    <p className="text-sm text-[#52525B] leading-relaxed pt-1">
                      {property.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-6 sm:p-8 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8B1E24] group-hover:underline inline-flex items-center gap-1.5">
                    {property.actionText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    Aset Resmi PT Halla Mohana
                  </span>
                </div>
              </motion.article>
            </ArchitecturalStaggerItem>
          ))}
        </ArchitecturalStagger>
      </div>
    </section>
  );
};