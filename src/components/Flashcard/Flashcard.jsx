import { useState } from 'react';
import './Flashcard.css';

export default function Flashcard(props) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className="card-container" onClick={() => setFlipped(!flipped)}>
            <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="front">{props.Vocabulary.en}</div>
                <div className="back">{props.Vocabulary.vn}</div>
            </div>
        </div>
    );
}
