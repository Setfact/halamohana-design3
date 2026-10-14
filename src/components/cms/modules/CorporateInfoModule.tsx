import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { RichTextEditor } from '@/components/cms/RichTextEditor';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
} from 'lucide-react';
import type { CorporateInfoItem } from '@/types';

export const CorporateInfoModule: React.FC = () => {
  const {
    corporateInfo,
    addCorporateInfo,
    updateCorporateInfo,
    deleteCorporateInfo,
    toggleCorporateInfoVisibility,
  } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    url: '',
    content: '',
    visibility: true,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      url: '',
      content: '<h3>Informasi Korporat Baru</h3><p>Tuliskan deskripsi lengkap di sini...</p>',
      visibility: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ci: CorporateInfoItem) => {
    setEditingId(ci.id);
    setFormData({
      date: ci.date,
      title: ci.title,
      url: ci.url,
      content: ci.content,
      visibility: ci.visibility,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCorporateInfo(editingId, formData);
    } else {
      addCorporateInfo(formData);
    }
    setIsModalOpen(false);
  };

  const filteredItems = corporateInfo.filter((ci) =>
    ci.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="h-6 w-6 text-[#7A152E]" />
            Corporate Information Administration
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola profil perusahaan, visi & misi, struktur dewan direksi, serta nilai-nilai dasar PT Halla Mohana.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Tambah Informasi Korporat
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul informasi korporat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
          />
        </div>
        <p className="text-xs text-slate-500">
          Total {filteredItems.length} entitas korporat terdaftar
        </p>
      </div>

      {/* Table: Exact requested columns (no, date, title, url, create_time, updated, action) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-28">Date</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4 w-28">Create Time</th>
              <th className="py-3 px-4 w-28">Updated</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredItems.map((ci, idx) => (
              <tr key={ci.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                  {ci.date}
                </td>
                <td className="py-3.5 px-4 max-w-sm">
                  <p className="font-bold text-slate-900 leading-snug">{ci.title}</p>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    /{ci.url}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{ci.create_time}</td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{ci.updated}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleCorporateInfoVisibility(ci.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={ci.visibility ? 'Tampilkan' : 'Sembunyikan'}
                  >
                    <Badge variant={ci.visibility ? 'success' : 'neutral'} size="sm">
                      {ci.visibility ? (
                        <>
                          <Eye className="h-3 w-3" /> Tayang
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Hidden
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
                      onClick={() => openEditModal(ci)}
                    >
                      Edit
                    </Button>
                    {corporateInfo.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus informasi korporat "${ci.title}"?`)) {
                            deleteCorporateInfo(ci.id);
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Informasi Korporat' : 'Tambah Informasi Korporat Baru'}
        maxWidth="4xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Judul (Title)
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tanggal (Date)
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              URL Slug
            </label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-mono focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Konten / Penjelasan (Word-like Rich Text Editor)
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
              minHeight="260px"
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
              <span className="text-xs font-bold text-slate-700">Tampilkan di Bagian Korporat</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingId ? 'Simpan Perubahan' : 'Terbitkan'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
