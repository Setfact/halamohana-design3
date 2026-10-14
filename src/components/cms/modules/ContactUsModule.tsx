import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  Mail,
  Trash2,
  Eye,
  EyeOff,
  Phone,
  Calendar,
  Search,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import type { ContactInquiry } from '@/types';

export const ContactUsModule: React.FC = () => {
  const {
    contactInquiries,
    deleteContactInquiry,
    toggleContactVisibility,
    generalConfig,
  } = useCMSData();

  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInquiries = contactInquiries.filter(
    (c) =>
      c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Mail className="h-6 w-6 text-[#7A152E]" />
            Contact Us Inquiries Inbox
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Daftar pesan, pertanyaan kerjasama, dan permintaan reservasi yang dikirimkan oleh pengunjung website. Disinkronkan otomatis ke: <strong className="text-slate-700">{generalConfig.auto_send_email.send_contact_us}</strong>
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pengirim, email, atau isi pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-1.5 text-xs focus:border-[#7A152E] focus:outline-hidden"
          />
        </div>
        <p className="text-xs text-slate-500">
          Total {filteredInquiries.length} pesan masuk
        </p>
      </div>

      {/* contact_us Table: exact columns (no, full_name, Phone, Email, create_time, action) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Message Preview</th>
              <th className="py-3 px-4 w-28">Create Time</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredInquiries.map((c, idx) => (
              <tr
                key={c.id}
                className={`hover:bg-slate-50/60 transition-colors ${
                  !c.isRead ? 'bg-rose-50/20 font-medium' : ''
                }`}
              >
                <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {c.full_name}
                </td>
                <td className="py-3.5 px-4 text-xs font-mono text-slate-600 whitespace-nowrap">
                  {c.phone}
                </td>
                <td className="py-3.5 px-4 text-xs font-mono text-slate-600 whitespace-nowrap">
                  <a href={`mailto:${c.email}`} className="text-[#7A152E] hover:underline">
                    {c.email}
                  </a>
                </td>
                <td className="py-3.5 px-4 max-w-xs">
                  <p className="text-xs text-slate-600 truncate">{c.message}</p>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{c.create_time}</td>
                <td className="py-3.5 px-4 text-center">
                  <Badge variant={!c.isRead ? 'primary' : 'neutral'} size="sm">
                    {!c.isRead ? 'Baru' : 'Sudah Dibaca'}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedInquiry(c);
                        if (!c.isRead) toggleContactVisibility(c.id);
                      }}
                    >
                      Buka Pesan
                    </Button>
                    <button
                      type="button"
                      onClick={() => toggleContactVisibility(c.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                      title={c.isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                    >
                      {c.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-[#75B36A]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus pesan dari ${c.full_name}?`)) {
                          deleteContactInquiry(c.id);
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

      {/* Detail Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Detail Pesan Masuk #${selectedInquiry.no}`}
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Nama Pengirim:</span>
                <span className="font-bold text-slate-900">{selectedInquiry.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Nomor Telepon:</span>
                <span className="font-mono text-slate-800">{selectedInquiry.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Alamat Email:</span>
                <span className="font-mono text-slate-800">{selectedInquiry.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Waktu Masuk:</span>
                <span className="text-slate-700">{selectedInquiry.create_time}</span>
              </div>
            </div>

            {selectedInquiry.subject && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Subjek</p>
                <p className="font-bold text-slate-900 text-sm">{selectedInquiry.subject}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Isi Pesan</p>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Balasan: ${encodeURIComponent(selectedInquiry.subject || 'Inquiry PT Halla Mohana')}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A152E] hover:underline"
              >
                Balas via Email Klien →
              </a>
              <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
