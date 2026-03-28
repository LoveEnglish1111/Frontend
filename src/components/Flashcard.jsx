import { useState } from 'react';
import { Volume2, RotateCw } from 'lucide-react';
import Button from './Button';

export default function Flashcard({ word, meaning, example, pronunciation }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = () => {
    // TODO: Implement text-to-speech
    console.log('Speaking:', word);
  };

  return (
    <div className="h-80 perspective">
      {/* Flashcard Container */}
      <div
        className={`relative w-full h-full cursor-pointer transition-transform duration-500 transform-gpu ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side - Word */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Language Badge */}
          <span className="absolute top-4 left-4 bg-white bg-opacity-20 text-xs font-bold px-2 py-1 rounded-full">
            English
          </span>

          {/* Word */}
          <h2 className="text-5xl font-bold text-center mb-4">{word}</h2>

          {/* Pronunciation */}
          {pronunciation && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm opacity-90">/{pronunciation}/</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak();
                }}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Pronounce"
              >
                <Volume2 size={20} />
              </button>
            </div>
          )}

          {/* Flip Hint */}
          <div className="absolute bottom-4 flex items-center gap-1 text-sm opacity-75">
            <RotateCw size={14} />
            Click to reveal meaning
          </div>
        </div>

        {/* Back Side - Meaning */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-success to-green-700 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Language Badge */}
          <span className="absolute top-4 left-4 bg-white bg-opacity-20 text-xs font-bold px-2 py-1 rounded-full">
            Definition
          </span>

          {/* Meaning */}
          <p className="text-center text-lg font-semibold mb-6">{meaning}</p>

          {/* Example */}
          {example && (
            <div className="bg-white bg-opacity-20 rounded-lg p-4 flex-1 flex items-center justify-center">
              <p className="text-sm text-center italic">
                💡 "{example}"
              </p>
            </div>
          )}

          {/* Flip Hint */}
          <div className="absolute bottom-4 flex items-center gap-1 text-sm opacity-75">
            <RotateCw size={14} />
            Click to see word
          </div>
        </div>
      </div>
    </div>
  );
}
