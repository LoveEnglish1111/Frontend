import React, { useState, useEffect, useMemo } from 'react';

// Declare an empty array outside the component scope to KEEP the exact memory reference.
// Using [] directly inside default parameters triggers an infinite loop in useEffect.
const EMPTY_ARR = [];

const MatchQuestion = ({ VocabularyData, cards: parentCards, onClick }) => {
    // Priority: VocabularyData (backward compatibility) > parentCards > EMPTY_ARR
    const dataToUse = VocabularyData || parentCards || EMPTY_ARR;

    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);
    const [errorCards, setErrorCards] = useState([]);

    // Generate the card list and shuffle positions
    const cards = useMemo(() => {
        if (!dataToUse || dataToUse.length === 0) return [];

        let generatedCards = [];
        dataToUse.forEach((item, index) => {
            // English card
            generatedCards.push({
                id: `en-${index}`,
                pairId: index,
                text: item.en,
            });
            // Vietnamese card
            generatedCards.push({
                id: `vn-${index}`,
                pairId: index,
                text: item.vn,
            });
        });

        // Shuffle array using the Fisher-Yates algorithm
        for (let i = generatedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
        }

        return generatedCards;
    }, [dataToUse]);

    // Reset the game when data changes
    useEffect(() => {
        setSelectedCards([]);
        setMatchedIds([]);
        setErrorCards([]);
    }, [dataToUse]);

    const handleCardClick = (card) => {
        // If the user clicks on the currently selected card, deselect it
        if (selectedCards.some(s => s.id === card.id)) {
            setSelectedCards(selectedCards.filter(s => s.id !== card.id));
            return;
        }

        if (
            selectedCards.length === 2 ||
            matchedIds.includes(card.pairId) ||
            errorCards.length > 0
        ) {
            return;
        }

        const newSelected = [...selectedCards, card];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;

            if (first.pairId === second.pairId) {
                setMatchedIds(prev => [...prev, first.pairId]);
                setSelectedCards([]);
            } else {
                setErrorCards([first.id, second.id]);
                setTimeout(() => {
                    setErrorCards([]);
                    setSelectedCards([]);
                }, 400);
            }
        }
    };

    const isGameComplete = cards.length > 0 && matchedIds.length === dataToUse.length;

    // AUTOMATIC COLUMN DIVISION LOGIC
    const totalCards = cards.length;
    const maxCols = Math.max(2, Math.ceil(Math.sqrt(totalCards)));

    const gapRem = 1;
    const cardWidth = totalCards > 0 ? `calc(${100 / maxCols}% - ${(maxCols - 1) * gapRem / maxCols}rem)` : '100%';
    const maxCardWidthRem = 11;
    const gridMaxWidth = `${maxCols * maxCardWidthRem + (maxCols - 1) * gapRem}rem`;

    return (
        <div className="w-full max-w-4xl mx-auto p-5 sm:p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 font-sans transition-all duration-300">

            {cards.length > 0 ? (
                <div
                    className="flex flex-wrap justify-center gap-4 mx-auto"
                    style={{ maxWidth: gridMaxWidth }}
                >
                    {cards.map((card) => {
                        const isSelected = selectedCards.some(s => s.id === card.id);
                        const isMatched = matchedIds.includes(card.pairId);
                        const isError = errorCards.includes(card.id);

                        let baseClasses = "flex items-center justify-center p-3 sm:p-4 aspect-square rounded-2xl font-semibold text-base sm:text-lg transition-all duration-150 select-none border-2 text-center break-words overflow-hidden ";

                        if (isMatched) {
                            baseClasses += "opacity-20 pointer-events-none scale-90";
                        } else if (isError) {
                            baseClasses += "border-red-500 bg-red-50 text-red-600 scale-[0.98] shadow-inner";
                        } else if (isSelected) {
                            baseClasses += "border-blue-500 bg-blue-50 text-blue-700 scale-105 shadow-lg shadow-blue-500/20 z-10";
                        } else {
                            baseClasses += "border-gray-200 bg-white text-gray-700 cursor-pointer shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md";
                        }

                        return (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(card)}
                                className={baseClasses}
                                style={{ width: cardWidth }}
                            >
                                {card.text}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    No vocabulary data available.
                </div>
            )}

            {isGameComplete && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 text-center animate-fade-in flex flex-col items-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">🎉 Excellent!</h3>
                    <p className="text-green-600 sm:text-lg font-medium mb-5">You have successfully matched all the words!</p>
                    {onClick && (
                        <button
                            onClick={onClick}
                            className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md cursor-pointer hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 transition-all active:translate-y-0"
                        >
                            Play Again
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchQuestion;