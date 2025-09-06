// AuthSuccess.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      // The AuthContext will handle fetching user data
      // Redirect after a short delay to allow AuthContext to update
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
