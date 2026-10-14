import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { NewsSection } from '@/components/public/NewsSection';

interface NewsPageProps {
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Kabar Terbaru & Siaran Pers"
        description="Pusat informasi resmi dan rilis media seputar perkembangan ekspansi properti, inovasi layanan hospitalitas, kegiatan CSR, serta pengumuman korporat PT Halla Mohana."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kabar & Siaran Pers' },
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. Full News Section with Rich Text Reader */}
      <NewsSection />
    </div>
  );
};
