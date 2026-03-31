import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Study from '../components/Flashcard/Study.jsx';
// import Button from '../components/Button';
import { useStudy } from '../context/studyContext.jsx';

export default function StudyMode() {
    const navigate = useNavigate();
    const { studyData, vocabularyData } = useStudy();

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
                    <h1 className="text-2xl font-bold text-foreground">
                        Study Mode
                    </h1>
                </div>
            </div>

            {/* Study Content */}
            <div className="max-w-6xl mx-auto py-8">
                <Study
                    cards={vocabularyData}
                    courseTitle={`Study Set: ${studyData.title}`}
                />
            </div>
        </div>
    );
}
