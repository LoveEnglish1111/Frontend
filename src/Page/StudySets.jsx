import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/Button';
import StudySetCard from '../components/StudySetCard';
import Input from '../components/Input';

export default function StudySets() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock study sets data
  const mockStudySets = [
    {
      id: 1,
      title: 'Phrasal Verbs Advanced',
      category: 'Phrasal',
      description: 'Master 50+ phrasal verbs for daily conversations',
      total: 50,
      learned: 32,
      reviews: 15,
    },
    {
      id: 2,
      title: 'IELTS Writing Band 8',
      category: 'IELTS',
      description: 'Essential vocabulary and phrases for IELTS writing',
      total: 68,
      learned: 45,
      reviews: 22,
    },
    {
      id: 3,
      title: 'Grammar Tenses',
      category: 'Grammar',
      description: 'Complete guide to English tenses and their usage',
      total: 42,
      learned: 42,
      reviews: 8,
    },
    {
      id: 4,
      title: 'Business English',
      category: 'Business',
      description: 'Professional vocabulary for international business',
      total: 55,
      learned: 21,
      reviews: 10,
    },
    {
      id: 5,
      title: 'Daily Conversation Starters',
      category: 'Daily',
      description: 'Common phrases and idioms for everyday talk',
      total: 38,
      learned: 28,
      reviews: 19,
    },
    {
      id: 6,
      title: 'Vocabulary: Nature & Environment',
      category: 'Vocabulary',
      description: 'Words and phrases related to nature and ecology',
      total: 45,
      learned: 18,
      reviews: 5,
    },
    {
      id: 7,
      title: 'Medicine & Health',
      category: 'Vocabulary',
      description: 'Medical terminology and health-related vocabulary',
      total: 52,
      learned: 33,
      reviews: 11,
    },
    {
      id: 8,
      title: 'Academic Collocations',
      category: 'Grammar',
      description: 'Word combinations commonly used in academic writing',
      total: 60,
      learned: 44,
      reviews: 16,
    },
  ];

  const categories = ['All', 'Grammar', 'Vocabulary', 'Phrasal', 'IELTS', 'Business', 'Daily'];

  // Filter study sets
  const filteredSets = mockStudySets.filter((set) => {
    const categoryMatch =
      selectedCategory === 'All' || set.category === selectedCategory;
    const searchMatch =
      set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleStudyClick = (setId) => {
    // TODO: Navigate to study mode or open study modal
    console.log('Study set:', setId);
  };

  const handleQuizClick = (setId) => {
    // TODO: Navigate to quiz mode or open quiz modal
    console.log('Quiz set:', setId);
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Study Sets</h1>
          <p className="text-muted-foreground">Master English with our curated vocabulary sets</p>
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
            <Button variant="primary" size="md" onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={18} />
              Create New Set
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase">Filter by Category</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
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
          Showing {filteredSets.length} study set{filteredSets.length !== 1 ? 's' : ''}
        </p>

        {/* Study Sets Grid */}
        {filteredSets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSets.map((set) => (
              <StudySetCard
                key={set.id}
                set={set}
                onStudyClick={handleStudyClick}
                onQuizClick={handleQuizClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No study sets found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button variant="primary" onClick={handleCreateNew} className="flex items-center gap-2 mx-auto">
              <Plus size={18} />
              Create Your First Set
            </Button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Learning Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
              <p className="text-3xl font-bold text-primary-600 mb-2">
                {mockStudySets.reduce((sum, set) => sum + set.learned, 0)}
              </p>
              <p className="text-muted-foreground">Cards Learned</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
              <p className="text-3xl font-bold text-success mb-2">
                {mockStudySets.length}
              </p>
              <p className="text-muted-foreground">Study Sets</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
              <p className="text-3xl font-bold text-warning mb-2">
                {Math.round(
                  (mockStudySets.reduce((sum, set) => sum + set.learned, 0) /
                    mockStudySets.reduce((sum, set) => sum + set.total, 0)) *
                    100
                )}%
              </p>
              <p className="text-muted-foreground">Overall Progress</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-border p-6 text-center">
              <p className="text-3xl font-bold text-info mb-2">
                {mockStudySets.reduce((sum, set) => sum + set.reviews, 0)}
              </p>
              <p className="text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}