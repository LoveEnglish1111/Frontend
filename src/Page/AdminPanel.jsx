import { useState } from 'react';
import { Shield, Plus, Search, Download, Settings } from 'lucide-react';
import Button from '../components/Button';
import UserTable from '../components/UserTable';
import SystemStats from '../components/SystemStats';
import ActivityLog from '../components/ActivityLog';
import Input from '../components/Input';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock users data
    const mockUsers = [
        {
            id: 'USR001',
            name: 'Alex Johnson',
            avatar: '👨‍🎓',
            email: 'alex@example.com',
            role: 'user',
            status: 'active',
            joinDate: 'Jan 15, 2024',
        },
        {
            id: 'USR002',
            name: 'Sarah Admin',
            avatar: '👩‍💼',
            email: 'sarah@example.com',
            role: 'admin',
            status: 'active',
            joinDate: 'Dec 1, 2023',
        },
        {
            id: 'USR003',
            name: 'Mike Teacher',
            avatar: '👨‍🏫',
            email: 'mike@example.com',
            role: 'teacher',
            status: 'active',
            joinDate: 'Feb 10, 2024',
        },
        {
            id: 'USR004',
            name: 'Emma Wilson',
            avatar: '👩‍🎓',
            email: 'emma@example.com',
            role: 'user',
            status: 'inactive',
            joinDate: 'Jan 5, 2024',
        },
        {
            id: 'USR005',
            name: 'David Brown',
            avatar: '👨‍🎓',
            email: 'david@example.com',
            role: 'user',
            status: 'active',
            joinDate: 'Mar 1, 2024',
        },
        {
            id: 'USR006',
            name: 'Lisa Chen',
            avatar: '👩‍🎓',
            email: 'lisa@example.com',
            role: 'teacher',
            status: 'active',
            joinDate: 'Jan 20, 2024',
        },
    ];

    const handleEditUser = (userId) => {
        console.log('Edit user:', userId);
        // TODO: Open edit modal
    };

    const handleDeleteUser = (userId) => {
        console.log('Delete user:', userId);
        // TODO: Show confirmation and delete
    };

    const handlePromoteUser = (userId) => {
        console.log('Promote user:', userId);
        // TODO: Promote to teacher
    };

    const handleExportData = () => {
        console.log('Export data');
        // TODO: Export users/stats to CSV
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-border sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary-100 rounded-lg">
                                <Shield
                                    size={28}
                                    className="text-primary-600"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">
                                    Admin Panel
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    System management & user oversight
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="md"
                            className="flex items-center gap-2"
                            onClick={handleExportData}
                        >
                            <Download size={16} />
                            Export Data
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2">
                        {['overview', 'users', 'content', 'settings'].map(
                            (tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm capitalize ${
                                        activeTab === tab
                                            ? 'bg-primary-600 text-white'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <SystemStats />
                        <ActivityLog />
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
                            <Button
                                variant="primary"
                                size="md"
                                className="flex items-center gap-2 w-full md:w-auto"
                            >
                                <Plus size={16} />
                                New User
                            </Button>
                        </div>

                        {/* Users Table */}
                        <UserTable
                            users={mockUsers.filter(
                                (user) =>
                                    user.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||
                                    user.email
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase()),
                            )}
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                            onPromote={handlePromoteUser}
                        />
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="bg-white rounded-2xl border-2 border-border p-8 text-center">
                        <div className="mb-4 text-5xl">📚</div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                            Content Management
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Manage study sets, cards, categories, and other
                            learning content
                        </p>
                        <Button
                            variant="primary"
                            className="flex items-center gap-2 mx-auto"
                        >
                            <Plus size={16} />
                            Visit Content Manager
                        </Button>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl border-2 border-border p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Settings size={28} className="text-primary-600" />
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    System Settings
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Configure platform behavior and preferences
                                </p>
                            </div>
                        </div>

                        {/* Settings Options */}
                        <div className="space-y-6">
                            {/* Security Settings */}
                            <div className="pb-6 border-b border-border">
                                <h3 className="text-lg font-bold text-foreground mb-4">
                                    Security
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Enable two-factor authentication
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Require email verification for new
                                            users
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Enable IP whitelisting
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Email Settings */}
                            <div className="pb-6 border-b border-border">
                                <h3 className="text-lg font-bold text-foreground mb-4">
                                    Email Notifications
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Notify on new user registration
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Daily activity summary
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                        />
                                        <span className="text-foreground">
                                            Alert on system errors
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Platform Settings */}
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4">
                                    Platform
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">
                                            Maintenance Mode
                                        </label>
                                        <select className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground">
                                            <option>Disabled</option>
                                            <option>Enabled - All Users</option>
                                            <option>
                                                Enabled - Except Admins
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">
                                            Max Upload Size (MB)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={50}
                                            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
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
