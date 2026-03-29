import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Github, Chrome } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const { signin, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Form validation
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Call signin from Auth context
        const result = await signin(email, password);

        if (result.success) {
            navigate('/'); // Redirect to home on success
        } else {
            setErrors({ form: result.message });
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">
                        LOVE ENGLISH
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        English Learning Social Network
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                        Sign In
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                to="/forgot-password"
                                className="text-primary-600 hover:text-primary-700 font-semibold"
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
                            className="flex items-center justify-center gap-2"
                        >
                            <Chrome size={18} />
                            <span className="hidden sm:inline">Google</span>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            className="flex items-center justify-center gap-2"
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
                            className="text-primary-600 hover:text-primary-700 font-bold"
                        >
                            Sign Up
                        </Link>
                    </p>
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
