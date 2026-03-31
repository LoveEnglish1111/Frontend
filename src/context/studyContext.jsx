import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import URL from '../api/UserApi';

const StudyContext = createContext();
export const StudyProvider = ({ children }) => {
    const [studyData, setStudyData] = useState(null);
    const [vocabularyData, setVocabularyData] = useState(null);

    async function ChangeStudyData(data) {
        setStudyData(data);
        try {
            const res = await axios.get(
                `${URL}/vocabulary?flashCard_id=${data._id}`,
            );
            setVocabularyData(res.data[0].Vocabulary);
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        ChangeStudyData,
        vocabularyData,
        studyData,
    };

    return (
        <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
    );
};

export const useStudy = () => {
    const context = useContext(StudyContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
