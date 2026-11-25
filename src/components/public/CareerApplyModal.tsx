import React, { useState, useRef, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { validatePdfFile } from '@/lib/fileValidation';
import {
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  X,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import type { CareerItem } from '@/types';

interface CareerApplyModalProps {
  career: CareerItem | null;
  onClose: () => void;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({ career, onClose }) => {
  const { submitCareerApplication, generalConfig } = useCMSData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Real PDF upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formattedSize, setFormattedSize] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset modal cleanly whenever target career changes or closes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPortfolioUrl('');
    setCoverLetter('');
    setSelectedFile(null);
    setFormattedSize('');
    setFileError('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!career) return null;

  const processSelectedFile = async (file: File | undefined | null) => {
    if (!file) return;
    setIsValidating(true);
    setFileError('');

    const result = await validatePdfFile(file);
    setIsValidating(false);

    if (!result.valid) {
      setSelectedFile(null);
      setFormattedSize('');
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      const msg = result.error || 'File CV tidak valid.';
      setFileError(msg);
      toast.error(msg);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const objUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setFormattedSize(result.formattedSize || '');
    setPreviewUrl(objUrl);
    setFileError('');
    toast.success(`Berkas "${file.name}" (${result.formattedSize}) siap dikirimkan.`);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    void processSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    void processSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFormattedSize('');
    setFileError('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      const msg = 'Harap unggah berkas Resume / CV berformat PDF (maksimal 5 MB) terlebih dahulu.';
      setFileError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitCareerApplication(
        {
          careerId: career.id,
          careerTitle: career.title,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          portfolioUrl: portfolioUrl.trim() || undefined,
          resumeName: selectedFile.name,
          resumeSize: formattedSize,
          coverLetter: coverLetter.trim() || undefined,
        },
        selectedFile
      );

      setIsSuccess(true);
      toast.success('Berkas lamaran Anda berhasil dikirim ke HRD PT Halla Mohana.');
      setTimeout(() => {
        setIsSuccess(false);
        resetForm();
        onClose();
      }, 2400);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={!!career}
      onClose={() => {
        resetForm();
        onClose();
      }}
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
            Terima kasih telah melamar di PT Halla Mohana. Berkas Anda telah diteruskan ke tim Talent Acquisition kami di{' '}
            <strong className="text-slate-800">{generalConfig.auto_send_email.send_career_application_to}</strong>.
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
              className="w-full rounded-md border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:border-[#8B1E24] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Alamat Email Aktif *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full rounded-md border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:border-[#8B1E24] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Nomor WhatsApp / HP *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 8..."
                className="w-full rounded-md border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:border-[#8B1E24] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tautan LinkedIn / Portofolio (Opsional)
            </label>
            <input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-md border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:border-[#8B1E24] focus:outline-hidden"
            />
          </div>

          {/* Interactive Real PDF-Only Upload Dropzone (Max 5 MB) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Unggah Resume / CV (Khusus PDF, Maks. 5 MB) *
              </label>
              <span className="text-[11px] font-medium text-neutral-500">
                Format: .pdf • Maks: 5 MB
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
              aria-label="Pilih berkas CV berformat PDF"
            />

            {selectedFile ? (
              <div className="rounded-md border border-emerald-300 bg-emerald-50/50 p-3.5 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#8B1E24] text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate" title={selectedFile.name}>
                        {selectedFile.name}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>PDF Terverifikasi • {formattedSize}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-rose-600 transition-colors cursor-pointer"
                    title="Hapus berkas"
                    aria-label="Hapus berkas"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-emerald-200/70">
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E24] hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Pratinjau PDF
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Ganti File PDF
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`flex flex-col items-center justify-center text-center rounded-md border border-dashed p-5 transition-colors cursor-pointer ${
                  fileError
                    ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/70'
                    : isDragging
                      ? 'border-[#8B1E24] bg-rose-50/50'
                      : 'border-stone-300 bg-stone-50 hover:border-[#8B1E24] hover:bg-stone-100/70'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white border border-stone-200 text-[#8B1E24] mb-2.5 shadow-2xs">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  {isValidating
                    ? 'Memverifikasi format dan ukuran PDF...'
                    : 'Klik untuk memilih berkas CV atau seret (drag & drop) ke sini'}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Hanya menerima file <strong>.PDF</strong> asli • Ukuran maksimal <strong>5 MB</strong>
                </p>
              </div>
            )}

            {fileError && (
              <div className="mt-2 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 font-medium">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Surat Pengantar / Motivasi Singkat
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Ceritakan pengalaman relevan dan motivasi Anda bergabung dengan PT Halla Mohana..."
              className="w-full rounded-md border border-[#E5E5E5] px-3.5 py-2 text-sm focus:border-[#8B1E24] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isSubmitting || isValidating}
            >
              Kirimkan Berkas Lamaran
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
