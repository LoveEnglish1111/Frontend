import { createContext, useState, useContext } from 'react';

const StudyContext = createContext();
export const StudyProvider = ({ children }) => {
    const [studyData, setStudyData] = useState(null);

    function ChangeStudyData(data) {
        setStudyData(data);
    }

    const value = {
        ChangeStudyData,
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
