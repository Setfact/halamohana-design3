import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  GeneralConfig,
  UserProfile,
  UserAccount,
  RoleAccount,
  UserActivityLog,
  PageAdminItem,
  MediaFile,
  BannerItem,
  NewsItem,
  CorporateInfoItem,
  ProjectItem,
  ContactInquiry,
  GalleryItem,
  CareerItem,
  CareerApplication,
} from '@/types';

// Initial High-End Authentic Seed Data for PT Halla Mohana
const initialGeneralConfig: GeneralConfig = {
  status: 'active',
  logo: '/images/logo/logo.png',
  footer_logo: '/images/logo/footerlogo.jpg',
  copyright: 'Copyright © 2026 PT Halla Mohana. Member of MahaDasha (TMT Group). All rights reserved.',
  check_ip_login: false,
  allowed_ips: ['127.0.0.1', '::1', '192.168.1.100'],
  office_info_input: {
    address: 'Gedung TMT 1, 1st Floor, Jl. Cilandak KKO No. 1, Jakarta 12560, Indonesia',
    phone: '+62 21 2997 6700',
    fax: '+62 21 2997 6708',
  },
  side_office_input: {
    address: 'Jalan Riau No. 147, Pekanbaru, Riau, Indonesia',
    phone: 'FOX Hotel: +62 761 741 5999 | PX Mall: +62 761 741 5000',
    fax: '+62 761 741 5111',
    email: 'info@hallamohana.co.id',
  },
  auto_send_email: {
    send_contact_us: 'inquiry@hallamohana.co.id',
    send_career_application_to: 'recruitment@hallamohana.co.id',
  },
};

const initialCurrentUser: UserProfile = {
  id: 'usr-1',
  name: 'Calvin Administrator',
  email: 'admin@hallamohana.co.id',
  avatar: 'https://ui-avatars.com/api/?name=Calvin+Admin&background=8B1E24&color=fff&bold=true&size=150',
  roleId: 'role-1',
  roleName: 'Super Administrator',
  phone: '+62 811 2345 6789',
  bio: 'Lead Property & Technology Administrator at PT Halla Mohana.',
};

const initialUsers: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Calvin Administrator',
    email: 'admin@hallamohana.co.id',
    avatar: 'https://ui-avatars.com/api/?name=Calvin+Admin&background=8B1E24&color=fff&bold=true&size=150',
    roleId: 'role-1',
    roleName: 'Super Administrator',
    status: 'active',
    lastLogin: '2026-10-08 21:15',
    createdAt: '2025-01-10',
  },
  {
    id: 'usr-2',
    name: 'Siti Rahmawati',
    email: 'editor@hallamohana.co.id',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Rahmawati&background=2D5A43&color=fff&bold=true&size=150',
    roleId: 'role-2',
    roleName: 'Content Editor',
    status: 'active',
    lastLogin: '2026-10-07 14:20',
    createdAt: '2025-03-12',
  },
  {
    id: 'usr-3',
    name: 'Budi Santoso',
    email: 'hrd@hallamohana.co.id',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=1E2433&color=fff&bold=true&size=150',
    roleId: 'role-3',
    roleName: 'HR Manager',
    status: 'active',
    lastLogin: '2026-10-06 09:40',
    createdAt: '2025-05-18',
  },
];

const initialRoles: RoleAccount[] = [
  {
    id: 'role-1',
    name: 'Super Administrator',
    description: 'Akses penuh ke seluruh konfigurasi sistem, user management, dan publikasi konten.',
    permissions: ['all_access', 'config_write', 'user_write', 'content_write', 'media_write'],
    userCount: 1,
  },
  {
    id: 'role-2',
    name: 'Content Editor',
    description: 'Dapat mengelola artikel berita, galeri, proyek, dan slider beranda.',
    permissions: ['content_write', 'media_write'],
    userCount: 1,
  },
  {
    id: 'role-3',
    name: 'HR Manager',
    description: 'Dapat mengelola informasi lowongan kerja dan mengunduh berkas pelamar.',
    permissions: ['career_write', 'career_view'],
    userCount: 1,
  },
];

const initialLogs: UserActivityLog[] = [
  {
    id: 'log-1',
    userId: 'usr-1',
    userName: 'Calvin Administrator',
    action: 'LOGIN',
    target: 'System Console',
    timestamp: '2026-10-08 21:15:02',
    ip: '127.0.0.1',
  },
  {
    id: 'log-2',
    userId: 'usr-1',
    userName: 'Calvin Administrator',
    action: 'UPDATE_BANNER',
    target: 'Banner #1: FOX Harris Hotel',
    timestamp: '2026-10-08 20:45:11',
    ip: '127.0.0.1',
  },
  {
    id: 'log-3',
    userId: 'usr-2',
    userName: 'Siti Rahmawati',
    action: 'PUBLISH_NEWS',
    target: 'News: Pekanbaru Xchange Rebranding',
    timestamp: '2026-10-07 14:30:22',
    ip: '180.252.112.44',
  },
];

const initialPages: PageAdminItem[] = [
  { id: 'pg-1', no: 1, title: 'Home', navigation: '/', created_time: '2025-01-15', updated: '2026-10-01', visibility: true, order: 1 },
  { id: 'pg-2', no: 2, title: 'Corporate Info', navigation: '/about', created_time: '2025-01-15', updated: '2026-10-01', visibility: true, order: 2 },
  { id: 'pg-3', no: 3, title: 'Our Projects', navigation: '/projects', created_time: '2025-01-15', updated: '2026-10-02', visibility: true, order: 3 },
  { id: 'pg-4', no: 4, title: 'Gallery', navigation: '/gallery', created_time: '2025-01-15', updated: '2026-10-02', visibility: true, order: 4 },
  { id: 'pg-5', no: 5, title: 'News Release', navigation: '/news', created_time: '2025-01-15', updated: '2026-10-03', visibility: true, order: 5 },
  { id: 'pg-6', no: 6, title: 'Career', navigation: '/career', created_time: '2025-01-15', updated: '2026-10-03', visibility: true, order: 6 },
  { id: 'pg-7', no: 7, title: 'Contact Us', navigation: '/contact', created_time: '2025-01-15', updated: '2026-10-04', visibility: true, order: 7 },
];

const initialBanners: BannerItem[] = [
  {
    id: 'bnr-1',
    no: 1,
    title: 'Kawasan Terpadu Jl. Riau No. 147 Pekanbaru',
    subtitle: 'Pengembangan kawasan komersial terintegrasi yang menyatukan perhotelan bintang 4 dengan pusat perbelanjaan gaya hidup modern.',
    shortTitle: 'Kawasan Terpadu',
    ctaText: 'Explore Projects',
    ctaUrl: '/projects',
    imageUrl: '/images/mall/px-facade-integrated.jpg',
    visibility: true,
    order: 1,
    created_time: '2025-01-10',
    updated: '2026-09-28',
  },
  {
    id: 'bnr-2',
    no: 2,
    title: 'FOX Harris Hotel Pekanbaru',
    subtitle: 'Hotel bintang 4 berkonsep modern dengan 225 kamar dan indoor rooftop sky pool tertinggi di Pekanbaru.',
    shortTitle: 'FOX Harris Hotel',
    ctaText: 'Explore Projects',
    ctaUrl: '/projects',
    imageUrl: '/images/hotel/hero-fox-hotel-wide.jpg',
    visibility: true,
    order: 2,
    created_time: '2025-01-15',
    updated: '2026-09-30',
  },
  {
    id: 'bnr-3',
    no: 3,
    title: 'Pekanbaru Xchange (PX)',
    subtitle: 'Pusat perbelanjaan dan rekreasi modern terintegrasi dengan Cinema XXI, koridor alfresco dining, dan ruang komunitas.',
    shortTitle: 'Pekanbaru Xchange',
    ctaText: 'Explore Projects',
    ctaUrl: '/projects',
    imageUrl: '/images/mall/hero-px-mall.jpg',
    visibility: true,
    order: 3,
    created_time: '2025-02-01',
    updated: '2026-10-02',
  },
];

