import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Flashcard from './Flashcard';
import { useStudy } from '../../context/studyContext';

export default function Study({ cards = [], courseTitle = '', learned, handleMarkLearned}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!cards || cards.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                    No cards available
                </p>
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;
    const learnedCount = learned.size;

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const isLearned = learned.has(currentIndex);
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
                <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text- mt-2">
                    {currentIndex + 1} / {cards.length} | {learnedCount} learned
                </p>
            </div>

            <div className="mb-8 flex justify-center">
                <Flashcard Vocabulary={currentCard} />
            </div>

            <div className="flex justify-between gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="px-6 py-2 bg-gray-400 rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                <button
                    onClick={() => handleMarkLearned(currentIndex)}
                    className={`cursor-pointer px-6 py-2 rounded-lg ${isLearned ? 'bg-green-500' : 'bg-yellow-400'}`}
                >
                    {isLearned ? '✓ Learned' : 'Mark Learned'}
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
