import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { RichTextEditor } from '@/components/cms/RichTextEditor';
import { ImagePickerModal } from '@/components/cms/ImagePickerModal';
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Upload,
  Search,
} from 'lucide-react';
import type { NewsItem } from '@/types';

export const NewsModule: React.FC = () => {
  const {
    newsList,
    addNews,
    updateNews,
    deleteNews,
    toggleNewsVisibility,
  } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Corporate Release',
    imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1000&auto=format&fit=crop&q=80',
    description: '',
    visibility: true,
  });

  const openAddModal = () => {
    setEditingNewsId(null);
    setFormData({
      title: '',
      url: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Corporate Release',
      imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1000&auto=format&fit=crop&q=80',
      description: '<p>Tuliskan isi siaran pers atau berita korporat di sini...</p>',
      visibility: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (n: NewsItem) => {
    setEditingNewsId(n.id);
    setFormData({
      title: n.title,
      url: n.url,
      date: n.date,
      category: n.category,
      imageUrl: n.imageUrl,
      description: n.description,
      visibility: n.visibility,
    });
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      url: prev.url === '' || prev.url === generateSlug(prev.title) ? generateSlug(val) : prev.url,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNewsId) {
      updateNews(editingNewsId, formData);
    } else {
      addNews(formData);
    }
    setIsModalOpen(false);
  };

  const filteredNews = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Newspaper className="h-6 w-6 text-[#7A152E]" />
            Manage News & Press Releases
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Publikasikan siaran pers resmi, kabar proyek properti, serta dokumentasi korporat dengan editor bergaya Word.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
            onClick={openAddModal}
          >
            Tulis Berita Baru
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul atau kategori berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
          />
        </div>
        <p className="text-xs text-slate-500">
          Total {filteredNews.length} artikel terdaftar
        </p>
      </div>

      {/* manage_news Table: exact columns (no, date, title, url, create_time, updated, action) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-28">Date</th>
              <th className="py-3 px-4">Title & Category</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4 w-28">Create Time</th>
              <th className="py-3 px-4 w-28">Updated</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredNews.map((n, idx) => (
              <tr key={n.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                  {n.date}
                </td>
                <td className="py-3.5 px-4 max-w-sm">
                  <p className="font-bold text-slate-900 leading-snug line-clamp-1">{n.title}</p>
                  <div className="mt-1">
                    <Badge variant="primary" size="sm">
                      {n.category}
                    </Badge>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    /{n.url}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{n.create_time}</td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{n.updated}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleNewsVisibility(n.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={n.visibility ? 'Tampilkan' : 'Sembunyikan'}
                  >
                    <Badge variant={n.visibility ? 'success' : 'neutral'} size="sm">
                      {n.visibility ? (
                        <>
                          <Eye className="h-3 w-3" /> Tayang
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Draft
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
                      onClick={() => openEditModal(n)}
                    >
                      Edit
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus artikel berita "${n.title}"?`)) {
                          deleteNews(n.id);
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

      {/* Modal create_news / edit_news with Word-like description */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNewsId ? 'Edit Artikel Berita' : 'Buat Artikel Berita Baru'}
        maxWidth="4xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Judul Berita (Title)
              </label>
              <input
                type="text"
                required
                placeholder="Judul siaran pers korporat..."
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tanggal Publikasi (Date)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                placeholder="slug-url-berita"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-mono focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategori Berita
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="Corporate Release">Corporate Release</option>
                <option value="Property Update">Property Update</option>
                <option value="Awards & Achievement">Awards & Achievement</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Community & Event">Community & Event</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Gambar Utama Berita (Featured Image)
            </label>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-16 w-28 rounded-lg object-cover shadow-xs border border-slate-200 shrink-0"
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
                  placeholder="Atau masukkan URL gambar..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Description: full features like Word edit (RichTextEditor) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Deskripsi Isi Berita (Word-like Rich Text Editor)
              </label>
              <span className="text-[11px] text-slate-400">
                Mendukung Heading, Tabel, Sematan Video & Gambar
              </span>
            </div>
            <RichTextEditor
              value={formData.description}
              onChange={(val) => setFormData({ ...formData, description: val })}
              placeholder="Tuliskan berita lengkap di sini. Gunakan tombol 'Tabel' atau 'Video' di toolbar jika diperlukan..."
              minHeight="280px"
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
              <span className="text-xs font-bold text-slate-700">Publikasikan Langsung ke Website</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingNewsId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        title="Pilih Gambar Utama Berita"
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
      />
    </div>
  );
};
