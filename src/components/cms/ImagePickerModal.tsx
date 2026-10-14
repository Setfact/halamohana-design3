import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Image, Folder, Check, Upload, Link as LinkIcon } from 'lucide-react';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  title?: string;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Pilih Aset Gambar dari Media Library',
}) => {
  const { mediaFiles, addMediaFile } = useCMSData();
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Upload state
  const [uploadName, setUploadName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadFolder, setUploadFolder] = useState('/images/general');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const imageFiles = mediaFiles.filter((f) => f.type === 'image');
  const folders = Array.from(new Set(imageFiles.map((f) => f.directory)));

  const filteredImages =
    selectedFolder === 'all'
      ? imageFiles
      : imageFiles.filter((f) => f.directory === selectedFolder);

  const handleConfirm = () => {
    const finalUrl = isCustomMode ? customUrl : selectedUrl;
    if (finalUrl) {
      onSelectImage(finalUrl);
      onClose();
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !uploadName) return;

    addMediaFile({
      name: uploadName,
      url: uploadUrl,
      type: 'image',
      directory: uploadFolder,
      size: '350 KB',
      dimensions: '1920x1080',
    });

    setSelectedUrl(uploadUrl);
    setUploadName('');
    setUploadUrl('');
    setShowUploadForm(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="2xl">
      <div className="space-y-5">
        {/* Tab switch between Library and Direct URL */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setIsCustomMode(false)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
              !isCustomMode
                ? 'border-[#7A152E] text-[#7A152E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Image className="h-4 w-4" />
            Media Library ({imageFiles.length})
          </button>
          <button
            type="button"
            onClick={() => setIsCustomMode(true)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
              isCustomMode
                ? 'border-[#7A152E] text-[#7A152E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="h-4 w-4" />
            Input URL Gambar Langsung
          </button>
        </div>

        {isCustomMode ? (
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">URL Gambar Web / CDN</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
            {customUrl && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-500 mb-2 font-medium">Pratinjau URL:</p>
                <img
                  src={customUrl}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-lg object-contain shadow-xs"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Folder filter and Upload button */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedFolder('all')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    selectedFolder === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua ({imageFiles.length})
                </button>
                {folders.map((folder) => (
                  <button
                    key={folder}
                    type="button"
                    onClick={() => setSelectedFolder(folder)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                      selectedFolder === folder
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Folder className="h-3 w-3" />
                    {folder.replace('/images/', '')}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={<Upload className="h-3.5 w-3.5 text-[#7A152E]" />}
                onClick={() => setShowUploadForm(!showUploadForm)}
              >
                Upload Baru
              </Button>
            </div>

            {/* Quick Upload Form if toggled */}
            {showUploadForm && (
              <form onSubmit={handleUploadSubmit} className="mb-4 rounded-xl border border-rose-200 bg-rose-50/50 p-4 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#7A152E]">Tambah Gambar ke Library</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Nama File</label>
                    <input
                      type="text"
                      placeholder="foto-kamar-deluxe.jpg"
                      value={uploadName}
                      onChange={(e) => setUploadName(e.target.value)}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Folder</label>
                    <input
                      type="text"
                      value={uploadFolder}
                      onChange={(e) => setUploadFolder(e.target.value)}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">URL Gambar</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowUploadForm(false)}>
                    Batal
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Simpan ke Library
                  </Button>
                </div>
              </form>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1">
              {filteredImages.map((img) => {
                const isSelected = selectedUrl === img.url;
                return (
                  <div
                    key={img.id}
                    onClick={() => setSelectedUrl(img.url)}
                    className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#7A152E] ring-2 ring-[#7A152E]/20 scale-[0.98]'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                      <p className="text-[10px] text-white font-medium truncate">{img.name}</p>
                      <p className="text-[9px] text-slate-300">{img.size}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7A152E] text-white shadow-md">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 truncate max-w-xs">
            {isCustomMode
              ? customUrl || 'Masukkan URL gambar'
              : selectedUrl
              ? `Terpilih: ${selectedUrl.substring(0, 35)}...`
              : 'Pilih salah satu gambar'}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirm}
              disabled={isCustomMode ? !customUrl : !selectedUrl}
            >
              Gunakan Gambar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
