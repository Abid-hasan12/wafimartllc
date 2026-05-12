import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-cyan-600 text-white p-3 rounded font-semibold hover:bg-cyan-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {user.username}
          </h1>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 uppercase">Username</label>
              <p className="text-lg text-gray-800 mt-1">{user.username}</p>
            </div>

            {user.phone && user.phone !== 'N/A' && (
              <div className="border-b pb-4">
                <label className="text-sm font-semibold text-gray-600 uppercase">Phone</label>
                <p className="text-lg text-gray-800 mt-1">{user.phone}</p>
              </div>
            )}

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 uppercase">Login Type</label>
              <p className="text-lg text-gray-800 mt-1 capitalize">
                {user.loginType === 'pin' && '🔐 PIN Login'}
                {user.loginType === 'password' && '🔑 Password Login'}
                {user.loginType === 'google' && '🔵 Google'}
                {user.loginType === 'facebook' && '🔵 Facebook'}
              </p>
            </div>

            {user.loginTime && (
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase">Login Time</label>
                <p className="text-lg text-gray-800 mt-1">
                  {new Date(user.loginTime).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">ℹ️ Account Information</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Your account data is securely stored locally</li>
            <li>✓ You can update your profile settings anytime</li>
            <li>✓ Your session persists across page refreshes</li>
            <li>✓ Social logins are demo-only for this session</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
