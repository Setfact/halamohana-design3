import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactSection } from '@/components/public/ContactSection';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        category="Layanan Informasi & Kontak Resmi"
        title="Hubungi PT Halla Mohana"
        description="Kantor representatif kami di Jakarta dan Pekanbaru siap melayani inquiri kerjasama komersial, sewa ruang ritel mall, reservasi MICE & ballroom, serta komunikasi media."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Hubungi Kami' },
        ]}
        imageUrl="/images/New-Asset/Mall%20Photo/Customer%20Service.png"
        onNavigate={onNavigate}
      />

      {/* 2. Full Contact Section */}
      <ContactSection />
    </div>
  );
};
