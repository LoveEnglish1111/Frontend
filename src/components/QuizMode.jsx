import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Edit3, CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import ProgressBar from './ProgressBar';

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

    const currentCard = cards[currentCardIndex];

    // Generate 4 options for tracnghiem: correct word + 3 random others
    const generateTracnghiemOptions = () => {
        if (!currentCard) return [];
        const correctWord = currentCard.word;
        const otherWords = cards
            .filter((_, index) => index !== currentCardIndex)
            .map(c => c.word);
        const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correctWord, ...shuffledOthers].sort(() => Math.random() - 0.5);
        return options;
    };

    const options = generateTracnghiemOptions();

    const checkTuluanAnswer = () => {
        if (!currentCard) return;
        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = currentCard.word.trim().toLowerCase();
        const isCorrect = normalizedUser === normalizedCorrect;
        if (isCorrect) {
            setScore(score + 1);
        }
        setTuluanAnswered(true);
    };

    const handleTracnghiemSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
        setTracnghiemAnswered(true);
        if (options[optionIndex] === currentCard.word) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            // Reset states
            setUserAnswer('');
            setShowTuluanAnswer(false);
            setTuluanAnswered(false);
            setSelectedOption(null);
            setTracnghiemAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setUserAnswer('');
            setShowTuluanAnswer(false);
            setTuluanAnswered(false);
            setSelectedOption(null);
            setTracnghiemAnswered(false);
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
    };

    const handleCompleteQuiz = () => {
        onComplete?.({ score, total: cards.length });
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
                        <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Hoàn Thành!</h2>
                        <p className="text-muted-foreground">Bạn đạt {score}/{cards.length} câu đúng</p>
                    </div>
                    <ProgressBar current={score} total={cards.length} color={percentage >= 80 ? 'success' : 'warning'} />
                    <p className="text-right text-sm font-semibold mt-2">{percentage}%</p>
                    <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-y">
                        <div className="text-center">
                            <p className="text-xl font-bold text-success">{score}</p>
                            <p className="text-xs text-muted-foreground">Đúng</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-danger">{cards.length - score}</p>
                            <p className="text-xs text-muted-foreground">Sai</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-primary-600">{percentage}%</p>
                            <p className="text-xs text-muted-foreground">Điểm</p>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg mt-6 ${percentage >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        <p className="font-semibold">
                            {percentage >= 90 ? '🎉 Xuất sắc! Bạn đã nắm vững bộ từ này!' :
                             percentage >= 80 ? '👍 Tốt lắm! Tiếp tục luyện tập!' :
                             percentage >= 70 ? '📚 Khá tốt! Ôn lại và thử lại.' : '💪 Cố lên! Thực hành nhiều hơn.'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <Button variant="outline" fullWidth className="sm:w-auto" onClick={handleRestart}>
                            Chơi lại
                        </Button>
                        <Button variant="primary" fullWidth className="sm:w-auto" onClick={handleCompleteQuiz}>
                            Xong
                        </Button>
                        {onReset && (
                            <Button variant="ghost" className="sm:w-auto" onClick={onReset}>
                                Đổi chế độ
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (cards.length === 0 || !currentCard) {
        return <div className="text-center py-16"><p className="text-lg text-muted-foreground">Không có thẻ để chơi quiz</p></div>;
    }

    const progress = ((currentCardIndex + 1) / cards.length) * 100;
    const answered = mode === 'tuluan' ? tuluanAnswered : tracnghiemAnswered;
    const correctIndex = options.findIndex(opt => opt === currentCard.word);
    const isCorrect = mode === 'tuluan' ? (userAnswer.trim().toLowerCase() === currentCard.word.trim().toLowerCase()) : (selectedOption === correctIndex);

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-foreground capitalize">{mode === 'tuluan' ? 'Chế Độ Tự Luận' : 'Chế Độ Trắc Nghiệm'}</h2>
                    <span className="text-sm font-semibold text-primary-600">{currentCardIndex + 1}/{cards.length}</span>
                </div>
                <ProgressBar current={currentCardIndex + 1} total={cards.length} color="primary" />
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8 shadow-sm">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 tracking-wide">
                        {currentCard.meaning}
                    </h3>
                    <p className="text-sm text-muted-foreground">Câu {currentCardIndex + 1}</p>
                </div>

                {mode === 'tuluan' ? (
                    /* TULUAN MODE */
                    <div className="space-y-6">
                        <Input
                            type="text"
                            placeholder="Nhập từ tiếng Anh..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={tuluanAnswered}
                            className="text-xl py-6"
                            autoFocus
                        />
                        {tuluanAnswered && (
                            <div className={`p-6 rounded-2xl transition-all ${isCorrect ? 'bg-success/10 border-success' : 'bg-danger/10 border-danger border-2'}`}>
                                {showTuluanAnswer ? (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold mb-2">{currentCard.word}</div>
                                        <p className="text-sm text-muted-foreground">Đáp án đúng</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            {isCorrect ? <CheckCircle className="text-success text-2xl" /> : <XCircle className="text-danger text-2xl" />}
                                            <span className={`text-xl font-bold ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                                {isCorrect ? '✅ Đúng!' : '❌ Sai!'}
                                            </span>
                                        </div>
                                        <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                            {isCorrect ? 'Tuyệt vời! Sang từ tiếp theo.' : 'Nhấn "Hiện đáp án" để xem.'}
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                        {tuluanAnswered && (
                            <div className="flex gap-3 pt-4 border-t">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowTuluanAnswer(!showTuluanAnswer)}
                                    className="flex-1"
                                >
                                    {showTuluanAnswer ? 'Từ tiếp theo' : 'Hiện đáp án'}
                                </Button>
                                <Button variant="primary" onClick={handleNext} className="flex-1">
                                    Tiếp
                                </Button>
                            </div>
                        )}
                        {!tuluanAnswered && (
                            <Button variant="primary" onClick={checkTuluanAnswer} className="w-full">
                                <Edit3 size={20} className="mr-2" />
                                Kiểm tra
                            </Button>
                        )}
                    </div>
                ) : (
                    /* TRACNGHIEM MODE */
                    <div className="space-y-4">
                        {options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isCorrectOpt = index === correctIndex;
                            let style = 'group hover:border-primary-600 border-2 border-border bg-white cursor-pointer p-5 rounded-xl transition-all font-medium h-20 flex items-center';
                            if (tracnghiemAnswered) {
                                if (isCorrectOpt) {
                                    style += ' bg-success/10 border-success text-success shadow-md';
                                } else if (isSelected) {
                                    style += ' bg-danger/10 border-danger text-danger shadow-md';
                                }
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={() => !tracnghiemAnswered && handleTracnghiemSelect(index)}
                                    disabled={tracnghiemAnswered}
                                    className={style}
                                >
                                    <span className="w-8 font-bold text-lg mr-4">{String.fromCharCode(65 + index)}.</span>
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                        {tracnghiemAnswered && (
                            <div className={`p-5 rounded-xl mt-4 ${isCorrect ? 'bg-success/10 border-success border' : 'bg-danger/10 border-danger border'}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`font-bold text-lg ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                        {isCorrect ? '✅ Đúng!' : '❌ Sai!'}
                                    </span>
                                    <Button variant="primary" onClick={handleNext} className="px-6">
                                        {currentCardIndex === cards.length - 1 ? 'Xem kết quả' : 'Tiếp'}
                                    </Button>
                                </div>
                                {!isCorrect && (
                                    <p className="text-sm mt-2 text-danger font-medium">Đáp án đúng: <strong>{currentCard.word}</strong></p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                {!showResults && answered && (
                    <div className="flex justify-between mt-8 pt-6 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentCardIndex === 0}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft size={16} />
                            Trước
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            className="flex items-center gap-2"
                            disabled={false}
                        >
                            {currentCardIndex === cards.length - 1 ? 'Kết quả' : 'Tiếp theo'}
                            {currentCardIndex < cards.length - 1 && <ChevronRight size={16} />}
                        </Button>
                    </div>
                )}
            </div>

            {/* Extra actions */}
            <div className="flex gap-3 mt-6">
                {onReset && (
                    <Button variant="outline" onClick={onReset} className="flex-1">
                        Đổi chế độ
                    </Button>
                )}
            </div>
        </div>
    );
}
