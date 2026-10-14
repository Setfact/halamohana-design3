import React, { useState, useEffect } from 'react';
import { CMSDataProvider, useCMSData } from '@/context/CMSDataContext';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { NewsPage } from '@/pages/NewsPage';
import { CareerPage } from '@/pages/CareerPage';
import { ContactPage } from '@/pages/ContactPage';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { CMSLogin } from '@/components/cms/CMSLogin';
import { Toaster } from 'sonner';

function AppContent() {
  const { isAuthenticated, generalConfig } = useCMSData();

  // Helper to normalize path and alias routes
  const normalizePath = (raw: string): string => {
    let p = raw.toLowerCase().trim();
    if (p.startsWith('#')) {
      p = '/' + p.replace(/^#/, '');
    }
    if (!p.startsWith('/')) {
      p = '/' + p;
    }

    if (p.includes('/admin') || p.includes('/cms')) return '/admin';
    if (p.includes('/about') || p.includes('/corporate-info') || p.includes('/profil')) return '/about';
    if (p.includes('/projects') || p.includes('/project') || p.includes('/properti') || p.includes('/portofolio')) return '/projects';
    if (p.includes('/gallery') || p.includes('/galeri') || p.includes('/dokumentasi')) return '/gallery';
    if (p.includes('/news') || p.includes('/berita') || p.includes('/press')) return '/news';
    if (p.includes('/career') || p.includes('/karir') || p.includes('/lowongan')) return '/career';
    if (p.includes('/contact') || p.includes('/kontak') || p.includes('/hubungi')) return '/contact';

    return '/';
  };

  const getInitialPath = (): string => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return normalizePath(hash && hash.length > 1 ? hash : path);
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Navigate function that updates browser URL without full reload (MPA-like navigation)
  const navigate = (path: string) => {
    const target = normalizePath(path);

    try {
      window.history.pushState({}, '', target);
    } catch {
      window.location.hash = target;
    }

    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title per page
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'PT Halla Mohana | Hospitality & Property Development (TMT Group)',
      '/about': 'Tentang Kami & Tata Kelola | PT Halla Mohana',
      '/projects': 'Portofolio Properti Komersial | PT Halla Mohana',
      '/gallery': 'Dokumentasi & Galeri Arsitektur | PT Halla Mohana',
      '/news': 'Kabar Terbaru & Siaran Pers | PT Halla Mohana',
      '/career': 'Peluang Karir & Talenta | PT Halla Mohana',
      '/contact': 'Hubungi Kami | PT Halla Mohana',
      '/admin': 'Console CMS Administrator | PT Halla Mohana',
    };
    document.title = titles[currentPath] || 'PT Halla Mohana';
  }, [currentPath]);

  // Maintenance mode handling
  if (currentPath !== '/admin' && generalConfig.status === 'maintenance') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-white text-center font-sans">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
            <img src={generalConfig.logo} alt="Halla Mohana" className="max-h-full max-w-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white">Situs Dalam Pemeliharaan</h1>
          <p className="text-slate-400 text-sm">
            Website PT Halla Mohana saat ini sedang dalam proses pemeliharaan berkala untuk meningkatkan kualitas layanan.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
            >
              Akses Portal Admin Internal (/admin)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render CMS Admin routes
  if (currentPath === '/admin') {
    return (
      <>
        <Toaster position="top-right" richColors />
        {isAuthenticated ? (
          <CMSLayout onOpenPublicSite={() => navigate('/')} />
        ) : (
          <CMSLogin onSuccess={() => navigate('/admin')} onBackToPublic={() => navigate('/')} />
        )}
      </>
    );
  }

  // Render Public Multi-Page Routes
  return (
    <div className="min-h-screen bg-white text-stone-800 font-sans selection:bg-[#7A152E] selection:text-white flex flex-col justify-between">
      <Toaster position="top-right" richColors />

      {/* Discrete Developer Switcher Badge (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-2xl backdrop-blur-md hover:bg-black transition-all hover:scale-105 cursor-pointer"
          title="Beralih ke Console CMS (/admin)"
        >
          <span className="h-2 w-2 rounded-full bg-[#7A152E] animate-pulse" />
          <span>Console CMS (/admin)</span>
        </button>
      </div>

      <PublicNavbar currentPath={currentPath} onNavigate={navigate} />

      <main className="flex-1">
        {currentPath === '/about' ? (
          <AboutPage onNavigate={navigate} />
        ) : currentPath === '/projects' ? (
          <ProjectsPage onNavigate={navigate} />
        ) : currentPath === '/gallery' ? (
          <GalleryPage onNavigate={navigate} />
        ) : currentPath === '/news' ? (
          <NewsPage onNavigate={navigate} />
        ) : currentPath === '/career' ? (
          <CareerPage onNavigate={navigate} />
        ) : currentPath === '/contact' ? (
          <ContactPage onNavigate={navigate} />
        ) : (
          <HomePage onNavigate={navigate} />
        )}
      </main>

      <PublicFooter onNavigate={navigate} />
    </div>
  );
}

export function App() {
  return (
    <CMSDataProvider>
      <AppContent />
    </CMSDataProvider>
  );
}

export default App;
