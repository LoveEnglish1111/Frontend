import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state (passed from SignUp)
  const email = location.state?.email || 'your@email.com';

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!code) newErrors.code = 'Verification code is required';
    if (code.length !== 6) newErrors.code = 'Code must be 6 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Call verify email API
    const result = await verifyEmail(email, code);
    setIsLoading(false);

    if (result.success) {
      setVerified(true);
      // Auto redirect after 2 seconds
      setTimeout(() => navigate('/SignIn'), 2000);
    } else {
      setErrors({ code: result.message });
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    // TODO: Implement resend code logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTimeLeft(300);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">ELSN</h1>
          <p className="text-muted-foreground font-medium">
            English Learning Social Network
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {verified ? (
            <>
              {/* Success Message */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Email Verified!
                </h2>
                <p className="text-muted-foreground">
                  Your email has been verified successfully. <br />
                  Redirecting to Sign In...
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
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Verify Your Email
                </h2>
                <p className="text-muted-foreground text-sm">
                  We've sent a 6-digit code to <br />
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Code Input */}
                <div>
                  <Input
                    label="Verification Code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    error={errors.code}
                    required
                    maxLength="6"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Code expires in: <span className="font-bold text-destructive">{formatTime(timeLeft)}</span>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-6"
                  disabled={timeLeft === 0}
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </Button>
              </form>

              {/* Resend Code */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground text-sm mb-3">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  Resend Code
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          Verification helps keep your account secure
        </p>
      </div>
    </div>
  );
}
