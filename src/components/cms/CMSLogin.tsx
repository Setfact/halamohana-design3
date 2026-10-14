import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CMSLoginProps {
  onSuccess: () => void;
  onBackToPublic: () => void;
}

export const CMSLogin: React.FC<CMSLoginProps> = ({ onSuccess, onBackToPublic }) => {
  const { generalConfig, loginUser } = useCMSData();

  const [email, setEmail] = useState('admin@hallamohana.co.id');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // IP Whitelist Check (if enabled)
  const isIpBlocked = generalConfig.check_ip_login && !generalConfig.allowed_ips.includes('127.0.0.1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isIpBlocked) {
      setErrorMsg('Akses ditolak: Alamat IP Anda tidak terdaftar pada Whitelist IP Login.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = loginUser(email, password);
      setIsLoading(false);
      if (ok) {
        onSuccess();
      } else {
        setErrorMsg('Email atau kata sandi tidak valid. Silakan gunakan akun admin resmi.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@hallamohana.co.id');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 px-4 py-12 relative overflow-hidden font-sans">
      {/* Subtle Atmosphere */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#7A152E]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#A68253]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo and Brand */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-lg mb-4 ring-1 ring-white/20">
            <img
              src={generalConfig.logo}
              alt="Halla Mohana"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">PT HALLA MOHANA</h2>
          <p className="mt-1 text-xs font-semibold text-[#A68253] uppercase tracking-wider">
            Content Management System (Admin Console)
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300 border border-slate-700/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2D5A43]" />
            Member of MahaDasha (TMT Group)
          </div>
        </div>

        {/* IP Whitelist Warning if triggered */}
        {isIpBlocked && (
          <div className="mt-6 rounded-2xl border border-rose-900/60 bg-rose-950/50 p-4 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Keamanan IP Login Aktif</p>
              <p className="mt-0.5 text-rose-300/80">
                IP Anda saat ini belum tercantum di whitelist. Anda dapat menonaktifkan fitur ini di menu General Config saat development.
              </p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-6 rounded-xl border border-rose-900/50 bg-rose-950/40 p-3 text-xs text-rose-300 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Resmi
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hallamohana.co.id"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#7A152E] focus:outline-hidden focus:ring-1 focus:ring-[#7A152E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#7A152E] focus:outline-hidden focus:ring-1 focus:ring-[#7A152E]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg"
              isLoading={isLoading}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Masuk ke Console CMS
            </Button>
          </div>
        </form>

        {/* Quick Testing Helper */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 text-xs text-slate-400">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-300">Akun Pengujian Bawaan:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#A68253] font-bold hover:underline"
            >
              Klik Auto-fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-slate-300">Email: admin@hallamohana.co.id</p>
          <p className="font-mono text-[11px] text-slate-300">Password: admin123</p>
        </div>

        {/* Back to public link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBackToPublic}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Kembali ke Website Publik PT Halla Mohana
          </button>
        </div>
      </div>
    </div>
  );
};
