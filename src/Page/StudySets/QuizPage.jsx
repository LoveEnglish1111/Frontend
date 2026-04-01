import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import QuizMode from '../../../components/QuizMode.jsx';
import QuizMode from '../../components/QuizMode';

export default function QuizPage() {
    const { setId } = useParams();
    const navigate = useNavigate();

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
                        Quiz Mode
                    </h1>
                </div>
            </div>

            {/* Quiz Content */}
            <div className="max-w-6xl mx-auto py-8">
                <QuizMode studySetId={setId} />
            </div>
        </div>
    );
}
