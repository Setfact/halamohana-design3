import React from 'react';
import { PublicNavbar } from './PublicNavbar';
import { HeroSlider } from './HeroSlider';
import { OverviewSection } from './OverviewSection';
import { ProjectsSection } from './ProjectsSection';
import { GovernanceSection } from './GovernanceSection';
import { StatsSection } from './StatsSection';
import { GallerySection } from './GallerySection';
import { NewsSection } from './NewsSection';
import { CareerSection } from './CareerSection';
import { ContactSection } from './ContactSection';
import { PublicFooter } from './PublicFooter';

export const PublicHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-stone-800 font-sans selection:bg-[#7A152E] selection:text-white">
      <PublicNavbar />
      <main>
        <HeroSlider />
        <OverviewSection />
        <ProjectsSection />
        <GovernanceSection />
        <StatsSection />
        <GallerySection />
        <NewsSection />
        <CareerSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
};
