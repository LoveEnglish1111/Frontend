import { Clock, CheckCircle, AlertCircle, Trash2, Edit2, Plus, Shield, Eye } from 'lucide-react';

export default function ActivityLog({ activities = [] }) {
  const defaultActivities = [
    {
      id: 1,
      timestamp: '2 minutes ago',
      user: 'John Doe',
      action: 'user_created',
      details: 'New user registered',
      status: 'success',
    },
    {
      id: 2,
      timestamp: '15 minutes ago',
      user: 'Sarah Admin',
      action: 'content_updated',
      details: 'Updated 3 study sets',
      status: 'success',
    },
    {
      id: 3,
      timestamp: '1 hour ago',
      user: 'System',
      action: 'user_deleted',
      details: 'Inactive user account removed',
      status: 'warning',
    },
    {
      id: 4,
      timestamp: '2 hours ago',
      user: 'Mike Teacher',
      action: 'role_changed',
      details: 'Promoted user to teacher',
      status: 'success',
    },
    {
      id: 5,
      timestamp: '3 hours ago',
      user: 'Security',
      action: 'login_failed',
      details: 'Multiple failed login attempts detected',
      status: 'error',
    },
  ];

  const data = activities.length > 0 ? activities : defaultActivities;

  const getActionIcon = (action) => {
    const icons = {
      user_created: Plus,
      content_updated: Edit2,
      user_deleted: Trash2,
      role_changed: Shield,
      login_failed: AlertCircle,
      viewed: Eye,
    };
    return icons[action] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      success: 'text-success bg-success bg-opacity-10',
      warning: 'text-warning bg-warning bg-opacity-10',
      error: 'text-danger bg-danger bg-opacity-10',
      info: 'text-info bg-info bg-opacity-10',
    };
    return colors[status] || colors.info;
  };

  const getActionLabel = (action) => {
    const labels = {
      user_created: 'User Created',
      content_updated: 'Content Updated',
      user_deleted: 'User Deleted',
      role_changed: 'Role Changed',
      login_failed: 'Login Failed',
      viewed: 'Content Viewed',
    };
    return labels[action] || action;
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-bold text-foreground">System Activity Log</h3>
        <p className="text-sm text-muted-foreground">Recent actions on the platform</p>
      </div>

      {/* Activity Timeline */}
      <div className="divide-y divide-border">
        {data.map((activity, index) => {
          const Icon = getActionIcon(activity.action);

          return (
            <div key={activity.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${getStatusColor(activity.status)}`}>
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <p className="font-semibold text-foreground">
                        {getActionLabel(activity.action)}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <span className={`text-xs font-semibold inline-block px-2 py-1 rounded-full flex-shrink-0 ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {activity.timestamp}
                    </span>
                    <span>•</span>
                    <span>By {activity.user}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border text-center">
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
          View All Activities →
        </button>
      </div>
    </div>
  );
}
