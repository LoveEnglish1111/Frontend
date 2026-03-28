import { Users, BookOpen, TrendingUp, Award, Activity, AlertCircle } from 'lucide-react';

export default function SystemStats({ stats }) {
  const defaultStats = {
    totalUsers: 1248,
    activeUsers: 387,
    totalStudySets: 156,
    totalCards: 12540,
    averageLevel: 'Intermediate',
    systemHealth: 99.2,
  };

  const data = stats || defaultStats;

  const statCards = [
    {
      label: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      color: 'blue',
      trend: '+12 this week',
    },
    {
      label: 'Active Users',
      value: data.activeUsers,
      icon: Activity,
      color: 'green',
      trend: '+8 today',
    },
    {
      label: 'Study Sets',
      value: data.totalStudySets,
      icon: BookOpen,
      color: 'purple',
      trend: '+3 this week',
    },
    {
      label: 'Total Cards',
      value: data.totalCards,
      icon: TrendingUp,
      color: 'orange',
      trend: '+240 this week',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700',
      },
      green: {
        bg: 'bg-success bg-opacity-10',
        icon: 'text-success',
        border: 'border-success border-opacity-30',
        badge: 'bg-success bg-opacity-20 text-success',
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700',
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* System Health */}
      <div className="bg-white rounded-2xl border-2 border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <AlertCircle className="text-success" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">System Health</h3>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-success">{data.systemHealth}%</p>
            <p className="text-xs text-muted-foreground">uptime last 7d</p>
          </div>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300"
            style={{ width: `${data.systemHealth}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const colors = getColorClasses(card.color);

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border-2 ${colors.border} p-6 hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-foreground mb-2">{card.value.toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${colors.badge} px-2 py-1 rounded-full inline-block`}>
                    {card.trend}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon size={24} className={colors.icon} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-2xl border-2 border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {Math.round((data.activeUsers / data.totalUsers) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Activity Rate</p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.activeUsers} / {data.totalUsers} users
            </p>
          </div>
          <div className="text-center border-l border-r border-border">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {Math.round(data.totalCards / data.totalStudySets)}
            </div>
            <p className="text-sm text-muted-foreground">Avg Cards per Set</p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalCards} total cards
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">
              {data.averageLevel}
            </div>
            <p className="text-sm text-muted-foreground">Avg User Level</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {data.totalUsers} users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
