import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { GallerySection } from '@/components/public/GallerySection';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Dokumentasi & Galeri Arsitektur"
        description="Koleksi foto resolusi tinggi yang merekam estetika desain arsitektur, fasilitas kamar, kolam renang infinity rooftop, atrium mall, serta momen penting operasional PT Halla Mohana."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Dokumentasi & Galeri' },
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. Full Gallery Section with Lightbox */}
      <GallerySection />
    </div>
  );
};
