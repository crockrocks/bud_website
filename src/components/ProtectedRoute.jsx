import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, userLoggedIn } = useAuth();
  
  if (!user && !userLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;