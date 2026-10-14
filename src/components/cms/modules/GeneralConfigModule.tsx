import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { ImagePickerModal } from '@/components/cms/ImagePickerModal';
import {
  Settings,
  Shield,
  Building,
  Mail,
  Save,
  RotateCcw,
  Upload,
  CheckCircle,
} from 'lucide-react';

export const GeneralConfigModule: React.FC = () => {
  const { generalConfig, updateGeneralConfig, resetAllDataToDefault } = useCMSData();

  const [formData, setFormData] = useState(generalConfig);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFooterLogoModalOpen, setIsFooterLogoModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleNestedChange = (parent: 'office_info_input' | 'side_office_input' | 'auto_send_email', field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralConfig(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-[#7A152E]" />
            General Configuration
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola pengaturan global situs, identitas brand, keamanan akses IP, kontak kantor, dan integrasi notifikasi email.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<RotateCcw className="h-4 w-4" />}
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengatur ulang data ke bawaan awal?')) {
                resetAllDataToDefault();
              }
            }}
          >
            Reset Default
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            icon={<Save className="h-4 w-4" />}
            onClick={handleSave}
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
          Konfigurasi umum berhasil diperbarui dan tersinkronisasi ke website publik!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Identitas & Status Utama */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs text-[#7A152E]">1</span>
            Status & Logo Identitas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Status Publikasi Website
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('status', 'active')}
                  className={`flex-1 rounded-xl p-3 border text-sm font-bold transition-all text-center ${
                    formData.status === 'active'
                      ? 'border-[#75B36A] bg-emerald-50/70 text-[#558B4A] shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🟢 Online / Aktif
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('status', 'maintenance')}
                  className={`flex-1 rounded-xl p-3 border text-sm font-bold transition-all text-center ${
                    formData.status === 'maintenance'
                      ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🟡 Maintenance Mode
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Teks Copyright Footer
              </label>
              <input
                type="text"
                value={formData.copyright}
                onChange={(e) => handleChange('copyright', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            {/* Main Logo */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Main Logo (Header)
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 shadow-2xs">
                  <img
                    src={formData.logo}
                    alt="Logo Header"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Upload className="h-3.5 w-3.5 text-[#7A152E]" />}
                    onClick={() => setIsLogoModalOpen(true)}
                  >
                    Ubah Logo Header
                  </Button>
                  <p className="text-[11px] text-slate-400">Rekomendasi format PNG transparan atau SVG (tinggi ~50px).</p>
                </div>
              </div>
            </div>

            {/* Footer Logo */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Footer Logo (Sub-brand)
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 shadow-2xs">
                  <img
                    src={formData.footer_logo}
                    alt="Logo Footer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Upload className="h-3.5 w-3.5 text-[#75B36A]" />}
                    onClick={() => setIsFooterLogoModalOpen(true)}
                  >
                    Ubah Logo Footer
                  </Button>
                  <p className="text-[11px] text-slate-400">Digunakan pada section brand footer bersama kredensial TMT.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Keamanan Akses & IP Whitelist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Keamanan IP Login (Option Field: check_ip_login)
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.check_ip_login}
                onChange={(e) => handleChange('check_ip_login', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A152E]"></div>
            </label>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Aktifkan fitur ini untuk membatasi akses login CMS hanya bagi alamat IP yang didaftarkan di bawah ini. Untuk kenyamanan tahap pengembangan (development), fitur ini dapat dimatikan sementara.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Daftar IP Diizinkan (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={formData.allowed_ips.join(', ')}
              onChange={(e) =>
                handleChange(
                  'allowed_ips',
                  e.target.value.split(',').map((ip) => ip.trim()).filter(Boolean)
                )
              }
              placeholder="127.0.0.1, 192.168.1.1, 180.252.112.44"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Section 3: Informasi Kantor (Office Info & Side Office) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building className="h-5 w-5 text-[#7A152E]" />
            Informasi Alamat & Kontak Kantor
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kantor Pusat (office_info_input) */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#7A152E]" />
                Kantor Pusat (Head Office Input)
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.office_info_input.address}
                  onChange={(e) => handleNestedChange('office_info_input', 'address', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. Telepon</label>
                  <input
                    type="text"
                    value={formData.office_info_input.phone}
                    onChange={(e) => handleNestedChange('office_info_input', 'phone', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. Fax</label>
                  <input
                    type="text"
                    value={formData.office_info_input.fax}
                    onChange={(e) => handleNestedChange('office_info_input', 'fax', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Kantor Lapangan / Pekanbaru (side_office_input) */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#75B36A]" />
                Kantor Lapangan (Side Office Input)
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.side_office_input.address}
                  onChange={(e) => handleNestedChange('side_office_input', 'address', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. Telepon Hotel & Mall</label>
                  <input
                    type="text"
                    value={formData.side_office_input.phone}
                    onChange={(e) => handleNestedChange('side_office_input', 'phone', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={formData.side_office_input.email}
                    onChange={(e) => handleNestedChange('side_office_input', 'email', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Auto Send Email Notification */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="h-5 w-5 text-amber-600" />
            Integrasi Notifikasi Email Otomatis (auto_send_email)
          </h3>

          <p className="text-xs text-slate-500">
            Tentukan alamat email penerima notifikasi saat ada pengunjung website yang mengirim pesan kontak atau melamar pekerjaan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                send_contact_us (Email Penerima Form Kontak)
              </label>
              <input
                type="email"
                value={formData.auto_send_email.send_contact_us}
                onChange={(e) => handleNestedChange('auto_send_email', 'send_contact_us', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                send_career_application_to (Email Penerima Lamaran Karir)
              </label>
              <input
                type="email"
                value={formData.auto_send_email.send_career_application_to}
                onChange={(e) => handleNestedChange('auto_send_email', 'send_career_application_to', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" variant="primary" size="lg" icon={<Save className="h-4 w-4" />}>
            Simpan Seluruh Konfigurasi
          </Button>
        </div>
      </form>

      {/* Image Picker Modals for Logos */}
      <ImagePickerModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        title="Pilih Logo Header Website"
        onSelectImage={(url) => handleChange('logo', url)}
      />

      <ImagePickerModal
        isOpen={isFooterLogoModalOpen}
        onClose={() => setIsFooterLogoModalOpen(false)}
        title="Pilih Logo Footer Website"
        onSelectImage={(url) => handleChange('footer_logo', url)}
      />
    </div>
  );
};
