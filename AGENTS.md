\# AGENTS.md — Standar Desain \& Arsitektur UI PT Halla Mohana



\## 1. Filosofi Visual (Luxury Hospitality \& Architectural Corporate)

Website ini merepresentasikan \*\*PT Halla Mohana\*\* (anak usaha PT Mahadana Dasha Utama / MahaDasha \& PT Tiara Marga Trakindo / TMT Group) di bidang \*hospitality\* dan \*commercial retail property\*.

Gaya visual wajib terasa tenang, arsitektural, editorial, dan berwibawa—\*\*bukan\*\* seperti landing page startup SaaS atau template buatan AI.



\## 2. ATURAN KERAS ANTI-AI SLOP (DILARANG KERAS)

Setiap komponen atau halaman baru \*\*WAJIB\*\* bebas dari pola-pola berikut:

\- \*\*DILARANG memakai Pill Badge / Eyebrow Badge di atas judul:\*\* Jangan membuat kapsul bulat kecil (`rounded-full`) berisi teks uppercase seperti `✨ PROFIL KORPORAT`, `• CORPORATE OVERVIEW`, `PILAR 1`, `HIGHLIGHT UTAMA`, atau `MISI #01`. Jika butuh penanda kategori, gunakan teks biasa ukuran `12px` (`tracking-widest uppercase text-neutral-500`) tanpa latar belakang, tanpa border, dan tanpa ikon.

\- \*\*DILARANG memakai ikon Sparkles (`✨`), roket, atau ikon dekoratif klise\*\* dari Lucide/Heroicons pada heading, badge, atau kartu non-interaktif.

\- \*\*DILARANG menumpuk label di dalam kartu:\*\* Maksimal hanya boleh ada \*\*1 penanda kategori\*\* per kartu. Jangan pernah menggabungkan badge solid + teks uppercase bersebelahan di atas judul kartu.

\- \*\*DILARANG membuat "Bento/Stat Strip" klise ala SaaS:\*\* Hindari deretan 4 kotak angka metrik besar dengan sub-label uppercase di bawahnya (`2013 | 225 | 2 | 100%`) kecuali diminta secara eksplisit.

\- \*\*DILARANG memakai efek AI generik:\*\* Tanpa mesh gradient ungu/biru/pink, tanpa glassmorphism berlebihan (`backdrop-blur`), tanpa drop-shadow tebal berlapis, tanpa animasi memantul (`animate-bounce` / `animate-spin` dekoratif).

\- \*\*DILARANG menduplikasi teks/heading:\*\* Pastikan setiap judul hanya dirender satu kali dan tidak mengulang terjemahan bahasa Inggris miring di bawah teks bahasa Indonesia.



\## 3. Sistem Warna \& Tipografi

\- \*\*Palet Warna Ketat:\*\*

&#x20; - Latar Utama: `#FFFFFF` dan `#F7F7F5` (warm off-white, bergantian antar-section agar halaman memiliki kedalaman dan tidak flat).

&#x20; - Teks Utama: `#141414` (charcoal gelap) dan `#52525B` (abu-abu netral untuk paragraf).

&#x20; - Aksen Korporat Tunggal: `#8B1E24` (Maroon Halla Mohana) — gunakan hemat hanya untuk garis aksen `1px-2px`, teks tautan aktif, dan tombol CTA utama.

&#x20; - Garis Pemisah: `1px solid #E5E5E5` (hairline border).

\- \*\*Tipografi \& Alignment:\*\*

&#x20; - Gunakan rata kiri (`text-left`) untuk semua paragraf dan judul editorial (hindari rata tengah untuk paragraf panjang).

&#x20; - Gunakan kontras ukuran font yang tegas: `H1` (`text-4xl md:text-5xl font-semibold tracking-tight`), `H2` (`text-2xl md:text-3xl font-semibold`), `Body` (`text-base leading-relaxed max-w-2xl`).



\## 4. Sumber Kebenaran Data (Single Source of Truth)

\- \*\*Tahun Berdiri:\*\* 2013 (Bukan 1989).

\- \*\*Struktur Induk:\*\* PT Tiara Marga Trakindo (TMT Group) menaungi 8 entitas:

&#x20; - Baris 1: `PT Trakindo Utama`, `PT Mahadana Dasha Utama`, `PT ABM Investama Tbk.`, `PT Chandra Sakti Utama Leasing`, `PT Radana Bhaskara Finance Tbk.`

&#x20; - Baris 2 (Cabang Kanan): `PT Halla Mohana`, `PT Pastika Nirmala`, `PT Karya Kharisma Mandiri`.

\- \*\*Portofolio Proyek (Hanya 2 Aset di Jl. Riau No. 147, Pekanbaru):\*\*

&#x20; 1. \*\*FOX Harris Hotel Pekanbaru\*\* (225 kamar \& suite, indoor rooftop sky pool tertinggi di Pekanbaru, MICE Ballroom, WTF Restaurant).

&#x20; 2. \*\*Pekanbaru Xchange (PX)\*\* (Lifestyle \& entertainment mall terintegrasi, Cinema XXI, Alfresco Dining).

\- \*\*Gedung TMT 1 (Cilandak, Jakarta Selatan):\*\* Hanya dicantumkan sebagai \*\*Head Office\*\*, bukan proyek properti.

