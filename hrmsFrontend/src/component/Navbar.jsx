import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  LayoutDashboard, 
  UserPlus, 
  LogIn, 
  LogOut,
  Home
} from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 0',
      zIndex: 1000,
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
    }}>
      <div className="container-fluid px-4 px-lg-5">
        
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Building2 size={20} />
          </div>
          <div className="d-flex flex-column">
            <span style={{ 
              fontWeight: 700, 
              fontSize: '1.15rem', 
              color: '#0f172a',
              letterSpacing: '-0.3px',
              lineHeight: 1.1
            }}>
              HRMS<span style={{ color: '#2563eb' }}> Portal</span>
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b', letterSpacing: '0.4px', textTransform: 'uppercase', fontWeight: 600 }}>
              Attendance & Employee Hub
            </span>
          </div>
        </Link>

        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#hrmsNavbar"
          aria-controls="hrmsNavbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="hrmsNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link px-3 py-1 rounded-2 d-flex align-items-center gap-1 ${isActive('/') ? 'fw-bold' : 'text-secondary'}`}
                style={{ 
                  backgroundColor: isActive('/') ? '#eff6ff' : 'transparent',
                  color: isActive('/') ? '#1d4ed8' : '#475569',
                  fontSize: '0.9rem'
                }}
              >
                <Home size={16} />
                Home
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link 
                  to="/Dashboard" 
                  className={`nav-link px-3 py-1 rounded-2 d-flex align-items-center gap-1 ${isActive('/dashboard') ? 'fw-bold' : 'text-secondary'}`}
                  style={{ 
                    backgroundColor: isActive('/dashboard') ? '#eff6ff' : 'transparent',
                    color: isActive('/dashboard') ? '#1d4ed8' : '#475569',
                    fontSize: '0.9rem'
                  }}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#ffffff',
                    fontSize: '0.825rem'
                  }}>
                    {user.emp_name ? user.emp_name.charAt(0).toUpperCase() : 'E'}
                  </div>
                  <div className="d-flex flex-column text-start">
                    <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
                      {user.emp_name || `Employee #${user.emp_id}`}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      ID: #{user.emp_id} {user.designation ? `• ${user.designation}` : ''}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 py-1 rounded-2"
                  style={{ fontSize: '0.825rem' }}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/Login" 
                  className="btn btn-hrms-outline btn-sm px-3 py-1 d-flex align-items-center gap-1"
                >
                  <LogIn size={15} />
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/Registration" 
                  className="btn btn-hrms-primary btn-sm px-3 py-1 d-flex align-items-center gap-1"
                >
                  <UserPlus size={15} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
