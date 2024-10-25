import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import AdminDashboard from './pages/AdminDashboard';
import withAuth from './components/withAuth';
import UserPage from './pages/UserPage';
import UserBooking from './pages/UserBooking';
// Admin dashboard wrapped with authentication HOC
const AdminDashboardWithAuth = withAuth(AdminDashboard, "admin");
const UserPageWithAuth = withAuth(UserPage,"user");
const UserBookingWithAuth = withAuth(UserBooking,"user");
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<WelcomePage />} />
        
        {/* Admin Route with Authentication */}
        <Route path='/admin' element={<AdminDashboardWithAuth />} />
        <Route path='/user' element={<UserPageWithAuth/>}/>
        <Route path='/user/bookings' element={<UserBookingWithAuth/>}/>
      </Routes>
    </Router>
  );
};



export default App;
