import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Compass,
  ArrowRight,
  ShieldCheck,
  Users2,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ContactSection: React.FC = () => {
  const { generalConfig, addContactInquiry } = useCMSData();

  // Active Office Map State
  const [activeOfficeId, setActiveOfficeId] = useState<'jakarta' | 'pekanbaru'>('jakarta');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Inquiry Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Kemitraan Tenant & Ritel PX Mall');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const offices = [
    {
      id: 'jakarta' as const,
      city: 'Jakarta Selatan',
      title: 'Kantor Pusat (Head Office)',
      tag: 'Gedung TMT 1 (Tiara Marga Trakindo)',
      address:
        generalConfig.office_info_input.address ||
        'Gedung TMT 1, 1st Floor, Jl. Cilandak KKO No. 1, Jakarta 12560, Indonesia',
      phone: generalConfig.office_info_input.phone || '+62 21 2997 6700',
      fax: generalConfig.office_info_input.fax || '+62 21 2997 6708',
      email: 'info@hallamohana.co.id',
      hours: 'Senin – Jumat: 08:30 – 17:30 WIB (Sabtu & Minggu Tutup)',
      mapEmbedUrl:
        'https://maps.google.com/maps?q=Gedung+TMT+1+Cilandak+KKO+Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directGoogleMapsUrl:
        'https://maps.google.com/?q=Gedung+TMT+1+Cilandak+KKO+Jakarta',
    },
    {
      id: 'pekanbaru' as const,
      city: 'Pekanbaru, Riau',
      title: 'Kantor Operasional & Properti (Site Office)',
      tag: 'Kompleks Terpadu FOX Hotel & PX Mall',
      address:
        generalConfig.side_office_input.address ||
        'Jalan Riau No. 147, Senapelan, Kota Pekanbaru, Riau 28154, Indonesia',
      phone:
        generalConfig.side_office_input.phone ||
        'FOX Hotel: +62 761 741 5999 | PX Mall: +62 761 741 5000',
      fax: generalConfig.side_office_input.fax || '+62 761 741 5111',
      email: generalConfig.side_office_input.email || 'info@hallamohana.co.id',
      hours:
        'Resepsionis Hotel: 24 Jam Setiap Hari | PX Mall: 10:00 – 22:00 WIB',
      mapEmbedUrl:
        'https://maps.google.com/maps?q=FOX+Hotel+Pekanbaru+Jl+Riau&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directGoogleMapsUrl:
        'https://maps.google.com/?q=FOX+Hotel+Pekanbaru+Jl+Riau',
    },
  ];

  const currentOffice = offices.find((o) => o.id === activeOfficeId) || offices[0];

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContactInquiry({
      full_name: fullName,
      phone,
      email,
      subject: `[${category}] ${subject || 'Inquiry Baru'}`,
      message,
    });
    setIsSuccess(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setIsSuccess(false), 6000);
  };

  return (
    <div id="contact" className="bg-white">
      {/* 1. Interactive Dual-Location Map Showcase */}
      <section className="py-16 sm:py-24 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Lokasi Kantor &amp; Peta Interaktif
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Kunjungi kantor pusat kami di Jakarta atau kantor operasional properti terintegrasi di Pekanbaru. Pilih tab di bawah untuk melihat rute dan titik koordinat Google Maps.
              </p>
            </div>

            {/* Office Tab Switcher */}
            <div className="inline-flex rounded-xl bg-stone-100 p-1.5 border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveOfficeId('jakarta')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeOfficeId === 'jakarta'
                    ? 'bg-white text-[#7A152E] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Kantor Pusat (Jakarta)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveOfficeId('pekanbaru')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeOfficeId === 'pekanbaru'
                    ? 'bg-white text-[#7A152E] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>Kantor Properti (Pekanbaru)</span>
              </button>
            </div>
          </div>

          {/* Map & Office Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Office Information Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-stone-200 bg-stone-50/70 p-7 sm:p-8 space-y-6">
              <div className="space-y-5">
                <div>
                  <div className="inline-block rounded-md bg-[#7A152E]/10 px-2.5 py-1 text-[11px] font-bold text-[#7A152E] uppercase tracking-wider mb-2">
                    {currentOffice.city}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {currentOffice.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    {currentOffice.tag}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#A68253]" />
                      Alamat Lengkap
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(currentOffice.address)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-[#7A152E] transition-colors cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-stone-600 leading-relaxed font-normal bg-white p-3 rounded-xl border border-stone-200">
                    {currentOffice.address}
                  </p>
                </div>

                {/* Contact numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[11px] font-bold text-stone-400 block uppercase">Telepon</span>
                    <a
                      href={`tel:${currentOffice.phone.replace(/[^0-9+]/g, '')}`}
                      className="font-bold text-stone-800 hover:text-[#7A152E] transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#A68253] shrink-0" />
                      <span className="truncate">{currentOffice.phone}</span>
                    </a>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[11px] font-bold text-stone-400 block uppercase">Email Resmi</span>
                    <a
                      href={`mailto:${currentOffice.email}`}
                      className="font-bold text-[#7A152E] hover:underline flex items-center gap-1.5 truncate"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#A68253] shrink-0" />
                      <span className="truncate">{currentOffice.email}</span>
                    </a>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-600">
                  <Clock className="h-4 w-4 text-[#A68253] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px] uppercase">Jam Operasional</span>
                    <span>{currentOffice.hours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Maps Action */}
              <div className="pt-2">
                <a
                  href={currentOffice.directGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ExternalLink className="h-4 w-4" />}
                    iconPosition="right"
                    className="w-full justify-center"
                  >
                    Buka Petunjuk Arah di Google Maps
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Embedded Google Maps Frame (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[420px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs">
              <iframe
                title={`Peta Lokasi ${currentOffice.title}`}
                src={currentOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />

              {/* Subtle top floating location badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="rounded-xl bg-white/95 px-3.5 py-2 shadow-md border border-stone-200/80 backdrop-blur-xs flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7A152E] animate-pulse" />
                  <span className="text-xs font-bold text-stone-800">
                    {currentOffice.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Inquiry Form & Department Directory */}
      <section className="py-16 sm:py-24 bg-stone-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Kirimkan Pesan &amp; Formulir Kemitraan
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Hubungi tim pengelola untuk peluang penyewaan tenant ritel di Pekanbaru Xchange, paket ballroom &amp; meeting di FOX Hotel Pekanbaru, atau kemitraan bisnis strategis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Department Contacts & Commitment (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-7 space-y-5">
                <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
                  Direktori Divisi &amp; Kontak Langsung
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <Briefcase className="h-3.5 w-3.5 text-[#7A152E]" />
                      <span>Sewa Tenant &amp; Komersial (PX Mall)</span>
                    </div>
                    <p className="text-stone-500 text-[11px]">
                      Informasi kavling ritel, atrium event pameran, dan kemitraan tenant.
                    </p>
                    <a
                      href="mailto:leasing@hallamohana.co.id"
                      className="text-[#7A152E] font-semibold hover:underline block pt-1"
                    >
                      leasing@hallamohana.co.id
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <Building2 className="h-3.5 w-3.5 text-[#A68253]" />
                      <span>Reservasi MICE &amp; Ballroom (FOX Hotel)</span>
                    </div>
                    <p className="text-stone-500 text-[11px]">
                      Pemesanan paket seminar korporat, pernikahan, dan grup akomodasi.
                    </p>
                    <a
                      href="mailto:reservation@hallamohana.co.id"
                      className="text-[#7A152E] font-semibold hover:underline block pt-1"
                    >
                      reservation@hallamohana.co.id
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <Users2 className="h-3.5 w-3.5 text-stone-600" />
                      <span>Hubungan Media &amp; Karir Holding</span>
                    </div>
                    <p className="text-stone-500 text-[11px]">
                      Siaran pers, rekrutmen profesional, dan korespondensi holding.
                    </p>
                    <a
                      href="mailto:recruitment@hallamohana.co.id"
                      className="text-[#7A152E] font-semibold hover:underline block pt-1"
                    >
                      recruitment@hallamohana.co.id
                    </a>
                  </div>
                </div>
              </div>

              {/* Service SLA Commitment */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 flex items-start gap-3.5 text-xs text-stone-600">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">
                    Standar Respon Profesional
                  </span>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Setiap inquiri yang masuk diverifikasi dan ditindaklanjuti oleh representatif resmi PT Halla Mohana dalam waktu maksimal 1x24 jam kerja.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Clean Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-stone-900">
                    Formulir Korespondensi Bisnis
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Pesan Anda akan otomatis terarsip di sistem CMS dan diteruskan ke email:{' '}
                    <strong className="text-stone-700">{generalConfig.auto_send_email.send_contact_us}</strong>
                  </p>
                </div>

                {isSuccess && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
                      <p className="font-normal text-emerald-700 mt-0.5">
                        Terima kasih telah menghubungi PT Halla Mohana. Tim kami akan segera menindaklanjuti kebutuhan Anda.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama dan gelar Anda..."
                        className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nomor Telepon / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+62 8..."
                        className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@instansi.com"
                        className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Kategori Inquiry
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                      >
                        <option value="Kemitraan Tenant & Ritel PX Mall">
                          Kemitraan Tenant Ritel PX Mall
                        </option>
                        <option value="Reservasi MICE & Event FOX Hotel">
                          Reservasi MICE &amp; Ballroom FOX Hotel
                        </option>
                        <option value="Peluang Kemitraan Properti & Investasi">
                          Peluang Kemitraan Properti &amp; Investasi
                        </option>
                        <option value="Pertanyaan Umum & Korporat">
                          Pertanyaan Umum &amp; Korporat
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Subjek Pesan
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Contoh: Proposal Sewa Ruang Komersial Lantai 1..."
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Rincian Pesan *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan detail kebutuhan, estimasi jadwal, dan pertanyaan Anda..."
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-[#7A152E] focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<Send className="h-4 w-4" />}
                      iconPosition="right"
                      className="w-full sm:w-auto"
                    >
                      Kirimkan Pesan Sekarang
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
