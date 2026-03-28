export default function StatCircle({ label, value, total, color = 'primary', icon: Icon }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: {
      circle: 'stroke-primary-600',
      bg: 'bg-primary-100',
      text: 'text-primary-600',
    },
    success: {
      circle: 'stroke-success',
      bg: 'bg-success bg-opacity-10',
      text: 'text-success',
    },
    warning: {
      circle: 'stroke-warning',
      bg: 'bg-warning bg-opacity-10',
      text: 'text-warning',
    },
    purple: {
      circle: 'stroke-purple-600',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
    orange: {
      circle: 'stroke-orange-600',
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="3"
            stroke="currentColor"
            className="text-slate-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            className={`${colors.circle} transition-all duration-500`}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Icon && (
            <div className={`p-2 ${colors.bg} rounded-lg mb-1`}>
              <Icon size={20} className={colors.text} />
            </div>
          )}
          <p className={`text-2xl font-bold ${colors.text}`}>{Math.round(percentage)}%</p>
          <p className="text-xs text-muted-foreground">{value}/{total}</p>
        </div>
      </div>

      <p className="text-center text-sm font-semibold text-foreground">{label}</p>
    </div>
  );
}
