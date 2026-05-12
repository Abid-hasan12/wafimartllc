import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginWithPIN, loginWithPassword, loginWithSocial } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.from?.pathname || '/';

  const handlePINLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !pin) {
      setError('Please enter username and PIN');
      setLoading(false);
      return;
    }

    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      setLoading(false);
      return;
    }

    const user = loginWithPIN(username, pin);
    if (user) {
      setTimeout(() => {
        navigate(previousPage);
      }, 500);
    } else {
      setError('Invalid username or PIN. Please try again or Sign Up');
      setPin('');
      setLoading(false);
    }
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter username and password');
      setLoading(false);
      return;
    }

    const user = loginWithPassword(username, password);
    if (user) {
      setTimeout(() => {
        navigate(previousPage);
      }, 500);
    } else {
      setError('Invalid username or password. Please try again or Sign Up');
      setPassword('');
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    loginWithSocial(provider);
    setTimeout(() => {
      navigate(previousPage);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {usePassword ? 'Login with Password' : 'One Time Password (OTP) Login'}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setUsePassword(false)}
            className={`flex-1 py-2 px-3 rounded font-semibold text-sm transition ${
              !usePassword
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            PIN Login
          </button>
          <button
            type="button"
            onClick={() => setUsePassword(true)}
            className={`flex-1 py-2 px-3 rounded font-semibold text-sm transition ${
              usePassword
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Password
          </button>
        </div>

        <form
          onSubmit={usePassword ? handlePasswordLogin : handlePINLogin}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Username / Phone Number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {usePassword ? (
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          ) : (
            <input
              type="password"
              placeholder="Enter 4-Digit PIN"
              maxLength="4"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white p-3 rounded font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : usePassword ? 'Login' : 'Send OTP / Login'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 text-center">Or continue with</h3>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full border border-gray-300 p-3 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="google"
            />
            <span className="text-sm">Sign in with Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            disabled={loading}
            className="w-full bg-[#3b5998] text-white p-3 rounded flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/157818/facebook.svg"
              className="w-5 h-5 invert"
              alt="facebook"
            />
            <span className="text-sm">Login with Facebook</span>
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don't Have a Wafi Mart account?{' '}
          <Link to="/signup" className="text-red-600 font-bold hover:underline">
            Please Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;