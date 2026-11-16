import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { MapPin, ArrowUpRight, ChevronRight, Phone, Building2 } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { ProjectItem } from '@/types';

export const ProjectsSection: React.FC = () => {
  const { projects } = useCMSData();
  const visibleProjects = projects.filter((p) => p.visibility);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // 2 Official Portfolios Categories: Only Commercial Projects in Pekanbaru
  const categories = [
    { label: 'Semua Proyek', value: 'All' },
    { label: 'Hospitality (FOX Harris Hotel)', value: 'Hospitality & Hotel' },
    { label: 'Lifestyle Mall (Pekanbaru Xchange)', value: 'Shopping Mall & Retail' },
  ];

  // Exclude Head Office Gedung TMT 1 from portfolio projects
  const mainCommercialProjects = visibleProjects.filter(
    (p) => p.id !== 'prj-3' && p.category !== 'Commercial Office'
  );

  const filteredProjects =
    activeCategory === 'All'
      ? mainCommercialProjects
      : mainCommercialProjects.filter((p) => p.category === activeCategory);

  // Synchronize active project when filter changes or on initial load
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.find((p) => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filteredProjects[0].id);
        setActiveImageIndex(0);
      }
    } else {
      setActiveProjectId('');
      setActiveImageIndex(0);
    }
  }, [filteredProjects, activeProjectId]);

  // Reset active image index when active project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeProjectId]);

  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) || filteredProjects[0];

  const currentGalleryList =
    activeProject?.gallery && activeProject.gallery.length > 0
      ? activeProject.gallery
      : activeProject
      ? [activeProject.imageUrl]
      : [];

  const currentActiveImage =
    currentGalleryList[activeImageIndex] || activeProject?.imageUrl || '';

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5] scroll-mt-20 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Portofolio Properti Pilihan
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
              Aset Properti Komersial Unggulan
            </h2>
            <p className="text-base text-[#52525B] leading-relaxed pt-1">
              Fokus aset komersial utama PT Halla Mohana berada di kawasan terpadu Jl. Riau No. 147 Pekanbaru, mengintegrasikan perhotelan bintang 4 dengan pusat perbelanjaan gaya hidup modern.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="inline-flex border border-[#E5E5E5] rounded-md p-1 bg-white shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'text-[#52525B] hover:text-[#141414]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flagship Stage & Detail Display */}
        {activeProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Flagship Stage Viewport */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-stone-100 border border-[#E5E5E5]">
                <img
                  src={currentActiveImage}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              </div>

              {/* Gallery Thumbnails Strip */}
              {currentGalleryList.length > 1 && (
                <div className="grid grid-cols-6 gap-2 pt-1">
                  {currentGalleryList.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/3] overflow-hidden rounded border transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#8B1E24] ring-1 ring-[#8B1E24]'
                          : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Galeri ${activeProject.title} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Metadata Card */}
              <div className="rounded-lg border border-[#E5E5E5] bg-white p-6 space-y-4 shadow-xs">
                <div className="space-y-1">
                  <p className="text-xs tracking-widest uppercase text-[#8B1E24] font-semibold">
                    {activeProject.category}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#141414]">
                    {activeProject.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-[#52525B] pt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                    <span>{activeProject.location}</span>
                  </p>
                </div>

                <p className="text-sm text-[#52525B] leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Specs List */}
                {activeProject.specs && activeProject.specs.length > 0 && (
                  <div className="pt-3 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeProject.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-baseline gap-2 text-[#52525B]">
                        <span className="w-1.5 h-1.5 bg-[#8B1E24] shrink-0 mt-1" />
                        <span>
                          <strong className="font-medium text-[#141414]">{spec.label}:</strong> {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E5E5E5]">
                  <span className="text-xs text-[#52525B] font-medium">
                    Aset Dikelola oleh PT Halla Mohana
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(activeProject)}
                      className="inline-flex items-center gap-2 bg-[#8B1E24] hover:bg-[#72181D] text-white px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Buka Spesifikasi Lengkap</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white hover:bg-stone-50 text-[#141414] px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Inquiri Kerjasama</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Portfolio Selector Rail */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                  Katalog Portofolio
                </p>
                <span className="text-xs text-[#8B1E24] font-semibold">
                  {filteredProjects.length} Destinasi Utama
                </span>
              </div>

              {/* Stacked Clean Portfolio Cards */}
              <div className="space-y-3">
                {filteredProjects.map((project) => {
                  const isSelected = project.id === activeProject.id;

                  return (
                    <div
                      key={project.id}
                      onClick={() => setActiveProjectId(project.id)}
                      className={`group cursor-pointer rounded-lg p-3.5 transition-all flex items-center gap-4 border ${
                        isSelected
                          ? 'border-[#8B1E24] bg-white shadow-xs'
                          : 'border-[#E5E5E5] bg-white hover:border-stone-300'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded bg-stone-100">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Info snippet */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8B1E24] truncate">
                          {project.category}
                        </p>

                        <h4
                          className={`text-sm font-semibold truncate leading-snug ${
                            isSelected
                              ? 'text-[#8B1E24]'
                              : 'text-[#141414] group-hover:text-[#8B1E24]'
                          }`}
                        >
                          {project.title}
                        </h4>

                        <p className="flex items-center gap-1 text-xs text-[#52525B] truncate">
                          <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                          <span>{project.location.split(',')[0]}</span>
                        </p>
                      </div>

                      {/* Right Indicator Arrow */}
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isSelected ? 'text-[#8B1E24]' : 'text-stone-400 group-hover:text-[#141414]'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm">
              Tidak ada portofolio yang cocok dengan kategori ini.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="bg-[#8B1E24] text-white px-5 py-2 text-xs font-semibold rounded-md"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
