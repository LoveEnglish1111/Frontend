import UserFlashcard from "../components/Flashcard/UserFlashcard";

function StudySets() {
    const DataVocabulary = [
        {
            wordCount : 10,
            title : "Từ Vựng Cơ Bản",
            ID : "111"
        },
        {
            wordCount : 50,
            title : "Từ Vựng Đời Sống",
            ID : "222"
        }
    ]
    return (
        <div className="ml-[20px] mt-[50px] w-[800px]">
            <h1 className="font-bold text-[25px] mb-[20px] border-b-[1px] border-b-gray-300">Từ Vựng Của Bạn</h1>
            {
                DataVocabulary.map((data) => (
                    <UserFlashcard wordCount = {data.wordCount} title = {data.title}/>
                ))
            }
        </div>
    )
}

export default StudySets;