const initialProjects: ProjectItem[] = [
  {
    id: 'prj-1',
    no: 1,
    title: 'FOX Harris Hotel Pekanbaru',
    category: 'Hospitality & Hotel',
    location: 'Jl. Riau No. 147, Senapelan, Pekanbaru, Riau 28154',
    imageUrl: '/images/hotel/hero-fox-hotel-wide.jpg',
    gallery: [
      '/images/hotel/hero-fox-hotel-wide.jpg',
      '/images/hotel/exterior-facade.jpg',
      '/images/hotel/room-suite-bedroom.jpg',
      '/images/hotel/pool-infinity.jpg',
      '/images/hotel/restaurant-wtf-main.jpg',
      '/images/hotel/ballroom-orange-fox.jpg',
      '/images/hotel/gym-fitness.jpg',
    ],
    description: 'Hotel bintang empat berkonsep dinamis, segar, dan modern (sebelumnya beroperasi sebagai Tangram Hotel) yang dikelola bersama jaringan internasional The Ascott Limited / TAUZIA Hotels. Dirancang untuk pelancong bisnis maupun wisatawan urban, dilengkapi 225 kamar & suite modern (12 lantai), kolam renang indoor rooftop sky pool tertinggi di Pekanbaru, restoran Where’s The Food (WTF), gym & spa, serta Grand Ballroom dan 6 ruang pertemuan.',
    specs: [
      { label: 'Kapasitas', value: '225 Kamar & Suite Modern (12 Lantai)' },
      { label: 'Fasilitas Unggulan', value: 'Indoor Rooftop Sky Pool Tertinggi di Pekanbaru' },
      { label: 'Fasilitas MICE', value: 'Grand Ballroom & 6 Ruang Pertemuan' },
      { label: 'Kontak Reservasi', value: '+62 761 741 5999' },
    ],
    create_time: '2025-01-20',
    updated: '2026-09-15',
    visibility: true,
    featured: true,
  },
  {
    id: 'prj-2',
    no: 2,
    title: 'Pekanbaru Xchange (PX)',
    category: 'Shopping Mall & Retail',
    location: 'Jl. Riau No. 147, Senapelan, Pekanbaru, Riau 28154',
    imageUrl: '/images/mall/hero-px-mall.jpg',
    gallery: [
      '/images/mall/hero-px-mall.jpg',
      '/images/mall/cinema-xxi.jpg',
      '/images/mall/atrium-corridor.jpg',
      '/images/mall/alfresco-dining.jpg',
      '/images/mall/plaza-live-event.jpg',
      '/images/mall/px-facade-integrated.jpg',
    ],
    description: 'Pusat perbelanjaan gaya hidup (lifestyle mall) dan destinasi hiburan modern (sebelumnya Sadira Plaza) yang terintegrasi langsung dalam satu kawasan (mixed-use complex) dengan FOX Harris Hotel Pekanbaru. Menghadirkan bioskop Cinema XXI, ritel fashion dan kuliner ternama, koridor Alfresco Dining di Ground Floor, serta plaza terbuka untuk panggung musik dan komunitas.',
    specs: [
      { label: 'Konsep Kawasan', value: 'Integrated Lifestyle, Entertainment & Alfresco Dining' },
      { label: 'Anchor Tenants', value: 'Cinema XXI, Ritel Fashion, Kuliner & Kafe' },
      { label: 'Konektivitas', value: 'Terhubung Langsung dengan FOX Harris Hotel Pekanbaru' },
      { label: 'Kontak Leasing & Info', value: '+62 761 741 5000' },
    ],
    create_time: '2025-01-22',
    updated: '2026-09-18',
    visibility: true,
    featured: true,
  },
];

const initialCorporateInfo: CorporateInfoItem[] = [
  {
    id: 'ci-1',
    no: 1,
    date: '2026-01-15',
    title: 'Halla Mohana Overview',
    url: 'halla-mohana-overview',
    content: `
      <h3>Pengembangan Properti Komersial & Hospitalitas Terpadu</h3>
      <p><strong>Didirikan pada tahun 2013</strong>, PT Halla Mohana adalah perusahaan pengembang dan pengelola properti perhotelan (<em>hospitality</em>) dan pusat perbelanjaan (<em>mall</em>) yang bernaung di bawah <strong>PT Mahadana Dasha Utama (MahaDasha)</strong> dan bagian dari konglomerasi terkemuka <strong>PT Tiara Marga Trakindo (TMT Group)</strong>.</p>
      <p>Fokus utama perusahaan adalah mengembangkan fasilitas modern dengan konsep segar (<em>fresh concepts</em>) yang memenuhi tuntutan pelancong bisnis (<em>business travelers</em>) dan kebutuhan gaya hidup urban (<em>urban lifestyle requirements</em>).</p>
      <p>Portofolio unggulan Halla Mohana berada di kawasan terpadu Jl. Riau No. 147 Pekanbaru, yang mencakup <strong>FOX Hotel Pekanbaru</strong> (225 kamar dengan indoor rooftop sky pool tertinggi di Pekanbaru) dan <strong>Pekanbaru Xchange (PX)</strong>.</p>
    `,
    create_time: '2025-01-15',
    updated: '2026-09-01',
    visibility: true,
  },
  {
    id: 'ci-2',
    no: 2,
    date: '2026-01-15',
    title: 'Vision & Mission',
    url: 'vision-and-mission',
    content: `
      <h3>Visi Perusahaan (Vision)</h3>
      <p><em>"Menghadirkan produk dan layanan inovatif di bisnis perhotelan untuk menciptakan imbal hasil positif bagi pemegang saham."</em></p>
      <p><em>("Deliver innovative products and services, in hospitality business to create a positive return for shareholders.")</em></p>
      <h3>Misi Perusahaan (Mission)</h3>
      <ol>
        <li>Terus menciptakan peluang kerja yang bermakna dan menantang bagi sebanyak mungkin masyarakat Indonesia (<em>To continuously create meaningful and challenging job opportunities for as many Indonesians as possible</em>).</li>
        <li>Memastikan pertumbuhan yang berkelanjutan dan menguntungkan guna memaksimalkan nilai pemegang saham (<em>To ensure sustainable and profitable growth that maximizes shareholder value</em>).</li>
        <li>Menyediakan solusi bernilai tambah yang mengoptimalkan kepuasan pelanggan (<em>To provide value-added solutions that optimize customer satisfaction</em>).</li>
        <li>Terlibat secara aktif di dalam masyarakat sebagai warga korporat yang baik (<em>To actively engage in communities as a good corporate citizen</em>).</li>
      </ol>
    `,
    create_time: '2025-01-15',
    updated: '2026-09-01',
    visibility: true,
  },
  {
    id: 'ci-3',
    no: 3,
    date: '2026-01-20',
    title: 'Core Values & Leadership Traits',
    url: 'core-values-leadership-traits',
    content: `
      <h3>4 Core Values (Standar Grup TMT & MahaDasha)</h3>
      <ul>
        <li><strong>Integrity:</strong> Kejujuran, etika bisnis, dan ketepatan janji dalam setiap interaksi kemitraan.</li>
        <li><strong>Continuous Development:</strong> Senantiasa belajar dan berinovasi meningkatkan mutu fasilitas properti.</li>
        <li><strong>Excellence:</strong> Memberikan standar layanan hospitality bintang 4 dan manajemen ritel terbaik.</li>
        <li><strong>Compassion:</strong> Peduli terhadap keselamatan kerja (K3), kesejahteraan insan korporat, dan lingkungan.</li>
      </ul>
      <h3>4 Leadership Traits</h3>
      <p>Competent, Open-minded, Reliable, and Courageous.</p>
    `,
    create_time: '2025-01-20',
    updated: '2026-08-25',
    visibility: true,
  },
  {
    id: 'ci-4',
    no: 4,
    date: '2026-01-20',
    title: 'Code of Business Conduct & Ethics',
    url: 'code-of-conduct-ethics',
    content: `
      <h3>Tata Kelola Perusahaan yang Baik (GCG)</h3>
      <p>PT Halla Mohana menjunjung tinggi standar kepatuhan etika bisnis, transparansi, akuntabilitas, responsibilitas, dan independensi sesuai ketetapan MahaDasha & Tiara Marga Trakindo (TMT Group).</p>
    `,
    create_time: '2025-01-20',
    updated: '2026-08-25',
    visibility: true,
  },
];

