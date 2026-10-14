import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ImagePickerModal } from '@/components/cms/ImagePickerModal';
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from 'lucide-react';
import type { BannerItem } from '@/types';

export const BannerModule: React.FC = () => {
  const {
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBannerVisibility,
  } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: 'Pelajari Selengkapnya',
    ctaUrl: '#projects',
    imageUrl: '',
    visibility: true,
    order: 1,
  });

  const openAddModal = () => {
    setEditingBannerId(null);
    setFormData({
      title: '',
      subtitle: '',
      ctaText: 'Pelajari Selengkapnya',
      ctaUrl: '#projects',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&auto=format&fit=crop&q=85',
      visibility: true,
      order: banners.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: BannerItem) => {
    setEditingBannerId(b.id);
    setFormData({
      title: b.title,
      subtitle: b.subtitle,
      ctaText: b.ctaText,
      ctaUrl: b.ctaUrl,
      imageUrl: b.imageUrl,
      visibility: b.visibility,
      order: b.order,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBannerId) {
      updateBanner(editingBannerId, formData);
    } else {
      addBanner(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sliders className="h-6 w-6 text-[#7A152E]" />
            Banner & Hero Slider Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola slideshow gambar utama pada beranda website publik, teks headline, tombol aksi, dan urutan rotasi.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Tambah Banner Baru
        </Button>
      </div>

      {/* Table & Cards */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-14 text-center">Urutan</th>
              <th className="py-3 px-4 w-32">Visual</th>
              <th className="py-3 px-4">Headline & Keterangan</th>
              <th className="py-3 px-4">Tombol CTA</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {banners.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-700">#{b.order}</td>
                <td className="py-3.5 px-4">
                  <div className="relative aspect-video w-28 overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-2xs">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3.5 px-4 max-w-sm">
                  <p className="font-bold text-slate-900 text-sm leading-snug">{b.title}</p>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{b.subtitle}</p>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 rounded-md bg-slate-100 px-2 py-1">
                    {b.ctaText} → <code className="text-[10px] text-slate-500">{b.ctaUrl}</code>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleBannerVisibility(b.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={b.visibility ? 'Tampilkan di Hero' : 'Sembunyikan'}
                  >
                    <Badge variant={b.visibility ? 'success' : 'neutral'} size="sm">
                      {b.visibility ? (
                        <>
                          <Eye className="h-3 w-3" /> Aktif
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
                      onClick={() => openEditModal(b)}
                    >
                      Edit
                    </Button>
                    {banners.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus banner "${b.title}"?`)) {
                            deleteBanner(b.id);
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

      {/* Modal Add/Edit Banner */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBannerId ? 'Edit Hero Banner' : 'Tambah Hero Banner Baru'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Headline Utama
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Elevating Modern Hospitality in Pekanbaru"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subjudul / Keterangan Singkat
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan proposisi nilai atau keunggulan fasilitas..."
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Teks Tombol CTA
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tujuan Link Tombol (Anchor/URL)
              </label>
              <input
                type="text"
                value={formData.ctaUrl}
                onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-mono focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Image Selection with Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Gambar Latar Belakang (Hero Background)
            </label>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-20 w-36 rounded-lg object-cover shadow-xs border border-slate-200"
                />
              ) : (
                <div className="flex h-20 w-36 items-center justify-center rounded-lg bg-slate-200 text-xs text-slate-500">
                  Belum ada gambar
                </div>
              )}
              <div className="space-y-2">
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
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Urutan Rotasi
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                  className="rounded text-[#7A152E] focus:ring-[#7A152E] h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700">Tampilkan Banner di Beranda</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingBannerId ? 'Simpan Perubahan' : 'Buat Banner'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Image Picker */}
      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        title="Pilih Gambar untuk Hero Banner"
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
      />
    </div>
  );
};
