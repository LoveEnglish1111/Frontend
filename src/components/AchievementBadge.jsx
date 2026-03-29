import { Award, Trophy, Target, Zap, Crown, BookOpen } from 'lucide-react';

const badgeIcons = {
    'First Steps': BookOpen,
    'Speed Learner': Zap,
    'Perfect Streak': Trophy,
    'Grammar Master': Target,
    'Vocabulary King': Crown,
    Dedication: Award,
};

export default function AchievementBadge({
    badge,
    unlocked = false,
    progress = 100,
}) {
    const Icon = badgeIcons[badge.type] || Award;

    const badgeColors = {
        'First Steps': 'from-blue-100 to-blue-200',
        'Speed Learner': 'from-yellow-100 to-yellow-200',
        'Perfect Streak': 'from-purple-100 to-purple-200',
        'Grammar Master': 'from-green-100 to-green-200',
        'Vocabulary King': 'from-pink-100 to-pink-200',
        Dedication: 'from-orange-100 to-orange-200',
    };

    const bgGradient = badgeColors[badge.type] || 'from-slate-100 to-slate-200';

    return (
        <div
            className={`relative p-4 rounded-2xl text-center transition-all ${unlocked ? `bg-gradient-to-br ${bgGradient}` : 'bg-slate-100'}`}
        >
            {/* Lock overlay if not unlocked */}
            {!unlocked && (
                <div className="absolute inset-0 bg-slate-900 bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <div className="text-2xl">🔒</div>
                </div>
            )}

            {/* Badge Icon */}
            <div className="flex justify-center mb-2">
                <div
                    className={`p-3 rounded-full ${unlocked ? 'bg-white' : 'bg-slate-300'}`}
                >
                    <Icon
                        size={24}
                        className={
                            unlocked ? 'text-primary-600' : 'text-slate-600'
                        }
                    />
                </div>
            </div>

            {/* Badge Name */}
            <h4
                className={`text-sm font-bold mb-1 ${unlocked ? 'text-foreground' : 'text-slate-600'}`}
            >
                {badge.name}
            </h4>

            {/* Description */}
            <p
                className={`text-xs mb-3 ${unlocked ? 'text-muted-foreground' : 'text-slate-500'}`}
            >
                {badge.description}
            </p>

            {/* Progress if not unlocked */}
            {!unlocked && progress < 100 && (
                <div className="space-y-1">
                    <div className="h-1.5 bg-slate-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs font-semibold text-slate-600">
                        {Math.round(progress)}%
                    </p>
                </div>
            )}

            {/* Unlocked Badge */}
            {unlocked && (
                <div className="text-xs font-bold text-primary-600 flex items-center justify-center gap-1">
                    ✨ Unlocked
                </div>
            )}
        </div>
    );
}
