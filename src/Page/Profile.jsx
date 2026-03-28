import { useAuth } from '../context/AuthContext';
import { Edit2, Settings, LogOut, Award, BookOpen, Trophy, Zap } from 'lucide-react';
import Button from '../components/Button';
import AchievementBadge from '../components/AchievementBadge';
import LearningStreak from '../components/LearningStreak';
import StatCircle from '../components/StatCircle';

export default function Profile() {
  const { user, signout } = useAuth();

  // Mock user data
  const mockUser = {
    name: 'Alex Johnson',
    email: user?.email || 'alex.johnson@example.com',
    avatar: '👨‍🎓',
    joinDate: 'January 15, 2024',
    bio: 'Passionate about learning English and connecting with learners worldwide!',
    level: 'Advanced',
  };

  // Mock achievements
  const achievements = [
    {
      name: 'First Steps',
      type: 'First Steps',
      description: 'Complete your first lesson',
      unlocked: true,
    },
    {
      name: 'Speed Learner',
      type: 'Speed Learner',
      description: 'Learn 10 words in one day',
      unlocked: true,
      progress: 100,
    },
    {
      name: 'Perfect Streak',
      type: 'Perfect Streak',
      description: '7-day consecutive learning',
      unlocked: true,
      progress: 100,
    },
    {
      name: 'Grammar Master',
      type: 'Grammar Master',
      description: 'Complete 5 grammar lessons',
      unlocked: false,
      progress: 60,
    },
    {
      name: 'Vocabulary King',
      type: 'Vocabulary King',
      description: 'Learn 500+ vocabulary words',
      unlocked: false,
      progress: 45,
    },
    {
      name: 'Dedication',
      type: 'Dedication',
      description: '30-day learning streak',
      unlocked: false,
      progress: 33,
    },
  ];

  // Mock streak data (84 days = 12 weeks)
  const streakDays = Array.from({ length: 84 }, (_, i) => {
    if (i < 10) return Math.floor(Math.random() * 3);
    if (i < 20) return Math.floor(Math.random() * 4);
    if (i < 30) return 0;
    if (i < 50) return Math.floor(Math.random() * 3);
    return Math.floor(Math.random() * 2);
  });

  // Mock learning history
  const learningHistory = [
    { date: 'Today', items: 3, hours: 1.5 },
    { date: 'Yesterday', items: 5, hours: 2.0 },
    { date: '2 days ago', items: 4, hours: 1.8 },
    { date: '3 days ago', items: 6, hours: 2.5 },
    { date: '4 days ago', items: 2, hours: 0.9 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Background */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-32"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border-2 border-border shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* User Info */}
            <div className="flex items-start gap-6 mb-6 md:mb-0 flex-1">
              <div className="text-6xl">{mockUser.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{mockUser.name}</h1>
                  <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {mockUser.level}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">{mockUser.email}</p>
                <p className="text-sm text-muted-foreground mb-2">{mockUser.bio}</p>
                <p className="text-xs text-muted-foreground">
                  Member since {mockUser.joinDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="md"
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
              >
                <Edit2 size={16} />
                Edit
              </Button>
              <Button
                variant="outline"
                size="md"
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
              >
                <Settings size={16} />
                Settings
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={signout}
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCircle
            label="Cards Learned"
            value={245}
            total={500}
            color="primary"
            icon={BookOpen}
          />
          <StatCircle
            label="Study Sets"
            value={8}
            total={20}
            color="success"
            icon={Trophy}
          />
          <StatCircle
            label="Streak Days"
            value={12}
            total={30}
            color="warning"
            icon={Zap}
          />
          <StatCircle
            label="Achievements"
            value={3}
            total={6}
            color="purple"
            icon={Award}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Learning Streak */}
          <div className="lg:col-span-2">
            <LearningStreak
              currentStreak={12}
              longestStreak={28}
              streakDays={streakDays}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border-2 border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Total Study Time</span>
                  <span className="text-sm font-bold text-foreground">68.5 hours</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Words Mastered</span>
                  <span className="text-sm font-bold text-foreground">245/500</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: '49%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Accuracy Rate</span>
                  <span className="text-sm font-bold text-foreground">87%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Next Level: Advanced Pro</p>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600" style={{ width: '72%' }}></div>
                </div>
                <p className="text-xs text-primary-600 font-semibold mt-1">72% to next level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                badge={achievement}
                unlocked={achievement.unlocked}
                progress={achievement.progress || 0}
              />
            ))}
          </div>
        </div>

        {/* Learning History */}
        <div className="bg-white rounded-2xl border-2 border-border p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {learningHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{entry.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.items} card{entry.items !== 1 ? 's' : ''} learned
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">{entry.hours}h</p>
                  <p className="text-xs text-muted-foreground">study time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}