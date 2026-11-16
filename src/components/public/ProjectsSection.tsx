import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { MapPin, ArrowUpRight, ChevronRight, Award, ShieldCheck, Clock, CheckCircle2, Phone, Building2 } from 'lucide-react';
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

  // 4-Column Key Metrics Corporate Achievement (100% Faktual & Selaras)
  const corporateMetrics = [
    {
      value: '2013',
      label: 'Tahun Pendirian Resmi',
      desc: 'Pengembang properti di bawah MahaDasha & TMT Group',
      icon: <Clock className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      value: '2 Aset Terpadu',
      label: 'Mixed-Use Complex',
      desc: 'Integrasi hotel bintang 4 & lifestyle mall di Pekanbaru',
      icon: <ShieldCheck className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      value: '225 Kamar',
      label: 'Akomodasi Bintang 4',
      desc: 'Dilengkapi indoor rooftop sky pool tertinggi di Pekanbaru',
      icon: <Award className="h-4 w-4 text-[#8B1E24]" />,
    },
    {
      value: '100%',
      label: 'Standar Mutu MahaDasha',
      desc: 'Kepatuhan K3, tata kelola GCG & sinergi TMT Group',
      icon: <CheckCircle2 className="h-4 w-4 text-[#8B1E24]" />,
    },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#F8F9FA] border-b border-stone-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8B1E24] block">
              Portofolio Properti Pilihan
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
              Aset Properti Komersial Unggulan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Fokus aset komersial utama PT Halla Mohana berada di kawasan terpadu Jl. Riau No. 147 Pekanbaru, mengintegrasikan keramahan perhotelan bintang 4 dengan pusat perbelanjaan gaya hidup modern.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-full px-5 py-2 text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1E24] text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
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
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-900 shadow-md group">
                <img
                  src={currentActiveImage}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent" />

                {/* Overlaid Title & Location */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-300 block">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                    {activeProject.title}
                  </h3>
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium">
                    <MapPin className="h-4 w-4 text-[#8B1E24] shrink-0" />
                    <span>{activeProject.location}</span>
                  </p>
                </div>
              </div>

              {/* Multi-Photo Interactive Thumbnail Selector */}
              {currentGalleryList.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {currentGalleryList.map((thumbUrl, idx) => {
                    const isSelected = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#8B1E24] shadow-md scale-102 ring-2 ring-[#8B1E24]/20'
                            : 'border-transparent opacity-65 hover:opacity-100 hover:border-stone-300'
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Narrative & Blueprint Specifications Strip */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#8B1E24] mb-2">
                    Ringkasan Proyek & Konsep
                  </h4>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                    {activeProject.description}
                  </p>
                </div>

                {/* 4-Grid Blueprint Specifications Rail */}
                {activeProject.specs && activeProject.specs.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activeProject.specs.slice(0, 4).map((spec, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-stone-100 bg-[#F8F9FA] p-3.5 space-y-1 hover:border-[#8B1E24]/30 transition-colors"
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

                {/* Primary Action Button (Pills) */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-500 font-medium">
                    Aset Komersial Dikelola oleh PT Halla Mohana
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(activeProject)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24] hover:bg-[#72181D] text-white px-5 py-2.5 text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer"
                    >
                      <span>Buka Spesifikasi Lengkap</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer"
                    >
                      <span>Inquiri Kerjasama</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Portfolio Selector Rail */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] uppercase tracking-widest text-stone-600 font-bold">
                  Katalog Portofolio
                </span>
                <span className="text-[11px] text-[#8B1E24] font-bold bg-[#8B1E24]/10 px-2.5 py-0.5 rounded-full">
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
                      className={`group cursor-pointer rounded-2xl p-3.5 transition-all flex items-center gap-4 border ${
                        isSelected
                          ? 'border-[#8B1E24] bg-white shadow-md ring-2 ring-[#8B1E24]/10 translate-x-1'
                          : 'border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300 shadow-2xs'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Info snippet */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E24] truncate block">
                          {project.category}
                        </span>

                        <h4
                          className={`text-sm font-bold truncate leading-snug ${
                            isSelected
                              ? 'text-[#8B1E24]'
                              : 'text-stone-900 group-hover:text-[#8B1E24]'
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
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                          isSelected
                            ? 'bg-[#8B1E24] text-white'
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
              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-2xs">
                <h4 className="text-xs font-bold text-stone-900">
                  Kawasan Terpadu Jl. Riau Pekanbaru
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Menyatukan kenyamanan hotel bintang 4 berkapasitas 225 kamar dengan fasilitas hiburan Cinema XXI dan koridor alfresco dining Pekanbaru Xchange dalam satu kawasan strategis terintegrasi.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm">
              Tidak ada portofolio yang cocok dengan kategori ini.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="rounded-full bg-[#8B1E24] text-white px-5 py-2 text-xs font-bold"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}

        {/* 4-Column Corporate Achievement Metrics Strip (100% Data Faktual Resmi) */}
        <div className="pt-4 border-t border-stone-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateMetrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200/90 bg-white p-6 space-y-3 shadow-2xs hover:border-[#8B1E24] hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B1E24]/10">
                    {metric.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-mono">
                    0{i + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 group-hover:text-[#8B1E24] transition-colors tracking-tight">
                    {metric.value}
                  </h3>
                  <p className="text-xs font-bold text-stone-800">
                    {metric.label}
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal">
                    {metric.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
