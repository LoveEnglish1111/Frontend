import { Trash2, Edit2, Shield, User, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

export default function UserTable({ users = [], onEdit, onDelete, onPromote }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [sortBy, setSortBy] = useState('joinDate');

    const toggleSelectUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId],
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map((u) => u.id));
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'text-red-600 bg-red-50 border border-red-200';
            case 'teacher':
                return 'text-blue-600 bg-blue-50 border border-blue-200';
            default:
                return 'text-slate-600 bg-slate-50 border border-slate-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-success bg-success bg-opacity-10';
            case 'inactive':
                return 'text-warning bg-warning bg-opacity-10';
            case 'banned':
                return 'text-danger bg-danger bg-opacity-10';
            default:
                return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-border overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-foreground">
                        User Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {selectedUsers.length > 0
                            ? `${selectedUsers.length} user${selectedUsers.length !== 1 ? 's' : ''} selected`
                            : `${users.length} total user${users.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                {selectedUsers.length > 0 && (
                    <Button
                        variant="danger"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        Delete Selected
                    </Button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-slate-50">
                            <th className="px-6 py-4 text-left">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedUsers.length === users.length &&
                                        users.length > 0
                                    }
                                    onChange={toggleSelectAll}
                                    className="rounded border-border cursor-pointer"
                                />
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                User
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                Joined
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className={`border-b border-border hover:bg-slate-50 transition-colors ${
                                    selectedUsers.includes(user.id)
                                        ? 'bg-primary-50'
                                        : ''
                                }`}
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(
                                            user.id,
                                        )}
                                        onChange={() =>
                                            toggleSelectUser(user.id)
                                        }
                                        className="rounded border-border cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {user.id}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {user.joinDate}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            onClick={() =>
                                                onEdit && onEdit(user.id)
                                            }
                                            className="p-2 hover:bg-primary-50 rounded-lg transition-colors text-primary-600"
                                            title="Edit user"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                onPromote && onPromote(user.id)
                                            }
                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                            title="Promote to teacher"
                                            disabled={user.role === 'admin'}
                                        >
                                            <Shield size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                onDelete && onDelete(user.id)
                                            }
                                            className="p-2 hover:bg-danger hover:bg-opacity-10 rounded-lg transition-colors text-danger"
                                            title="Delete user"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {users.length === 0 && (
                <div className="text-center py-12">
                    <User
                        size={32}
                        className="mx-auto text-muted-foreground mb-3 opacity-50"
                    />
                    <p className="text-muted-foreground">No users found</p>
                </div>
            )}
        </div>
    );
}