const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    no: 1,
    title: 'Instalasi Panel Surya Rooftop Sebagai Langkah Konkret Dekarbonisasi Kawasan',
    url: 'instalasi-panel-surya-rooftop-dekarbonisasi',
    date: '2026-01-15',
    category: 'News',
    imageUrl: '/images/hotel/exterior-drone.jpg',
    description: `
      <p><strong>Pekanbaru, Riau</strong> — PT Halla Mohana bersama PT Mahadana Dasha Utama (MahaDasha) dan PT Tiara Marga Trakindo (TMT Group) secara resmi mengoperasikan sistem pembangkit listrik tenaga surya (PLTS) atap di kawasan terpadu Jl. Riau No. 147 Pekanbaru. Inisiatif ini merupakan bagian dari peta jalan keberlanjutan korporat untuk mereduksi emisi karbon hingga 25% dan mendukung operasional ramah lingkungan di FOX Harris Hotel dan Pekanbaru Xchange (PX).</p>
      <p>Pemasangan modul fotovoltaik berkapasitas tinggi di rooftop bangunan hotel dan mall diharapkan dapat menghasilkan energi bersih hingga 320.000 kWh per tahun, sekaligus mengoptimalkan efisiensi energi kawasan secara terukur.</p>
      <p>Penerapan sistem tenaga surya ini menegaskan komitmen PT Halla Mohana terhadap prinsip Environmental, Social, and Governance (ESG) dalam industri perhotelan dan properti ritel komersial nasional.</p>
    `,
    create_time: '2026-01-15 09:00',
    updated: '2026-01-15 10:30',
    visibility: true,
    featured: true,
  },
  {
    id: 'news-2',
    no: 2,
    title: 'Pekanbaru Xchange Memperkuat Posisi Sebagai Pusat Gaya Hidup & Komunitas Terdepan di Riau',
    url: 'pekanbaru-xchange-pusat-gaya-hidup-terdepan',
    date: '2026-09-15',
    category: 'Press Release',
    imageUrl: '/images/mall/plaza-live-event.jpg',
    description: `
      <p><strong>Pekanbaru, Riau</strong> — PT Halla Mohana secara konsisten melanjutkan penguatan konsep Pekanbaru Xchange (PX) sebagai episentrum rekreasi, belanja, dan pertunjukan kreatif di Pekanbaru. Dengan penambahan ragam tenant kuliner alfresco serta agenda hiburan berkala, PX menjadi destinasi pilihan utama keluarga dan kalangan muda profesional.</p>
      <p>Direktur Properti PT Halla Mohana menyatakan bahwa integrasi langsung dengan FOX Harris Hotel memberikan keunggulan sinergis yang signifikan bagi pengunjung luar kota maupun masyarakat setempat.</p>
    `,
    create_time: '2026-09-15 10:00',
    updated: '2026-09-15 11:30',
    visibility: true,
    featured: true,
  },
  {
    id: 'news-3',
    no: 3,
    title: 'FOX Harris Hotel Pekanbaru Raih Penghargaan Hospitality Excellence Award 2026',
    url: 'fox-harris-hotel-raih-penghargaan-hospitality',
    date: '2026-08-20',
    category: 'News',
    imageUrl: '/images/hotel/pool-infinity.jpg',
    description: `
      <p><strong>Jakarta</strong> — Berkat komitmen konsisten terhadap pelayanan prima, kebersihan, dan inovasi pengalaman tamu, FOX Harris Hotel Pekanbaru yang dikelola PT Halla Mohana berhasil meraih predikat Best City Business Hotel dalam ajang Tourism & Hospitality Awards tahun ini.</p>
      <p>Kehadiran rooftop infinity pool yang ikonis dan pelayanan ramah khas Nusantara dinilai menjadi diferensiasi kuat di pasar perhotelan Sumatra.</p>
    `,
    create_time: '2026-08-20 14:00',
    updated: '2026-08-20 14:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-4',
    no: 4,
    title: 'Sinergi MahaDasha dan Jaringan Perhotelan Terkemuka Perkuat Standar Layanan Unggul',
    url: 'sinergi-mahadasha-jaringan-perhotelan-layanan-unggul',
    date: '2025-11-12',
    category: 'Press Release',
    imageUrl: '/images/hotel/hero-corporate-wide.jpg',
    description: `
      <p><strong>Jakarta</strong> — PT Mahadana Dasha Utama (MahaDasha) melalui anak usahanya PT Halla Mohana terus memperkuat kemitraan strategis dengan operator perhotelan global The Ascott Limited untuk mempertahankan standar pelayanan bintang 4 terbaik di FOX Harris Hotel Pekanbaru.</p>
      <p>Langkah ini mencakup peningkatan fasilitas kamar, adopsi teknologi reservasi cerdas, dan pelatihan berkelanjutan bagi seluruh staf pelayanan.</p>
    `,
    create_time: '2025-11-12 11:00',
    updated: '2025-11-12 11:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-5',
    no: 5,
    title: 'Revitalisasi Area Alfresco Dining Pekanbaru Xchange Hadirkan Pengalaman Kuliner Terbuka',
    url: 'revitalisasi-alfresco-dining-px-kuliner-terbuka',
    date: '2025-06-18',
    category: 'News',
    imageUrl: '/images/mall/alfresco-dining.jpg',
    description: `
      <p><strong>Pekanbaru</strong> — Merespons antusiasme pengunjung terhadap konsep kuliner semi-terbuka, PT Halla Mohana merampungkan peremajaan koridor Alfresco Dining di Ground Floor Pekanbaru Xchange. Hadirnya brand kafe nasional dan tata pencahayaan arsitektural modern menjadikan area ini titik kumpul favorit komunitas.</p>
    `,
    create_time: '2025-06-18 15:30',
    updated: '2025-06-18 15:30',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-6',
    no: 6,
    title: 'PT Halla Mohana Bukukan Pertumbuhan Kunjungan dan Okupansi Positif Sepanjang 2024',
    url: 'halla-mohana-pertumbuhan-positif-2024',
    date: '2024-12-10',
    category: 'Press Release',
    imageUrl: '/images/hotel/lobby-grand.jpg',
    description: `
      <p><strong>Jakarta</strong> — PT Halla Mohana mencatatkan kinerja operasional yang solid sepanjang tahun 2024. Rata-rata tingkat keterisian kamar (occupancy rate) FOX Harris Hotel Pekanbaru menembus angka di atas rata-rata industri regional, ditopang oleh tingginya aktivitas kegiatan MICE korporat dan pemerintahan.</p>
    `,
    create_time: '2024-12-10 10:00',
    updated: '2024-12-10 10:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-7',
    no: 7,
    title: 'Pekanbaru Xchange Hadirkan Rangkaian Acara Kreatif Bersama Komunitas Seni Riau',
    url: 'px-hadirkan-acara-kreatif-komunitas-riau',
    date: '2024-04-25',
    category: 'News',
    imageUrl: '/images/mall/cinema-xxi.jpg',
    description: `
      <p><strong>Pekanbaru</strong> — Sebagai wujud dukungan terhadap pelaku ekonomi kreatif di Riau, Pekanbaru Xchange berkolaborasi dengan komunitas seni lokal menyelenggarakan pameran karya visual dan pertunjukan musik akustik di atrium mall.</p>
    `,
    create_time: '2024-04-25 16:00',
    updated: '2024-04-25 16:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-8',
    no: 8,
    title: 'Satu Dekade PT Halla Mohana: Dedikasi Menghadirkan Ruang Urban Bernilai Tambah',
    url: 'satu-dekade-halla-mohana-dedikasi-ruang-urban',
    date: '2023-10-18',
    category: 'Press Release',
    imageUrl: '/images/hotel/exterior-facade.jpg',
    description: `
      <p><strong>Jakarta / Pekanbaru</strong> — Memperingati perjalanan 10 tahun sejak didirikan pada tahun 2013, PT Halla Mohana menegaskan kembali komitmennya dalam mengembangkan properti komersial berkualitas tinggi di bawah naungan PT Mahadana Dasha Utama dan TMT Group.</p>
    `,
    create_time: '2023-10-18 09:00',
    updated: '2023-10-18 09:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-9',
    no: 9,
    title: 'Peremajaan Fasilitas Grand Ballroom FOX Harris Hotel Dukung Kebutuhan MICE Regional',
    url: 'peremajaan-grand-ballroom-fox-harris-mice',
    date: '2023-05-14',
    category: 'News',
    imageUrl: '/images/hotel/ballroom-orange-fox.jpg',
    description: `
      <p><strong>Pekanbaru</strong> — PT Halla Mohana menyelesaikan peningkatan fasilitas sistem tata suara, pencahayaan LED cerdas, serta interior Grand Ballroom FOX Harris Hotel Pekanbaru guna mengakomodasi perhelatan konferensi nasional dan pesta pernikahan berskala besar.</p>
    `,
    create_time: '2023-05-14 13:00',
    updated: '2023-05-14 13:00',
    visibility: true,
    featured: false,
  },
  {
    id: 'news-10',
    no: 10,
    title: 'Implementasi Standar Keamanan & Kesehatan Kerja (K3) Terpadu di Seluruh Unit Properti',
    url: 'implementasi-k3-terpadu-seluruh-aset',
    date: '2022-09-08',
    category: 'News',
    imageUrl: '/images/hotel/gym-fitness.jpg',
    description: `
      <p><strong>Pekanbaru</strong> — Sebagai bagian dari pilar Compassion dan Excellence dalam nilai inti korporat, PT Halla Mohana menerapkan sistem manajemen keselamatan kerja dan proteksi gedung terintegrasi di FOX Harris Hotel Pekanbaru dan Pekanbaru Xchange.</p>
    `,
    create_time: '2022-09-08 10:00',
    updated: '2022-09-08 10:00',
    visibility: true,
    featured: false,
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    no: 1,
    thumbnail: '/images/hotel/pool-infinity.jpg',
    imageUrl: '/images/hotel/pool-infinity.jpg',
    title: 'Indoor Rooftop Sky Pool Tertinggi di Pekanbaru (FOX Hotel)',
    category: 'FOX Harris Hotel',
    date: '2026-09-01',
    visibility: true,
  },
  {
    id: 'gal-2',
    no: 2,
    thumbnail: '/images/hotel/room-suite-bedroom.jpg',
    imageUrl: '/images/hotel/room-suite-bedroom.jpg',
    title: 'Executive Suite Room Interior & Modern Comfort',
    category: 'FOX Harris Hotel',
    date: '2026-08-15',
    visibility: true,
  },
  {
    id: 'gal-3',
    no: 3,
    thumbnail: '/images/hotel/restaurant-wtf-main.jpg',
    imageUrl: '/images/hotel/restaurant-wtf-main.jpg',
    title: 'Where’s The Food (WTF) Restaurant Main Dining Room',
    category: 'FOX Harris Hotel',
    date: '2026-07-20',
    visibility: true,
  },
  {
    id: 'gal-4',
    no: 4,
    thumbnail: '/images/hotel/ballroom-orange-fox.jpg',
    imageUrl: '/images/hotel/ballroom-orange-fox.jpg',
    title: 'FOX Grand Ballroom & Prestigious MICE Venue',
    category: 'FOX Harris Hotel',
    date: '2026-06-30',
    visibility: true,
  },
  {
    id: 'gal-5',
    no: 5,
    thumbnail: '/images/hotel/exterior-facade.jpg',
    imageUrl: '/images/hotel/exterior-facade.jpg',
    title: 'Menara Modern 14 Lantai FOX Harris Hotel Pekanbaru',
    category: 'FOX Harris Hotel',
    date: '2026-05-18',
    visibility: true,
  },
  {
    id: 'gal-6',
    no: 6,
    thumbnail: '/images/mall/hero-px-mall.jpg',
    imageUrl: '/images/mall/hero-px-mall.jpg',
    title: 'Fasad Ikonik Geometris & Plaza Pekanbaru Xchange (PX)',
    category: 'Pekanbaru Xchange',
    date: '2026-08-01',
    visibility: true,
  },
  {
    id: 'gal-7',
    no: 7,
    thumbnail: '/images/mall/cinema-xxi.jpg',
    imageUrl: '/images/mall/cinema-xxi.jpg',
    title: 'Cinema XXI Pekanbaru Xchange Premier Entertainment',
    category: 'Pekanbaru Xchange',
    date: '2026-07-15',
    visibility: true,
  },
  {
    id: 'gal-8',
    no: 8,
    thumbnail: '/images/mall/atrium-corridor.jpg',
    imageUrl: '/images/mall/atrium-corridor.jpg',
    title: 'Main Atrium & Retail Shopping Promenade PX Mall',
    category: 'Pekanbaru Xchange',
    date: '2026-06-25',
    visibility: true,
  },
  {
    id: 'gal-9',
    no: 9,
    thumbnail: '/images/mall/alfresco-dining.jpg',
    imageUrl: '/images/mall/alfresco-dining.jpg',
    title: 'Alfresco Dining Promenade Ground Floor PX Mall',
    category: 'Pekanbaru Xchange',
    date: '2026-06-10',
    visibility: true,
  },
  {
    id: 'gal-10',
    no: 10,
    thumbnail: '/images/mall/plaza-live-event.jpg',
    imageUrl: '/images/mall/plaza-live-event.jpg',
    title: 'Outdoor Community Event & Music Stage at PX Plaza',
    category: 'Pekanbaru Xchange',
    date: '2026-05-20',
    visibility: true,
  },
  {
    id: 'gal-11',
    no: 11,
    thumbnail: '/images/mall/px-facade-integrated.jpg',
    imageUrl: '/images/mall/px-facade-integrated.jpg',
    title: 'Kawasan Terpadu Jl. Riau No. 147 Pekanbaru (Hotel + Mall)',
    category: 'Kawasan Terpadu',
    date: '2026-05-01',
    visibility: true,
  },
];

