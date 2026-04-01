import { Plus, Search, X, Trash2 } from 'lucide-react';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function CreateNewSet() {
    const navigate = useNavigate();
    // const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState('');
    const {user} = useAuth();

    const categories = [
        'All',
        'Grammar',
        'Vocabulary',
        'Phrasal',
        'IELTS',
        'Business',
        'Daily',
    ];
    const WatchMode = ["Public", "Private"]

    const [newSetData, setNewSetData] = useState({
        title: '',
        description: '',
        category: 'Vocabulary',
        visibility : "public"
    });

    const [newCards, setNewCards] = useState([
        { en: '', vi: '' },
        { en: '', vi: '' },
    ]);

    // const openCreateModal = () => {
    //     setCreateError('');
    //     setNewSetData({ title: '', description: '', category: 'Vocabulary' });
    //     setNewCards([
    //         { en: '', vi: '' },
    //         { en: '', vi: '' },
    //     ]);
    //     setShowCreateModal(true);
    // };

    // const closeCreateModal = () => {
    //     setShowCreateModal(false);
    //     setCreateError('');
    // };

    const handleCardChange = (index, field, value) => {
        setNewCards((prev) =>
            prev.map((card, i) =>
                i === index ? { ...card, [field]: value } : card,
            ),
        );
    };

    const addCard = () => {
        setNewCards((prev) => [...prev, { en: '', vi: '' }]);
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
            (c) => c.en.trim() && c.vi.trim(),
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

        console.log(newCards, newSetData);
        // setIsCreating(true);
        // if (!validateNewSet()) return;

        // setCreateError('');

        // try {
        //     const payload = {
        //         user_id: user._id,
        //         title: newSetData.title.trim(),
        //         description: newSetData.description.trim(),
        //         category: newSetData.category,
        //         total: newCards.length,
        //         learned: 0,
        //         reviews: 0,
        //     };

        //     // const createSetResponse = await axios.post(
        //     //     `${URL}/StudySets`,
        //     //     payload,
        //     // );
        //     const createdSet = createSetResponse.data;

        //     const cleanCards = newCards
        //         .filter((c) => c.en.trim() && c.vi.trim())
        //         .map((c) => ({
        //             en: c.en.trim(),
        //             vi: c.vi.trim(),
        //         }));

        //     if (createdSet && createdSet._id) {
        //         // await axios.post(`${URL}/vocabulary`, {
        //         //     flashCard_id: createdSet._id,
        //         //     Vocabulary: cleanCards,
        //         // });

        //         setStudySets((prev) => [
        //             {
        //                 ...createdSet,
        //                 ...payload,
        //                 _id: createdSet._id,
        //                 total: cleanCards.length,
        //             },
        //             ...prev,
        //         ]);
        //     } else {
        //         setStudySets((prev) => [
        //             {
        //                 ...payload,
        //                 _id: `local-${Date.now()}`,
        //                 total: cleanCards.length,
        //             },
        //             ...prev,
        //         ]);
        //     }

        //     closeCreateModal();
        // } catch (error) {
        //     console.error('Error creating new study set:', error);
        //     setCreateError('Unable to create set. Please try again.');
        // } finally {
        //     setIsCreating(false);
        // }
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-slate-50">
            {/* Header */}
            <div className="w-full bg-white border-b border-border p-4 mb-[20px]">
                <div className="w-full mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/StudySets')}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Back to Study Sets
                    </button>
                    <h1 className="text-2xl font-bold text-foreground select-none">
                        Create New Study Set
                    </h1>
                    <Button
                        variant="primary"
                        onClick={handleSaveNewSet}
                        isLoading={isCreating}
                    >
                        Save Set
                    </Button>
                </div>
            </div>

            <div className='w-[90%] max-w-[900px] h-full '>
                {/* Title */}
                <div>
                    <Input
                        placeholder = "Title"
                        value={newSetData.title}
                        className='mb-[10px]'
                        onChange={(e) =>
                            setNewSetData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }/>

                    <Input
                        value={newSetData.description}
                        fontLabelSize = {20}
                        className='mb-[10px]'
                        onChange={(e) =>
                            setNewSetData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="Describe"
                    />

                    <div className='flex justify-between'>
                        <div>
                            <select
                                value={newSetData.category}
                                onChange={(e) =>
                                    setNewSetData((prev) => ({
                                        ...prev,
                                        category: e.target.value,
                                    }))
                                }
                                className="w-[200px] px-4 py-2.5 border-2 rounded-lg transition-colors duration-200 outline-none 
                                bg-white text-foreground font-medium border-input focus:border-primary-600 focus:ring-1 
                                focus:ring-primary-600 mr-[20px] cursor-pointer">
                                {categories
                                    .filter((cat) => cat !== 'All')
                                    .map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                            </select>

                            <select
                                value={newSetData.visibility}
                                onChange={(e) =>
                                    setNewSetData((prev) => ({
                                        ...prev,
                                        visibility: e.target.value,
                                    }))
                                }
                                className="w-[200px] px-4 py-2.5 border-2 rounded-lg transition-colors duration-200 outline-none 
                                bg-white text-foreground font-medium border-input focus:border-primary-600 focus:ring-1 
                                focus:ring-primary-600 cursor-pointer"
                            >
                                {WatchMode
                                    .filter((watch) => watch !== 'All')
                                    .map((watch) => (
                                        <option key={watch} value={watch}>
                                            {watch}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <Button
                            variant="primary"
                            size="md"
                            onClick={addCard}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            Add Card
                        </Button>
                    </div>

                </div>
            </div>

            <div className="w-[90%] max-w-[900px] mb-4 mt-4">
                <div className="space-y-3">
                    {newCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 shadow-md"
                        >
                            <div className="flex items-start justify-between mb-3 gap-2">
                                <p className="font-semibold font-[black]">
                                    {index + 1}
                                </p>
                                <Button
                                    isLoading={isCreating}
                                    variant="primary"
                                    className="p-2 rounded-lg text-destructive cursor-pointer"
                                    onClick={() => removeCard(index)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input
                                    label="TERM"
                                    value={card.en}
                                    onChange={(e) =>
                                        handleCardChange(
                                            index,
                                            'en',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Term"
                                    className="bg-slate-100 text-foreground"
                                />
                                <Input
                                    label="DEFINITION"
                                    value={card.vi}
                                    onChange={(e) =>
                                        handleCardChange(
                                            index,
                                            'vi',
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
        </div>
    );
}
