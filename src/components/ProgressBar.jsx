export default function ProgressBar({ current, total, color = "primary" }) {
  const percentage = (current / total) * 100;
  
  const colorClasses = {
    primary: "bg-primary-600",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {/* Stats */}
      <p className="text-xs text-muted-foreground font-medium mt-1">
        {current}/{total} cards
      </p>
    </div>
  );
}
