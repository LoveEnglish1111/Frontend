import { useParams, useNavigate, useState, useEffect } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useStudy } from '../../context/studyContext.jsx';
import axios from 'axios';
import URL from '../../api/UserApi.jsx';
import QuizMode from '../../components/QuizMode';
import Button from '../../components/Button';

export default function QuizPage() {
    const { setId } = useParams();
    const navigate = useNavigate();
    const { vocabularyData, studyData } = useStudy();
    const [quizMode, setQuizMode] = useState(null);
    const [localCards, setLocalCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data if backend empty
    const mockCards = [
        { word: 'hello', meaning: 'xin chào' },
        { word: 'book', meaning: 'sách' },
        { word: 'apple', meaning: 'quả táo' },
        { word: 'computer', meaning: 'máy tính' },
        { word: 'teacher', meaning: 'giáo viên' },
        { word: 'student', meaning: 'học sinh' },
        { word: 'school', meaning: 'trường học' },
        { word: 'friend', meaning: 'bạn bè' },
        { word: 'family', meaning: 'gia đình' },
        { word: 'house', meaning: 'nhà cửa' },
    ];

    const cards = vocabularyData?.Vocabulary || localCards;

    useEffect(() => {
        const fetchCards = async () => {
            if (!setId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${URL}/vocabulary/get?flashCard_id=${setId}`);
                const apiCards = res.data?.Vocabulary || res.data || [];
                setLocalCards(apiCards);
                if (apiCards.length === 0) {
                    console.log('Backend empty, using mock data');
                    setLocalCards(mockCards);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                console.log('Using mock data');
                setLocalCards(mockCards);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [setId]);

    const selectMode = (mode) => {
        setQuizMode(mode);
    };

    const resetMode = () => {
        setQuizMode(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Loading flashcards...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-border p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/StudySets')}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold p-2 rounded-lg hover:bg-primary/5"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Quiz Time!
                        </h1>
                        {studyData?.title && (
                            <p className="text-sm text-muted-foreground mt-1">{studyData.title}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{cards.length} cards</p>
                    </div>
                    {quizMode && (
                        <Button
                            variant="outline"
                            onClick={resetMode}
                            className="gap-2"
                        >
                            Change Mode
                        </Button>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-12 px-4">
                {quizMode === null ? (
                    <div className="max-w-lg mx-auto">
                        <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-3xl p-12 border border-indigo-200 shadow-2xl text-center">
                            <div className="text-6xl mb-8 mx-auto">⚡</div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                Chọn Mode Quiz
                            </h2>
                            <p className="text-xl text-muted-foreground mb-12 opacity-90">
                                {cards.length} từ vựng - Sẵn sàng học nào!
                            </p>
                            <div className="space-y-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full h-20 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all group"
                                    onClick={() => selectMode('tuluan')}
                                >
                                    <span className="text-2xl mr-3">✍️</span>
                                    Tự Luận
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full h-20 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all group bg-gradient-to-r from-purple-500 to-pink-500"
                                    onClick={() => selectMode('tracnghiem')}
                                >
                                    <span className="text-2xl mr-3">📝</span>
                                    Trắc Nghiệm
                                </Button>
                            </div>
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
