import { Users } from "lucide-react";
import { useState } from "react";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import TrendingTopics from "../components/TrendingTopics";

export default function Community() {
  // Mock initial posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://ui-avatars.com/api/?background=10b981&color=fff&bold=true&name=SJ",
      },
      content:
        "Just learned the phrasal verb 'break down' - it means to stop working or analyzing something into parts. Let me share an example: My car broke down on the way to work! 🚗",
      image: null,
      timestamp: new Date(Date.now() - 2 * 3600000),
      likes: 45,
      comments: 8,
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Michael Chen",
        avatar: "https://ui-avatars.com/api/?background=f59e0b&color=fff&bold=true&name=MC",
      },
      content:
        "IELTS Speaking Tip: Use connectors like 'moreover', 'however', 'in addition' to make your speech more fluent and coherent. The examiners love it! 📝",
      image: null,
      timestamp: new Date(Date.now() - 5 * 3600000),
      likes: 78,
      comments: 12,
      liked: false,
    },
    {
      id: 3,
      author: {
        name: "Emma Wilson",
        avatar: "https://ui-avatars.com/api/?background=8b5cf6&color=fff&bold=true&name=EW",
      },
      content:
        "Grammar reminder: Present Perfect vs Simple Past\n\nSimple Past: I went to the gym yesterday.\nPresent Perfect: I have been to the gym many times.\n\nUse Present Perfect when you don't specify when! ✍️",
      image: null,
      timestamp: new Date(Date.now() - 8 * 3600000),
      likes: 156,
      comments: 34,
      liked: false,
    },
  ]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId, liked) => {
    // TODO: Send to server
    console.log(`Post ${postId} liked: ${liked}`);
  };

  return (
    <div className="flex-1 bg-background overflow-auto">
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users size={32} className="text-primary-600" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground text-sm">
              Share learning tips and connect with other English learners
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Create Post + Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Form */}
            <CreatePostForm onPostCreated={handlePostCreated} />

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-border p-12 text-center">
                  <p className="text-muted-foreground mb-2">📭 No posts yet</p>
                  <p className="text-xs text-muted-foreground">
                    Be the first to share your learning experience!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Column - Trending Topics */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <TrendingTopics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}