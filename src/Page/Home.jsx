import { BookOpen, Flame, Share2, Trophy } from "lucide-react";
import WelcomeCard from "../components/WelcomeCard";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";

export default function Home() {
  // Mock data - In Phase 3+, this will come from API
  const userStats = {
    wordsLearned: ,
    dayStreak: 0,
    postsShared: 0,
    totalPoints: 0,
  };

  const recentActivity = [
    {
      id: 1,
      action: "Completed Flashcard Set",
      description: "Phrasal Verbs - Advanced Level",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      action: "Posted in Community",
      description: "Tips for IELTS Speaking Test",
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      action: "Learned New Words",
      description: "Business English Vocabulary",
      timeAgo: "Yesterday",
    },
  ];

  return (
    <div className="flex-1 bg-background overflow-auto">
      {/* Main Content */}
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <WelcomeCard userName="John" />
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

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>

          {/* Activity List */}
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 hover:bg-secondary rounded-lg transition-colors border-l-4 border-primary-600"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <p className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                  {activity.timeAgo}
                </p>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="ghost" size="md">
              View All Activity →
            </Button>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Study Sets",
              description: "Continue learning with flashcards",
              icon: "📚",
            },
            {
              title: "Community",
              description: "Share tips and learn from others",
              icon: "👥",
            },
            {
              title: "Today's Quiz",
              description: "Test your knowledge daily",
              icon: "🎯",
            },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-white rounded-2xl p-6 border-2 border-border hover:border-primary-600 hover:shadow-md transition-all text-left"
            >
              <p className="text-3xl mb-2">{item.icon}</p>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
