import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import Button from './Button';
import ProgressBar from './ProgressBar';

export default function QuizMode({ studySetId, cards = [], onComplete }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Generate quiz options for current card
  const generateOptions = () => {
    if (currentCardIndex >= cards.length) return [];
    
    const correct = cards[currentCardIndex].meaning;
    const options = [correct];
    
    // Add 3 random wrong answers (mock)
    const distractors = [
      'A common misconception about this word',
      'Another possible but incorrect meaning',
      'Related but different concept',
    ];
    
    return [...options, ...distractors].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (options, index) => {
    setSelectedAnswer(index);
    setAnswered(true);
    
    const currentCard = cards[currentCardIndex];
    if (options[index] === currentCard.meaning) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const handleComplete = () => {
    onComplete && onComplete({ score, total: cards.length });
  };

  // Show results screen
  if (showResults) {
    const percentage = Math.round((score / cards.length) * 100);
    const grade =
      percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          {/* Grade Circle */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl font-bold text-primary-600">{grade}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">You scored {score} out of {cards.length}</p>
          </div>

          {/* Score Bar */}
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">Performance</div>
            <ProgressBar current={score} total={cards.length} color={percentage >= 80 ? 'success' : 'warning'} />
            <p className="text-right text-sm font-semibold text-foreground mt-2">{percentage}%</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-border">
            <div className="text-center">
              <p className="text-xl font-bold text-success">{score}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-danger">{cards.length - score}</p>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary-600">{percentage}%</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          </div>

          {/* Feedback */}
          <div className={`p-4 rounded-lg mb-6 ${percentage >= 80 ? 'bg-success bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
            <p className={`text-sm font-semibold ${percentage >= 80 ? 'text-success' : 'text-warning'}`}>
              {percentage >= 90
                ? '🎉 Excellent! You truly mastered this set!'
                : percentage >= 80
                ? '👍 Great job! Keep practicing to improve further.'
                : percentage >= 70
                ? '📚 Good effort! Review the material and try again.'
                : '💪 Keep learning! Practice makes perfect.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={handleRestart}
              className="flex items-center justify-center gap-2"
            >
              Retry
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleComplete}
              className="flex items-center justify-center gap-2"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No cards available for quiz</p>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];
  const options = generateOptions();
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-foreground">Quiz Mode</h2>
          <span className="text-sm font-semibold text-primary-600">
            {currentCardIndex + 1}/{cards.length}
          </span>
        </div>
        <ProgressBar current={currentCardIndex + 1} total={cards.length} color="primary" />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border-2 border-border p-8 mb-8">
        {/* Word Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <h3 className="text-4xl font-bold text-primary-600">{currentCard.word}</h3>
            <button
              className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
              title="Listen to pronunciation"
            >
              <Volume2 size={20} className="text-primary-600" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">/{currentCard.pronunciation}/</p>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">What is the correct meaning?</p>
          <div className="h-1 bg-border rounded-full my-6"></div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const isCorrect = option === currentCard.meaning;
            const isSelected = selectedAnswer === index;

            let buttonStyle =
              'bg-white border-2 border-border text-foreground hover:border-primary-600';

            if (answered && isSelected) {
              buttonStyle = isCorrect
                ? 'bg-success bg-opacity-10 border-2 border-success text-success'
                : 'bg-danger bg-opacity-10 border-2 border-danger text-danger';
            } else if (answered && isCorrect) {
              buttonStyle = 'bg-success bg-opacity-10 border-2 border-success text-success';
            }

            return (
              <button
                key={index}
                onClick={() => !answered && handleAnswer(options, index)}
                disabled={answered}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonStyle} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === options.indexOf(currentCard.meaning) ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
            <p
              className={`text-sm font-semibold ${
                selectedAnswer === options.indexOf(currentCard.meaning) ? 'text-success' : 'text-danger'
              }`}
            >
              {selectedAnswer === options.indexOf(currentCard.meaning)
                ? '✅ Correct! Well done.'
                : `❌ Incorrect. The correct answer is: ${currentCard.meaning}`}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        {answered && (
          <Button
            variant="primary"
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            {currentCardIndex === cards.length - 1 ? 'See Results' : 'Next'}
            {currentCardIndex < cards.length - 1 && <ChevronRight size={16} />}
          </Button>
        )}
      </div>
    </div>
  );
}
