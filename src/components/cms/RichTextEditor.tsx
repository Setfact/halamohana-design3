import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Video,
  Image as ImageIcon,
  Link as LinkIcon,
  Eye,
  Edit3,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Tuliskan deskripsi lengkap di sini...',
  minHeight = '320px',
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Table modal state
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Media embed state
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = before + (selectedText || '') + after;

    const newValue =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 10);
  };

  const handleFormat = (type: string) => {
    switch (type) {
      case 'bold':
        insertTextAtCursor('<strong>', '</strong>');
        break;
      case 'italic':
        insertTextAtCursor('<em>', '</em>');
        break;
      case 'underline':
        insertTextAtCursor('<u>', '</u>');
        break;
      case 'strike':
        insertTextAtCursor('<s>', '</s>');
        break;
      case 'h1':
        insertTextAtCursor('<h1>', '</h1>\n');
        break;
      case 'h2':
        insertTextAtCursor('<h2>', '</h2>\n');
        break;
      case 'h3':
        insertTextAtCursor('<h3>', '</h3>\n');
        break;
      case 'ul':
        insertTextAtCursor('<ul>\n  <li>', '</li>\n</ul>\n');
        break;
      case 'ol':
        insertTextAtCursor('<ol>\n  <li>', '</li>\n</ol>\n');
        break;
      case 'quote':
        insertTextAtCursor('<blockquote>\n  <p>', '</p>\n</blockquote>\n');
        break;
      case 'link': {
        const url = prompt('Masukkan URL tautan:', 'https://');
        if (url) {
          insertTextAtCursor(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>');
        }
        break;
      }
      default:
        break;
    }
  };

  const handleInsertTable = () => {
    let tableHtml = '<table class="w-full my-4 border-collapse border border-slate-300 rounded-lg overflow-hidden">\n  <thead>\n    <tr class="bg-slate-100">\n';
    for (let c = 1; c <= tableCols; c++) {
      tableHtml += `      <th class="border border-slate-300 p-2.5 text-left font-semibold text-slate-800">Kolom Header ${c}</th>\n`;
    }
    tableHtml += '    </tr>\n  </thead>\n  <tbody>\n';

    for (let r = 1; r <= tableRows; r++) {
      tableHtml += '    <tr class="hover:bg-slate-50">\n';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `      <td class="border border-slate-300 p-2.5 text-slate-700">Data ${r}, ${c}</td>\n`;
      }
      tableHtml += '    </tr>\n';
    }
    tableHtml += '  </tbody>\n</table>\n';

    insertTextAtCursor(tableHtml);
    setShowTableModal(false);
  };

  const handleInsertVideo = () => {
    if (!videoUrl) return;

    let embedHtml = '';
    // YouTube embed converter
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let videoId = '';
      if (videoUrl.includes('v=')) {
        videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      }

      if (videoId) {
        embedHtml = `\n<div class="my-6 aspect-video rounded-xl overflow-hidden shadow-md">
  <iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>\n`;
      }
    }

    if (!embedHtml) {
      embedHtml = `\n<div class="my-6 aspect-video rounded-xl overflow-hidden shadow-md bg-slate-900 flex items-center justify-center text-white">
  <video controls class="w-full h-full">
    <source src="${videoUrl}" type="video/mp4">
    Browser Anda tidak mendukung video tag.
  </video>
</div>\n`;
    }

    insertTextAtCursor(embedHtml);
    setVideoUrl('');
    setShowVideoModal(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    const imgHtml = `\n<figure class="my-6">
  <img src="${imageUrl}" alt="${imageCaption || 'Gambar Berita'}" class="w-full max-h-[500px] object-cover rounded-xl shadow-md" />
  ${imageCaption ? `<figcaption class="mt-2 text-center text-sm text-slate-500 italic">${imageCaption}</figcaption>` : ''}
</figure>\n`;

    insertTextAtCursor(imgHtml);
    setImageUrl('');
    setImageCaption('');
    setShowImageModal(false);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden focus-within:border-[#7A152E] focus-within:ring-1 focus-within:ring-[#7A152E]">
      {/* Word-like Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 p-2 text-slate-700">
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            title="Tebal (Bold)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            title="Miring (Italic)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            title="Garis Bawah (Underline)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('strike')}
            title="Coret (Strikethrough)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Strikethrough className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => handleFormat('h1')}
            title="Judul Utama (H1)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('h2')}
            title="Subjudul (H2)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('h3')}
            title="Subbagian (H3)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => handleFormat('ul')}
            title="Daftar Poin (Bullet List)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('ol')}
            title="Daftar Berurutan (Numbered List)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('quote')}
            title="Kutipan (Blockquote)"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Quote className="h-4 w-4" />
          </button>
        </div>

        {/* Advance Content: Tables & Media */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            onClick={() => setShowTableModal(true)}
            title="Sisipkan Tabel"
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <TableIcon className="h-3.5 w-3.5 text-[#7A152E]" />
            <span>Tabel</span>
          </button>

          <button
            type="button"
            onClick={() => setShowVideoModal(true)}
            title="Sematkan Video / YouTube"
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <Video className="h-3.5 w-3.5 text-[#7A152E]" />
            <span>Video</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            title="Sisipkan Gambar Berita"
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <ImageIcon className="h-3.5 w-3.5 text-[#75B36A]" />
            <span>Gambar</span>
          </button>

          <button
            type="button"
            onClick={() => handleFormat('link')}
            title="Sisipkan Tautan Link"
            className="rounded p-1.5 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Live Preview Toggle */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              isPreview
                ? 'bg-[#7A152E] text-white shadow-xs'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {isPreview ? (
              <>
                <Edit3 className="h-3.5 w-3.5" />
                <span>Mode Edit</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Preview Hasil</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isPreview ? (
        <div
          className="p-5 overflow-y-auto prose max-w-none text-slate-800 bg-white"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: value || '<p class="text-slate-400 italic">Belum ada konten untuk ditampilkan dalam pratinjau...</p>' }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-hidden resize-y"
          style={{ minHeight }}
        />
      )}

      {/* Modal Insert Table */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TableIcon className="h-5 w-5 text-[#7A152E]" />
              Sisipkan Tabel Terformat
            </h4>
            <p className="mt-1 text-sm text-slate-500">
              Tentukan jumlah baris dan kolom yang ingin Anda masukkan ke dalam artikel.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Jumlah Kolom</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={tableCols}
                  onChange={(e) => setTableCols(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Jumlah Baris Data</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowTableModal(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleInsertTable}>
                Sisipkan Tabel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Video Embed */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Video className="h-5 w-5 text-[#7A152E]" />
              Sematkan Video / YouTube
            </h4>
            <p className="mt-1 text-sm text-slate-500">
              Masukkan URL video YouTube atau URL file MP4 langsung untuk disematkan dalam artikel.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700">URL Video</label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowVideoModal(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleInsertVideo} disabled={!videoUrl}>
                Sematkan Video
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Image Embed */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#75B36A]" />
              Sisipkan Gambar ke Artikel
            </h4>
            <p className="mt-1 text-sm text-slate-500">
              Masukkan URL gambar langsung atau pilih dari internet/media library.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">URL Gambar</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Keterangan Gambar (Caption)</label>
                <input
                  type="text"
                  placeholder="Contoh: Suasana atrium Pekanbaru Xchange..."
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowImageModal(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleInsertImage} disabled={!imageUrl}>
                Sisipkan Gambar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
