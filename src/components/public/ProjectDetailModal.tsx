import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, ArrowRight } from 'lucide-react';
import type { ProjectItem } from '@/types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose} title={project.title} maxWidth="2xl">
      <div className="space-y-6">
        {/* Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="primary" size="md">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Location & Meta */}
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <MapPin className="h-4 w-4 text-[#A68253]" />
          <span>{project.location}</span>
        </div>

        {/* Description */}
        <div className="text-sm leading-relaxed text-slate-700 space-y-3">
          <p>{project.description}</p>
        </div>

        {/* Specs Table */}
        {project.specs && project.specs.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Spesifikasi & Fasilitas Kunci:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {project.specs.map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold text-slate-500">{spec.label}</span>
                  <span className="font-bold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery thumbnails */}
        {project.gallery && project.gallery.length > 1 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Galeri Foto Properti:
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {project.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i}`}
                  className="aspect-video w-full rounded-lg object-cover border border-slate-200 shadow-2xs"
                />
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <a href="#contact" onClick={onClose}>
            <Button variant="primary" size="sm" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              Pertanyaan Sewa / Kerjasama
            </Button>
          </a>
          <Button variant="outline" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};
