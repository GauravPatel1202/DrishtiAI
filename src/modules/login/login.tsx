// Login.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { GOOGLE_CLIENT_ID } from '../../lib/config';

declare global {
  interface Window {
    google: any;
  }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const success = await login(email, password);
    if (success) {
      navigate('/app/ai-app');
    } else {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
  }, []);

  const handleGoogleLogin = () => {
    window.google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response: any) => {
    try {
      const userObject = parseJwt(response.credential);
      const success = await googleLogin(response.credential);
      if (success) {
        navigate('/app/ai-app');
      } else {
        setError('Google login failed');
      }
    } catch (error) {
      setError('Google login error');
    }
  };

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-gray-700 w-full">
        <h2 className="text-2xl font-bold text-center text-text mb-6">Sign In</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-dim mb-2 text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-text placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-text-dim mb-2 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-text placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary py-3 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] shadow-lg'}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-text-dim text-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.极狐06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-text-dim text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-accent transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
