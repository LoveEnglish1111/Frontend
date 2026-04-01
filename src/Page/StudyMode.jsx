import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Study from '../components/Flashcard/Study.jsx';
// import Button from '../components/Button';
import { useStudy } from '../context/studyContext.jsx';
import { useState, useEffect } from 'react';

export default function StudyMode() {
    const navigate = useNavigate();
    const { studyData, vocabularyData, updateMarkLearned } = useStudy();
    const [learned, setLearned] = useState(new Set());

    useEffect(() => {
        if (!vocabularyData) return;
        const markLearned = vocabularyData.MarkLearned;
        const newLearned = new Set();

        for (let i = 0; i < markLearned.length; i++) {
            if (markLearned[i] === "1") {
                newLearned.add(i);
            }
        }
        setLearned(newLearned);
    }, [vocabularyData]);

    const handleMarkLearned = (currentIndex) => {
        const newLearned = new Set(learned);
        if (newLearned.has(currentIndex)) {
            newLearned.delete(currentIndex);
        } else {
            newLearned.add(currentIndex);
        }
        setLearned(newLearned);
    };

    const handleBackToStudySets = async () => {
        await updateMarkLearned(learned);
        navigate('/StudySets')
    }
    

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-border p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button
                        onClick={handleBackToStudySets}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Back to Study Sets
                    </button>
                    <h1 className="text-2xl font-bold text-foreground select-none">
                        Study Mode
                    </h1>
                </div>
            </div>

            {/* Study Content */}
            <div className="max-w-6xl mx-auto py-8">
                <Study
                    cards={vocabularyData.Vocabulary}
                    learned = {learned}
                    courseTitle={`Study Set: ${studyData.title}`}
                    handleMarkLearned = {handleMarkLearned}
                />
            </div>
        </div>
    );
}
