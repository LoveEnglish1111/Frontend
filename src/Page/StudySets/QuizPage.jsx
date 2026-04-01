import { useParams, useNavigate, useState, useEffect } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useStudy } from '../../context/studyContext.jsx';
import axios from 'axios';
import URL from '../../api/UserApi.jsx';
import QuizMode from '../../components/QuizMode';

export default function QuizPage() {
    const { setId } = useParams();
    const navigate = useNavigate();
    const { vocabularyData, studyData } = useStudy();
    const [quizMode, setQuizMode] = useState(null);
    const [localCards, setLocalCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cards = vocabularyData?.Vocabulary || localCards;

    useEffect(() => {
        const fetchCards = async () => {
            if (!setId) return;
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${URL}/vocabulary/get?flashCard_id=${setId}`);
                if (res.data) {
                    setLocalCards(res.data.Vocabulary || res.data || []);
                }
            } catch (err) {
                console.error('Fetch cards error:', err);
                setError('Không load được thẻ. Kiểm tra study set có từ không.');
            } finally {
                setLoading(false);
            }
        };

        if (cards.length === 0) {
            fetchCards();
        } else {
            setLoading(false);
        }
    }, [setId]);

    const selectMode = (mode) => {
        if (cards.length === 0) return;
        setQuizMode(mode);
    };

    const resetMode = () => {
        setQuizMode(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Đang load flashcards...</p>
                </div>
            </div>
        );
    }

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
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground">
                            {quizMode === null ? 'Chọn Chế Độ Quiz' : 'Quiz Mode'}
                        </h1>
                        {studyData?.title && (
                            <p className="text-sm text-muted-foreground">{studyData.title}</p>
                        )}
                    </div>
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

            {/* Content */}
            <div className="max-w-6xl mx-auto py-8 px-4">
                {error && (
                    <div className="max-w-md mx-auto bg-danger/10 border border-danger text-danger p-6 rounded-2xl text-center">
                        <p className="font-semibold mb-2">{error}</p>
                        <Button onClick={() => window.location.reload()} variant="outline">
                            Thử lại
                        </Button>
                    </div>
                )}
                {cards.length === 0 && !loading && !error ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">📚</div>
                        <h3 className="text-xl font-bold mb-2">Study set trống</h3>
                        <p className="text-muted-foreground mb-6">Study set này chưa có flashcards. Tạo từ mới trước.</p>
                        <Button onClick={() => navigate('/StudySets')}>Về Study Sets</Button>
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
                                className="w-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-lg transition-all text-left hover:from-blue-100"
                            >
                                <div className="text-2xl mb-2">✍️ Tự Luận</div>
                                <p className="text-muted-foreground">Hiển thị nghĩa tiếng Việt, nhập từ tiếng Anh</p>
                            </button>
                            <button
                                onClick={() => selectMode('tracnghiem')}
                                className="w-full p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg transition-all text-left hover:from-purple-100"
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
