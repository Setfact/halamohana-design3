import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '30+',
      label: 'Tahun Pengalaman',
      sub: 'Dedikasi operasional properti di Indonesia',
    },
    {
      value: '100K+',
      label: 'm² Luas Ruang Komersial',
      sub: 'Area ritel, hotel & ruang konvensi terintegrasi',
    },
    {
      value: '220+',
      label: 'Kamar & Suite Modern',
      sub: 'Kenyamanan midscale lifestyle perhotelan',
    },
    {
      value: '100%',
      label: 'Standar K3 & Lingkungan',
      sub: 'Kepatuhan sertifikasi green building',
    },
  ];

  return (
    <section className="bg-[#1A1F2C] text-white py-16 sm:py-24 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between space-y-4 border-l-4 border-l-[#A68253]"
            >
              <div>
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2">
                  {s.value}
                </p>
                <p className="font-bold text-base text-stone-100">{s.label}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