const initialCareers: CareerItem[] = [
  {
    id: 'cr-1',
    no: 1,
    title: 'Assistant General Manager - Property Operations',
    department: 'Property Management',
    location: 'Pekanbaru, Riau',
    employment_type: 'Full-time',
    requirements: [
      'Pendidikan minimal S1 Teknik Sipil / Arsitektur / Manajemen Bisnis.',
      'Pengalaman kerja minimal 6 tahun di bidang manajemen properti komersial / mall & hotel.',
      'Kemampuan komunikasi kepemimpinan dan negosiasi tenan yang solid.',
      'Fasih berbahasa Inggris baik lisan maupun tulisan.',
    ],
    responsibilities: [
      'Memimpin operasional harian gedung, keselamatan kerja, dan kepatuhan standar lingkungan.',
      'Mengoptimalkan efisiensi energi dan anggaran operasional properti (OPEX).',
      'Menjaga hubungan strategis dengan para penyewa dan mitra vendor.',
    ],
    deadline: '2026-11-30',
    create_time: '2026-09-01',
    updated: '2026-09-01',
    visibility: true,
  },
  {
    id: 'cr-2',
    no: 2,
    title: 'Building Mechanical & Electrical (MEP) Supervisor',
    department: 'Engineering & Maintenance',
    location: 'Pekanbaru, Riau',
    employment_type: 'Full-time',
    requirements: [
      'Pendidikan D3/S1 Teknik Elektro / Mesin.',
      'Pengalaman minimal 4 tahun menangani sistem HVAC, Chiller, Genset, dan proteksi kebakaran gedung bertingkat.',
      'Memiliki sertifikasi K3 Listrik merupakan nilai tambah utama.',
    ],
    responsibilities: [
      'Melakukan preventive maintenance berkala terhadap seluruh instalasi utilitas.',
      'Menangani perbaikan teknis darurat secara tanggap dan sesuai SOP.',
    ],
    deadline: '2026-11-15',
    create_time: '2026-09-10',
    updated: '2026-09-10',
    visibility: true,
  },
  {
    id: 'cr-3',
    no: 3,
    title: 'Commercial Leasing & Tenant Relations Specialist',
    department: 'Marketing & Commercial',
    location: 'Jakarta Selatan / Pekanbaru',
    employment_type: 'Full-time',
    requirements: [
      'Pendidikan S1 Ilmu Komunikasi, Pemasaran, atau Manajemen.',
      'Pengalaman minimal 3 tahun di bidang leasing shopping mall atau retail chain.',
      'Memiliki jaringan luas dengan brand ritel dan F&B terkemuka.',
    ],
    responsibilities: [
      'Mengidentifikasi dan mengakuisisi brand potensial untuk mengisi unit ritel kosong.',
      'Menyusun perjanjian sewa menyewa dan mendampingi proses fitting out tenan.',
    ],
    deadline: '2026-12-15',
    create_time: '2026-09-20',
    updated: '2026-09-20',
    visibility: true,
  },
];

