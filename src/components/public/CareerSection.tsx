import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CareerApplyModal } from './CareerApplyModal';
import type { CareerItem } from '@/types';

export const CareerSection: React.FC = () => {
  const { careers } = useCMSData();
  const visibleCareers = careers.filter((c) => c.visibility);

  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);

  return (
    <section id="career" className="py-20 sm:py-28 bg-[#F9FAFB] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-6 border-b border-stone-200">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Peluang Karir & Talenta
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Bergabunglah bersama keluarga besar PT Halla Mohana & Tiara Marga Trakindo (TMT Group). Bersama kita kembangkan ekosistem perhotelan dan properti komersial bernilai tinggi di Indonesia.
          </p>
        </div>

        {/* Desktop View: Corporate Table / Row List */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xs">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                <th className="py-4 px-6">Posisi & Departemen</th>
                <th className="py-4 px-6">Lokasi Penempatan</th>
                <th className="py-4 px-6">Tipe Pekerjaan</th>
                <th className="py-4 px-6">Batas Waktu</th>
                <th className="py-4 px-6 text-right">Aksi Pendaftaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {visibleCareers.map((job) => (
                <tr
                  key={job.id}
                  className="group hover:bg-stone-50/70 transition-colors"
                >
                  <td className="py-5 px-6">
                    <p className="font-bold text-base text-stone-900 group-hover:text-[#7A152E] transition-colors">
                      {job.title}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Departemen: {job.department}
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#A68253]" />
                      {job.location}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                      {job.employment_type}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="font-mono text-xs text-stone-500">
                      {job.deadline}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                      onClick={() => setSelectedCareer(job)}
                    >
                      Lamar Posisi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Minimalist Corporate List (No software checkmarks) */}
        <div className="md:hidden space-y-4">
          {visibleCareers.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">
                  {job.department}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Batas: {job.deadline}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">{job.title}</h3>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#A68253]" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span>{job.employment_type}</span>
                </div>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-700">Kualifikasi Utama:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-stone-500">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                  onClick={() => setSelectedCareer(job)}
                >
                  Lamar Posisi Ini
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CareerApplyModal
        career={selectedCareer}
        onClose={() => setSelectedCareer(null)}
      />
    </section>
  );
};
