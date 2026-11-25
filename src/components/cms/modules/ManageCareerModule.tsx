import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { getUploadedFileBlob } from '@/lib/fileStorage';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  UserCheck,
  MapPin,
  Search,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import type { CareerItem, CareerApplication } from '@/types';

export const ManageCareerModule: React.FC = () => {
  const {
    careers,
    addCareer,
    updateCareer,
    deleteCareer,
    toggleCareerVisibility,
    careerApplications,
    updateCareerApplicationStatus,
    generalConfig,
  } = useCMSData();

  const [activeTab, setActiveTab] = useState<'postings' | 'applications'>('postings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    department: 'Property Management',
    location: 'Pekanbaru, Riau',
    employment_type: 'Full-time',
    requirements: ['Pendidikan S1 terkait', 'Pengalaman kerja minimal 3 tahun'],
    responsibilities: ['Mengelola operasional harian gedung'],
    deadline: '2026-12-31',
    visibility: true,
  });

  const [reqText, setReqText] = useState('');
  const [respText, setRespText] = useState('');

  const openAddModal = () => {
    setEditingCareerId(null);
    setFormData({
      title: '',
      department: 'Property Management',
      location: 'Pekanbaru, Riau',
      employment_type: 'Full-time',
      requirements: ['Pendidikan S1 terkait', 'Pengalaman kerja minimal 3 tahun'],
      responsibilities: ['Mengelola operasional harian gedung'],
      deadline: '2026-12-31',
      visibility: true,
    });
    setReqText('Pendidikan S1 terkait\nPengalaman kerja minimal 3 tahun');
    setRespText('Mengelola operasional harian gedung\nMenjaga kepatuhan standar K3');
    setIsModalOpen(true);
  };

  const openEditModal = (c: CareerItem) => {
    setEditingCareerId(c.id);
    setFormData({
      title: c.title,
      department: c.department,
      location: c.location,
      employment_type: c.employment_type,
      requirements: c.requirements,
      responsibilities: c.responsibilities,
      deadline: c.deadline,
      visibility: c.visibility,
    });
    setReqText(c.requirements.join('\n'));
    setRespText(c.responsibilities.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      requirements: reqText.split('\n').map((r) => r.trim()).filter(Boolean),
      responsibilities: respText.split('\n').map((r) => r.trim()).filter(Boolean),
    };

    if (editingCareerId) {
      updateCareer(editingCareerId, finalData);
    } else {
      addCareer(finalData);
    }
    setIsModalOpen(false);
  };

  const resolveApplicationPdfUrl = async (app: CareerApplication): Promise<string | null> => {
    const storedBlob = await getUploadedFileBlob('career-' + app.id);
    if (storedBlob) {
      return URL.createObjectURL(storedBlob);
    }
    if (app.resumeUrl && !app.resumeUrl.startsWith('#')) {
      return app.resumeUrl;
    }
    return null;
  };

  const handlePreviewResume = async (app: CareerApplication) => {
    const url = await resolveApplicationPdfUrl(app);
    if (!url) {
      toast.error('Berkas PDF tidak ditemukan di sesi penyimpanan browser ini.');
      return;
    }
    setPreviewPdfTitle(`${app.fullName} — ${app.resumeName}`);
    setPreviewPdfUrl(url);
  };

  const handleDownloadResume = async (app: CareerApplication) => {
    const url = await resolveApplicationPdfUrl(app);
    if (!url) {
      toast.error('Berkas PDF tidak tersedia untuk diunduh.');
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = app.resumeName || 'resume.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    toast.success(`Mengunduh ${app.resumeName}`);
  };

  const filteredCareers = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="h-6 w-6 text-[#7A152E]" />
            Manage Career & Talent Recruitment
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola lowongan pekerjaan aktif di grup PT Halla Mohana dan pantau berkas pelamar. Notifikasi dikirimkan ke: <strong className="text-slate-700">{generalConfig.auto_send_email.send_career_application_to}</strong>
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Buka Lowongan Baru
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('postings')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'postings'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Daftar Lowongan Pekerjaan ({careers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'applications'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Berkas Lamaran Masuk ({careerApplications.length})
        </button>
      </div>

      {activeTab === 'postings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari posisi atau departemen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-slate-500">
              Total {filteredCareers.length} posisi kerja
            </p>
          </div>

          {/* manage_career Table: exact columns (no, title, create_time, updated, action) */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Posisi Lowongan (Title)</th>
                  <th className="py-3 px-4">Departemen & Lokasi</th>
                  <th className="py-3 px-4 w-28">Batas Akhir</th>
                  <th className="py-3 px-4 w-28">Create Time</th>
                  <th className="py-3 px-4 w-28">Updated</th>
                  <th className="py-3 px-4 text-center">Visibility</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredCareers.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{c.title}</td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <Badge variant="primary" size="sm">
                          {c.department}
                        </Badge>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {c.location} • {c.employment_type}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-rose-600 whitespace-nowrap">
                      {c.deadline}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{c.create_time}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{c.updated}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleCareerVisibility(c.id)}
                        className="inline-flex cursor-pointer transition-transform hover:scale-110"
                        title={c.visibility ? 'Tampilkan' : 'Sembunyikan'}
                      >
                        <Badge variant={c.visibility ? 'success' : 'neutral'} size="sm">
                          {c.visibility ? (
                            <>
                              <Eye className="h-3 w-3" /> Aktif
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" /> Ditutup
                            </>
                          )}
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit2 className="h-3.5 w-3.5 text-[#7A152E]" />}
                          onClick={() => openEditModal(c)}
                        >
                          Edit
                        </Button>
                        {careers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus lowongan "${c.title}"?`)) {
                                deleteCareer(c.id);
                              }
                            }}
                            className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {careerApplications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <h4 className="font-bold text-slate-700 text-base">Belum Ada Berkas Pelamar</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Lamaran kerja yang diajukan oleh pengunjung melalui website publik akan masuk ke sini dan diteruskan ke email HRD.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 px-4">Nama Pelamar</th>
                    <th className="py-3 px-4">Posisi</th>
                    <th className="py-3 px-4">Kontak</th>
                    <th className="py-3 px-4">Resume / CV (PDF)</th>
                    <th className="py-3 px-4">Waktu Lamar</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Berkas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {careerApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{app.fullName}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#7A152E]">{app.careerTitle}</td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                        {app.email} • {app.phone}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-[#8B1E24] shrink-0" />
                          <div>
                            <p className="font-semibold text-slate-800">{app.resumeName}</p>
                            {app.resumeSize && (
                              <p className="text-[11px] text-slate-400">{app.resumeSize}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{app.submittedAt}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateCareerApplicationStatus(
                              app.id,
                              e.target.value as CareerApplication['status']
                            )
                          }
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:border-[#7A152E] focus:outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => void handlePreviewResume(app)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-[#8B1E24] hover:text-[#8B1E24] transition-colors cursor-pointer"
                            title="Lihat pratinjau PDF"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Lihat</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDownloadResume(app)}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#8B1E24] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#72181D] transition-colors cursor-pointer"
                            title="Unduh berkas CV PDF"
                          >
                            <Download className="h-3 w-3" />
                            <span>Unduh</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Add/Edit Career */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCareerId ? 'Edit Lowongan Kerja' : 'Buka Lowongan Kerja Baru'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Posisi Jabatan (Title)
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Building MEP Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Departemen
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="Property Management">Property Management</option>
                <option value="Engineering & Maintenance">Engineering & Maintenance</option>
                <option value="Marketing & Commercial">Marketing & Commercial</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Hotel Operations">Hotel Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lokasi Penempatan
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tipe Kepegawaian
              </label>
              <select
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="Full-time">Full-time (Karyawan Tetap)</option>
                <option value="Contract">Kontrak Berjangka (PKWT)</option>
                <option value="Internship">Magang / Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Batas Akhir Lamaran
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kualifikasi / Persyaratan (Satu baris per syarat)
            </label>
            <textarea
              rows={3}
              required
              value={reqText}
              onChange={(e) => setReqText(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tanggung Jawab Utama (Satu baris per poin)
            </label>
            <textarea
              rows={3}
              required
              value={respText}
              onChange={(e) => setRespText(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                className="rounded text-[#7A152E] focus:ring-[#7A152E] h-4 w-4"
              />
              <span className="text-xs font-bold text-slate-700">Tayangkan di Halaman Karir Publik</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingCareerId ? 'Simpan Perubahan' : 'Buka Lowongan'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* PDF Resume Preview Modal */}
      <Modal
        isOpen={!!previewPdfUrl}
        onClose={() => setPreviewPdfUrl(null)}
        title={`Pratinjau CV: ${previewPdfTitle}`}
        maxWidth="4xl"
      >
        {previewPdfUrl && (
          <div className="space-y-4">
            <div className="h-[70vh] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <iframe
                src={previewPdfUrl}
                title={previewPdfTitle}
                className="h-full w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewPdfUrl(null)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
