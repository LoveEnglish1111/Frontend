import { Flame, Calendar, Trophy } from 'lucide-react';

export default function LearningStreak({ currentStreak, longestStreak, streakDays }) {
  // Generate calendar grid for last 12 weeks (84 days)
  const getStreakColor = (dayIndex) => {
    if (dayIndex < streakDays.length) {
      const activity = streakDays[dayIndex];
      if (activity === 0) return 'bg-slate-100'; // No activity
      if (activity === 1) return 'bg-primary-200'; // Light activity
      if (activity === 2) return 'bg-primary-400'; // Medium activity
      if (activity >= 3) return 'bg-primary-600'; // High activity
    }
    return 'bg-slate-50';
  };

  const weeks = [];
  for (let i = 0; i < Math.ceil(streakDays.length / 7); i++) {
    weeks.push(streakDays.slice(i * 7, (i + 1) * 7));
  }

  const today = new Date();
  const lastDay = new Date(today);
  lastDay.setDate(lastDay.getDate() - (streakDays.length - 1));

  return (
    <div className="bg-white rounded-2xl border-2 border-border p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Flame size={24} className="text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Learning Streak</h3>
          <p className="text-sm text-muted-foreground">Keep your momentum going!</p>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-1 mb-1">
            <Flame size={20} />
            {currentStreak}
          </div>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 flex items-center justify-center gap-1 mb-1">
            <Trophy size={20} />
            {longestStreak}
          </div>
          <p className="text-sm text-muted-foreground">Longest Streak</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-muted-foreground" />
          <p className="text-sm font-semibold text-muted-foreground">
            Last 12 weeks
            {/* {lastDay.toLocaleDateString()} */}
          </p>
        </div>

        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-1">
              {week.map((activity, dayIndex) => {
                const realDayIndex = weekIndex * 7 + dayIndex;
                return (
                  <div
                    key={realDayIndex}
                    className={`w-3 h-3 rounded transition-all hover:scale-125 cursor-pointer ${getStreakColor(realDayIndex)}`}
                    title={`Day ${streakDays.length - realDayIndex}: ${activity} activities`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-100 rounded"></div>
          <span className="text-xs text-muted-foreground">None</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-200 rounded"></div>
          <span className="text-xs text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-400 rounded"></div>
          <span className="text-xs text-muted-foreground">Med</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-600 rounded"></div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>

      {/* Motivational Message */}
      {currentStreak > 0 && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm font-semibold text-orange-700">
            🔥 Amazing! You're on a {currentStreak}-day streak. Keep it going!
          </p>
        </div>
      )}
    </div>
  );
}
