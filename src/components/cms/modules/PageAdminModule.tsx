import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  Menu,
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Navigation,
  ArrowUpDown,
  Save,
} from 'lucide-react';
import type { PageAdminItem } from '@/types';

export const PageAdminModule: React.FC = () => {
  const { pages, updatePage, togglePageVisibility } = useCMSData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PageAdminItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    navigation: '',
  });

  const openEditModal = (page: PageAdminItem) => {
    setEditingItem(page);
    setFormData({
      title: page.title,
      navigation: page.navigation,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updatePage(editingItem.id, {
        title: formData.title,
        navigation: formData.navigation,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Menu className="h-6 w-6 text-[#7A152E]" />
            Page & Navigation Administration
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola menu navbar publik dan navigasi halaman website PT Halla Mohana secara dinamis.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4">Menu Title</th>
              <th className="py-3 px-4">Target Navigation (Anchor / URL)</th>
              <th className="py-3 px-4">Created Time</th>
              <th className="py-3 px-4">Updated</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {pages.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{p.title}</td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-xs rounded-md bg-slate-100 px-2 py-1 text-slate-700">
                    {p.navigation}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500">{p.created_time}</td>
                <td className="py-3.5 px-4 text-xs text-slate-500">{p.updated}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => togglePageVisibility(p.id)}
                    className="inline-flex cursor-pointer transition-transform hover:scale-110"
                    title={p.visibility ? 'Tampilkan di Navbar' : 'Sembunyikan'}
                  >
                    <Badge variant={p.visibility ? 'success' : 'neutral'} size="sm">
                      {p.visibility ? (
                        <>
                          <Eye className="h-3 w-3" /> Visible
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
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit2 className="h-3.5 w-3.5 text-[#7A152E]" />}
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Navigasi Menu"
        description="Perubahan akan langsung tercermin pada bilah menu website utama."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Judul Menu (Title)
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tautan Navigasi (URL / Anchor)
            </label>
            <input
              type="text"
              required
              placeholder="#section-id atau /url"
              value={formData.navigation}
              onChange={(e) => setFormData({ ...formData, navigation: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-mono focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Navigasi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
