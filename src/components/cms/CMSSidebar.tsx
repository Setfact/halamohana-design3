import React from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import {
  LayoutDashboard,
  Settings,
  Users,
  Menu as MenuIcon,
  Image as ImageIcon,
  Sliders,
  Newspaper,
  Building2,
  FolderGit2,
  Mail,
  Images,
  Briefcase,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react';

interface CMSSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPublicSite: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const CMSSidebar: React.FC<CMSSidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenPublicSite,
  isOpen,
  onCloseMobile,
}) => {
  const { generalConfig, currentUser, logoutUser, contactInquiries } = useCMSData();

  const unreadCount = contactInquiries.filter((c) => !c.isRead).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'general_config', label: 'General Config', icon: <Settings className="h-4 w-4" /> },
    { id: 'users', label: 'User & Roles', icon: <Users className="h-4 w-4" /> },
    { id: 'pages', label: 'Page Navigation', icon: <MenuIcon className="h-4 w-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'banner', label: 'Banner & Slider', icon: <Sliders className="h-4 w-4" /> },
    { id: 'news', label: 'News & Release', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'corporate_info', label: 'Corporate Info', icon: <Building2 className="h-4 w-4" /> },
    { id: 'projects', label: 'Manage Project', icon: <FolderGit2 className="h-4 w-4" /> },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: <Mail className="h-4 w-4" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'gallery', label: 'Manage Gallery', icon: <Images className="h-4 w-4" /> },
    { id: 'career', label: 'Manage Career', icon: <Briefcase className="h-4 w-4" /> },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-[#1A1F2C] text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-md">
              <img
                src={generalConfig.logo}
                alt="Halla Mohana Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-base leading-none tracking-tight">
                HALLA MOHANA
              </h1>
              <p className="mt-1 text-[11px] font-semibold text-[#A68253] uppercase tracking-wider">
                Content Admin Console
              </p>
            </div>
          </div>
        </div>

        {/* Member of MahaDasha / TMT Badge */}
        <div className="px-6 py-2.5 bg-slate-900/50 border-b border-slate-800/50 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Member of MahaDasha</span>
          <span className="rounded bg-emerald-950/80 text-[#75B36A] px-2 py-0.5 font-bold border border-emerald-900/40">
            TMT Group
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#7A152E] text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-white text-[#7A152E]'
                        : 'bg-[#7A152E] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Public Site Quick Link & Profile Footer */}
        <div className="border-t border-slate-800/80 p-4 space-y-3">
          <button
            type="button"
            onClick={onOpenPublicSite}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-[#A68253]" />
            Buka Website Publik (/)
          </button>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-700"
              />
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={logoutUser}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
              title="Keluar dari CMS"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
