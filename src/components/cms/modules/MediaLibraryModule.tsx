import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  Image as ImageIcon,
  FileText,
  Upload,
  Folder,
  Trash2,
  Copy,
  Sliders,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';
import type { MediaFile } from '@/types';

export const MediaLibraryModule: React.FC = () => {
  const { mediaFiles, addMediaFile, deleteMediaFile, addBanner } = useCMSData();

  const [activeTab, setActiveTab] = useState<'images' | 'documents'>('images');
  const [selectedDirectory, setSelectedDirectory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    name: '',
    url: '',
    directory: '/images/general',
    type: 'image' as 'image' | 'document',
    size: '420 KB',
    dimensions: '1920x1080',
  });

  const images = mediaFiles.filter((m) => m.type === 'image');
  const documents = mediaFiles.filter((m) => m.type === 'document');

  const directories = Array.from(
    new Set(images.map((img) => img.directory))
  );

  const filteredImages = images.filter((img) => {
    const matchesDir = selectedDirectory === 'all' || img.directory === selectedDirectory;
    const matchesSearch =
      img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDir && matchesSearch;
  });

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConnectToCarousel = (image: MediaFile) => {
    addBanner({
      title: image.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      subtitle: 'Aset gambar terpilih dari Media Library PT Halla Mohana.',
      ctaText: 'Pelajari Selengkapnya',
      ctaUrl: '#projects',
      imageUrl: image.url,
      visibility: true,
      order: 99,
    });
    alert(`Gambar "${image.name}" berhasil dihubungkan ke Hero Carousel Slider!`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMediaFile(uploadFormData);
    setIsUploadModalOpen(false);
    setUploadFormData({
      name: '',
      url: '',
      directory: activeTab === 'images' ? '/images/general' : '/documents',
      type: activeTab === 'images' ? 'image' : 'document',
      size: '420 KB',
      dimensions: '1920x1080',
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ImageIcon className="h-6 w-6 text-[#7A152E]" />
            Media & Asset Library
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pusat penyimpanan terpadu untuk aset foto, ilustrasi proyek, dan dokumen resmi PT Halla Mohana.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Upload className="h-4 w-4" />}
          onClick={() => {
            setUploadFormData((prev) => ({
              ...prev,
              type: activeTab === 'images' ? 'image' : 'document',
              directory: activeTab === 'images' ? '/images/general' : '/documents',
            }));
            setIsUploadModalOpen(true);
          }}
        >
          Upload Aset Baru
        </Button>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'images'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          Image Library ({images.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'documents'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="h-4 w-4" />
          Document Library ({documents.length})
        </button>
      </div>

      {/* Image Library Tab */}
      {activeTab === 'images' && (
        <div className="space-y-5">
          {/* Controls: Directory Filter & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Directory Pills (see_dir_of_each_uploaded_image) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Folder:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDirectory('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedDirectory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua ({images.length})
              </button>
              {directories.map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setSelectedDirectory(dir)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedDirectory === dir
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Folder className="h-3.5 w-3.5 text-[#7A152E]" />
                  <span>{dir.replace('/images/', '')}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari foto atau pengunggah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Image Grid (see_what_user_has_upload) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="rounded-md bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-white">
                      {img.directory}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex-1">
                  <p className="font-bold text-xs text-slate-900 truncate" title={img.name}>
                    {img.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{img.size}</span>
                    <span>{img.dimensions || 'HD'}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Oleh: {img.uploadedBy} • {img.uploadedAt}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(img.id, img.url)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Salin URL gambar"
                  >
                    {copiedId === img.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-600">Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin URL</span>
                      </>
                    )}
                  </button>

                  {/* Connect to carousel button */}
                  <button
                    type="button"
                    onClick={() => handleConnectToCarousel(img)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-[#7A152E] hover:bg-rose-50 transition-colors"
                    title="Hubungkan ke Hero Carousel Slider"
                  >
                    <Sliders className="h-3 w-3" />
                    <span>Jadikan Banner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Hapus file ${img.name}?`)) {
                        deleteMediaFile(img.id);
                      }
                    }}
                    className="rounded-lg p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Library Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Nama Dokumen</th>
                  <th className="py-3 px-4">Folder</th>
                  <th className="py-3 px-4">Ukuran</th>
                  <th className="py-3 px-4">Diupload Oleh</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-[#7A152E]">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-400">{doc.directory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-600">{doc.directory}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">{doc.size}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{doc.uploadedBy}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{doc.uploadedAt}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<ExternalLink className="h-3.5 w-3.5 text-[#7A152E]" />}
                          onClick={() => alert(`Mengunduh dokumen ${doc.name}`)}
                        >
                          Unduh
                        </Button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus dokumen ${doc.name}?`)) {
                              deleteMediaFile(doc.id);
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
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title={activeTab === 'images' ? 'Upload Gambar Baru' : 'Upload Dokumen Baru'}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama File
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: ballroom-fox-hotel.jpg"
              value={uploadFormData.name}
              onChange={(e) => setUploadFormData({ ...uploadFormData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              URL Sumber Aset (Direct Image / CDN URL)
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={uploadFormData.url}
              onChange={(e) => setUploadFormData({ ...uploadFormData, url: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Direktori Folder
              </label>
              <select
                value={uploadFormData.directory}
                onChange={(e) => setUploadFormData({ ...uploadFormData, directory: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                {activeTab === 'images' ? (
                  <>
                    <option value="/images/banners">/images/banners</option>
                    <option value="/images/projects">/images/projects</option>
                    <option value="/images/gallery">/images/gallery</option>
                    <option value="/images/logo">/images/logo</option>
                    <option value="/images/general">/images/general</option>
                  </>
                ) : (
                  <>
                    <option value="/documents">/documents</option>
                    <option value="/reports">/reports</option>
                    <option value="/careers">/careers</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimasi Ukuran
              </label>
              <input
                type="text"
                value={uploadFormData.size}
                onChange={(e) => setUploadFormData({ ...uploadFormData, size: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsUploadModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Aset ke Library
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
