import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import URL from '../api/UserApi';
import { useAuth } from './AuthContext';

const StudyContext = createContext();
export const StudyProvider = ({ children }) => {
    const [studyData, setStudyData] = useState(null);
    const [vocabularyData, setVocabularyData] = useState(null);
    const [studySets, setStudySets] = useState(null);
    const {user} = useAuth();

    const fetchStudySets = async () => {
        if (!user || !user._id) {
            return;
        }

        try {
            const res = await axios.get(`${URL}/StudySets/get?user_id=${user._id}`);
            if (res.data && Array.isArray(res.data)) {
                setStudySets(res.data);
            }
        } catch (error) {
            console.error('Error fetching study sets:', error);
            setStudySets([]);
        }
    };

    useEffect(() => {
        if (user && user._id) {
            fetchStudySets();
        }
    }, [user]);

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

    async function deleteStudyData(flashCard_id) {
        try {
            const res = await axios.post(
                `${URL}/StudySets/delete?flashCard_id=${flashCard_id}`);
        } catch (error) {
            console.log(error);
        }

        try {
            const res = await axios.post(
                `${URL}/vocabulary/delete?flashCard_id=${flashCard_id}`);
        } catch (error) {
            console.log(error);
        }

        await fetchStudySets();
    }

    async function createNewStudySets(newStudyData, newVocabularyData) {
        try {
            const total = newVocabularyData.length;
            console.log(newStudyData);
            const res = await axios.post(
                `${URL}/StudySets/create`,
                {newStudyData, total, user_id : user._id}
            );

            await axios.post(
                `${URL}/vocabulary/create?flashCard_id=${res.data._id}`,
                {newVocabularyData, total});

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
        await updatestudyData(studyData);
    }

    const value = {
        studySets,
        ChangeStudyData,
        updateMarkLearned,
        createNewStudySets,
        deleteStudyData,
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
