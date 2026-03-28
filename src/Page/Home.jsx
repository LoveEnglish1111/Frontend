import { BookOpen, Flame, Share2, Trophy } from "lucide-react";
import WelcomeCard from "../components/WelcomeCard";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";

export default function Home({ currentUser }) {
  const userStats = {
    wordsLearned: 245,
    dayStreak: 12,
    postsShared: 8,
    totalPoints: 1250,
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
          <WelcomeCard currentUser={currentUser} />
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

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-semibold text-foreground mb-2">Chưa có hoạt động nào</p>
            <p className="text-sm text-muted-foreground">Hãy bắt đầu học để hoạt động của bạn hiển thị tại đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}
