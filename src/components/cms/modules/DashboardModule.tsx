import React from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import {
  Sliders,
  Newspaper,
  Building2,
  Mail,
  Images,
  Briefcase,
  Users,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface DashboardModuleProps {
  onNavigateTab: (tabId: string) => void;
  onOpenPublicSite: () => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  onNavigateTab,
  onOpenPublicSite,
}) => {
  const {
    generalConfig,
    banners,
    newsList,
    projects,
    contactInquiries,
    gallery,
    careers,
    users,
    activityLogs,
    updateGeneralConfig,
  } = useCMSData();

  const unreadInquiries = contactInquiries.filter((c) => !c.isRead).length;

  const stats = [
    {
      title: 'Hero Banners',
      count: banners.filter((b) => b.visibility).length,
      total: banners.length,
      icon: <Sliders className="h-6 w-6 text-[#7A152E]" />,
      bg: 'bg-rose-50',
      tab: 'banner',
    },
    {
      title: 'Artikel Berita',
      count: newsList.filter((n) => n.visibility).length,
      total: newsList.length,
      icon: <Newspaper className="h-6 w-6 text-sky-600" />,
      bg: 'bg-sky-50',
      tab: 'news',
    },
    {
      title: 'Portofolio Proyek',
      count: projects.filter((p) => p.visibility).length,
      total: projects.length,
      icon: <Building2 className="h-6 w-6 text-[#75B36A]" />,
      bg: 'bg-emerald-50',
      tab: 'projects',
    },
    {
      title: 'Pesan Masuk',
      count: unreadInquiries,
      total: contactInquiries.length,
      badge: unreadInquiries > 0 ? `${unreadInquiries} Baru` : 'Semua Terbaca',
      icon: <Mail className="h-6 w-6 text-amber-600" />,
      bg: 'bg-amber-50',
      tab: 'contact',
    },
    {
      title: 'Foto Galeri',
      count: gallery.filter((g) => g.visibility).length,
      total: gallery.length,
      icon: <Images className="h-6 w-6 text-purple-600" />,
      bg: 'bg-purple-50',
      tab: 'gallery',
    },
    {
      title: 'Lowongan Karir',
      count: careers.filter((c) => c.visibility).length,
      total: careers.length,
      icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
      tab: 'career',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#1E2433] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#7A152E]/20 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 h-64 w-64 rounded-full bg-[#75B36A]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-xs text-rose-200 mb-3 border border-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-[#75B36A]" />
              PT Halla Mohana Corporate Management System
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang di Admin Console
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Kelola seluruh konten website korporat, katalog proyek perhotelan & mall, rilis berita, galeri aset, serta formulir inquiry secara terpusat dan aman.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="white"
              size="md"
              icon={<ExternalLink className="h-4 w-4 text-[#7A152E]" />}
              onClick={onOpenPublicSite}
            >
              Lihat Website Publik
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Website Publik</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${generalConfig.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-bold text-slate-900 text-sm">
                {generalConfig.status === 'active' ? 'Online / Aktif' : 'Maintenance Mode'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              updateGeneralConfig({
                status: generalConfig.status === 'active' ? 'maintenance' : 'active',
              })
            }
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ubah
          </button>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Keamanan IP Login</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${generalConfig.check_ip_login ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              <span className="font-bold text-slate-900 text-sm">
                {generalConfig.check_ip_login ? 'Aktif (Whitelist On)' : 'Nonaktif (Dev Mode)'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateGeneralConfig({ check_ip_login: !generalConfig.check_ip_login })}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Toggle
          </button>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengguna Terdaftar</p>
            <p className="mt-1 font-bold text-slate-900 text-sm">{users.length} Akun Aktif</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('users')}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Kelola
          </button>
        </div>
      </div>

      {/* Module Stats Cards */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-4">Ringkasan Modul Konten</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div
              key={s.title}
              onClick={() => onNavigateTab(s.tab)}
              className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all hover:border-[#7A152E] hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`mb-3 inline-flex rounded-xl ${s.bg} p-2.5 transition-transform group-hover:scale-110`}>
                {s.icon}
              </div>
              <h4 className="text-xs font-medium text-slate-500">{s.title}</h4>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">{s.count}</span>
                <span className="text-xs text-slate-400">/ {s.total}</span>
              </div>
              {s.badge && (
                <div className="mt-2">
                  <Badge variant="warning" size="sm">
                    {s.badge}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Recent Activity & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#7A152E]" />
              <h3 className="font-bold text-slate-900 text-base">Riwayat Aktivitas Terakhir</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('users')}
              className="text-xs font-semibold text-[#7A152E] hover:underline"
            >
              Lihat Detail Audit Log →
            </button>
          </div>

          <div className="space-y-3.5">
            {activityLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-xs">
                    {log.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {log.userName}{' '}
                      <span className="font-normal text-slate-600">
                        melakukan aksi <strong className="text-[#7A152E]">{log.action}</strong> pada{' '}
                        {log.target}
                      </span>
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{log.timestamp}</span>
                      <span>•</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Config Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
          <h3 className="font-bold text-slate-900 text-base">Informasi Kontak Kantor</h3>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="font-bold text-slate-900 flex items-center gap-1.5 text-xs mb-1">
                <Building2 className="h-4 w-4 text-[#7A152E]" />
                Kantor Pusat (Jakarta)
              </p>
              <p className="text-slate-600 leading-relaxed">{generalConfig.office_info_input.address}</p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-slate-500">
                Tel: {generalConfig.office_info_input.phone}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="font-bold text-slate-900 flex items-center gap-1.5 text-xs mb-1">
                <Building2 className="h-4 w-4 text-[#75B36A]" />
                Kantor Operasional (Pekanbaru)
              </p>
              <p className="text-slate-600 leading-relaxed">{generalConfig.side_office_input.address}</p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-slate-500">
                {generalConfig.side_office_input.phone}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => onNavigateTab('general_config')}
              >
                Ubah Konfigurasi Kantor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
