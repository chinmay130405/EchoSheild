import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignup) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isSignup) {
        signup(formData.email, formData.password, formData.name);
        setSuccessMessage('Account created successfully! Welcome to EchoSheild 🎉');
      } else {
        login(formData.email, formData.password);
        setSuccessMessage('Login successful! Redirecting...');
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800 backdrop-blur-xl bg-opacity-80 rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">EchoSheild</h1>
            <p className="text-purple-100 text-sm">AI Misinformation Detection Platform</p>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            {/* Success message */}
            {successMessage && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-100 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Error message */}
            {errors.submit && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-100 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (signup only) */}
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border transition focus:outline-none focus:ring-2 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-purple-500/30 focus:ring-purple-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border transition focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-purple-500/30 focus:ring-purple-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border transition focus:outline-none focus:ring-2 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-purple-500/30 focus:ring-purple-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-purple-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password field (signup only) */}
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border transition focus:outline-none focus:ring-2 ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-purple-500/30 focus:ring-purple-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-purple-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  isSignup ? 'Create Account' : 'Sign In'
                )}
              </button>

              {/* Toggle button */}
              <div className="text-center mt-6 pt-6 border-t border-purple-500/20">
                <p className="text-gray-300 text-sm mb-3">
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}
                </p>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition"
                >
                  {isSignup ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-xs font-semibold mb-2">Demo Credentials:</p>
              <p className="text-blue-100 text-xs">Email: demo@echosheild.com</p>
              <p className="text-blue-100 text-xs">Password: demo1234</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 EchoSheild • Fighting Misinformation Together
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
