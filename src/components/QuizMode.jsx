import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Edit3, CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';
import MatchQuestion from './Study/MatchQuestion';
import Essay from './Study/Essay';
import MultipleChoice from './Study/mutipleChoice';

export default function QuizMode({ mode, cards, studySetId, onReset, onComplete }) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    // Mode-specific state
    const [userAnswer, setUserAnswer] = useState(''); // tuluan
    const [showTuluanAnswer, setShowTuluanAnswer] = useState(false); // tuluan
    const [tuluanAnswered, setTuluanAnswered] = useState(false); // tuluan
    const [selectedOption, setSelectedOption] = useState(null); // tracnghiem
    const [tracnghiemAnswered, setTracnghiemAnswered] = useState(false); // tracnghiem
    const [matchGameKey, setMatchGameKey] = useState(0); // Để ép React reset MatchGame
    const currentCard = cards?.[currentCardIndex];

    const generateTracnghiemOptions = () => {
        if (!cards?.length || !currentCard?.en) {
            return [];
        }
        const correctWord = currentCard.en;
        const otherWords = cards
            .filter((_, index) => index !== currentCardIndex && cards[index]?.en)
            .slice(0, 4) // safety limit
            .map(c => c.en);
        const options = [correctWord, ...otherWords].sort(() => Math.random() - 0.5);
        return options;
    };
    const [options, setOptions] = useState(generateTracnghiemOptions);

    const checkTuluanAnswer = () => {
        if (!currentCard?.en) {
            return;
        }
        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = currentCard.en.trim().toLowerCase();
        const isCorrect = normalizedUser === normalizedCorrect;
        if (isCorrect) {
            setScore(score + 1);
        }
        setTuluanAnswered(true);
    };

    const handleTracnghiemSelect = (optionIndex) => {
        if (!currentCard?.en) {
            console.error('[QUIZMODE DEBUG] No currentCard.word for tracnghiem');
            return;
        }
        setSelectedOption(optionIndex);
        setTracnghiemAnswered(true);
        if (options[optionIndex] === currentCard.en) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            // Reset states
            if (mode == "tracnghiem") {
                setOptions(generateTracnghiemOptions);
                setSelectedOption(null);
                setTracnghiemAnswered(false);
            }
            else {
                setUserAnswer('');
                setShowTuluanAnswer(false);
                setTuluanAnswered(false);
            }
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentCardIndex(0);
        setScore(0);
        setShowResults(false);
        setUserAnswer('');
        setShowTuluanAnswer(false);
        setTuluanAnswered(false);
        setSelectedOption(null);
        setTracnghiemAnswered(false);
        setMatchGameKey(prev => prev + 1); // Đổi key sẽ ép MatchQuestion render lại từ đầu
    };

    // Results modal (shared)
    if (showResults) {
        const percentage = cards.length > 0 ? Math.round((score / cards.length) * 100) : 0;
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <div className="text-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-4">
                            <span className="text-5xl font-bold text-primary-600">{grade}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">QUIZ COMPLETED!</h2>
                        <p className="text-muted-foreground">You got {score}/{cards.length} the best answered</p>
                    </div>
                    <ProgressBar current={score} total={cards.length} color={percentage >= 80 ? 'success' : 'warning'} />
                    <p className="text-right text-sm font-semibold mt-2">{percentage}%</p>
                    <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-y">
                        <div className="text-center">
                            <p className="text-xl font-bold text-success">{score}</p>
                            <p className="text-xs text-muted-foreground">Correct</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-danger">{cards.length - score}</p>
                            <p className="text-xs text-muted-foreground">Incorrect</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-primary-600">{percentage}%</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg mt-6 ${percentage >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        <p className="font-semibold">
                            {percentage >= 90 ? '🎉 excellently ! You have mastered this vocabulary set!' :
                                percentage >= 80 ? '👍 Good! Keep practicing!' :
                                    percentage >= 70 ? '📚 Pretty good! Let review and try again.' : '💪 Try your best! Practice more.'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <Button variant="outline" fullWidth className="sm:w-auto cursor-pointer" onClick={handleRestart}>
                            Play Again
                        </Button>
                        <Button variant="primary" fullWidth className="sm:w-auto cursor-pointer" onClick={onReset}>
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!cards?.length || currentCardIndex >= (cards.length ?? 0) || !currentCard) {
        console.error('[QUIZMODE DEBUG] Early return - invalid state:', { cardsLength: cards?.length, currentIndex: currentCardIndex, hasCurrentCard: !!currentCard });
        return <div className="text-center py-16"><p className="text-lg text-muted-foreground">Không có thẻ để chơi quiz hoặc lỗi trạng thái</p></div>;
    }
    // const progress = ((currentCardIndex + 1) / cards.length) * 100;
    const answered = mode === 'tuluan' ? tuluanAnswered : tracnghiemAnswered;
    const correctIndex = options.findIndex(opt => opt === currentCard.en);
    const isCorrect = mode === 'tuluan' ? (userAnswer.trim().toLowerCase() === currentCard.en.trim().toLowerCase()) : (selectedOption === correctIndex);
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            {mode !== "matchgame" ? (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-foreground capitalize">{mode === 'tuluan' ? 'Eassy Mode' : mode === "matchgame" ? "Match Game" : "Multiple Choice Mode"}</h2>

                        <span className="text-sm font-semibold text-primary-600">{currentCardIndex + 1}/{cards.length}</span>
                    </div>
                    <ProgressBar current={currentCardIndex + 1} total={cards.length} color="primary" />
                </div>
            ) : <></>}

            {
                mode === "matchgame" ?
                    <MatchQuestion key={matchGameKey} cards={cards} onClick={handleRestart} /> :
                    <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8 shadow-sm">
                        <div className="text-center mb-12">
                            <p className="text-sm text-muted-foreground">Question: {currentCardIndex + 1}</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 tracking-wide">
                                {currentCard.vn.toUpperCase()}
                            </h3>
                        </div>

                        {mode === 'tuluan' ? (
                            <Essay
                                currentCard={currentCard}
                                userAnswer={userAnswer}
                                setUserAnswer={setUserAnswer}
                                tuluanAnswered={tuluanAnswered}
                                showTuluanAnswer={showTuluanAnswer}
                                setShowTuluanAnswer={setShowTuluanAnswer}
                                isCorrect={isCorrect}
                                checkTuluanAnswer={checkTuluanAnswer}
                                handleNext={handleNext}
                            />
                        ) : (
                            <MultipleChoice
                                currentCard={currentCard}
                                options={options}
                                selectedOption={selectedOption}
                                tracnghiemAnswered={tracnghiemAnswered}
                                correctIndex={correctIndex}
                                isCorrect={isCorrect}
                                handleTracnghiemSelect={handleTracnghiemSelect}
                            />
                        )}

                        {/* Navigation */}
                        {!showResults && mode == "tracnghiem" && answered && (
                            <div className="flex justify-between mt-8 pt-6 border-t border-border">
                                <p></p>
                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    className="flex items-center gap-2 cursor-pointer"
                                    disabled={false}
                                >
                                    {currentCardIndex === cards.length - 1 ? 'Result' : 'Next'}
                                    {currentCardIndex < cards.length - 1 && <ChevronRight size={16} />}
                                </Button>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
}
