import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Zap, User } from "lucide-react";

export default function WelcomeCard({ currentUser }) {
  const navigate = useNavigate();

  const userName = currentUser?.name || "there";

  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon";
  if (currentHour >= 18) greeting = "Good Evening";

  const quickActions = [
    { label: 'Study Sets', icon: BookOpen, path: '/StudySets' },
    { label: 'Community', icon: Users, path: '/Community' },
    { label: 'Today Quiz', icon: Zap, path: '/StudySets?tab=daily' },
    { label: 'Profile', icon: User, path: '/Profile' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Greeting */}
        <h2 className="text-3xl font-bold mb-2">{greeting}, {userName}! 👋</h2>
        <p className="text-blue-100 text-lg mb-8">
          Welcome back to ELSN. Ready to continue your English learning journey?
        </p>

        {/* Quick Navigation Buttons */}
        <div className="flex gap-3 flex-wrap">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => handleNavigation(action.path)}
                className="flex flex-col items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl transition-all duration-200"
              >
                <IconComponent size={24} />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
