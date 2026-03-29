import { BookOpen, Play, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

export default function StudySetCard({ set, onStudyClick, onQuizClick }) {
    const navigate = useNavigate();

    const categoryColors = {
        Grammar: 'from-blue-50 to-blue-100',
        Vocabulary: 'from-purple-50 to-purple-100',
        Phrasal: 'from-green-50 to-green-100',
        IELTS: 'from-orange-50 to-orange-100',
        Business: 'from-pink-50 to-pink-100',
        Daily: 'from-cyan-50 to-cyan-100',
    };

    const categoryIcons = {
        Grammar: '📚',
        Vocabulary: '📖',
        Phrasal: '🔗',
        IELTS: '✍️',
        Business: '💼',
        Daily: '💬',
    };

    const bgGradient =
        categoryColors[set.category] || 'from-slate-50 to-slate-100';
    const icon = categoryIcons[set.category] || '📝';

    return (
        <div className="bg-white rounded-2xl border-2 border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
            {/* Header with Background */}
            <div className={`bg-gradient-to-br ${bgGradient} p-6 pb-4`}>
                <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{icon}</span>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded-full text-primary-600">
                        {set.category}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                    {set.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {set.description}
                </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Progress */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                        Progress
                    </p>
                    <ProgressBar
                        current={set.learned}
                        total={set.total}
                        color={
                            set.learned === set.total ? 'success' : 'primary'
                        }
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-border">
                    <div>
                        <p className="text-lg font-bold text-foreground">
                            {set.total}
                        </p>
                        <p className="text-xs text-muted-foreground">Cards</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-primary-600">
                            {set.learned}
                        </p>
                        <p className="text-xs text-muted-foreground">Learned</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-warning">
                            {set.reviews}
                        </p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => onStudyClick && onStudyClick(set.id)}
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <Play size={16} />
                        Study
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => onQuizClick && onQuizClick(set.id)}
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <Zap size={16} />
                        Quiz
                    </Button>
                </div>

                {/* Footer */}
                {set.learned === set.total ? (
                    <div className="text-center py-2 bg-success bg-opacity-10 rounded-lg">
                        <p className="text-xs font-semibold text-success">
                            ✅ Mastered! Keep reviewing
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-2 bg-primary-50 rounded-lg">
                        <p className="text-xs font-semibold text-primary-600">
                            {set.total - set.learned} cards left to learn
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
