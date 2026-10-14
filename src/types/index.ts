export interface GeneralConfig {
  status: 'active' | 'maintenance';
  logo: string;
  footer_logo: string;
  copyright: string;
  check_ip_login: boolean;
  allowed_ips: string[];
  office_info_input: {
    address: string;
    phone: string;
    fax: string;
  };
  side_office_input: {
    address: string;
    phone: string;
    fax: string;
    email: string;
  };
  auto_send_email: {
    send_contact_us: string;
    send_career_application_to: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  roleName: string;
  phone?: string;
  bio?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  roleName: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface RoleAccount {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
}

export interface PageAdminItem {
  id: string;
  no: number;
  title: string;
  navigation: string;
  created_time: string;
  updated: string;
  visibility: boolean;
  order: number;
}

export interface MediaFile {
  id: string;
  type: 'image' | 'document';
  name: string;
  url: string;
  directory: string;
  size: string;
  dimensions?: string;
  uploadedBy: string;
  uploadedAt: string;
  inCarousel?: boolean;
}

export interface BannerItem {
  id: string;
  no: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  visibility: boolean;
  order: number;
  created_time: string;
  updated: string;
}

export interface NewsItem {
  id: string;
  no: number;
  title: string;
  url: string;
  date: string;
  category: string;
  imageUrl: string;
  description: string; // Rich Text / HTML
  create_time: string;
  updated: string;
  visibility: boolean;
  featured?: boolean;
}

export interface CorporateInfoItem {
  id: string;
  no: number;
  date: string;
  title: string;
  url: string;
  content: string;
  create_time: string;
  updated: string;
  visibility: boolean;
  order?: number;
}

export interface ProjectItem {
  id: string;
  no: number;
  title: string;
  category: 'Hospitality & Hotel' | 'Shopping Mall & Retail' | 'Commercial Office';
  location: string;
  imageUrl: string;
  gallery: string[];
  description: string;
  specs: { label: string; value: string }[];
  create_time: string;
  updated: string;
  visibility: boolean;
  featured?: boolean;
}

export interface ContactInquiry {
  id: string;
  no: number;
  full_name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  create_time: string;
  visibility: boolean; // false = archived / read
  isRead?: boolean;
}

export interface GalleryItem {
  id: string;
  no: number;
  thumbnail: string;
  title: string; // Judul/Caption
  category: string; // Kategori/Album Proyek
  date: string; // Tanggal
  visibility: boolean;
  imageUrl: string;
}

export interface CareerItem {
  id: string;
  no: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  requirements: string[];
  responsibilities: string[];
  deadline: string;
  create_time: string;
  updated: string;
  visibility: boolean;
}

export interface CareerApplication {
  id: string;
  careerId: string;
  careerTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  resumeName: string;
  coverLetter?: string;
  submittedAt: string;
  status: 'Pending' | 'Reviewed' | 'Interviewed' | 'Rejected';
}
