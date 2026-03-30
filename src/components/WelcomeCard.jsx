import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Zap, User } from "lucide-react";
import Button from "./Button";

export default function WelcomeCard({ userName = "John" }) {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon";
  if (currentHour >= 18) greeting = "Good Evening";

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Greeting */}
        <h2 className="text-3xl font-bold mb-2">
          {greeting}, {userName}! 👋
        </h2>
        <p className="text-blue-100 text-lg mb-6">
          Welcome back to ELSN. Ready to continue your English learning journey?
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            size="md"
            className="border-white text-white hover:bg-white hover:bg-opacity-10"
            onClick={() => navigate("/StudySets")}
          >
            Start Learning
          </Button>
          <Button
            variant="outline"
            size="md"
            className="border-white text-white hover:bg-white hover:bg-opacity-10"
            onClick={() => navigate("/Profile")}
          >
            View Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
