import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './src/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext.jsx';
import { ToastProvider } from './src/context/ToastContext.jsx';
import ToastContainer from './src/components/ToastContainer.jsx';
import ProtectedRoute from './src/components/ProtectedRoute.jsx';

// User Pages
import SignIn from './src/Page/User/SignIn.jsx';
import SignUp from './src/Page/User/SignUp.jsx';
import ForgotPassword from './src/Page/User/ForgotPassword.jsx';
import VerifyEmail from './src/Page/User/VerifyEmail.jsx';
import Profile from './src/Page/User/Profile.jsx';

// StudySets Page
import QuizPage from './src/Page/StudySets/QuizPage.jsx';
import StudyMode from './src/Page/StudySets/StudyMode.jsx';
import StudySets from './src/Page/StudySets/StudySets.jsx';
import CreateNewSet from './src/Page/StudySets/CreateNewSet.jsx';

// Protected Pages
import Home from './src/Page/Home.jsx';
import Community from './src/Page/Community.jsx';
import AdminPanel from './src/Page/AdminPanel.jsx';

import TestComponent from './src/Page/TestComponent.jsx';

// Study Page
import { StudyProvider } from './src/context/studyContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ToastProvider>
                    <StudyProvider>
                        <Routes>
                            {/* Public Auth Routes */}
                            <Route path="/SignIn" element={<SignIn />} />
                            <Route path="/SignUp" element={<SignUp />} />
                            <Route
                                path="/ForgotPassword"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/VerifyEmail"
                                element={<VerifyEmail />}
                            />

                            <Route path='/test' element={<TestComponent />} />

                            {/* Protected Routes */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <App />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Home />} />

                                {/* Study Set Page */}
                                <Route
                                    path="StudySets"
                                    element={<StudySets />}
                                />

                                <Route
                                    path="StudySets/CreateNewSet"
                                    element={<CreateNewSet />}
                                />

                                <Route
                                    path="StudySets/study/:setId"
                                    element={<StudyMode />}
                                />

                                <Route
                                    path="StudySets/quiz/:setId"
                                    element={<QuizPage />}
                                />

                                {/* Community */}
                                <Route
                                    path="Community"
                                    element={<Community />}
                                />

                                {/* Profile */}
                                <Route path="Profile" element={<Profile />} />

                                {/* Admin Panel */}
                                <Route
                                    path="AdminPanel"
                                    element={<AdminPanel />}
                                />
                            </Route>
                        </Routes>
                        <ToastContainer />
                    </StudyProvider>
                </ToastProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
