import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { Edit3 } from 'lucide-react';

export default function Essay({
    currentCard,
    userAnswer,
    setUserAnswer,
    tuluanAnswered,
    showTuluanAnswer,
    setShowTuluanAnswer,
    isCorrect,
    checkTuluanAnswer,
    handleNext
}) {
    return (
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
                <div className={`p-6 rounded-2xl transition-all ${isCorrect ? 'border-success border-2' : 'border-[#ef4444] border-2'}`}>
                    {showTuluanAnswer ? (
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2">{currentCard.en}</div>
                            <p className="text-sm text-muted-foreground">ANSWERED</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className={`text-xl font-bold ${isCorrect ? 'text-success' : 'text-[#ef4444]'}`}>
                                    {isCorrect ? '✅ Đúng!' : '❌ Sai!'}
                                </span>
                            </div>
                            <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-[#ef4444]'}`}>
                                {isCorrect ? 'Tuyệt vời! Sang từ tiếp theo.' : 'Nhấn "Hiện đáp án" để xem.'}
                            </p>
                        </>
                    )}
                </div>
            )}
            {tuluanAnswered && (
                <div className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setShowTuluanAnswer(!showTuluanAnswer)}
                        className="flex-1 cursor-pointer"
                    >
                        {showTuluanAnswer ? 'Từ tiếp theo' : 'Hiện đáp án'}
                    </Button>
                    <Button variant="primary" onClick={handleNext} className="flex-1 cursor-pointer">
                        Next
                    </Button>
                </div>
            )}
            {!tuluanAnswered && (
                <Button variant="primary" onClick={checkTuluanAnswer} className="w-full cursor-pointer">
                    <Edit3 size={20} className="mr-2" />
                    Check
                </Button>
            )}
        </div>
    );
}
