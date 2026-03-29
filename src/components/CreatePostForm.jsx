import { useState } from 'react';
import { Image, Send } from 'lucide-react';
import Button from './Button';

export default function CreatePostForm({ onPostCreated }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);

        // TODO: In production, upload to server/cloud storage
        const newPost = {
            id: Date.now(),
            author: {
                name: 'John Doe',
                avatar: 'https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&name=JohnDoe',
            },
            content: content.trim(),
            image: imagePreview,
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            liked: false,
        };

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsLoading(false);
        onPostCreated(newPost);

        // Reset form
        setContent('');
        setImage(null);
        setImagePreview(null);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-border p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src="https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&name=JohnDoe"
                    alt="Your Avatar"
                    className="w-12 h-12 rounded-lg"
                />
                <div className="flex-1">
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                        Share your learning tip
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Text Input */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share a vocabulary tip, grammar rule, or learning experience..."
                    className="w-full px-4 py-3 border-2 border-border rounded-lg resize-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-foreground font-medium placeholder-muted-foreground"
                    rows="4"
                />

                {/* Image Preview */}
                {imagePreview && (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-destructive text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                    {/* Image Upload */}
                    <label className="flex items-center gap-2 text-primary-600 hover:text-primary-700 cursor-pointer font-medium text-sm">
                        <Image size={18} />
                        <span>Add Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {/* Post Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isLoading}
                        disabled={!content.trim() || isLoading}
                        className="flex items-center gap-2"
                    >
                        <Send size={16} />
                        Post
                    </Button>
                </div>
            </form>
        </div>
    );
}
