import React, { useState } from 'react';
import { useCMSData } from '@/context/CMSDataContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  User,
  Users,
  Shield,
  History,
  Plus,
  Edit2,
  Trash2,
  Key,
  Save,
  CheckCircle,
  Search,
  Lock,
} from 'lucide-react';
import type { UserAccount, RoleAccount } from '@/types';

export const UserAdminModule: React.FC = () => {
  const {
    currentUser,
    updateCurrentUserProfile,
    users,
    addUser,
    updateUser,
    deleteUser,
    roles,
    addRole,
    updateRole,
    deleteRole,
    activityLogs,
  } = useCMSData();

  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'roles' | 'history'>('profile');

  // Profile Form state
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profileEmail, setProfileEmail] = useState(currentUser.email);
  const [profilePhone, setProfilePhone] = useState(currentUser.phone || '');
  const [profileBio, setProfileBio] = useState(currentUser.bio || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // User CRUD modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    roleId: roles[0]?.id || '',
    status: 'active' as 'active' | 'inactive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  // Role CRUD modal state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: ['content_write'] as string[],
  });

  // History search
  const [historySearch, setHistorySearch] = useState('');

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      bio: profileBio,
    });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Open User Modal
  const openAddUserModal = () => {
    setEditingUserId(null);
    setUserFormData({
      name: '',
      email: '',
      roleId: roles[0]?.id || '',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user: UserAccount) => {
    setEditingUserId(user.id);
    setUserFormData({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      status: user.status,
      avatar: user.avatar,
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRole = roles.find((r) => r.id === userFormData.roleId);
    const roleName = selectedRole ? selectedRole.name : 'Editor';

    if (editingUserId) {
      updateUser(editingUserId, {
        name: userFormData.name,
        email: userFormData.email,
        roleId: userFormData.roleId,
        roleName,
        status: userFormData.status,
        avatar: userFormData.avatar,
      });
    } else {
      addUser({
        name: userFormData.name,
        email: userFormData.email,
        roleId: userFormData.roleId,
        roleName,
        status: userFormData.status,
        avatar: userFormData.avatar,
      });
    }
    setIsUserModalOpen(false);
  };

  // Open Role Modal
  const openAddRoleModal = () => {
    setEditingRoleId(null);
    setRoleFormData({
      name: '',
      description: '',
      permissions: ['content_write'],
    });
    setIsRoleModalOpen(true);
  };

  const openEditRoleModal = (role: RoleAccount) => {
    setEditingRoleId(role.id);
    setRoleFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoleId) {
      updateRole(editingRoleId, roleFormData);
    } else {
      addRole(roleFormData);
    }
    setIsRoleModalOpen(false);
  };

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.userName.toLowerCase().includes(historySearch.toLowerCase()) ||
      log.action.toLowerCase().includes(historySearch.toLowerCase()) ||
      log.target.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Users className="h-6 w-6 text-[#7A152E]" />
          User & Access Administration
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Kelola profil akun Anda, hak akses staf perhotelan/konten, hierarki peran (roles), serta rekam jejak aktivitas (audit history).
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'profile'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="h-4 w-4" />
          My Profile
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'users'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          User Administration ({users.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'roles'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="h-4 w-4" />
          Role Administration ({roles.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'history'
              ? 'border-[#7A152E] text-[#7A152E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="h-4 w-4" />
          Audit History ({activityLogs.length})
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#7A152E]/30 shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-sm text-slate-500">{currentUser.email}</p>
              <div className="mt-2">
                <Badge variant="primary" size="sm">
                  {currentUser.roleName}
                </Badge>
              </div>
            </div>
          </div>

          {profileSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              Profil berhasil diperbarui!
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="+62 8..."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Role Saat Ini (Read-only)
                </label>
                <input
                  type="text"
                  value={currentUser.roleName}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Bio / Keterangan Jabatan
              </label>
              <textarea
                rows={3}
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />}>
                Simpan Profil Saya
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: User Administration (CRUD User) */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">
              Menampilkan {users.length} pengguna aktif dengan hak akses ke CMS.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="h-4 w-4" />}
              onClick={openAddUserModal}
            >
              Tambah Pengguna Baru
            </Button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Pengguna</th>
                  <th className="py-3 px-4">Role Akses</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Login Terakhir</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{u.roleName}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={u.status === 'active' ? 'success' : 'neutral'} size="sm">
                        {u.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{u.lastLogin}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditUserModal(u)}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="Edit Pengguna"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {users.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus pengguna ${u.name}?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Role Administration (CRUD Role) */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">
              Konfigurasi peran dan hak istimewa (permissions) untuk tim operasional Halla Mohana.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="h-4 w-4" />}
              onClick={openAddRoleModal}
            >
              Tambah Peran Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-base">{r.name}</h4>
                    <Badge variant="slate" size="sm">
                      {r.userCount} Anggota
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{r.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Permissions:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.permissions.map((p) => (
                        <span
                          key={p}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button variant="ghost" size="sm" onClick={() => openEditRoleModal(r)}>
                    Edit
                  </Button>
                  {roles.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50"
                      onClick={() => {
                        if (confirm(`Hapus role ${r.name}?`)) {
                          deleteRole(r.id);
                        }
                      }}
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari aktivitas, user, atau target..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs focus:border-[#7A152E] focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-slate-500">
              Total {filteredLogs.length} rekaman audit tercatat.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Pengguna</th>
                  <th className="py-3 px-4">Aksi</th>
                  <th className="py-3 px-4">Target Entitas</th>
                  <th className="py-3 px-4">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold font-sans text-slate-800">{log.userName}</td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-rose-50 text-[#7A152E] px-2 py-0.5 font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700">{log.target}</td>
                    <td className="py-3 px-4 text-slate-400">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add/Edit User */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={editingUserId ? 'Edit Akun Pengguna' : 'Tambah Pengguna Baru'}
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={userFormData.name}
              onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Perusahaan
            </label>
            <input
              type="email"
              required
              value={userFormData.email}
              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Peran (Role)
              </label>
              <select
                value={userFormData.roleId}
                onChange={(e) => setUserFormData({ ...userFormData, roleId: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status Akun
              </label>
              <select
                value={userFormData.status}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, status: e.target.value as 'active' | 'inactive' })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsUserModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingUserId ? 'Simpan Perubahan' : 'Buat Akun'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Add/Edit Role */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title={editingRoleId ? 'Edit Peran (Role)' : 'Tambah Peran Baru'}
      >
        <form onSubmit={handleSaveRole} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Peran
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Media Specialist"
              value={roleFormData.name}
              onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Deskripsi Tanggung Jawab
            </label>
            <textarea
              rows={2}
              required
              value={roleFormData.description}
              onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-[#7A152E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Hak Akses (Permissions)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'content_write', label: 'Kelola Berita & Proyek' },
                { id: 'media_write', label: 'Upload ke Media Library' },
                { id: 'banner_write', label: 'Kelola Slider Beranda' },
                { id: 'career_write', label: 'Kelola Lowongan Karir' },
                { id: 'config_write', label: 'Ubah Konfigurasi Umum' },
                { id: 'user_write', label: 'Kelola Akun Pengguna' },
              ].map((perm) => (
                <label key={perm.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <input
                    type="checkbox"
                    checked={roleFormData.permissions.includes(perm.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: [...roleFormData.permissions, perm.id],
                        });
                      } else {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: roleFormData.permissions.filter((p) => p !== perm.id),
                        });
                      }
                    }}
                    className="rounded text-[#7A152E] focus:ring-[#7A152E]"
                  />
                  <span>{perm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsRoleModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingRoleId ? 'Simpan Peran' : 'Buat Peran'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
