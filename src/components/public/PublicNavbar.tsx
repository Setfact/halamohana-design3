import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PublicNavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPath = '/',
  onNavigate,
}) => {
  const { generalConfig, pages } = useCMSData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In high-end corporate sites, the Logo on the far-left serves as the Home button.
  // We filter out Home and Contact Us from the middle links to avoid duplicates
  // (the Logo is Home, and the CTA button on the right is Contact Us).
  const desktopNavItems = pages
    .filter((p) => p.visibility)
    .filter((p) => {
      const isHome =
        p.navigation === '/' ||
        p.navigation === '#home' ||
        p.title.toLowerCase() === 'home' ||
        p.title.toLowerCase() === 'beranda';
      const isContact =
        p.navigation === '/contact' ||
        p.navigation === '#contact' ||
        p.title.toLowerCase().includes('contact') ||
        p.title.toLowerCase().includes('hubungi');
      return !isHome && !isContact;
    });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Corporate Affiliation Bar */}
      <div className="bg-[#1E2433] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#75B36A]" />
            <span className="font-semibold text-white">PT Halla Mohana</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">A Subsidiary of MahaDasha (PT Tiara Marga Trakindo)</span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-[#A68253]" />
              Pusat: {generalConfig.office_info_input.phone}
            </span>
            <span>|</span>
            <span>Pekanbaru: +62 761 741 5999</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between">
          {/* Logo - Functions as Home Anchor */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-3 group focus:outline-hidden"
            title="PT Halla Mohana - Kembali ke Beranda"
            aria-label="PT Halla Mohana - Kembali ke Beranda"
          >
            <div className="flex h-12 w-auto items-center">
              <img
                src={generalConfig.logo}
                alt="PT Halla Mohana Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              />
            </div>
          </a>

          {/* Desktop Nav Links - Clean & Well-Spaced (No redundant Home or Contact links) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {desktopNavItems.map((page) => {
              const isActive = currentPath.startsWith(page.navigation);

              return (
                <a
                  key={page.id}
                  href={page.navigation}
                  onClick={(e) => handleLinkClick(e, page.navigation)}
                  className={`text-sm tracking-normal transition-all relative py-1.5 ${
                    isActive
                      ? 'text-[#7A152E] font-bold'
                      : 'text-stone-700 hover:text-[#7A152E] font-semibold'
                  }`}
                >
                  {page.title}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7A152E] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
            >
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-canvas Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="flex items-center"
                >
                  <img
                    src={generalConfig.logo}
                    alt="Halla Mohana"
                    className="h-9 w-auto object-contain"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1">
                {/* Beranda for easy mobile navigation */}
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    currentPath === '/'
                      ? 'bg-[#7A152E]/10 text-[#7A152E]'
                      : 'text-slate-800 hover:bg-stone-50 hover:text-[#7A152E]'
                  }`}
                >
                  Beranda
                </a>

                {desktopNavItems.map((page) => {
                  const isActive = currentPath.startsWith(page.navigation);

                  return (
                    <a
                      key={page.id}
                      href={page.navigation}
                      onClick={(e) => handleLinkClick(e, page.navigation)}
                      className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-[#7A152E]/10 text-[#7A152E]'
                          : 'text-slate-800 hover:bg-stone-50 hover:text-[#7A152E]'
                      }`}
                    >
                      {page.title}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="w-full block"
              >
                <Button variant="primary" size="md" className="w-full">
                  Hubungi Kami
                </Button>
              </a>
              <p className="text-[11px] text-center text-slate-400">
                Gedung TMT 1, Jakarta & Jl. Riau, Pekanbaru
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
