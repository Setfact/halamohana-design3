import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ImagePickerModal } from '@/components/cms/ImagePickerModal';
import {
  Images,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Search,
} from 'lucide-react';
import type { GalleryItem } from '@/types';

export const ManageGalleryModule: React.FC = () => {
  const {
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    toggleGalleryVisibility,
  } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'FOX Harris Hotel',
    date: new Date().toISOString().split('T')[0],
    thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&auto=format&fit=crop&q=85',
    visibility: true,
  });

  const openAddModal = () => {
    setEditingItemId(null);
    setFormData({
      title: '',
      category: 'FOX Harris Hotel',
      date: new Date().toISOString().split('T')[0],
      thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&auto=format&fit=crop&q=85',
      visibility: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      thumbnail: item.thumbnail,
      imageUrl: item.imageUrl || item.thumbnail,
      visibility: item.visibility,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItemId) {
      updateGalleryItem(editingItemId, formData);
    } else {
      addGalleryItem(formData);
    }
    setIsModalOpen(false);
  };

  const filteredGallery = gallery.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Images className="h-6 w-6 text-[#7A152E]" />
            Manage Gallery & Media Showcase
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola dokumentasi visual properti perhotelan, fasilitas ritel mall, dan event korporat PT Halla Mohana.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Tambah Foto Galeri
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari caption atau album proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
          />
        </div>
        <p className="text-xs text-slate-500">
          Total {filteredGallery.length} foto galeri
        </p>
      </div>

      {/* Standard Gallery Schema Table: No, Thumbnail, Judul/Caption, Kategori/Album Proyek, Tanggal, Visibility, Action (Edit, Delete) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-28">Thumbnail</th>
              <th className="py-3 px-4">Judul / Caption</th>
              <th className="py-3 px-4">Kategori / Album Proyek</th>
              <th className="py-3 px-4 w-28">Tanggal</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredGallery.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4">
                  <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-2xs">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                  {item.title}
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant="primary" size="sm">
                    {item.category}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-600 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleGalleryVisibility(item.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={item.visibility ? 'Tampilkan' : 'Sembunyikan'}
                  >
                    <Badge variant={item.visibility ? 'success' : 'neutral'} size="sm">
                      {item.visibility ? (
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
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus foto galeri "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit Gallery */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItemId ? 'Edit Foto Galeri' : 'Tambah Foto Galeri Baru'}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Judul / Caption Foto
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Rooftop Infinity Pool FOX Harris Hotel"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategori / Album Proyek
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="FOX Harris Hotel">FOX Harris Hotel</option>
                <option value="Pekanbaru Xchange">Pekanbaru Xchange</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Sustainability & CSR">Sustainability & CSR</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tanggal Dokumentasi
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Thumbnail / Image Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              File Foto / Thumbnail
            </label>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={formData.thumbnail}
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
                  placeholder="Atau tempel URL gambar langsung..."
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      thumbnail: e.target.value,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                className="rounded text-[#7A152E] focus:ring-[#7A152E] h-4 w-4"
              />
              <span className="text-xs font-bold text-slate-700">Tampilkan di Galeri Publik</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingItemId ? 'Simpan Perubahan' : 'Tambah Foto'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        title="Pilih Foto untuk Galeri"
        onSelectImage={(url) =>
          setFormData((prev) => ({ ...prev, thumbnail: url, imageUrl: url }))
        }
      />
    </div>
  );
};
