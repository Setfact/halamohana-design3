import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { Button } from '@/components/ui/Button';
import { Building2, MapPin, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        title="Portofolio Properti Komersial & Hospitality"
        description="Jelajahi destinasi perhotelan prestisius, pusat perbelanjaan modern, dan ruang perkantoran komersial yang dikembangkan serta dikelola oleh PT Halla Mohana di seluruh Indonesia."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Portofolio Properti' },
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. Main Architectural Projects Showcase & Specs Rail */}
      <ProjectsSection />

      {/* 3. Commercial Leasing & Partnership CTA */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="rounded-3xl border border-stone-200 bg-[#FBFBF9] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="max-w-2xl space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Peluang Kemitraan Ritel & Sewa Komersial
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Tertarik membuka cabang gerai ritel, gerai kuliner, atau menyelenggarakan acara MICE di FOX Harris Hotel dan Pekanbaru Xchange? Hubungi tim leasing kami untuk penawaran ruang terbaik.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                onClick={() => onNavigate('/contact')}
              >
                Inquiri Kerjasama / Sewa
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
