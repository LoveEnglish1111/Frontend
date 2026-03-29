import FlashCard from '../components/Flashcard/FlashCard.jsx';

export default function TestComponent() {
    const Vocabulary = {
        en: 'Hello',
        vi: 'Xin chào',
    };
    return (
        <div>
            <FlashCard Vocabulary={Vocabulary} />
        </div>
    );
}