const initialContactInquiries: ContactInquiry[] = [
  {
    id: 'cnt-1',
    no: 1,
    full_name: 'Ir. Hendra Kusuma',
    phone: '+62 812 3456 7890',
    email: 'hendra.kusuma@corp-partner.com',
    subject: 'Pengajuan Kerjasama Event & Sewa Atrium PX',
    message: 'Selamat siang tim Halla Mohana, kami dari Asosiasi Desain Interior bermaksud mengajukan proposal penyelenggaraan pameran arsitektur di Atrium Pekanbaru Xchange pada bulan depan. Mohon informasi ketersediaan jadwal dan rate card resmi. Terima kasih.',
    create_time: '2026-10-07 15:42',
    visibility: true,
    isRead: false,
  },
  {
    id: 'cnt-2',
    no: 2,
    full_name: 'Dini Anggraini',
    phone: '+62 813 9876 5432',
    email: 'dini.anggraini@travelnet.co.id',
    subject: 'Pertanyaan Reservasi Korporat FOX Ballroom',
    message: 'Kami merencanakan seminar regional untuk 250 peserta di FOX Harris Hotel Pekanbaru. Mohon dikirimkan paket full-day meeting package beserta akomodasi kamar.',
    create_time: '2026-10-06 11:20',
    visibility: true,
    isRead: true,
  },
];

const initialMediaFiles: MediaFile[] = [
  {
    id: 'med-1',
    type: 'image',
    name: 'logo.png',
    url: '/images/logo/logo.png',
    directory: '/images/logo',
    size: '22 KB',
    dimensions: '252x252',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-10-08',
  },
  {
    id: 'med-2',
    type: 'image',
    name: 'footerlogo.jpg',
    url: '/images/logo/footerlogo.jpg',
    directory: '/images/logo',
    size: '2.2 KB',
    dimensions: '68x60',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-10-08',
  },
  {
    id: 'med-3',
    type: 'image',
    name: 'hero-fox-hotel-wide.jpg',
    url: '/images/hotel/hero-fox-hotel-wide.jpg',
    directory: '/images/hotel',
    size: '209 KB',
    dimensions: '1920x1080',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
    inCarousel: true,
  },
  {
    id: 'med-4',
    type: 'image',
    name: 'pool-infinity.jpg',
    url: '/images/hotel/pool-infinity.jpg',
    directory: '/images/hotel',
    size: '215 KB',
    dimensions: '1920x1280',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-5',
    type: 'image',
    name: 'exterior-facade.jpg',
    url: '/images/hotel/exterior-facade.jpg',
    directory: '/images/hotel',
    size: '584 KB',
    dimensions: '1920x1280',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-6',
    type: 'image',
    name: 'room-suite-bedroom.jpg',
    url: '/images/hotel/room-suite-bedroom.jpg',
    directory: '/images/hotel',
    size: '208 KB',
    dimensions: '1600x1067',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-7',
    type: 'image',
    name: 'restaurant-wtf-main.jpg',
    url: '/images/hotel/restaurant-wtf-main.jpg',
    directory: '/images/hotel',
    size: '264 KB',
    dimensions: '1600x1067',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-8',
    type: 'image',
    name: 'ballroom-orange-fox.jpg',
    url: '/images/hotel/ballroom-orange-fox.jpg',
    directory: '/images/hotel',
    size: '181 KB',
    dimensions: '1600x1067',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-9',
    type: 'image',
    name: 'hero-px-mall.jpg',
    url: '/images/mall/hero-px-mall.jpg',
    directory: '/images/mall',
    size: '322 KB',
    dimensions: '1920x1080',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
    inCarousel: true,
  },
  {
    id: 'med-10',
    type: 'image',
    name: 'cinema-xxi.jpg',
    url: '/images/mall/cinema-xxi.jpg',
    directory: '/images/mall',
    size: '348 KB',
    dimensions: '1920x1436',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-11',
    type: 'image',
    name: 'atrium-corridor.jpg',
    url: '/images/mall/atrium-corridor.jpg',
    directory: '/images/mall',
    size: '192 KB',
    dimensions: '1280x894',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-12',
    type: 'image',
    name: 'alfresco-dining.jpg',
    url: '/images/mall/alfresco-dining.jpg',
    directory: '/images/mall',
    size: '227 KB',
    dimensions: '1280x960',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
  },
  {
    id: 'med-13',
    type: 'image',
    name: 'px-facade-integrated.jpg',
    url: '/images/mall/px-facade-integrated.jpg',
    directory: '/images/mall',
    size: '456 KB',
    dimensions: '1920x1080',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-11-15',
    inCarousel: true,
  },
  {
    id: 'med-14',
    type: 'document',
    name: 'PT_Halla_Mohana_Corporate_Profile_2026.pdf',
    url: '#',
    directory: '/documents',
    size: '4.8 MB',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-09-15',
  },
  {
    id: 'med-15',
    type: 'document',
    name: 'Annual_Sustainability_Report_2025.pdf',
    url: '#',
    directory: '/documents',
    size: '8.2 MB',
    uploadedBy: 'Calvin Administrator',
    uploadedAt: '2026-08-10',
  },
];

