import React, { useState } from 'react';
import { auth, googleProvider, registerWithEmail, loginWithEmail, signInWithGoogle } from '../firebase';
import './LoginPage.css';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('user'); // 'user' or 'recruiter'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password);
      if (loginType === 'user') {
        window.location.href = 'https://ai-recruiter-agency-skillsift.streamlit.app/';
      } else {
        window.location.href = 'https://ai-resume-analyzer-idm3.onrender.com/';
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    try {
      await registerWithEmail(email, password);
      if (loginType === 'user') {
        window.location.href = 'https://ai-recruiter-agency-skillsift.streamlit.app/';
      } else {
        window.location.href = 'https://ai-resume-analyzer-yugc.onrender.com/';
      }
    } catch (error) {
      setError('Registration failed. ' + (error.message || 'Please try again.'));
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      if (loginType === 'user') {
        window.location.href = 'https://ai-recruiter-agency-skillsift.streamlit.app/';
      } else {
        window.location.href = 'https://ai-resume-analyzer-yugc.onrender.com/';
      }
    } catch (error) {
      setError('Google login failed. Please try again.');
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-gradient text-4xl font-bold mb-2">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-dark-200 text-lg">
              {isRegister ? 'Register to get started' : 'Choose your login type and get started'}
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setLoginType('user')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                loginType === 'user'
                  ? 'bg-white text-dark-200 shadow-sm'
                  : 'text-gray-500 hover:text-dark-200'
              }`}
            >
              👤 User
            </button>
            <button
              onClick={() => setLoginType('recruiter')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                loginType === 'recruiter'
                  ? 'bg-white text-dark-200 shadow-sm'
                  : 'text-gray-500 hover:text-dark-200'
              }`}
            >
              🏢 Recruiter
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-badge-red text-badge-red-text rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Email/Password Form or Registration Form */}
          {!isRegister ? (
            <form onSubmit={handleEmailLogin} className="mb-6">
              <div className="form-div mb-4">
                <label htmlFor="email" className="text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="text-base"
                />
              </div>

              <div className="form-div mb-6">
                <label htmlFor="password" className="text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-button text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:primary-gradient-hover transition-all duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign In with Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mb-6">
              <div className="form-div mb-4">
                <label htmlFor="reg-email" className="text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reg-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="text-base"
                />
              </div>

              <div className="form-div mb-4">
                <label htmlFor="reg-password" className="text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="reg-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="text-base"
                />
              </div>

              <div className="form-div mb-6">
                <label htmlFor="confirm-password" className="text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-button text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:primary-gradient-hover transition-all duration-200"
              >
                {isLoading ? 'Registering...' : 'Sign Up'}
              </button>
            </form>
          )}

          {/* Toggle Login/Register */}
          <div className="mb-6 text-center">
            {!isRegister ? (
              <span className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => { setIsRegister(true); setError(''); }}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => { setIsRegister(false); setError(''); }}
                >
                  Sign In
                </button>
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-dark-200 font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? (isRegister ? 'Registering...' : 'Signing in...') : (isRegister ? 'Sign Up with Google' : 'Continue with Google')}
          </button>

          {/* Info Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {loginType === 'user' 
                ? (isRegister ? 'Users will be redirected to the AI Recruiter platform after registration' : 'Users will be redirected to the AI Recruiter platform')
                : (isRegister ? 'Recruiters will be redirected to the recruiter dashboard after registration' : 'Recruiters will be redirected to the recruiter dashboard')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 