import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validation
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Call reset password API
        const result = await resetPassword(email);
        setIsLoading(false);

        if (result.success) {
            setSubmitted(true);
            // Auto redirect after 3 seconds
            setTimeout(() => navigate('/SignIn'), 3000);
        } else {
            setErrors({ email: result.message });
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
                    {submitted ? (
                        <>
                            {/* Success Message */}
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                                    <Mail size={32} className="text-success" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Check Your Email
                                </h2>
                                <p className="text-muted-foreground">
                                    We've sent a password reset link to <br />
                                    <span className="font-semibold text-foreground">
                                        {email}
                                    </span>
                                </p>
                                <p className="text-sm text-muted-foreground pt-2">
                                    Redirecting to Sign In page...
                                </p>

                                {/* Spinner */}
                                <div className="flex justify-center pt-4">
                                    <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Header */}
                            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
                                Reset Password
                            </h2>
                            <p className="text-center text-muted-foreground text-sm mb-6">
                                Enter your email address and we'll send you a
                                link to reset your password.
                            </p>

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
                                        ? 'Sending...'
                                        : 'Send Reset Link'}
                                </Button>
                            </form>

                            {/* Back to Sign In Link */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <Link
                                    to="/SignIn"
                                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm text-center justify-center"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-muted-foreground text-xs mt-6">
                    Remember your password?{' '}
                    <Link
                        to="/SignIn"
                        className="text-primary-600 hover:underline font-bold"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
