import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Chrome } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Form validation
        const newErrors = {};

        if (!formData.fullName.trim())
            newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!agreeToTerms) newErrors.terms = 'You must agree to the terms';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Call signup from Auth context
        const result = await signup(
            formData.email,
            formData.password,
            formData.fullName,
        );

        if (result.success) {
            // Redirect to email verification page
            navigate('/VerifyEmail', { state: { email: formData.email } });
        } else {
            setErrors({ form: result.message });
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">
                        ELSN
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
                        <p className="text-xs text-muted-foreground">
                            Must be at least 8 characters
                        </p>

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
                                className="w-4 h-4 rounded border-2 border-input accent-primary-600 cursor-pointer mt-0.5 flex-shrink-0"
                            />
                            <span className="text-sm font-medium text-foreground">
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
            </div>
        </div>
    );
}
