import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function TrendingTopics({ onTopicSelect }) {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const trendingTopics = [
        { id: 1, name: 'Phrasal Verbs', count: 2543, icon: '📖' },
        { id: 2, name: 'IELTS Tips', count: 1876, icon: '✍️' },
        { id: 3, name: 'Grammar Rules', count: 1564, icon: '📚' },
        { id: 4, name: 'Vocabulary', count: 1432, icon: '🎯' },
        { id: 5, name: 'Speaking Tips', count: 987, icon: '🎤' },
        { id: 6, name: 'Native English', count: 856, icon: '🌍' },
    ];

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic.id);
        if (onTopicSelect) onTopicSelect(topic);
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-border p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-primary-600" />
                <h3 className="font-bold text-lg text-foreground">
                    Trending Topics
                </h3>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {trendingTopics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic)}
                        className={`px-4 py-3 rounded-xl font-medium transition-all text-sm flex items-center gap-2 ${
                            selectedTopic === topic.id
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-secondary text-foreground hover:bg-slate-200'
                        }`}
                    >
                        <span className="text-lg">{topic.icon}</span>
                        <span className="truncate">#{topic.name}</span>
                        <span
                            className={`text-xs ${selectedTopic === topic.id ? 'opacity-70' : 'text-muted-foreground'}`}
                        >
                            {(topic.count / 1000).toFixed(1)}K
                        </span>
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-border">
                <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    View all trending topics →
                </button>
            </div>
        </div>
    );
}
