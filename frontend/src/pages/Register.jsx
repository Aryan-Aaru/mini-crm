import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check passwords match before sending to backend
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    // Check password length
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100
                    flex items-center justify-center
                    px-4 sm:px-6 lg:px-8">

      <div className="bg-white w-full
                      max-w-sm sm:max-w-md
                      rounded-2xl shadow-lg
                      p-6 sm:p-8 lg:p-10">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center
                          w-12 h-12 sm:w-16 sm:h-16
                          bg-indigo-600 rounded-full mb-3 sm:mb-4">
            <span className="text-white text-xl sm:text-2xl font-bold">C</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Join Mini CRM today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200
                          rounded-lg px-3 py-2 sm:px-4 sm:py-3
                          mb-4 sm:mb-6 text-xs sm:text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          {/* Name Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5
                         border border-gray-300 rounded-lg
                         text-sm
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent
                         transition duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5
                         border border-gray-300 rounded-lg
                         text-sm
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent
                         transition duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5
                         border border-gray-300 rounded-lg
                         text-sm
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent
                         transition duration-200"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5
                         border border-gray-300 rounded-lg
                         text-sm
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent
                         transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 sm:py-3 rounded-lg
                       text-white font-semibold text-sm sm:text-base
                       transition-colors duration-200 mt-2
                       ${loading
                         ? 'bg-indigo-300 cursor-not-allowed'
                         : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                       }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;