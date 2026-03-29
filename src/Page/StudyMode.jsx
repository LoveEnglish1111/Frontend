import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Study from '../components/Flashcard/Study.jsx';
import Button from '../components/Button';

export default function StudyMode() {
  const { setId } = useParams();
  const navigate = useNavigate();

  // Mock data - thay bằng dữ liệu thực từ API sau
  const mockCards = [
    {
      id: 1,
      front: 'What is "phrasal verb"?',
      back: 'A verb combined with preposition or adverb',
    },
    {
      id: 2,
      front: 'Give an example of phrasal verb',
      back: 'Turn on, turn off, pick up, etc.',
    },
    {
      id: 3,
      front: 'Use "break down" in a sentence',
      back: 'The car broke down on the highway.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/StudySets')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Study Sets
          </button>
          <h1 className="text-2xl font-bold text-foreground">Study Mode</h1>
        </div>
      </div>

      {/* Study Content */}
      <div className="max-w-6xl mx-auto py-8">
        <Study cards={mockCards} courseTitle={`Study Set #${setId}`} />
      </div>
    </div>
  );
}
