import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '2013',
      label: 'Tahun Pendirian Resmi',
      sub: 'Pengembang hospitality & komersial TMT Group',
    },
    {
      value: '2 Aset',
      label: 'Kawasan Terpadu Pekanbaru',
      sub: 'Integrasi hotel bintang 4 & lifestyle mall',
    },
    {
      value: '225',
      label: 'Kamar & Suite Modern',
      sub: 'FOX Harris Hotel dengan indoor rooftop sky pool',
    },
    {
      value: '100%',
      label: 'Standar Kepatuhan GCG',
      sub: 'Tata kelola korporat standar MahaDasha Group',
    },
  ];

  return (
    <section className="bg-[#0F1117] text-white py-16 sm:py-20 border-b border-stone-800 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-stone-800 bg-[#141414] p-6 flex flex-col justify-between space-y-3 border-l-2 border-l-[#8B1E24]"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-1">
                  {s.value}
                </p>
                <p className="font-semibold text-sm text-stone-200">{s.label}</p>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
