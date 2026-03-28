export default function StatsCard({ icon: Icon, label, value, color = "primary" }) {
  const colorClasses = {
    primary: "bg-blue-50 text-primary-600 border-blue-200",
    green: "bg-green-50 text-success text-green-600 border-green-200",
    orange: "bg-orange-50 text-warning text-orange-600 border-orange-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <div className={`rounded-2xl border-2 p-6 space-y-3 transition-all hover:shadow-md ${colorClasses[color]}`}>
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color].split(' ')[0]}`}>
        <Icon size={24} />
      </div>

      {/* Value */}
      <div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}
