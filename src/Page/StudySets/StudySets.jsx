import { useState, useEffect } from 'react';
import { Plus, Search, X, Trash2 } from 'lucide-react';
import Button from '../../components/Button.jsx';
import StudySetCard from '../../components/StudySetCard.jsx';
import Input from '../../components/Input.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { useStudy } from '../../context/studyContext.jsx';
import URL from '../../api/UserApi.jsx';

export default function StudySets() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { ChangeStudyData } = useStudy();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [studySets, setStudySets] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    const [newSetData, setNewSetData] = useState({
        title: '',
        description: '',
        category: 'Vocabulary',
    });

    const [newCards, setNewCards] = useState([
        { term: '', definition: '' },
        { term: '', definition: '' },
    ]);

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

    const fetchStudySets = async () => {
        if (!user || !user._id) {
            return;
        }

        try {
            const res = await axios.get(`${URL}/StudySets?user_id=${user._id}`);
            if (res.data && Array.isArray(res.data)) {
                setStudySets(res.data);
            }
        } catch (error) {
            console.error('Error fetching study sets:', error);
            setStudySets([]);
        }
    };

    // Fetch study sets from API when user is available
    useEffect(() => {
        if (user && user._id) {
            fetchStudySets();
        }
    }, [user]);

    // Filter study sets
    const filteredSets = studySets.filter((set) => {
        const categoryMatch =
            selectedCategory === 'All' || set.category === selectedCategory;
        const searchMatch =
            set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            set.description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const handleStudyClick = async (set) => {
        // navigate to study mode
        await ChangeStudyData(set);
        navigate(`/StudySets/study/${set._id}`);
    };

    const handleQuizClick = async (set) => {
        // navigate to quiz mode
        await ChangeStudyData(set);
        navigate(`/StudySets/quiz/${set._id}`);
    };

    const openCreateModal = () => {
        setCreateError('');
        setNewSetData({ title: '', description: '', category: 'Vocabulary' });
        setNewCards([{ term: '', definition: '' }, { term: '', definition: '' }]);
        setShowCreateModal(true);
    };

    const handleCreateNew = () => {
        openCreateModal();
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        setCreateError('');
    };

    const handleCardChange = (index, field, value) => {
        setNewCards((prev) =>
            prev.map((card, i) =>
                i === index ? { ...card, [field]: value } : card,
            ),
        );
    };

    const addCard = () => {
        setNewCards((prev) => [...prev, { term: '', definition: '' }]);
    };

    const removeCard = (index) => {
        if (newCards.length <= 1) return;
        setNewCards((prev) => prev.filter((_, i) => i !== index));
    };

    const validateNewSet = () => {
        if (!newSetData.title.trim()) {
            setCreateError('Please enter a title for your study set.');
            return false;
        }
        const validCards = newCards.filter(
            (c) => c.term.trim() && c.definition.trim(),
        );
        if (validCards.length === 0) {
            setCreateError('Add at least one term and definition to the set.');
            return false;
        }
        return true;
    };

    const handleSaveNewSet = async () => {
        if (!user || !user._id) {
            setCreateError('You must be signed in to create a study set.');
            return;
        }

        if (!validateNewSet()) return;

        setIsCreating(true);
        setCreateError('');

        try {
            const payload = {
                user_id: user._id,
                title: newSetData.title.trim(),
                description: newSetData.description.trim(),
                category: newSetData.category,
                total: newCards.length,
                learned: 0,
                reviews: 0,
            };

            const createSetResponse = await axios.post(`${URL}/StudySets`, payload);
            const createdSet = createSetResponse.data;

            const cleanCards = newCards
                .filter((c) => c.term.trim() && c.definition.trim())
                .map((c) => ({
                    term: c.term.trim(),
                    definition: c.definition.trim(),
                }));

            if (createdSet && createdSet._id) {
                await axios.post(`${URL}/vocabulary`, {
                    flashCard_id: createdSet._id,
                    Vocabulary: cleanCards,
                });

                setStudySets((prev) => [
                    {
                        ...createdSet,
                        ...payload,
                        _id: createdSet._id,
                        total: cleanCards.length,
                    },
                    ...prev,
                ]);
            } else {
                // fallback: local optimistic update
                setStudySets((prev) => [
                    {
                        ...payload,
                        _id: `local-${Date.now()}`,
                        total: cleanCards.length,
                    },
                    ...prev,
                ]);
            }

            closeCreateModal();
        } catch (error) {
            console.error('Error creating new study set:', error);
            setCreateError('Unable to create set. Please try again.');
        } finally {
            setIsCreating(false);
        }
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
                            onClick={openCreateModal}
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
                                {studySets.reduce((sum, set) => sum + set.learned, 0)}
                            </p>
                            <p className="text-muted-foreground">Cards Learned</p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-success mb-2">
                                {studySets.length}
                            </p>
                            <p className="text-muted-foreground">Study Sets</p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-warning mb-2">
                                {studySets.length > 0
                                    ? Math.round(
                                          (studySets.reduce(
                                              (sum, set) => sum + set.learned,
                                              0,
                                          ) /
                                              studySets.reduce(
                                                  (sum, set) => sum + set.total,
                                                  0,
                                              )) *
                                              100,
                                      )
                                    : 0}
                                %
                            </p>
                            <p className="text-muted-foreground">Overall Progress</p>
                        </div>
                        <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
                            <p className="text-3xl font-bold text-info mb-2">
                                {studySets.reduce((sum, set) => sum + set.reviews, 0)}
                            </p>
                            <p className="text-muted-foreground">Total Reviews</p>
                        </div>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-4xl rounded-2xl bg-slate-900 p-6 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Create New Study Set</h2>
                                <p className="text-sm text-slate-300">
                                    Add vocabulary cards to create a new flashcard set.
                                </p>
                            </div>
                            <button
                                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700"
                                onClick={closeCreateModal}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Input
                                label="Tiêu đề"
                                value={newSetData.title}
                                onChange={(e) =>
                                    setNewSetData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Study set title"
                            />
                            <Input
                                label="Mô tả"
                                value={newSetData.description}
                                onChange={(e) =>
                                    setNewSetData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Describe your set"
                            />
                            <select
                                value={newSetData.category}
                                onChange={(e) =>
                                    setNewSetData((prev) => ({
                                        ...prev,
                                        category: e.target.value,
                                    }))
                                }
                                className="w-full px-4 py-2.5 border-2 rounded-lg bg-slate-100 text-foreground"
                            >
                                {categories
                                    .filter((cat) => cat !== 'All')
                                    .map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold">Vocabulary Cards</h3>
                                <Button
                                    variant="secondary"
                                    size="md"
                                    onClick={addCard}
                                    className="flex items-center gap-2"
                                >
                                    <Plus size={14} />
                                    Add Card
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {newCards.map((card, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-800 rounded-xl border border-slate-700 p-4"
                                    >
                                        <div className="flex items-start justify-between mb-3 gap-2">
                                            <p className="font-semibold text-slate-100">
                                                {index + 1}
                                            </p>
                                            <button
                                                className="p-2 rounded-lg text-destructive hover:bg-slate-700"
                                                onClick={() => removeCard(index)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Input
                                                label="Thuật ngữ"
                                                value={card.term}
                                                onChange={(e) =>
                                                    handleCardChange(
                                                        index,
                                                        'term',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Term"
                                                className="bg-slate-100 text-foreground"
                                            />
                                            <Input
                                                label="Định nghĩa"
                                                value={card.definition}
                                                onChange={(e) =>
                                                    handleCardChange(
                                                        index,
                                                        'definition',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Definition"
                                                className="bg-slate-100 text-foreground"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {createError && (
                            <p className="text-sm text-destructive mb-3">
                                {createError}
                            </p>
                        )}

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={closeCreateModal}
                                disabled={isCreating}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveNewSet}
                                isLoading={isCreating}
                            >
                                Save Set
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

