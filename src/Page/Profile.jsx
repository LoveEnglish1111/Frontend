import { useAuth } from "../context/AuthContext";
import {
  Edit2,
  Settings,
  LogOut,
  Award,
  BookOpen,
  Trophy,
  Zap,
  X,
  Check,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import AchievementBadge from "../components/AchievementBadge";
import LearningStreak from "../components/LearningStreak";
import StatCircle from "../components/StatCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../api/UserApi";

export default function Profile() {
  const { user, signout } = useAuth();
  const [profile, setProfile] = useState({
    achievementData: [],
    learningHistoryData: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");
  const [editedAvatar, setEditedAvatar] = useState(user?.avatar || "");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`http://localhost:1111/profile?user_id=${user._id}`);
        const res = await axios.get(`${URL}/profile?user_id=${user._id}`);
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // Mock user data
  const mockUser = user;
  // Mock achievements
  const achievements = profile.achievementData;

  const streakDays = Array.from({ length: 84 }, (_, i) => {
    if (i < 10) return Math.floor(Math.random() * 3);
    if (i < 20) return Math.floor(Math.random() * 4);
    if (i < 30) return 0;
    if (i < 50) return Math.floor(Math.random() * 3);
    return Math.floor(Math.random() * 2);
  });

  // Mock learning history
  const learningHistory = profile.learningHistoryData;

  const handleEdit = () => {
    setEditedUsername(user?.username || "");
    setEditedAvatar(user?.avatar || "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Update user object
    user.username = editedUsername;
    user.avatar = editedAvatar;
    setIsEditing(false);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleChangePassword = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Vui lòng điền đầy đủ các trường");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    // Call API to change password
    axios
      .post(`${URL}/change-password`, {
        userId: user._id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Mật khẩu đã được thay đổi thành công");
          handleCloseSettings();
        } else {
          alert(res.data.message || "Thay đổi mật khẩu thất bại");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          error.response?.data?.message ||
            "Lỗi: Mật khẩu hiện tại không đúng hoặc có lỗi server",
        );
      });
  };

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
            {isEditing ? (
              // Edit Mode
              <div className="flex items-start gap-6 mb-6 md:mb-0 flex-1 w-full">
                <div className="text-5xl">
                  <Input
                    type="text"
                    placeholder="Enter emoji"
                    value={editedAvatar}
                    onChange={(e) => setEditedAvatar(e.target.value)}
                    maxLength={2}
                    containerClassName="w-20"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Enter your username"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSave}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex items-start gap-6 mb-6 md:mb-0 flex-1">
                {/* <div className="text-6xl">{mockUser.avatar}</div> */}
                <div className="text-6xl w-25 h-25">
                  <img
                    src={`https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&name=${user.username.slice(0, 2)}`}
                    alt="User Avatar"
                    className="w-full h-full rounded-lg flex-shrink-0"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {mockUser.username}
                    </h1>
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {mockUser.level}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{mockUser.email}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {mockUser.bio}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Member since {mockUser.joinDate}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              {!isEditing && (
                <Button
                  variant="outline"
                  size="md"
                  className="flex items-center justify-center gap-2 flex-1 md:flex-none"
                  onClick={handleEdit}
                >
                  <Edit2 size={16} />
                  Edit
                </Button>
              )}
              <Button
                variant="outline"
                size="md"
                className="flex items-center justify-center gap-2 flex-1 md:flex-none"
                onClick={handleOpenSettings}
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
            <h3 className="text-lg font-bold text-foreground mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Total Study Time
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    68.5 hours
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Words Mastered
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    245/500
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success"
                    style={{ width: "49%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Accuracy Rate
                  </span>
                  <span className="text-sm font-bold text-foreground">87%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  Next Level: Advanced Pro
                </p>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <p className="text-xs text-primary-600 font-semibold mt-1">
                  72% to next level
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Achievements
          </h2>
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
          <h3 className="text-xl font-bold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {learningHistory.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">{entry.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.items} card
                    {entry.items !== 1 ? "s" : ""} learned
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

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Change Password
                </h2>
                <button
                  onClick={handleCloseSettings}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter your current password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={handleCloseSettings}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
