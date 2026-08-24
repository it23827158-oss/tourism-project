import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Chrome, AlertCircle, CheckCircle, Palmtree } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/TranslationContext';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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

    const success = await login(formData.email, formData.password);

    if (success) {
      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting...',
      });
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', formData.email);
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setMessage({
        type: 'error',
        text: 'Invalid email or password. Please try again.',
      });
    }
  };

  // Demo credentials hint
  const fillDemoCredentials = () => {
    setFormData({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="SL Traveler" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-3xl text-gray-900 mb-2">{t.auth.loginTitle}</h1>
          <p className="text-gray-600">{t.auth.loginSubtitle}</p>
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

        {/* Demo Alert */}
        <Alert className="mb-6 border-blue-500 bg-blue-50">
          <Mail className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-600">
            Demo: Use test@example.com / password123 or{' '}
            <button onClick={fillDemoCredentials} className="underline font-semibold hover:no-underline">
              click here
            </button>
          </AlertDescription>
        </Alert>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary rounded"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <span className="text-sm text-muted-foreground">{t.auth.rememberMe}</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                {t.auth.forgotPassword}
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing In...' : t.auth.signIn}
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

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.noAccount}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t.auth.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
