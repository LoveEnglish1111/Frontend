import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Github, Chrome } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
import URL from '../api/UserApi';

export default function SignIn() {
    const [email, setEmail] = useState(
        () => localStorage.getItem('savedEmail') || '',
    );
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(
        !!localStorage.getItem('savedEmail'),
    );
    const [errors, setErrors] = useState({});
    const { signin, isLoading, clearError, authError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    // Clear auth error when component mounts
    useEffect(() => {
        clearError();
    }, [clearError]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const res = await axios.get(
                `${URL}/auth/login?email=${email}&password=${password}`,
            );
            signin(res.data);
            if (res.data?.token) {
                localStorage.setItem('authToken', res.data.token);
            }
            localStorage.setItem('user', JSON.stringify(res.data));

            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }
            toast.success('🎉 Signed in successfully!');
            const from = location.state?.from?.pathname || '/';
            setTimeout(() => navigate(from), 500);
        } catch (error) {
            var message = error.response.data.message;
            const newErrors = {};
            if (error.response.data.At == 'Email') newErrors.email = message;
            else if (error.response.data.At == 'Password')
                newErrors.password = message;
            else {
                newErrors.email = newErrors.password = message;
            }
            setErrors(newErrors);
            return;
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">
                        Love English
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        English Learning Social Network
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
                        Sign In
                    </h2>
                    <p className="text-center text-muted-foreground text-sm mb-6">
                        Welcome back! Sign in to your account
                    </p>

                    {/* Form-level error */}
                    {(errors.form || authError) && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-medium text-red-700">
                                {errors.form || authError}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() =>
                                setErrors((prev) => ({ ...prev, email: '' }))
                            }
                            error={errors.email}
                            required
                        />

                        {/* Password Input */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() =>
                                setErrors((prev) => ({ ...prev, password: '' }))
                            }
                            error={errors.password}
                            required
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    className="w-4 h-4 rounded border-2 border-input accent-primary-600 cursor-pointer"
                                />
                                <span className="font-medium text-foreground">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/ForgotPassword"
                                className="text-primary-600 hover:text-primary-700 font-semibold transition"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                            disabled={isLoading}
                            className="mt-6"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-muted-foreground font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login Placeholders */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            disabled
                            className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                        >
                            <Chrome size={18} />
                            <span className="hidden sm:inline">Google</span>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            disabled
                            className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                        >
                            <Github size={18} />
                            <span className="hidden sm:inline">GitHub</span>
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-muted-foreground font-medium">
                        Don't have an account?{' '}
                        <Link
                            to="/SignUp"
                            className="text-primary-600 hover:text-primary-700 font-bold transition"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                <div>
                    <h1>Bạn có thể vô 2 tài khoảng này</h1>
                    <div>
                        <h2>email: stevehanji@gmail.com</h2>
                        <h2>password: 12345678</h2>
                    </div>

                    <div>
                        <h2>email: tankietdepzai@gmail.com</h2>
                        <h2>password: 12345678</h2>
                    </div>
                </div>
                {/* Footer */}
                <p className="text-center text-muted-foreground text-xs mt-6">
                    By signing in, you agree to our{' '}
                    <Link to="#" className="text-primary-600 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="#" className="text-primary-600 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
