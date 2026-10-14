import React, { useState } from 'react';
import { CMSSidebar } from './CMSSidebar';
import { CMSHeader } from './CMSHeader';
import { DashboardModule } from './modules/DashboardModule';
import { GeneralConfigModule } from './modules/GeneralConfigModule';
import { UserAdminModule } from './modules/UserAdminModule';
import { PageAdminModule } from './modules/PageAdminModule';
import { MediaLibraryModule } from './modules/MediaLibraryModule';
import { BannerModule } from './modules/BannerModule';
import { NewsModule } from './modules/NewsModule';
import { CorporateInfoModule } from './modules/CorporateInfoModule';
import { ManageProjectModule } from './modules/ManageProjectModule';
import { ContactUsModule } from './modules/ContactUsModule';
import { ManageGalleryModule } from './modules/ManageGalleryModule';
import { ManageCareerModule } from './modules/ManageCareerModule';

interface CMSLayoutProps {
  onOpenPublicSite: () => void;
}

export const CMSLayout: React.FC<CMSLayoutProps> = ({ onOpenPublicSite }) => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const renderModule = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardModule
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenPublicSite={onOpenPublicSite}
          />
        );
      case 'general_config':
        return <GeneralConfigModule />;
      case 'users':
        return <UserAdminModule />;
      case 'pages':
        return <PageAdminModule />;
      case 'media':
        return <MediaLibraryModule />;
      case 'banner':
        return <BannerModule />;
      case 'news':
        return <NewsModule />;
      case 'corporate_info':
        return <CorporateInfoModule />;
      case 'projects':
        return <ManageProjectModule />;
      case 'contact':
        return <ContactUsModule />;
      case 'gallery':
        return <ManageGalleryModule />;
      case 'career':
        return <ManageCareerModule />;
      default:
        return (
          <DashboardModule
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenPublicSite={onOpenPublicSite}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">
      <CMSSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenPublicSite={onOpenPublicSite}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <CMSHeader
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenPublicSite={onOpenPublicSite}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 overscroll-contain">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};
