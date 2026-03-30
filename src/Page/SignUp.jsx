import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Chrome } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import URL from '../api/UserApi';
import axios from 'axios';

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('');
    const { signup, isLoading, clearError, authError } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Tính toán độ mạnh của password
    const calculatePasswordStrength = (pwd) => {
        if (!pwd) {
            setPasswordStrength('');
            return;
        }

        let score = 0;
        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[!@#$%^&*]/.test(pwd)) score++;

        if (score <= 2) {
            setPasswordStrength('weak');
        } else if (score <= 4) {
            setPasswordStrength('fair');
        } else {
            setPasswordStrength('strong');
        }
    };

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Calculate password strength when password changes
        if (name === 'password') {
            calculatePasswordStrength(value);
        }

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // Get password strength color
    const getPasswordStrengthColor = () => {
        if (passwordStrength === 'weak') return 'bg-red-500';
        if (passwordStrength === 'fair') return 'bg-amber-500';
        if (passwordStrength === 'strong') return 'bg-green-500';
        return 'bg-gray-300';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!agreeToTerms) {
            newErrors.terms = 'You must agree to the terms';
            setErrors(newErrors);
            return;
        }

        try {
            const res = await axios.post(`${URL}/auth/register`, formData);
            toast.success('🎉 Account created successfully! Redirecting...');
            setTimeout(() => navigate('/SignIn'), 1500);
        } catch (error) {
            var message = error.response.data.message;
            var At = error.response.data.At;
            console.log(message, At);
            if (error.response.data.At == 'username')
                newErrors.fullName = message;
            else if (error.response.data.At == 'email')
                newErrors.email = message;
            else if (error.response.data.At == 'password')
                newErrors.password = message;
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4 py-8">
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
                    <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
                        Create Account
                    </h2>
                    <p className="text-center text-muted-foreground text-sm mb-6">
                        Join us and start learning today!
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Input */}
                        <Input
                            label="Full Name"
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            required
                        />

                        {/* Email Input */}
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        {/* Password Input */}
                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                required
                            />

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${getPasswordStrengthColor()}`}
                                            style={{
                                                width:
                                                    passwordStrength === 'weak'
                                                        ? '33%'
                                                        : passwordStrength ===
                                                            'fair'
                                                          ? '66%'
                                                          : '100%',
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium capitalize">
                                        {passwordStrength === 'weak' && (
                                            <span className="text-red-600">
                                                Weak
                                            </span>
                                        )}
                                        {passwordStrength === 'fair' && (
                                            <span className="text-amber-600">
                                                Fair
                                            </span>
                                        )}
                                        {passwordStrength === 'strong' && (
                                            <span className="text-green-600">
                                                Strong
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground mt-1">
                                Minimum 6 characters with mix of uppercase,
                                numbers, and symbols for stronger password
                            </p>
                        </div>

                        {/* Confirm Password Input */}
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                        />

                        {/* Terms Agreement */}
                        <label className="flex items-start gap-2 cursor-pointer mt-5">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) =>
                                    setAgreeToTerms(e.target.checked)
                                }
                                className="w-5 h-5 rounded border-2 border-input accent-primary-600 cursor-pointer mt-0.5 flex-shrink-0"
                            />
                            <span className="text-sm font-medium text-foreground leading-snug">
                                I agree to the{' '}
                                <Link
                                    to="#"
                                    className="text-primary-600 hover:underline"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    to="#"
                                    className="text-primary-600 hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-sm text-destructive font-medium">
                                {errors.terms}
                            </p>
                        )}

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
                            {isLoading
                                ? 'Creating account...'
                                : 'Create Account'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-muted-foreground font-medium">
                                Or sign up with
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

                    {/* Sign In Link */}
                    <p className="text-center text-muted-foreground font-medium">
                        Already have an account?{' '}
                        <Link
                            to="/SignIn"
                            className="text-primary-600 hover:text-primary-700 font-bold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-medium text-blue-900 mb-2">
                        Demo Accounts:
                    </p>
                    <p className="text-xs text-blue-800">
                        👤 User: user@irish.com / User123!
                    </p>
                    <p className="text-xs text-blue-800">
                        👨‍💼 Admin: admin@irish.com / Admin123!
                    </p>
                </div>
            </div>
        </div>
    );
}
