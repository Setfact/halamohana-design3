import React from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Menu, Bell, Shield, Search, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface CMSHeaderProps {
  onToggleSidebar: () => void;
  onOpenPublicSite: () => void;
}

export const CMSHeader: React.FC<CMSHeaderProps> = ({
  onToggleSidebar,
  onOpenPublicSite,
}) => {
  const { generalConfig, currentUser, contactInquiries } = useCMSData();
  const unreadCount = contactInquiries.filter((c) => !c.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          title="Buka Navigasi"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Badge
            variant={generalConfig.status === 'active' ? 'success' : 'warning'}
            size="sm"
          >
            {generalConfig.status === 'active' ? '● Situs Online' : '▲ Maintenance'}
          </Badge>
          {generalConfig.check_ip_login && (
            <Badge variant="primary" size="sm">
              <Shield className="h-3 w-3 inline mr-1" /> IP Whitelist Aktif
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenPublicSite}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5 text-[#A68253]" />
          Website Publik
        </button>

        <div className="relative">
          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Pemberitahuan Pesan"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#7A152E]" />
            )}
          </button>
        </div>

        <div className="h-5 w-[1px] bg-slate-200 mx-1" />

        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500">{currentUser.roleName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
