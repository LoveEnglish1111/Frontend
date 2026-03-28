import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function PostCard({ post, onLike, onComment }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(post.id, !liked);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatTime(post.timestamp)}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
        <span>💙 {likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        <span>💬 {post.comments} {post.comments === 1 ? 'comment' : 'comments'}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
            liked
              ? 'text-destructive bg-red-50'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          Like
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors font-medium text-sm"
        >
          <MessageCircle size={18} />
          Comment
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors font-medium text-sm">
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div className="text-center text-muted-foreground text-sm py-4">
            💬 Comments feature coming soon!
          </div>
        </div>
      )}
    </div>
  );
}
