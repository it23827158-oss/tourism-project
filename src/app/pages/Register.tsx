import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, Chrome, AlertCircle, CheckCircle, Palmtree } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/TranslationContext';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isLoading } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    const success = await register(formData.email, formData.password, formData.name);

    if (success) {
      setMessage({
        type: 'success',
        text: 'Account created successfully! Redirecting...',
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setMessage({
        type: 'error',
        text: 'Registration failed. This email may already be registered.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="SL Traveler" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-3xl text-foreground font-bold mb-2">{t.auth.registerTitle}</h1>
          <p className="text-muted-foreground">{t.auth.registerSubtitle}</p>
        </div>

        {/* Messages */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={message.type === 'error' ? 'text-red-600' : 'text-green-600'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm text-foreground font-medium mb-2">{t.dashboard.name}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.auth.namePlaceholder}
                  className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-foreground font-medium mb-2">{t.dashboard.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-foreground font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-foreground font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary rounded mt-1"
                checked={formData.agreeTerms}
                onChange={(e) => {
                  setFormData({ ...formData, agreeTerms: e.target.checked });
                  if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: '' });
                }}
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  {t.footer.terms}
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  {t.footer.privacy}
                </a>
              </span>
            </label>
            {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : t.auth.signUp}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full gap-2" size="lg">
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.haveAccount}{' '}
            <Link to="/login" className="text-primary hover:underline">
              {t.auth.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