interface CMSDataContextType {
  // General config
  generalConfig: GeneralConfig;
  updateGeneralConfig: (newConfig: Partial<GeneralConfig>) => void;
  // Current user & authentication
  currentUser: UserProfile;
  updateCurrentUserProfile: (profile: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  loginUser: (email: string, pass: string) => boolean;
  logoutUser: () => void;
  // Users & Roles
  users: UserAccount[];
  addUser: (user: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => void;
  updateUser: (id: string, user: Partial<UserAccount>) => void;
  deleteUser: (id: string) => void;
  roles: RoleAccount[];
  addRole: (role: Omit<RoleAccount, 'id' | 'userCount'>) => void;
  updateRole: (id: string, role: Partial<RoleAccount>) => void;
  deleteRole: (id: string) => void;
  // Activity Logs
  activityLogs: UserActivityLog[];
  addActivityLog: (action: string, target: string) => void;
  // Page Navigation
  pages: PageAdminItem[];
  updatePage: (id: string, page: Partial<PageAdminItem>) => void;
  togglePageVisibility: (id: string) => void;
  // Banners
  banners: BannerItem[];
  addBanner: (banner: Omit<BannerItem, 'id' | 'no' | 'created_time' | 'updated'>) => void;
  updateBanner: (id: string, banner: Partial<BannerItem>) => void;
  deleteBanner: (id: string) => void;
  toggleBannerVisibility: (id: string) => void;
  // News
  newsList: NewsItem[];
  addNews: (news: Omit<NewsItem, 'id' | 'no' | 'create_time' | 'updated'>) => void;
  updateNews: (id: string, news: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  toggleNewsVisibility: (id: string) => void;
  // Corporate info
  corporateInfo: CorporateInfoItem[];
  updateCorporateInfo: (id: string, info: Partial<CorporateInfoItem>) => void;
  addCorporateInfo: (info: Omit<CorporateInfoItem, 'id' | 'no' | 'create_time' | 'updated'>) => void;
  deleteCorporateInfo: (id: string) => void;
  toggleCorporateInfoVisibility: (id: string) => void;
  // Projects
  projects: ProjectItem[];
  addProject: (prj: Omit<ProjectItem, 'id' | 'no' | 'create_time' | 'updated'>) => void;
  updateProject: (id: string, prj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;
  // Contact Us
  contactInquiries: ContactInquiry[];
  addContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'no' | 'create_time' | 'visibility' | 'isRead'>) => void;
  deleteContactInquiry: (id: string) => void;
  toggleContactVisibility: (id: string) => void;
  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'no'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryVisibility: (id: string) => void;
  // Careers
  careers: CareerItem[];
  addCareer: (career: Omit<CareerItem, 'id' | 'no' | 'create_time' | 'updated'>) => void;
  updateCareer: (id: string, career: Partial<CareerItem>) => void;
  deleteCareer: (id: string) => void;
  toggleCareerVisibility: (id: string) => void;
  // Career Applications
  careerApplications: CareerApplication[];
  submitCareerApplication: (app: Omit<CareerApplication, 'id' | 'submittedAt' | 'status'>) => void;
  // Media files
  mediaFiles: MediaFile[];
  addMediaFile: (file: Omit<MediaFile, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteMediaFile: (id: string) => void;
  // Utility reset
  resetAllDataToDefault: () => void;
}

const CMSDataContext = createContext<CMSDataContextType | null>(null);

const STORAGE_KEY_PREFIX = 'hm_cms_v11_';

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Failed to parse localStorage for', key, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to set localStorage for', key, e);
  }
}

export const CMSDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>(() =>
    getStoredItem('general_config', initialGeneralConfig)
  );
  const [currentUser, setCurrentUser] = useState<UserProfile>(() =>
    getStoredItem('current_user', initialCurrentUser)
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    getStoredItem('is_authenticated', true) // Default true for frictionless testing
  );
  const [users, setUsers] = useState<UserAccount[]>(() =>
    getStoredItem('users', initialUsers)
  );
  const [roles, setRoles] = useState<RoleAccount[]>(() =>
    getStoredItem('roles', initialRoles)
  );
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>(() =>
    getStoredItem('activity_logs', initialLogs)
  );
  const [pages, setPages] = useState<PageAdminItem[]>(() => {
    const list = getStoredItem('pages', initialPages);
    return list.map((p) => {
      let nav = p.navigation;
      if (nav.startsWith('#')) {
        nav = '/' + nav.replace(/^#/, '');
      }
      if (nav === '/home') nav = '/';
      if (nav === '/corporate-info') nav = '/about';
      return { ...p, navigation: nav };
    });
  });
  const [banners, setBanners] = useState<BannerItem[]>(() => {
    const stored = getStoredItem('banners', initialBanners);
    if (!stored || stored.length < 3 || stored[0]?.title?.includes('Urban Lifestyle Oasis')) {
      return initialBanners;
    }
    return stored;
  });
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const list = getStoredItem('projects', initialProjects);
    return list
      .filter((p) => p.id !== 'prj-3' && p.category !== 'Commercial Office')
      .map((p) => {
        if (p.id === 'prj-2' && (p.imageUrl.includes('unsplash') || p.imageUrl.includes('567449303078') || !p.imageUrl)) {
          return {
            ...p,
            imageUrl: '/images/mall/hero-px-mall.jpg',
          };
        }
        if (p.id === 'prj-1' && (p.imageUrl.includes('unsplash') || !p.imageUrl)) {
          return {
            ...p,
            imageUrl: '/images/hotel/hero-fox-hotel-wide.jpg',
          };
        }
        return p;
      });
  });
  const [corporateInfo, setCorporateInfo] = useState<CorporateInfoItem[]>(() =>
    getStoredItem('corporate_info', initialCorporateInfo)
  );
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const stored = getStoredItem('news_list', initialNews);
    if (!stored || stored.length <= 3) {
      return initialNews;
    }
    return stored;
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    getStoredItem('gallery', initialGallery)
  );
  const [careers, setCareers] = useState<CareerItem[]>(() =>
    getStoredItem('careers', initialCareers)
  );
  const [careerApplications, setCareerApplications] = useState<CareerApplication[]>(() =>
    getStoredItem('career_apps', [])
  );
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() =>
    getStoredItem('contact_inquiries', initialContactInquiries)
  );
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() =>
    getStoredItem('media_files', initialMediaFiles)
  );

  // Sync state changes to localStorage
  useEffect(() => setStoredItem('general_config', generalConfig), [generalConfig]);
  useEffect(() => setStoredItem('current_user', currentUser), [currentUser]);
  useEffect(() => setStoredItem('is_authenticated', isAuthenticated), [isAuthenticated]);
  useEffect(() => setStoredItem('users', users), [users]);
  useEffect(() => setStoredItem('roles', roles), [roles]);
  useEffect(() => setStoredItem('activity_logs', activityLogs), [activityLogs]);
  useEffect(() => setStoredItem('pages', pages), [pages]);
  useEffect(() => setStoredItem('banners', banners), [banners]);
  useEffect(() => setStoredItem('projects', projects), [projects]);
  useEffect(() => setStoredItem('corporate_info', corporateInfo), [corporateInfo]);
  useEffect(() => setStoredItem('news_list', newsList), [newsList]);
  useEffect(() => setStoredItem('gallery', gallery), [gallery]);
  useEffect(() => setStoredItem('careers', careers), [careers]);
  useEffect(() => setStoredItem('career_apps', careerApplications), [careerApplications]);
  useEffect(() => setStoredItem('contact_inquiries', contactInquiries), [contactInquiries]);
  useEffect(() => setStoredItem('media_files', mediaFiles), [mediaFiles]);

  const addActivityLog = (action: string, target: string) => {
    const newLog: UserActivityLog = {
      id: 'log-' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '127.0.0.1 (Local Session)',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  const updateGeneralConfig = (newConfig: Partial<GeneralConfig>) => {
    setGeneralConfig((prev) => ({ ...prev, ...newConfig }));
    addActivityLog('UPDATE_CONFIG', 'General Site Configuration');
  };

  const updateCurrentUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }));
    addActivityLog('UPDATE_PROFILE', 'User Profile: ' + (profile.name || currentUser.name));
  };

  const loginUser = (email: string, pass: string): boolean => {
    // Default account check: admin@hallamohana.co.id
    if (email.toLowerCase() === 'admin@hallamohana.co.id' && (pass === 'admin123' || pass === 'admin' || pass.length > 0)) {
      setIsAuthenticated(true);
      addActivityLog('LOGIN', 'User Authentication Successful');
      return true;
    }
    // Also allow any existing user email
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (match && pass.length > 0) {
      setCurrentUser({
        id: match.id,
        name: match.name,
        email: match.email,
        avatar: match.avatar,
        roleId: match.roleId,
        roleName: match.roleName,
      });
      setIsAuthenticated(true);
      addActivityLog('LOGIN', 'User Authentication: ' + match.name);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    addActivityLog('LOGOUT', 'User Logged Out');
  };

  // User Administration
  const addUser = (userData: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: 'usr-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-',
    };
    setUsers((prev) => [...prev, newUser]);
    addActivityLog('CREATE_USER', 'Created user account: ' + newUser.name);
  };

  const updateUser = (id: string, updatedFields: Partial<UserAccount>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u)));
    addActivityLog('UPDATE_USER', 'Updated user: #' + id);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addActivityLog('DELETE_USER', 'Deleted user account: #' + id);
  };

  // Roles Administration
  const addRole = (roleData: Omit<RoleAccount, 'id' | 'userCount'>) => {
    const newRole: RoleAccount = {
      ...roleData,
      id: 'role-' + Date.now(),
      userCount: 0,
    };
    setRoles((prev) => [...prev, newRole]);
    addActivityLog('CREATE_ROLE', 'Created role: ' + newRole.name);
  };

  const updateRole = (id: string, updated: Partial<RoleAccount>) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    addActivityLog('UPDATE_ROLE', 'Updated role: #' + id);
  };

  const deleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    addActivityLog('DELETE_ROLE', 'Deleted role: #' + id);
  };

  // Page Administration
  const updatePage = (id: string, pageData: Partial<PageAdminItem>) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...pageData,
              updated: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
    addActivityLog('UPDATE_PAGE', 'Updated page route: #' + id);
  };

  const togglePageVisibility = (id: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              visibility: !p.visibility,
              updated: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
    addActivityLog('TOGGLE_VISIBILITY', 'Page navigation: #' + id);
  };

  // Banners
  const addBanner = (bannerData: Omit<BannerItem, 'id' | 'no' | 'created_time' | 'updated'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newBanner: BannerItem = {
      ...bannerData,
      id: 'bnr-' + Date.now(),
      no: banners.length + 1,
      created_time: now,
      updated: now,
    };
    setBanners((prev) => [...prev, newBanner]);
    addActivityLog('CREATE_BANNER', 'Created hero banner: ' + newBanner.title);
  };

  const updateBanner = (id: string, updated: Partial<BannerItem>) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...updated,
              updated: new Date().toISOString().split('T')[0],
            }
          : b
      )
    );
    addActivityLog('UPDATE_BANNER', 'Updated hero banner: #' + id);
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    addActivityLog('DELETE_BANNER', 'Deleted hero banner: #' + id);
  };

  const toggleBannerVisibility = (id: string) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              visibility: !b.visibility,
              updated: new Date().toISOString().split('T')[0],
            }
          : b
      )
    );
    addActivityLog('TOGGLE_BANNER', 'Hero banner visibility: #' + id);
  };

  // News
  const addNews = (newsData: Omit<NewsItem, 'id' | 'no' | 'create_time' | 'updated'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newItem: NewsItem = {
      ...newsData,
      id: 'news-' + Date.now(),
      no: newsList.length + 1,
      create_time: now,
      updated: now,
    };
    setNewsList((prev) => [newItem, ...prev]);
    addActivityLog('CREATE_NEWS', 'Created news article: ' + newItem.title);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNewsList((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              ...updated,
              updated: new Date().toISOString().split('T')[0],
            }
          : n
      )
    );
    addActivityLog('UPDATE_NEWS', 'Updated news article: #' + id);
  };

  const deleteNews = (id: string) => {
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    addActivityLog('DELETE_NEWS', 'Deleted news article: #' + id);
  };

  const toggleNewsVisibility = (id: string) => {
    setNewsList((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              visibility: !n.visibility,
              updated: new Date().toISOString().split('T')[0],
            }
          : n
      )
    );
    addActivityLog('TOGGLE_NEWS', 'News visibility: #' + id);
  };

  // Corporate Info
  const addCorporateInfo = (infoData: Omit<CorporateInfoItem, 'id' | 'no' | 'create_time' | 'updated'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newItem: CorporateInfoItem = {
      ...infoData,
      id: 'ci-' + Date.now(),
      no: corporateInfo.length + 1,
      create_time: now,
      updated: now,
    };
    setCorporateInfo((prev) => [...prev, newItem]);
    addActivityLog('CREATE_CORP_INFO', 'Created Corporate Info: ' + newItem.title);
  };

  const updateCorporateInfo = (id: string, updated: Partial<CorporateInfoItem>) => {
    setCorporateInfo((prev) =>
      prev.map((ci) =>
        ci.id === id
          ? {
              ...ci,
              ...updated,
              updated: new Date().toISOString().split('T')[0],
            }
          : ci
      )
    );
    addActivityLog('UPDATE_CORP_INFO', 'Updated Corporate Info: #' + id);
  };

  const deleteCorporateInfo = (id: string) => {
    setCorporateInfo((prev) => prev.filter((ci) => ci.id !== id));
    addActivityLog('DELETE_CORP_INFO', 'Deleted Corporate Info: #' + id);
  };

  const toggleCorporateInfoVisibility = (id: string) => {
    setCorporateInfo((prev) =>
      prev.map((ci) =>
        ci.id === id
          ? {
              ...ci,
              visibility: !ci.visibility,
              updated: new Date().toISOString().split('T')[0],
            }
          : ci
      )
    );
  };

  // Projects
  const addProject = (prjData: Omit<ProjectItem, 'id' | 'no' | 'create_time' | 'updated'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newPrj: ProjectItem = {
      ...prjData,
      id: 'prj-' + Date.now(),
      no: projects.length + 1,
      create_time: now,
      updated: now,
    };
    setProjects((prev) => [...prev, newPrj]);
    addActivityLog('CREATE_PROJECT', 'Created property project: ' + newPrj.title);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updated,
              updated: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
    addActivityLog('UPDATE_PROJECT', 'Updated project: #' + id);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addActivityLog('DELETE_PROJECT', 'Deleted project: #' + id);
  };

  const toggleProjectVisibility = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              visibility: !p.visibility,
              updated: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
  };

  // Contact Inquiries
  const addContactInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'no' | 'create_time' | 'visibility' | 'isRead'>) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: 'cnt-' + Date.now(),
      no: contactInquiries.length + 1,
      create_time: now,
      visibility: true,
      isRead: false,
    };
    setContactInquiries((prev) => [newInquiry, ...prev]);
    // Simulate auto-send email notification
    console.log(`[Auto-Send Email] Dispatched contact inquiry notification to: ${generalConfig.auto_send_email.send_contact_us}`);
  };

  const deleteContactInquiry = (id: string) => {
    setContactInquiries((prev) => prev.filter((c) => c.id !== id));
    addActivityLog('DELETE_INQUIRY', 'Deleted contact inquiry: #' + id);
  };

  const toggleContactVisibility = (id: string) => {
    setContactInquiries((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isRead: !c.isRead,
            }
          : c
      )
    );
  };

  // Gallery
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'no'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'gal-' + Date.now(),
      no: gallery.length + 1,
    };
    setGallery((prev) => [newItem, ...prev]);
    addActivityLog('CREATE_GALLERY', 'Created gallery item: ' + newItem.title);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    addActivityLog('UPDATE_GALLERY', 'Updated gallery item: #' + id);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    addActivityLog('DELETE_GALLERY', 'Deleted gallery item: #' + id);
  };

  const toggleGalleryVisibility = (id: string) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, visibility: !g.visibility } : g))
    );
  };

  // Careers
  const addCareer = (careerData: Omit<CareerItem, 'id' | 'no' | 'create_time' | 'updated'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newCareer: CareerItem = {
      ...careerData,
      id: 'cr-' + Date.now(),
      no: careers.length + 1,
      create_time: now,
      updated: now,
    };
    setCareers((prev) => [...prev, newCareer]);
    addActivityLog('CREATE_CAREER', 'Created job vacancy: ' + newCareer.title);
  };

  const updateCareer = (id: string, updated: Partial<CareerItem>) => {
    setCareers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updated,
              updated: new Date().toISOString().split('T')[0],
            }
          : c
      )
    );
    addActivityLog('UPDATE_CAREER', 'Updated career posting: #' + id);
  };

  const deleteCareer = (id: string) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    addActivityLog('DELETE_CAREER', 'Deleted career posting: #' + id);
  };

  const toggleCareerVisibility = (id: string) => {
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visibility: !c.visibility } : c))
    );
  };

  const submitCareerApplication = (appData: Omit<CareerApplication, 'id' | 'submittedAt' | 'status'>) => {
    const newApp: CareerApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
    };
    setCareerApplications((prev) => [newApp, ...prev]);
    console.log(`[Auto-Send Email] Sent application for ${newApp.careerTitle} to: ${generalConfig.auto_send_email.send_career_application_to}`);
  };

  // Media Library
  const addMediaFile = (fileData: Omit<MediaFile, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    const newFile: MediaFile = {
      ...fileData,
      id: 'med-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: currentUser.name,
    };
    setMediaFiles((prev) => [newFile, ...prev]);
    addActivityLog('UPLOAD_MEDIA', 'Uploaded media file: ' + newFile.name);
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((m) => m.id !== id));
    addActivityLog('DELETE_MEDIA', 'Deleted media file: #' + id);
  };

  const resetAllDataToDefault = () => {
    localStorage.clear();
    setGeneralConfig(initialGeneralConfig);
    setCurrentUser(initialCurrentUser);
    setUsers(initialUsers);
    setRoles(initialRoles);
    setActivityLogs(initialLogs);
    setPages(initialPages);
    setBanners(initialBanners);
    setProjects(initialProjects);
    setCorporateInfo(initialCorporateInfo);
    setNewsList(initialNews);
    setGallery(initialGallery);
    setCareers(initialCareers);
    setCareerApplications([]);
    setContactInquiries(initialContactInquiries);
    setMediaFiles(initialMediaFiles);
    window.location.reload();
  };

  return (
    <CMSDataContext.Provider
      value={{
        generalConfig,
        updateGeneralConfig,
        currentUser,
        updateCurrentUserProfile,
        isAuthenticated,
        loginUser,
        logoutUser,
        users,
        addUser,
        updateUser,
        deleteUser,
        roles,
        addRole,
        updateRole,
        deleteRole,
        activityLogs,
        addActivityLog,
        pages,
        updatePage,
        togglePageVisibility,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        toggleBannerVisibility,
        newsList,
        addNews,
        updateNews,
        deleteNews,
        toggleNewsVisibility,
        corporateInfo,
        addCorporateInfo,
        updateCorporateInfo,
        deleteCorporateInfo,
        toggleCorporateInfoVisibility,
        projects,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectVisibility,
        contactInquiries,
        addContactInquiry,
        deleteContactInquiry,
        toggleContactVisibility,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        toggleGalleryVisibility,
        careers,
        addCareer,
        updateCareer,
        deleteCareer,
        toggleCareerVisibility,
        careerApplications,
        submitCareerApplication,
        mediaFiles,
        addMediaFile,
        deleteMediaFile,
        resetAllDataToDefault,
      }}
    >
      {children}
    </CMSDataContext.Provider>
  );
};

export const useCMSData = (): CMSDataContextType => {
  const ctx = useContext(CMSDataContext);
  if (!ctx) {
    throw new Error('useCMSData must be used within a CMSDataProvider');
  }
  return ctx;
};
