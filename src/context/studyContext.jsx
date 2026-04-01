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

    async function updateVocabularyData(newVocabularyData) {
        try {
            const res = await axios.post(
                `${URL}/vocabulary/update`,newVocabularyData);
        } catch (error) {
            console.log(error);
        }
    }

    async function updatestudyData(newStudyData) {
        try {
            const res = await axios.post(
                `${URL}/StudySets/update`,
                newStudyData
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function updateMarkLearned(learned) {
        var MarkLearned = '';
        var countLearned = 0;
        for (let i = 0; i < studyData.total; i++) {
            const isLearnHas = learned.has(i);
            MarkLearned += isLearnHas ? '1' : '0';
            countLearned += isLearnHas ? 1 : 0;
        }
        vocabularyData.MarkLearned = MarkLearned;
        studyData.learned = countLearned;
        await updateVocabularyData(vocabularyData);
        updatestudyData(studyData);
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
