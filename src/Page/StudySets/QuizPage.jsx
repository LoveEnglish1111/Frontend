import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useStudy } from '../../context/studyContext.jsx';
import QuizMode from '../../components/QuizMode';
import ErrorBoundary from '../../components/ErrorBoundary';
import Button from '../../components/Button';

export default function QuizPage() {
    const { setId } = useParams();
    const navigate = useNavigate();
    const { vocabularyData, studyData } = useStudy();
    const [quizMode, setQuizMode] = useState(null);
    const [shuffledCards, setShuffledCards] = useState([]);
    const [localCards, setLocalCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const safeCards = vocabularyData?.Vocabulary || localCards || [];
    useEffect(() => {
        const fetchCards = async () => {
            if (!setId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);

            setLoading(false);
        };

        fetchCards();
    }, [setId]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const selectMode = (mode) => {
        if (safeCards.length === 0) {
            console.warn('Cannot start quiz: no cards available');
            return;
        }
        if (mode === 'tracnghiem') {
            setShuffledCards(shuffleArray(safeCards));
        }
        setQuizMode(mode);
    };

    const resetMode = () => {
        setQuizMode(null);
    };

    const handleClickBack = () => {
        if (quizMode == null) navigate("/StudySets")
        else resetMode();
    }

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
                        onClick={handleClickBack}
                        className="cursor-pointer flex items-center gap-2 text-primary-600 font-semibold p-2 rounded-lg text-[20px]"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primary select-none">
                            Quiz Time!
                        </h1>
                        {studyData?.title && (
                            <p className="text-sm text-muted-foreground mt-1">{studyData.title}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{safeCards.length} cards</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-12 px-4">
                {quizMode === null ? (
                    <div className="max-w-lg mx-auto">
                        <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-3xl p-12 border border-indigo-200 shadow-2xl text-center">
                            <div className="text-6xl mb-8 mx-auto">⚡</div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                Mode Quiz
                            </h2>
                            <p className="text-xl text-muted-foreground mb-12 opacity-90">
                                {safeCards.length > 0 ? `${safeCards.length} vocabulary - Ready to learn!` : 'No vocabulary to learn.'}
                            </p>
                            <div className="space-y-4">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="cursor-pointer text-white w-full h-20 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all group bg-gradient-to-r from-purple-500 to-pink-500"
                                    onClick={() => selectMode('tracnghiem')}
                                >
                                    <span className="text-2xl mr-3">📝</span>
                                    Multiple Choice
                                </Button>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="cursor-pointer w-full h-20 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all group"
                                    onClick={() => selectMode('tuluan')}
                                >
                                    <span className="text-2xl mr-3">✍️</span>
                                    Essay
                                </Button>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="cursor-pointer w-full h-20 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all group"
                                    onClick={() => selectMode("matchgame")}
                                >
                                    <span className="text-2xl mr-3">🎮</span>
                                    Match Game
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ErrorBoundary>
                        <QuizMode
                            mode={quizMode}
                            cards={quizMode === 'tracnghiem' ? shuffledCards : safeCards}
                            studySetId={setId}
                            onReset={resetMode}
                        />
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
}
