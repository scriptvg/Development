import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Admin from './pages/admin/Admin';
import PublicRooms from './components/public/rooms/PublicRooms';
import RoomDetail from './components/public/rooms/RoomDetail';
import PublicServices from './components/public/services/PublicServices';
import BarraNav from './components/home/BarraNav';
import Footer from './components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './config/context/auth/useAuth';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Container className="app p-0" fluid={true} style={{ backgroundColor: '#f8f9fa' }}>	
,>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <BarraNav />
            <div className="flex-grow-1">
              <ToastContainer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                <Route path="/habitaciones" element={<PublicRooms />} />
                <Route path="/habitaciones/:roomId" element={<RoomDetail />} />
                <Route path="/servicios" element={<PublicServices />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </Container>
  );
}

export default App;
