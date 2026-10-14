import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ImagePickerModal } from '@/components/cms/ImagePickerModal';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Upload,
  Search,
} from 'lucide-react';
import type { ProjectItem } from '@/types';

export const ManageProjectModule: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
  } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Hospitality & Hotel' as ProjectItem['category'],
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
    gallery: [] as string[],
    description: '',
    specs: [
      { label: 'Jumlah Kamar / Unit', value: '200+ Unit' },
      { label: 'Fasilitas Utama', value: 'Ballroom, Resto, Pool' },
      { label: 'Status Proyek', value: 'Beroperasi Penuh' },
    ],
    visibility: true,
  });

  const openAddModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      category: 'Hospitality & Hotel',
      location: 'Pekanbaru, Riau',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
      gallery: [],
      description: 'Deskripsi lengkap keunggulan properti komersial atau hotel...',
      specs: [
        { label: 'Kapasitas', value: 'Lengkap' },
        { label: 'Status', value: 'Aktif' },
      ],
      visibility: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      location: p.location,
      imageUrl: p.imageUrl,
      gallery: p.gallery,
      description: p.description,
      specs: p.specs,
      visibility: p.visibility,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      updateProject(editingProjectId, formData);
    } else {
      addProject(formData);
    }
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="h-6 w-6 text-[#7A152E]" />
            Manage Projects & Properties
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola portofolio hotel, mall perbelanjaan gaya hidup, dan perkantoran komersial yang dikembangkan oleh PT Halla Mohana.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Tambah Proyek Baru
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau lokasi proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
          />
        </div>
        <p className="text-xs text-slate-500">
          Total {filteredProjects.length} proyek terdaftar
        </p>
      </div>

      {/* manage_project Table: exact columns (no, title, create_time, updated, action) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-28">Thumbnail</th>
              <th className="py-3 px-4">Title Proyek</th>
              <th className="py-3 px-4">Kategori & Lokasi</th>
              <th className="py-3 px-4 w-28">Create Time</th>
              <th className="py-3 px-4 w-28">Updated</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredProjects.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4">
                  <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-2xs">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-900 leading-snug">{p.title}</p>
                </td>
                <td className="py-3.5 px-4">
                  <div className="space-y-1">
                    <Badge
                      variant={
                        p.category.includes('Hotel')
                          ? 'primary'
                          : p.category.includes('Mall')
                          ? 'warm'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      {p.category}
                    </Badge>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      {p.location}
                    </p>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{p.create_time}</td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{p.updated}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleProjectVisibility(p.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={p.visibility ? 'Tampilkan' : 'Sembunyikan'}
                  >
                    <Badge variant={p.visibility ? 'success' : 'neutral'} size="sm">
                      {p.visibility ? (
                        <>
                          <Eye className="h-3 w-3" /> Tayang
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Disembunyikan
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
                      onClick={() => openEditModal(p)}
                    >
                      Edit
                    </Button>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus proyek "${p.title}"?`)) {
                            deleteProject(p.id);
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

      {/* Modal Add/Edit Project */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProjectId ? 'Edit Portofolio Proyek' : 'Tambah Proyek Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Proyek (Title)
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: FOX Harris Hotel Pekanbaru"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategori Proyek
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ProjectItem['category'] })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="Hospitality & Hotel">Hospitality & Hotel</option>
                <option value="Shopping Mall & Retail">Shopping Mall & Retail</option>
                <option value="Commercial Office">Commercial Office</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lokasi / Alamat Singkat
              </label>
              <input
                type="text"
                required
                placeholder="Jl. Riau No. 147, Pekanbaru"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Foto Properti Utama
            </label>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-16 w-24 rounded-lg object-cover shadow-xs border border-slate-200 shrink-0"
              />
              <div className="flex-1 space-y-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Upload className="h-3.5 w-3.5 text-[#7A152E]" />}
                  onClick={() => setIsImagePickerOpen(true)}
                >
                  Pilih dari Media Library
                </Button>
                <input
                  type="url"
                  placeholder="Atau tempel URL foto langsung..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Deskripsi Fasilitas & Arsitektur
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
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
              <span className="text-xs font-bold text-slate-700">Tampilkan Proyek di Halaman Publik</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingProjectId ? 'Simpan Perubahan' : 'Terbitkan Proyek'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        title="Pilih Foto Properti Proyek"
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
      />
    </div>
  );
};
