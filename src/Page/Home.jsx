import { useEffect, useState } from 'react';
import { BookOpen, Flame, Share2, Trophy } from 'lucide-react';
import WelcomeCard from '../components/WelcomeCard';
import StatsCard from '../components/StatsCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    wordsLearned: 0,
    dayStreak: 0,
    postsShared: 0,
    totalPoints: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Khởi tạo dữ liệu từ localStorage hoặc mock data
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    } else {
      const mockStats = {
        wordsLearned: 245,
        dayStreak: 12,
        postsShared: 8,
        totalPoints: 3420,
      };
      setUserStats(mockStats);
      localStorage.setItem('userStats', JSON.stringify(mockStats));
    }

    // Khởi tạo activities
    const recentActivities = [
      {
        id: 1,
        action: '✅ Completed Flashcard Set',
        description: 'Phrasal Verbs - Advanced Level',
        timeAgo: '2 hours ago',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
      },
      {
        id: 2,
        action: '💬 Posted in Community',
        description: 'Tips for IELTS Speaking Test',
        timeAgo: '5 hours ago',
        timestamp: Date.now() - 5 * 60 * 60 * 1000,
      },
      {
        id: 3,
        action: '📚 Learned New Words',
        description: 'Business English Vocabulary',
        timeAgo: 'Yesterday',
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
      },
      {
        id: 4,
        action: '🎯 Completed Quiz',
        description: 'Present Perfect Tense - 95% Accuracy',
        timeAgo: '2 days ago',
        timestamp: Date.now() - 48 * 60 * 60 * 1000,
      },
      {
        id: 5,
        action: '🔥 Achieved 7-Day Streak',
        description: 'Keep up the great work!',
        timeAgo: '3 days ago',
        timestamp: Date.now() - 72 * 60 * 60 * 1000,
      },
    ];
    setActivities(recentActivities);
  }, []);

  const incrementStat = (statKey) => {
    const updatedStats = {
      ...userStats,
      [statKey]: userStats[statKey] + 1,
    };
    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));
  };

  return (
    <div className="flex-1 bg-background overflow-auto">
      {/* Main Content */}
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <WelcomeCard currentUser={user} />
        </div>

        {/* Statistics Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={BookOpen}
              label="Words Learned"
              value={userStats.wordsLearned}
              color="primary"
            />
            <StatsCard
              icon={Flame}
              label="Day Streak"
              value={userStats.dayStreak}
              color="orange"
            />
            <StatsCard
              icon={Share2}
              label="Posts Shared"
              value={userStats.postsShared}
              color="green"
            />
            <StatsCard
              icon={Trophy}
              label="Total Points"
              value={userStats.totalPoints}
              color="purple"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            size="md"
            className="w-full text-center"
            onClick={() => incrementStat('wordsLearned')}
          >
            📖 Learn Words
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full text-center"
            onClick={() => incrementStat('postsShared')}
          >
            💬 Share Post
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full text-center"
            onClick={() => incrementStat('dayStreak')}
          >
            🔥 Daily Streak
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full text-center"
            onClick={() => incrementStat('totalPoints')}
          >
            ⭐ Earn Points
          </Button>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>

          {activities && activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border-l-4 border-primary-600"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-3">📭</div>
              <p className="font-semibold text-foreground mb-2">Chưa có hoạt động nào</p>
              <p className="text-sm text-muted-foreground">Hãy bắt đầu học để hoạt động của bạn hiển thị tại đây</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
