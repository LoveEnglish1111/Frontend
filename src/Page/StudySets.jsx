import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/Button';
import StudySetCard from '../components/StudySetCard';
import Input from '../components/Input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/studyContext.jsx';
import URL1 from '../api/UserApi.jsx';

export default function StudySets() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { ChangeStudyData } = useStudy();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [studySets, setStudySets] = useState([]);

    // categories used in UI
    const categories = [
        'All',
        'Grammar',
        'Vocabulary',
        'Phrasal',
        'IELTS',
        'Business',
        'Daily',
    ];

    // Check for ?tab=daily query param on mount
    useEffect(() => {
        if (searchParams.get && searchParams.get('tab') === 'daily') {
            setSelectedCategory('Daily');
        }
    }, [searchParams]);

    // Fetch study sets from API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`http://localhost:1111/StudySets?user_id=${user._id}`);
                const res = await axios.get(`${URL1}/StudySets?user_id=${user._id}`);
                if (res.data && Array.isArray(res.data)) {
                    setStudySets(res.data);
                }
            } catch (error) {
                console.error('Error fetching study sets:', error);
                setStudySets(INITIAL_STUDY_SETS);
            }
        };

        fetchData();
    }, []);

    // Filter study sets
    const filteredSets = studySets.filter((set) => {
        const categoryMatch =
            selectedCategory === 'All' || set.category === selectedCategory;
        const searchMatch =
            set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            set.description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });


    const handleStudyClick = (set) => {
        // navigate to study mode
        ChangeStudyData(set)
        navigate(`/StudySets/study/${set._id}`);
    };

    const handleQuizClick = (set) => {
        // navigate to quiz mode
        ChangeStudyData(set)
        navigate(`/StudySets/quiz/${set._id}`);
    };

    const handleCreateNew = () => {
        // TODO: Open create set modal
        console.log('Create new study set');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Study Sets
                    </h1>
                    <p className="text-muted-foreground">
                        Master English with our curated vocabulary sets
                    </p>
                </div>

                {/* Action Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Input
                        type="text"
                        placeholder="Search study sets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search size={18} />}
                    />
                    <div className="flex justify-end">
                        <Button
                            variant="primary"
                            size="md"
                            onClick={handleCreateNew}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={18} />
                            Create New Set
                        </Button>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase">
                        Filter by Category
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition-all text-sm cursor-pointer ${
                                    selectedCategory === category
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-white border-2 border-border text-muted-foreground hover:border-primary-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredSets.length} study set
                    {filteredSets.length !== 1 ? 's' : ''}
                </p>

                {/* Study Sets Grid */}
                {filteredSets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSets.map((set) => (
                            <StudySetCard
                                key={set._id}
                                set={set}
                                onStudyClick={() => handleStudyClick(set)}
                                onQuizClick={() => handleQuizClick(set)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                            No study sets found
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your search or filters
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleCreateNew}
                            className="flex items-center gap-2 mx-auto"
                        >
                            <Plus size={18} />
                            Create Your First Set
                        </Button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-16 pt-8 border-t border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Your Learning Stats
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-primary-600 mb-2">
                                {studySets.reduce(
                                    (sum, set) => sum + set.learned,
                                    0,
                                )}
                            </p>
                            <p className="text-muted-foreground">
                                Cards Learned
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-success mb-2">
                                {studySets.length}
                            </p>
                            <p className="text-muted-foreground">Study Sets</p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-warning mb-2">
                                {Math.round(
                                    (studySets.reduce(
                                        (sum, set) => sum + set.learned,
                                        0,
                                    ) /
                                        studySets.reduce(
                                            (sum, set) => sum + set.total,
                                            0,
                                        )) *
                                        100,
                                )}
                                %
                            </p>
                            <p className="text-muted-foreground">
                                Overall Progress
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-info mb-2">
                                {studySets.reduce(
                                    (sum, set) => sum + set.reviews,
                                    0,
                                )}
                            </p>
                            <p className="text-muted-foreground">
                                Total Reviews
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
