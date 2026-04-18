import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import SignUp from './pages/SignUp';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import NewRequestNgo from './pages/NewRequestNgo';
import NotificationListener from './components/NotificationListener';

function ProtectedRoute({ children, requiredRole }) {
  const userRole = useStore(state => state.userRole);
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'donor' ? '/donor' : '/ngo'} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <NotificationListener />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route 
          path="/donor" 
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ngo" 
          element={
            <ProtectedRoute requiredRole="ngo">
              <NgoDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-request" 
          element={
            <ProtectedRoute requiredRole="ngo">
              <NewRequestNgo />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
