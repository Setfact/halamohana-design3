import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

interface PublicFooterProps {
  onNavigate?: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { generalConfig, pages } = useCMSData();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  const visiblePages = pages.filter((p) => p.visibility);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#0F1117] text-stone-400 text-xs border-t border-stone-800">
      {/* 4 Proportional Columns Upper Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Kolom 1: Identitas & Logo Afiliasi MahaDasha/TMT Group (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-block group focus:outline-hidden"
              title="PT Halla Mohana - Beranda"
            >
              <img
                src={generalConfig.logo_dark || '/images/logo/logo-dark-bg.png'}
                alt="PT Halla Mohana Logo"
                className="h-12 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </a>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-normal">
              PT Halla Mohana adalah pengembang dan pengelola aset properti komersial serta perhotelan bermutu tinggi, bernaung di bawah PT Mahadana Dasha Utama (MahaDasha) dan konglomerasi Tiara Marga Trakindo (TMT Group).
            </p>

            <div className="flex items-center gap-3 pt-1">
              {generalConfig.footer_logo && (
                <div className="flex h-9 w-auto items-center rounded border border-stone-800 bg-white/95 p-1 shadow-2xs">
                  <img
                    src={generalConfig.footer_logo}
                    alt="Member of MahaDasha - TMT Group"
                    className="h-6 w-auto object-contain"
                  />
                </div>
              )}
              <div className="text-[11px] text-stone-400">
                <span className="font-bold text-white block">Member of MahaDasha</span>
                <span>PT Tiara Marga Trakindo (TMT Group)</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Navigasi Halaman (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest text-[#8B1E24]">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5">
              {visiblePages.map((page) => (
                <li key={page.id}>
                  <a
                    href={page.navigation}
                    onClick={(e) => handleLinkClick(e, page.navigation)}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Alamat Lengkap Head Office Jakarta & Site Office Pekanbaru (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest text-[#8B1E24]">
              Alamat Kantor Resmi
            </h4>
            <div className="space-y-3 text-[11px] text-stone-400 leading-relaxed">
              <div className="space-y-1">
                <p className="text-white font-bold flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[#8B1E24]" />
                  <span>Head Office (Jakarta):</span>
                </p>
                <p className="pl-4">Gedung TMT 1 Lt. 1, Jl. Cilandak KKO No. 1, Jakarta Selatan 12560</p>
                <p className="pl-4 text-stone-300">Tel: (021) 2997 6700</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-stone-800">
                <p className="text-white font-bold flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[#8B1E24]" />
                  <span>Site Office / Projects (Pekanbaru):</span>
                </p>
                <p className="pl-4">Jl. Riau No. 147, Senapelan, Pekanbaru, Riau 28154</p>
                <p className="pl-4 text-stone-300">Phone FOX Hotel: +62 761 741 5999</p>
                <p className="pl-4 text-stone-300">Phone Pekanbaru Xchange: +62 761 741 5000</p>
              </div>

              <div className="pt-1">
                <p className="text-stone-400 pl-4">Email: info@hallamohana.co.id</p>
              </div>
            </div>
          </div>

          {/* Kolom 4: Form Berlangganan Newsletter Minimalis (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest text-[#8B1E24]">
              Warta & Informasi Korporat
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed font-normal">
              Dapatkan pembaruan berkala mengenai perkembangan ruang komersial, agenda MICE, dan siaran pers resmi.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2 pt-1">
              <div className="flex rounded-md overflow-hidden border border-stone-700 bg-stone-900/90 p-1 focus-within:border-[#8B1E24] transition-colors">
                <input
                  type="email"
                  required
                  placeholder="Masukkan alamat email Anda..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="rounded bg-[#8B1E24] hover:bg-[#72181D] px-3.5 text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Berlangganan Newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {newsletterSuccess && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 pl-2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Terima kasih, Anda telah terdaftar dalam warta korporat.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-stone-800 bg-[#0C0F17] py-6 px-4 sm:px-8 text-[11px] text-stone-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PT Halla Mohana. All rights reserved. A Subsidiary of MahaDasha (TMT Group).</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">
              Kebijakan Privasi
            </a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Syarat & Ketentuan
            </a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Good Corporate Governance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
