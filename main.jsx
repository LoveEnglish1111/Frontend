import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './src/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext.jsx';
import { ToastProvider } from './src/context/ToastContext.jsx';
import ToastContainer from './src/components/ToastContainer.jsx';
import ProtectedRoute from './src/components/ProtectedRoute.jsx';

// Auth Pages
import SignIn from './src/Page/SignIn.jsx';
import SignUp from './src/Page/SignUp.jsx';
import ForgotPassword from './src/Page/ForgotPassword.jsx';
import VerifyEmail from './src/Page/VerifyEmail.jsx';

// Protected Pages
import Home from './src/Page/Home.jsx';
import StudySets from './src/Page/StudySets.jsx';
import Community from './src/Page/Community.jsx';
import Profile from './src/Page/Profile.jsx';
import AdminPanel from './src/Page/AdminPanel.jsx';
import StudyMode from './src/Page/StudyMode.jsx';
import QuizPage from './src/Page/QuizPage.jsx';

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

                                <Route
                                    path="StudySets"
                                    element={<StudySets />}
                                />

                                <Route
                                    path="StudySets/study/:setId"
                                    element={<StudyMode />}
                                />
                                <Route
                                    path="StudySets/quiz/:setId"
                                    element={<QuizPage />}
                                />

                                <Route
                                    path="Community"
                                    element={<Community />}
                                />
                                <Route path="Profile" element={<Profile />} />
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
