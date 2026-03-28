import { useState } from "react"
import { Link } from "lucide-react"

export default function UserFlashcard(props) {
    const [isHover, setIsHover] = useState(false)
    return (
        <div className="relative w-full h-[100px] bg-[white] shadow-md rounded-[20px] overflow-hidden cursor-pointer pl-[20px] pt-[10px] mb-[20px]" 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            >
            <p>{props.wordCount} Từ Vựng</p>
            <h1 className="font-bold text-[20px]">{props.title}</h1>
            <div className={`w-full h-[10px] absolute bottom-0 left-0 ${isHover ? "bg-primary" : ""}`}>
            </div>
        </div>
    )
}