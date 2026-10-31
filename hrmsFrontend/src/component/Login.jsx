import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginEmployee } from '../utils/api';
import { 
  LogIn, 
  KeyRound, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your Employee ID or Email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const result = await loginEmployee(identifier.trim(), password);

      if (result.success && result.employee) {
        setSuccessMsg('Authentication successful! Opening Dashboard...');
        loginUser(result.employee);
        
        setTimeout(() => {
          navigate('/Dashboard');
        }, 600);
      } else {
        setErrorMsg(result.message || 'Login failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4">
          
          {/* Header */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex p-3 rounded-3 mb-2"
              style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb'
              }}
            >
              <LogIn size={28} />
            </div>
            <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>Employee Login</h2>
            <p className="text-secondary small">Enter your Employee ID or Email to sign in</p>
          </div>

          {/* Clean Card */}
          <div className="clean-card p-4 p-md-4">
            
            {errorMsg && (
              <div 
                className="alert d-flex align-items-center gap-2 mb-3 py-2 px-3 rounded-2" 
                style={{ 
                  backgroundColor: '#fff1f2', 
                  border: '1px solid #fecdd3',
                  color: '#e11d48',
                  fontSize: '0.85rem'
                }}
              >
                <AlertCircle size={16} className="flex-shrink-0" />
                <div>{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div 
                className="alert d-flex align-items-center gap-2 mb-3 py-2 px-3 rounded-2" 
                style={{ 
                  backgroundColor: '#ecfdf5', 
                  border: '1px solid #a7f3d0',
                  color: '#047857',
                  fontSize: '0.85rem'
                }}
              >
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <div>{successMsg}</div>
              </div>
            )}

            <form onSubmit={handleLogin}>
              
              {/* Employee ID or Email */}
              <div className="hrms-input-group">
                <label className="hrms-label" htmlFor="identifier">
                  Employee ID or Email
                </label>
                <User size={17} className="hrms-input-icon" />
                <input
                  id="identifier"
                  type="text"
                  className="hrms-input"
                  placeholder="e.g. 101 or saumya@hcl.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {/* Password */}
              <div className="hrms-input-group">
                <label className="hrms-label" htmlFor="password">
                  Password
                </label>
                <KeyRound size={17} className="hrms-input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="hrms-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="hrms-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {/* Remember Me */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label text-muted small" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <span className="text-muted small" style={{ fontSize: '0.8rem' }}>
                  Secure Login
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-hrms-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div 
              className="mt-4 p-3 rounded-2 text-center"
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <span className="text-secondary small d-block mb-1" style={{ fontSize: '0.78rem' }}>
                Quick Test Account:
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary py-1 px-2 rounded-2"
                style={{ fontSize: '0.78rem' }}
                onClick={() => {
                  setIdentifier('101');
                  setPassword('Password123');
                }}
              >
                Autofill (ID: 101 / Password123)
              </button>
            </div>

            {/* Registration link */}
            <div className="text-center mt-3 pt-3 border-top border-light">
              <span className="text-secondary small">Don't have an account? </span>
              <Link 
                to="/Registration" 
                className="text-decoration-none fw-semibold"
                style={{ color: '#2563eb', fontSize: '0.875rem' }}
              >
                Register Here
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}