import React, { useState, useEffect } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Menu, X, ArrowRight } from 'lucide-react';

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

  // Filter out Home and Contact Us from center navigation links
  // (Logo serves as Home anchor, and the pill CTA on the right is Contact Us)
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/70 py-3.5'
          : 'bg-white py-5 border-b border-stone-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo (Acts as Home) */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 group focus:outline-hidden"
          title="PT Halla Mohana - Beranda"
          aria-label="PT Halla Mohana - Beranda"
        >
          <div className="flex h-11 sm:h-12 w-auto items-center">
            <img
              src={generalConfig.logo}
              alt="PT Halla Mohana Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>
        </a>

        {/* Center: Main Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {desktopNavItems.map((page) => {
            const isActive = currentPath.startsWith(page.navigation);

            return (
              <a
                key={page.id}
                href={page.navigation}
                onClick={(e) => handleLinkClick(e, page.navigation)}
                className={`text-sm tracking-normal transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#8B1E24] font-bold'
                    : 'text-stone-700 hover:text-[#8B1E24] font-semibold'
                }`}
              >
                {page.title}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8B1E24] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Pill CTA Button (Hubungi Kami) - Clean, No CMS toggles */}
        <div className="hidden sm:flex items-center">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="inline-flex items-center gap-2 rounded-full bg-[#8B1E24] hover:bg-[#72181D] active:bg-[#5C1317] text-white px-5 py-2.5 text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Hubungi Kami</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Off-canvas Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
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
                  className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    currentPath === '/'
                      ? 'bg-[#8B1E24]/10 text-[#8B1E24]'
                      : 'text-stone-800 hover:bg-stone-50 hover:text-[#8B1E24]'
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
                          ? 'bg-[#8B1E24]/10 text-[#8B1E24]'
                          : 'text-stone-800 hover:bg-stone-50 hover:text-[#8B1E24]'
                      }`}
                    >
                      {page.title}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 space-y-3">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#8B1E24] hover:bg-[#72181D] text-white py-3 text-xs font-bold tracking-wide shadow-sm"
              >
                <span>Hubungi Kami</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-[11px] text-center text-stone-400">
                Gedung TMT 1, Jakarta & Jl. Riau, Pekanbaru
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
