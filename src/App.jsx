import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import AdminDashboard from './pages/AdminDashboard';
import withAuth from './components/withAuth';
// Admin dashboard wrapped with authentication HOC
const AdminDashboardWithAuth = withAuth(AdminDashboard, "admin");
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<WelcomePage />} />
        
        {/* Admin Route with Authentication */}
        <Route path='/admin' element={<AdminDashboardWithAuth />} />
      </Routes>
    </Router>
  );
};



export default App;
