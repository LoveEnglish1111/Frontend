import Flashcard from "../components/Flashcard/Flashcard.jsx";

export default function TestComponent() {
    const Vocabulary = {
        en: 'Hello',
        vi: 'Xin chào',
    };
    return (
        <div>
            <Flashcard Vocabulary={Vocabulary} />
        </div>
    );
}
