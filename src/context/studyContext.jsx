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
                `${URL}/vocabulary/get?flashCard_id=${data._id}`,
            );
            setVocabularyData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateMarkLearned(learned) {
        var MarkLearned = "";
        var cnt = 0;
        for (let i = 0; i < studyData.total; i++) {
            const isLearnHas = learned.has(i);
            MarkLearned += isLearnHas ? "1" : "0";
            cnt += isLearnHas ? 1 : 0;
        }
        
        // try {
        //     const res = await axios.post(
        //         `${URL}/vocabulary/update?flashCard_id=${data._id}`,
        //         vocabularyData
        //     );
        // } catch (error) {
        //     console.log(error);
        // }
        
    }

    const value = {
        ChangeStudyData,
        updateMarkLearned,
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
