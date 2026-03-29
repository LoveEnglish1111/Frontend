const UserApi = {
    mockUser: {
        name: 'Tấn Kiệt',
        email: 'tanKietdezai@gmail.com',
        avatar: '👨‍🎓',
        joinDate: 'January 15, 2024',
        bio: 'Passionate about learning English and connecting with learners worldwide!',
        level: 'Advanced',
    },
    achievements: [
        {
            name: 'Lọ',
            type: 'Lọ Code',
            description: 'Hoàn thành Lọ',
            unlocked: true,
        },
        {
            name: 'First Steps',
            type: 'First Steps',
            description: 'Complete your first lesson',
            unlocked: true,
        },
        {
            name: 'Speed Learner',
            type: 'Speed Learner',
            description: 'Learn 10 words in one day',
            unlocked: true,
            progress: 100,
        },
        {
            name: 'Perfect Streak',
            type: 'Perfect Streak',
            description: '7-day consecutive learning',
            unlocked: true,
            progress: 100,
        },
        {
            name: 'Grammar Master',
            type: 'Grammar Master',
            description: 'Complete 5 grammar lessons',
            unlocked: false,
            progress: 60,
        },
        {
            name: 'Vocabulary King',
            type: 'Vocabulary King',
            description: 'Learn 500+ vocabulary words',
            unlocked: false,
            progress: 45,
        },
        {
            name: 'Dedication',
            type: 'Dedication',
            description: '30-day learning streak',
            unlocked: false,
            progress: 33,
        },
    ],
    learningHistory: [
        { date: 'Today', items: 3, hours: 1.5 },
        { date: 'Yesterday', items: 5, hours: 2.0 },
        { date: '2 days ago', items: 4, hours: 1.8 },
        { date: '3 days ago', items: 6, hours: 2.5 },
        { date: '4 days ago', items: 2, hours: 0.9 },
    ],
};

export default UserApi;
