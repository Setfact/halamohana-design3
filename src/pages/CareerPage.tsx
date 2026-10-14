import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { CareerSection } from '@/components/public/CareerSection';

interface CareerPageProps {
  onNavigate: (path: string) => void;
}

export const CareerPage: React.FC<CareerPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Peluang Karir & Pengembangan Talenta"
        description="Jadilah bagian dari tim profesional PT Halla Mohana di bawah naungan ekosistem Tiara Marga Trakindo (TMT Group). Bersama-sama kita ciptakan standar baru keunggulan properti komersial dan perhotelan di Indonesia."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Karir & Talenta' },
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. Full Career Section with Application Drawer */}
      <CareerSection />
    </div>
  );
};
