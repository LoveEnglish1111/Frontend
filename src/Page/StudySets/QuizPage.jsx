import { useParams, useNavigate, useState } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStudy } from '../../context/studyContext.jsx';
import QuizMode from '../../components/QuizMode';

export default function QuizPage() {
    const { setId } = useParams();
    const navigate = useNavigate();
    const { vocabularyData } = useStudy();
    const [quizMode, setQuizMode] = useState(null); // null = select, 'tuluan', 'tracnghiem'
    const cards = vocabularyData?.Vocabulary || [];

    const selectMode = (mode) => {
        setQuizMode(mode);
    };

    const resetMode = () => {
        setQuizMode(null);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-border p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/StudySets')}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                    >
                        <ArrowLeft size={20} />
                        Back to Study Sets
                    </button>
                    <h1 className="text-2xl font-bold text-foreground">
                        {quizMode === null ? 'Chọn Chế Độ Quiz' : 'Quiz Mode'}
                    </h1>
                    {quizMode && (
                        <button
                            onClick={resetMode}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold"
                        >
                            Đổi chế độ
                        </button>
                    )}
                </div>
            </div>

            {/* Quiz Content */}
            <div className="max-w-6xl mx-auto py-8 px-4">
                {cards.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">
                            No cards available for quiz. Load a study set first.
                        </p>
                    </div>
                ) : quizMode === null ? (
                    <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-border p-12 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">⚡</div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Chọn chế độ chơi Quiz
                            </h2>
                            <p className="text-muted-foreground mb-12">
                                {cards.length} từ - Chọn cách ôn tập phù hợp
                            </p>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => selectMode('tuluan')}
                                className="w-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-lg transition-all text-left"
                            >
                                <div className="text-2xl mb-2">✍️ Tự Luận</div>
                                <p className="text-muted-foreground">Hiển thị nghĩa tiếng Việt, nhập từ tiếng Anh</p>
                            </button>
                            <button
                                onClick={() => selectMode('tracnghiem')}
                                className="w-full p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg transition-all text-left"
                            >
                                <div className="text-2xl mb-2">📝 Trắc Nghiệm</div>
                                <p className="text-muted-foreground">Chọn đáp án đúng từ 4 lựa chọn A B C D</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    <QuizMode 
                        mode={quizMode} 
                        cards={cards} 
                        studySetId={setId}
                        onReset={resetMode}
                    />
                )}
            </div>
        </div>
    );
}
