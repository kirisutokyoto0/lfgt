import React, { useState } from 'react';

const App = () => {
  const [currentForm, setCurrentForm] = useState('login'); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '' 
  });
  const [forgotData, setForgotData] = useState({ email: '' });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Error states
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Login successful!');
      }, 1500);
    }
  };

  const handleRegister = async () => {
    const newErrors = {};

    if (!registerData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!registerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(registerData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Account created successfully!');
        setCurrentForm('login');
        // Clear form data
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        setAgreeToTerms(false);
      }, 1500);
    }
  };

  const handleForgotPassword = async () => {
    const newErrors = {};

    if (!forgotData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(forgotData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Password reset link sent to your email!');
        setCurrentForm('login');
        // Clear form data
        setForgotData({ email: '' });
      }, 1500);
    }
  };

  // Clear errors when switching forms
  const switchForm = (formType) => {
    setCurrentForm(formType);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAgreeToTerms(false);
  };

  const renderLoginForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => switchForm('forgot')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => switchForm('register')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <button
          onClick={() => switchForm('login')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Login
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join us today</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={registerData.firstName}
              onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="First name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={registerData.lastName}
              onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 ${
              errors.terms ? 'border-red-500' : ''
            }`}
            required
          />
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <button type="button" className="text-blue-600 hover:text-blue-800 underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-blue-600 hover:text-blue-800 underline">
              Privacy Policy
            </button>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

        <button
          onClick={handleRegister}
          disabled={isLoading || !agreeToTerms}
          className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium ${
            agreeToTerms && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <button
          onClick={() => switchForm('login')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Login
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">Enter your email to receive a reset link</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={forgotData.email}
            onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <button
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => switchForm('login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        {currentForm === 'login' && renderLoginForm()}
        {currentForm === 'register' && renderRegisterForm()}
        {currentForm === 'forgot' && renderForgotPasswordForm()}
      </div>
    </div>
  );
};

export default App;