import React, { useState } from 'react';
import { X, Film, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    setError(null);
    login(email, authMode === 'signup' ? name : undefined);
  };

  const handleDemoLogin = () => {
    login('alex.thorne@cinepulse.io', 'Alex Thorne');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-[#12131c]/95 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#b81d24] to-[#e50914] flex items-center justify-center shadow-md">
            <Film className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xl font-black tracking-wider text-white uppercase font-cinema">
            CINE<span className="text-[#e50914]">PULSE</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {authMode === 'signin' ? 'Sign In' : 'Create an Account'}
        </h2>
        <p className="text-xs text-neutral-400 mb-6">
          {authMode === 'signin'
            ? 'Sign in to access your watchlists, personalized recommendations, and 4K playback.'
            : 'Join CinePulse to stream unlimited movies and TV series in stunning IMAX quality.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-lg text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Miller"
                required
                className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e50914] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e50914] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e50914] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-neutral-700 text-[#e50914] focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="hover:underline text-neutral-300"
              onClick={() => alert('Password reset instructions would be dispatched to your email in production.')}
            >
              Need help?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#e50914] hover:bg-[#b81d24] text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-900/30 text-sm cursor-pointer mt-2"
          >
            {authMode === 'signin' ? 'Sign In' : 'Start Membership'}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-4 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>One-Click Demo Sign In (Alex Thorne)</span>
          </button>
        </div>

        {/* Switch mode */}
        <div className="mt-6 text-center text-xs text-neutral-400">
          {authMode === 'signin' ? (
            <p>
              New to CinePulse?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setError(null);
                }}
                className="text-white font-semibold hover:underline cursor-pointer"
              >
                Sign up now.
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setError(null);
                }}
                className="text-white font-semibold hover:underline cursor-pointer"
              >
                Sign in here.
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
