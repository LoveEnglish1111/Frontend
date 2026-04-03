// import Flashcard from '../components/Flashcard/Flashcard.jsx';
import MultipleChoice from "../components/Study/mutipleChoice";
import MatchQuestion from "../components/Study/MatchQuestion";

export default function TestComponent() {
    const SampleData = [
        { en: "Hello", vn: "Xin chào" },
        { en: "Good bye", vn: "Tạm biệt" },
        { en: "Thank you", vn: "Cảm ơn" },
        { en: "Sorry", vn: "Xin lỗi" },
        { en: "Please", vn: "Làm ơn" },
        { en: "Yes", vn: "Có" },
        { en: "No", vn: "Không" },
        { en: "Excuse me", vn: "Xin phép / Xin lỗi" },
        { en: "How are you?", vn: "Bạn khỏe không?" },
        { en: "I'm fine", vn: "Tôi ổn" }
    ];
    return (
        <div>
            {/* <MultipleChoice question="Hello" options={["Xin chào", "Tạm biệt", "Không biết", "Biết"]} /> */}
            <MatchQuestion VocabularyData={SampleData} />
        </div>
    );
}
