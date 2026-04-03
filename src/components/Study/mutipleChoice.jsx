import React from 'react';

export default function MultipleChoice({
    currentCard,
    options,
    selectedOption,
    tracnghiemAnswered,
    correctIndex,
    isCorrect,
    handleTracnghiemSelect
}) {
    return (
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
                        <span>{option.toUpperCase()}</span>
                    </button>
                );
            })}
            {tracnghiemAnswered && (
                <div className={`p-5 rounded-xl mt-4 ${isCorrect ? 'border-success border' : 'border-[#ef4444] border'}`}>
                    <div className="flex items-center justify-between">
                        <span className={`font-bold text-lg ${isCorrect ? 'text-success' : 'text-[#ef4444]'}`}>
                            {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
                        </span>
                    </div>
                    {!isCorrect && (
                        <p className="text-[16px] mt-2 text-[#ef4444] font-medium">Answered: <strong>{currentCard.en.toUpperCase()}</strong></p>
                    )}
                </div>
            )}
        </div>
    );
}
