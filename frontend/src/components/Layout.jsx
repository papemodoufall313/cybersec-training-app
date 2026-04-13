import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="logo-sidebar">
            <img
                src="/logo-ddbitc.png"
                alt="DDBITC"
                className="logo-image"
            />
        </div>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            📊 Dashboard
          </Link>
          <Link to="/challenges" className={location.pathname === '/challenges' ? 'active' : ''}>
            🏆 Challenges CTF
          </Link>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="user-info">
            <span>👋 {user?.username || 'Utilisateur'}</span>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;