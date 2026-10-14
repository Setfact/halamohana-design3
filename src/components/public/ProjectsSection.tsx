import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { MapPin, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { ProjectItem } from '@/types';

export const ProjectsSection: React.FC = () => {
  const { projects } = useCMSData();
  const visibleProjects = projects.filter((p) => p.visibility);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>('');

  const categories = ['All', 'Hospitality & Hotel', 'Shopping Mall & Retail', 'Commercial Office'];

  const filteredProjects =
    activeCategory === 'All'
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === activeCategory);

  // Synchronize active project when filter changes or on initial load
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.find((p) => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filteredProjects[0].id);
      }
    } else {
      setActiveProjectId('');
    }
  }, [filteredProjects, activeProjectId]);

  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) || filteredProjects[0];

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Section Header - Direct, Bold, Clean (No Kicker / No Pills) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Portofolio Properti Pilihan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Destinasi perhotelan prestisius dan pusat perbelanjaan gaya hidup modern terpadu yang dikembangkan serta dikelola oleh PT Halla Mohana.
            </p>
          </div>

          {/* Clean Category Underline Tabs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative pb-2 text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#7A152E]'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <span>{cat === 'All' ? 'Semua Portofolio' : cat}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A152E]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Flagship Architectural Stage & Specs Rail (Direct & Free of Badges) */}
        {activeProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Flagship Stage Viewport */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Photo Frame (Clean: No STAGE 01 badge) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-900 shadow-md group">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                {/* Overlaid Title & Location on Image Bottom */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A68253] block">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                    {activeProject.title}
                  </h3>
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium">
                    <MapPin className="h-4 w-4 text-[#A68253] shrink-0" />
                    <span>{activeProject.location}</span>
                  </p>
                </div>
              </div>

              {/* Narrative & Blueprint Specifications Strip */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A152E] mb-2">
                    Ringkasan Proyek & Konsep
                  </h4>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                    {activeProject.description}
                  </p>
                </div>

                {/* 4-Grid Blueprint Specifications Rail (Pure Text & Values) */}
                {activeProject.specs && activeProject.specs.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activeProject.specs.slice(0, 4).map((spec, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-stone-100 bg-[#F8F9FA] p-3.5 space-y-1 hover:border-[#A68253]/40 transition-colors"
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block truncate">
                            {spec.label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-stone-900 block leading-snug">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-100">
                  <span className="text-xs text-stone-500 font-medium">
                    Aset Dikelola oleh PT Halla Mohana
                  </span>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowUpRight className="h-4 w-4" />}
                      iconPosition="right"
                      onClick={() => setSelectedProject(activeProject)}
                    >
                      Buka Spesifikasi Lengkap
                    </Button>
                    <a href="#contact">
                      <Button variant="outline" size="sm">
                        Inquiri Kerjasama
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Portfolio Selector Rail (Clean: No 01 badges) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">
                  Katalog Portofolio
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  {filteredProjects.length} Properti
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
                      className={`group cursor-pointer rounded-2xl p-3.5 transition-all flex items-center gap-4 border ${
                        isSelected
                          ? 'border-[#7A152E] bg-white shadow-md ring-2 ring-[#7A152E]/10 translate-x-1'
                          : 'border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      {/* Thumbnail (Clean: No badge) */}
                      <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Info snippet */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A68253] truncate block">
                          {project.category}
                        </span>

                        <h4
                          className={`text-sm font-bold truncate leading-snug ${
                            isSelected
                              ? 'text-[#7A152E]'
                              : 'text-stone-900 group-hover:text-[#7A152E]'
                          }`}
                        >
                          {project.title}
                        </h4>

                        <p className="flex items-center gap-1 text-[11px] text-stone-500 truncate">
                          <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                          <span>{project.location.split(',')[0]}</span>
                        </p>
                      </div>

                      {/* Right Indicator Arrow */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                          isSelected
                            ? 'bg-[#7A152E] text-white'
                            : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-900'
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ecosystem Footprint Card */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2">
                <h4 className="text-xs font-bold text-stone-900">
                  Pengembangan Aset Berkelanjutan
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Setiap properti PT Halla Mohana dirancang dengan efisiensi energi tinggi, standar keselamatan internasional, dan integrasi fasilitas yang menunjang aktivitas bisnis serta rekreasi keluarga.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm">
              Tidak ada portofolio yang cocok dengan kategori ini.
            </p>
            <Button variant="outline" size="sm" onClick={() => setActiveCategory('All')}>
              Tampilkan Semua Portofolio
            </Button>
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
