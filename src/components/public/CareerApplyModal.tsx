import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Briefcase, Upload, CheckCircle2 } from 'lucide-react';
import type { CareerItem } from '@/types';

interface CareerApplyModalProps {
  career: CareerItem | null;
  onClose: () => void;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({ career, onClose }) => {
  const { submitCareerApplication, generalConfig } = useCMSData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeName, setResumeName] = useState('CV_Resume_Calvin.pdf');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!career) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCareerApplication({
      careerId: career.id,
      careerTitle: career.title,
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeName,
      coverLetter,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <Modal
      isOpen={!!career}
      onClose={onClose}
      title={`Lamar Posisi: ${career.title}`}
      description={`${career.department} • ${career.location}`}
      maxWidth="xl"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Lamaran Berhasil Dikirimkan!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Terima kasih telah melamar di PT Halla Mohana. Berkas Anda telah diteruskan ke tim Talent Acquisition kami di <strong className="text-slate-800">{generalConfig.auto_send_email.send_career_application_to}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Lengkap Pelamar *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Sesuai kartu identitas..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Alamat Email Aktif *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nomor WhatsApp / HP *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 8..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tautan LinkedIn / Portofolio (Opsional)
            </label>
            <input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lampiran Resume / CV (PDF) *
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3.5">
              <Upload className="h-5 w-5 text-[#A68253]" />
              <div className="flex-1 text-xs">
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  placeholder="Nama file CV atau lampiran..."
                  className="w-full bg-transparent font-medium text-slate-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Surat Pengantar / Motivasi Singkat
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Ceritakan pengalaman relevan dan motivasi Anda bergabung dengan PT Halla Mohana..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Kirimkan Berkas Lamaran
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
