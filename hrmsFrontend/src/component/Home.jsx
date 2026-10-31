import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container-fluid px-3 px-md-5 py-4">

      {/* Hero Banner */}
      <div className="clean-card p-4 p-md-5 my-3 text-start">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              fontSize: '0.825rem',
              fontWeight: 600,
              border: '1px solid #bfdbfe'
            }}>
              <span>Human Resources Management System</span>
            </div>

            <h1 className="fw-bold text-dark mb-3" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
              Simple & Reliable <br />
              <span style={{ color: '#2563eb' }}>Employee Attendance Portal</span>
            </h1>

            <p className="text-secondary fs-6 mb-4" style={{ maxWidth: '560px', lineHeight: 1.6 }}>
              A clean and user-friendly portal for employees to mark daily attendance, punch out, and monitor attendance history with zero hassle.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3">
              {user ? (
                <Link to="/Dashboard" className="btn-hrms-primary px-4 py-2">
                  <span>Open Your Dashboard</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link to="/Login" className="btn-hrms-primary px-4 py-2">
                    <span>Employee Login</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/Registration" className="btn-hrms-outline px-4 py-2">
                    <span>New Employee Registration</span>
                  </Link>
                </>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="d-flex flex-wrap align-items-center gap-4 mt-4 pt-3 border-top">
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={16} color="#059669" />
                <span className="text-secondary small">Real-Time Clock In & Out</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={16} color="#059669" />
                <span className="text-secondary small">Database Backed</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={16} color="#059669" />
                <span className="text-secondary small">1-Click CSV Download</span>
              </div>
            </div>

          </div>

          <div className="col-12 col-lg-4 text-center">
            <div className="p-4 rounded-3 border" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div className="mb-3">
                <Clock size={42} color="#2563eb" />
              </div>
              <h5 className="fw-bold text-dark mb-1">Quick Attendance</h5>
              <p className="text-secondary small mb-3">
                Sign in and record today's attendance in under 5 seconds.
              </p>
              <Link 
                to={user ? "/Dashboard" : "/Login"} 
                className="btn btn-sm btn-outline-primary w-100"
              >
                {user ? "View Today's Status" : "Login Now"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="row g-3 my-2">
        <div className="col-12 col-md-4">
          <div className="clean-card p-4 h-100">
            <div 
              className="d-inline-flex p-2 rounded-2 mb-2"
              style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
            >
              <Clock size={20} />
            </div>
            <h6 className="fw-bold text-dark mb-1">Daily Punch In & Out</h6>
            <p className="text-secondary small mb-0">
              Record start time, check out time, work location, and optional daily notes with automatic duration calculation.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="clean-card p-4 h-100">
            <div 
              className="d-inline-flex p-2 rounded-2 mb-2"
              style={{ backgroundColor: '#ecfdf5', color: '#059669' }}
            >
              <BarChart3 size={20} />
            </div>
            <h6 className="fw-bold text-dark mb-1">Attendance History</h6>
            <p className="text-secondary small mb-0">
              Clear list of all past attendance entries, instant keyword search, and downloadable CSV records for reports.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="clean-card p-4 h-100">
            <div 
              className="d-inline-flex p-2 rounded-2 mb-2"
              style={{ backgroundColor: '#f1f5f9', color: '#475569' }}
            >
              <ShieldCheck size={20} />
            </div>
            <h6 className="fw-bold text-dark mb-1">Secure Employee Logins</h6>
            <p className="text-secondary small mb-0">
              Login securely using your assigned Employee ID or official email address, verified directly with Spring Boot.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-4 border-top">
        <p className="text-secondary small mb-0">
          © 2026 HRMS Portal • Simple Day Mode
        </p>
      </footer>

    </div>
  );
}