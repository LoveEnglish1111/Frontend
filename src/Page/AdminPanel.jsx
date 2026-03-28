import { useState, useMemo } from 'react';
import { Shield, Plus, Search, Download, Settings, Users, Activity, Flag, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function AdminPanel({ currentUser }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data (local state)
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'Alex Johnson',
      avatar: '👨‍🎓',
      email: 'alex@example.com',
      role: 'user',
      status: 'active',
      joinDate: 'Jan 15, 2024',
      warnings: 0,
    },
    {
      id: 'USR002',
      name: 'Sarah Admin',
      avatar: '👩‍💼',
      email: 'sarah@example.com',
      role: 'admin',
      status: 'active',
      joinDate: 'Dec 1, 2023',
      warnings: 0,
    },
    {
      id: 'USR003',
      name: 'Mike Teacher',
      avatar: '👨‍🏫',
      email: 'mike@example.com',
      role: 'teacher',
      status: 'active',
      joinDate: 'Feb 10, 2024',
      warnings: 0,
    },
    {
      id: 'USR004',
      name: 'Emma Wilson',
      avatar: '👩‍🎓',
      email: 'emma@example.com',
      role: 'user',
      status: 'inactive',
      joinDate: 'Jan 5, 2024',
      warnings: 0,
    },
    {
      id: 'USR005',
      name: 'David Brown',
      avatar: '👨‍🎓',
      email: 'david@example.com',
      role: 'user',
      status: 'active',
      joinDate: 'Mar 1, 2024',
      warnings: 0,
    },
    {
      id: 'USR006',
      name: 'Lisa Chen',
      avatar: '👩‍🎓',
      email: 'lisa@example.com',
      role: 'teacher',
      status: 'active',
      joinDate: 'Jan 20, 2024',
      warnings: 0,
    },
  ]);

  // Mock posts for moderation queue
  const [posts, setPosts] = useState([
    {
      id: 'P001',
      title: 'Học từ vựng hiệu quả trong 30 phút',
      author: 'Alex Johnson',
      date: 'Mar 20, 2024',
      content:
        'Một phương pháp đơn giản giúp bạn ghi nhớ từ vựng nhanh chóng: lặp lại ngắt quãng, ví dụ câu, và áp dụng vào thực tế. Hãy bắt đầu với 10 từ mỗi ngày, viết câu, và ôn lại sau 24 giờ để tối ưu hóa việc ghi nhớ lâu dài.',
      reports: 2,
      status: 'pending',
    },
    {
      id: 'P002',
      title: 'Làm sao để phát âm chuẩn tiếng Anh',
      author: 'Lisa Chen',
      date: 'Mar 18, 2024',
      content:
        'Phát âm là nền tảng, bạn nên thực hành từng âm, theo dõi miệng và lắng nghe bản thu chuẩn. Sử dụng các video có phụ đề và bắt chước kỹ thuật phát âm từng âm tiết để cải thiện rõ rệt trong vài tuần.',
      reports: 1,
      status: 'pending',
    },
    {
      id: 'P003',
      title: 'Sử dụng flashcards hiệu quả',
      author: 'Emma Wilson',
      date: 'Mar 10, 2024',
      content:
        'Flashcards là công cụ tuyệt vời cho việc ôn luyện ngắn hạn. Chia nhỏ thông tin, đặt câu hỏi ở 1 mặt và câu trả lời ở mặt còn lại. Kéo dài khoảng thời gian ôn tập theo lịch trình lặp lại để giữ thông tin trong trí nhớ dài hạn.',
      reports: 0,
      status: 'pending',
    },
    {
      id: 'P004',
      title: 'Top 10 lỗi sai ngữ pháp thường gặp',
      author: 'David Brown',
      date: 'Mar 05, 2024',
      content:
        'Nhiều người học hay mắc lỗi về thì, mạo từ, và cấu trúc câu. Bài viết này liệt kê 10 lỗi phổ biến và cách khắc phục từng lỗi với ví dụ minh họa cụ thể để bạn luyện tập từng ngày.',
      reports: 3,
      status: 'pending',
    },
  ]);

  // Activity logs (new enhanced format). Most recent first.
  const [logs, setLogs] = useState([]);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, searchTerm]);

  const pendingCount = useMemo(
    () => posts.filter((p) => p.status === 'pending').length,
    [posts]
  );

  // Logging helper - keeps max 20 entries
  const addLog = (type, name) => {
    const entry = { type, name, time: new Date().toLocaleTimeString() };
    setLogs((prev) => {
      const next = [entry, ...prev];
      return next.slice(0, 20);
    });
  };

  // User actions
  const toggleSuspend = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const nextStatus = u.status === 'suspended' ? 'active' : 'suspended';
        if (nextStatus === 'suspended') {
          addLog('account_suspended', u.name);
        }
        return { ...u, status: nextStatus };
      })
    );
  };

  const deleteUser = (userId) => {
    const confirm = window.confirm('Xóa tài khoản này? Hành động này không thể hoàn tác.');
    if (!confirm) return;
    const user = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (user) addLog('account_deleted', user.name);
  };

  const warnUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newWarnings = (u.warnings || 0) + 1;
        const willSuspend = newWarnings >= 3 && u.status !== 'suspended';
        const updated = { ...u, warnings: newWarnings, status: willSuspend ? 'suspended' : u.status };
        addLog('warning_issued', u.name);
        if (willSuspend) addLog('account_suspended', u.name);
        return updated;
      })
    );
  };

  // Moderation actions for posts
  const approvePost = (postId) => {
    const p = posts.find((x) => x.id === postId);
    setPosts((prev) => prev.filter((x) => x.id !== postId));
    if (p) addLog('post_approved', p.title);
  };

  const rejectPost = (postId) => {
    const p = posts.find((x) => x.id === postId);
    setPosts((prev) => prev.filter((x) => x.id !== postId));
    if (p) addLog('post_rejected', p.title);
  };

  // Local UI state for expanded posts
  const [expandedPostIds, setExpandedPostIds] = useState({});
  const toggleExpandPost = (id) => {
    setExpandedPostIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Role-based access control (render-block inside component)
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Không có quyền truy cập</h2>
          <p className="text-sm text-muted-foreground">Bạn không có quyền xem trang này</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Shield size={28} className="text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">System management & user oversight</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="md"
              className="flex items-center gap-2"
              onClick={() => console.log('Export data')}
            >
              <Download size={16} />
              Export Data
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {['overview', 'users', 'content', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm capitalize ${
                  activeTab === tab ? 'bg-primary-600 text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'content' ? `Nội dung (${pendingCount})` : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border-2 border-border p-6 flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Users size={28} className="text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Tổng người dùng</div>
                  <div className="text-3xl font-bold">
                    0 {/* TODO: thay bằng dữ liệu API */}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border p-6 flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Activity size={28} className="text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Hoạt động hôm nay</div>
                  <div className="text-3xl font-bold">
                    0 {/* TODO: thay bằng dữ liệu API */}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border p-6 flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Flag size={28} className="text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Báo cáo chờ xử lý</div>
                  <div className="text-3xl font-bold">
                    0 {/* TODO: thay bằng dữ liệu API */}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-border p-6 flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen size={28} className="text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Bộ học</div>
                  <div className="text-3xl font-bold">
                    0 {/* TODO: thay bằng dữ liệu API */}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-white rounded-2xl border-2 border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Nhật ký hoạt động</h3>
                <div className="text-sm text-muted-foreground">Mới nhất ở trên</div>
              </div>

              {logs.length === 0 ? (
                <div className="text-sm text-muted-foreground">Chưa có hành động nào.</div>
              ) : (
                <ul className="divide-y divide-border max-h-72 overflow-auto">
                  {logs.map((l, idx) => (
                    <li key={idx} className="py-3 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-foreground">{l.name}</div>
                        <div className="text-xs text-muted-foreground">{l.type}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{l.time}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                className="md:flex-1"
              />
              <Button variant="primary" size="md" className="flex items-center gap-2 w-full md:w-auto">
                <Plus size={16} />
                New User
              </Button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border-2 border-border p-4 overflow-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Vai trò</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3">Vi phạm</th>
                    <th className="px-4 py-3">Ngày tham gia</th>
                    <th className="px-4 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const rowBg =
                      u.status === 'suspended'
                        ? 'bg-red-50'
                        : (u.warnings || 0) > 0
                        ? 'bg-yellow-50'
                        : '';
                    return (
                      <tr key={u.id} className={`${rowBg} border-t border-border`}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100">
                              {u.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{u.name}</div>
                              <div className="text-xs text-muted-foreground">{u.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">{u.email}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm capitalize">{u.role}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {u.status === 'suspended' ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                                Đình chỉ
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                {u.status}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {(u.warnings || 0) > 0 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                                ⚠ {u.warnings}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">{u.joinDate}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSuspend(u.id)}
                              className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm"
                            >
                              {u.status === 'suspended' ? 'Kích hoạt' : 'Đình chỉ'}
                            </button>
                            <button
                              onClick={() => warnUser(u.id)}
                              className="px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700 text-sm"
                            >
                              Cảnh báo
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-sm"
                            >
                              Xóa tài khoản
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-sm text-muted-foreground">
                        Không tìm thấy người dùng.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Moderation Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.filter((p) => p.status === 'pending').length === 0 ? (
                <div className="col-span-full bg-white rounded-2xl border-2 border-border p-8 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Không có nội dung nào cần kiểm duyệt</h3>
                  <p className="text-sm text-muted-foreground">Tất cả bài viết đã được xử lý.</p>
                </div>
              ) : (
                posts
                  .filter((p) => p.status === 'pending')
                  .map((p) => {
                    const isExpanded = !!expandedPostIds[p.id];
                    return (
                      <div key={p.id} className="bg-white rounded-2xl border-2 border-border p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">{p.title}</h4>
                            <div className="text-xs text-muted-foreground">
                              {p.author} • {p.date} • Báo cáo: {p.reports}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                approvePost(p.id);
                              }}
                              className="px-3 py-1 rounded-lg bg-green-50 text-green-700 text-sm"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() => {
                                rejectPost(p.id);
                              }}
                              className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-sm"
                            >
                              Từ chối
                            </button>
                            <button
                              onClick={() => toggleExpandPost(p.id)}
                              className="px-3 py-1 rounded-lg bg-secondary text-foreground text-sm"
                            >
                              {isExpanded ? 'Thu gọn' : 'Xem đầy đủ'}
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-foreground">
                          {isExpanded ? p.content : p.content.length > 100 ? p.content.slice(0, 100) + '…' : p.content}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border-2 border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings size={28} className="text-primary-600" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
                <p className="text-sm text-muted-foreground">Configure platform behavior and preferences</p>
              </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-6">
              <div className="pb-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Security</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">Enable two-factor authentication</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">Require email verification for new users</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-foreground">Enable IP whitelisting</span>
                  </label>
                </div>
              </div>

              <div className="pb-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">Notify on new user registration</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">Daily activity summary</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-foreground">Alert on system errors</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Platform</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Maintenance Mode</label>
                    <select className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground">
                      <option>Disabled</option>
                      <option>Enabled - All Users</option>
                      <option>Enabled - Except Admins</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Max Upload Size (MB)</label>
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}