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
    <div id="contact" className="bg-white text-left">
      {/* 1. Interactive Dual-Location Map Showcase */}
      <section className="py-20 sm:py-28 border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
                Alamat Representatif Resmi
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#141414] tracking-tight">
                Lokasi Kantor &amp; Peta Interaktif
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed pt-1">
                Kunjungi kantor pusat kami di Jakarta atau kantor operasional properti terintegrasi di Pekanbaru. Pilih tab di bawah untuk melihat rute dan titik koordinat Google Maps.
              </p>
            </div>

            {/* Office Tab Switcher */}
            <div className="inline-flex border border-[#E5E5E5] rounded-md p-1 bg-white shrink-0">
              <button
                type="button"
                onClick={() => setActiveOfficeId('jakarta')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeOfficeId === 'jakarta'
                    ? 'bg-[#8B1E24] text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Kantor Pusat (Jakarta)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveOfficeId('pekanbaru')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeOfficeId === 'pekanbaru'
                    ? 'bg-[#8B1E24] text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Kantor Properti (Pekanbaru)</span>
              </button>
            </div>
          </div>

          {/* Map & Office Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Office Information Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-lg border border-[#E5E5E5] bg-[#F7F7F5] p-7 sm:p-8 space-y-6">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#8B1E24] uppercase tracking-wider mb-1">
                    {currentOffice.city}
                  </p>
                  <h3 className="text-xl font-semibold text-[#141414]">
                    {currentOffice.title}
                  </h3>
                  <p className="text-xs text-[#52525B] font-medium mt-0.5">
                    {currentOffice.tag}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-1.5 pt-2 border-t border-[#E5E5E5] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#141414] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#8B1E24]" />
                      Alamat Lengkap
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(currentOffice.address)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#8B1E24] hover:underline transition-colors cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[#52525B] leading-relaxed font-normal bg-white p-3 rounded-md border border-[#E5E5E5]">
                    {currentOffice.address}
                  </p>
                </div>

                {/* Contact numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-md border border-[#E5E5E5] space-y-1">
                    <span className="text-[11px] font-semibold text-neutral-400 block uppercase">Telepon</span>
                    <a
                      href={`tel:${currentOffice.phone.replace(/[^0-9+]/g, '')}`}
                      className="font-medium text-[#141414] hover:text-[#8B1E24] transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#8B1E24] shrink-0" />
                      <span className="truncate">{currentOffice.phone}</span>
                    </a>
                  </div>

                  <div className="bg-white p-3 rounded-md border border-[#E5E5E5] space-y-1">
                    <span className="text-[11px] font-semibold text-neutral-400 block uppercase">Email Resmi</span>
                    <a
                      href={`mailto:${currentOffice.email}`}
                      className="font-semibold text-[#8B1E24] hover:underline flex items-center gap-1.5 truncate"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#8B1E24] shrink-0" />
                      <span className="truncate">{currentOffice.email}</span>
                    </a>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex items-start gap-2.5 bg-white p-3 rounded-md border border-[#E5E5E5] text-xs text-[#52525B]">
                  <Clock className="h-4 w-4 text-[#8B1E24] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#141414] block text-[11px] uppercase">Jam Operasional</span>
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
            <div className="lg:col-span-7 relative min-h-[420px] rounded-lg overflow-hidden border border-[#E5E5E5] bg-stone-100 shadow-2xs">
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

              {/* Top floating location badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="rounded-md bg-white px-3 py-1.5 shadow-sm border border-[#E5E5E5] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8B1E24]" />
                  <span className="text-xs font-semibold text-[#141414]">
                    {currentOffice.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Inquiry Form & Department Directory */}
      <section className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-widest uppercase text-neutral-500 font-medium">
              Korespondensi &amp; Kemitraan
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] tracking-tight">
              Kirimkan Pesan &amp; Formulir Kemitraan
            </h2>
            <p className="text-base text-[#52525B] leading-relaxed pt-1">
              Hubungi tim pengelola untuk peluang penyewaan tenant ritel di Pekanbaru Xchange, paket ballroom &amp; meeting di FOX Hotel Pekanbaru, atau kemitraan bisnis strategis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Department Contacts & Commitment (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-lg border border-[#E5E5E5] bg-white p-6 sm:p-7 space-y-4">
                <h3 className="font-semibold text-[#141414] text-xs uppercase tracking-wider">
                  Direktori Divisi &amp; Kontak Langsung
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-md bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#141414]">
                      <Briefcase className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>Sewa Tenant &amp; Komersial (PX Mall)</span>
                    </div>
                    <p className="text-[#52525B] text-xs">
                      Informasi kavling ritel, atrium event pameran, dan kemitraan tenant.
                    </p>
                    <a
                      href="mailto:leasing@hallamohana.co.id"
                      className="text-[#8B1E24] font-semibold hover:underline block pt-0.5"
                    >
                      leasing@hallamohana.co.id
                    </a>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#141414]">
                      <Building2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>Reservasi MICE &amp; Ballroom (FOX Hotel)</span>
                    </div>
                    <p className="text-[#52525B] text-xs">
                      Pemesanan paket seminar korporat, pernikahan, dan grup akomodasi.
                    </p>
                    <a
                      href="mailto:reservation@hallamohana.co.id"
                      className="text-[#8B1E24] font-semibold hover:underline block pt-0.5"
                    >
                      reservation@hallamohana.co.id
                    </a>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#141414]">
                      <Users2 className="h-3.5 w-3.5 text-[#8B1E24]" />
                      <span>Hubungan Media &amp; Karir Holding</span>
                    </div>
                    <p className="text-[#52525B] text-xs">
                      Siaran pers, rekrutmen profesional, dan korespondensi holding.
                    </p>
                    <a
                      href="mailto:recruitment@hallamohana.co.id"
                      className="text-[#8B1E24] font-semibold hover:underline block pt-0.5"
                    >
                      recruitment@hallamohana.co.id
                    </a>
                  </div>
                </div>
              </div>

              {/* Service SLA Commitment */}
              <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 flex items-start gap-3.5 text-xs text-[#52525B]">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-[#141414] block text-xs">
                    Standar Respon Profesional
                  </span>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Setiap inquiri yang masuk diverifikasi dan ditindaklanjuti oleh representatif resmi PT Halla Mohana dalam waktu maksimal 1x24 jam kerja.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Clean Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-[#E5E5E5] bg-white p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#141414]">
                    Formulir Korespondensi Bisnis
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1">
                    Pesan Anda akan otomatis terarsip di sistem CMS dan diteruskan ke email:{' '}
                    <strong className="text-[#141414]">{generalConfig.auto_send_email.send_contact_us}</strong>
                  </p>
                </div>

                {isSuccess && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Pesan Berhasil Terkirim!</p>
                      <p className="font-normal text-emerald-700 mt-0.5">
                        Terima kasih telah menghubungi PT Halla Mohana. Tim kami akan segera menindaklanjuti kebutuhan Anda.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama dan gelar Anda..."
                        className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Nomor Telepon / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+62 8..."
                        className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@instansi.com"
                        className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Kategori Inquiry
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Subjek Pesan
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Contoh: Proposal Sewa Ruang Komersial Lantai 1..."
                      className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Rincian Pesan *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan detail kebutuhan, estimasi jadwal, dan pertanyaan Anda..."
                      className="w-full rounded-md border border-[#E5E5E5] bg-white px-3.5 py-2.5 text-sm text-[#141414] focus:border-[#8B1E24] focus:outline-hidden"
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
