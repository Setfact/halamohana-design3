import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Building2, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    <footer className="bg-[#141822] text-slate-400 text-xs">
      {/* Upper Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Corporate Affiliation (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="flex h-12 w-auto items-center rounded-xl bg-white p-1.5 shadow-md"
              >
                <img
                  src={generalConfig.logo}
                  alt="PT Halla Mohana"
                  className="h-9 w-auto object-contain"
                />
              </a>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              PT Halla Mohana adalah perusahaan pengembang dan pengelola properti perhotelan & pusat perbelanjaan terkemuka di Indonesia, bagian dari MahaDasha Group (PT Tiara Marga Trakindo).
            </p>

            <div className="flex items-center gap-3 pt-2">
              {generalConfig.footer_logo && (
                <div className="flex h-10 w-auto items-center rounded-lg bg-white p-1 shadow-2xs">
                  <img
                    src={generalConfig.footer_logo}
                    alt="Footer Sub-brand"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              )}
              <div className="text-[11px] text-slate-400">
                <span className="font-bold text-white block">Member of MahaDasha</span>
                <span>PT Tiara Marga Trakindo (TMT Group)</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Navigasi Halaman</h4>
            <ul className="space-y-2">
              {visiblePages.map((page) => (
                <li key={page.id}>
                  <a
                    href={page.navigation}
                    onClick={(e) => handleLinkClick(e, page.navigation)}
                    className="hover:text-[#A68253] transition-colors inline-block"
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Contact Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Kontak Kantor</h4>
            <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed">
              <p className="text-white font-semibold">Head Office Jakarta:</p>
              <p>Gedung TMT 1 Lt. 1, Cilandak KKO Jakarta 12560</p>
              <p>Tel: {generalConfig.office_info_input.phone}</p>
              <p className="text-white font-semibold pt-2">Site Office Pekanbaru:</p>
              <p>Jl. Riau No. 147, Pekanbaru</p>
              <p>Tel: +62 761 741 5999</p>
            </div>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Warta & Informasi</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dapatkan berita terbaru seputar perkembangan properti komersial dan penawaran korporat.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-900/80">
                <input
                  type="email"
                  required
                  placeholder="Alamat email Anda..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#7A152E] px-4 text-white hover:bg-[#601024] transition-colors flex items-center justify-center font-bold"
                  aria-label="Subscribe Newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {newsletterSuccess && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Terima kasih, Anda telah terdaftar dalam warta korporat.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-slate-800 bg-[#0E121A] py-6 px-4 sm:px-8 text-[11px] text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{generalConfig.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Kebijakan Privasi
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Syarat & Ketentuan
            </a>
            <span>•</span>
            <a
              href="/admin"
              onClick={(e) => handleLinkClick(e, '/admin')}
              className="text-[#A68253] hover:underline"
            >
              CMS Console Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
