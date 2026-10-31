import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerEmployee } from '../utils/api';
import { 
  UserPlus, 
  IdCard, 
  User, 
  Mail, 
  Briefcase, 
  Layers, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Check
} from 'lucide-react';

export default function Registration() {
  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    email: '',
    designation: '',
    stack: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const designationSuggestions = [
    'Software Engineer',
    'Full Stack Developer',
    'Backend Engineer',
    'QA Automation',
    'Tech Lead'
  ];

  const stackSuggestions = [
    'Java / Spring Boot',
    'React + Spring Boot',
    'Full Stack Web',
    'Python & AI',
    'DevOps & Cloud'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.emp_id || Number(formData.emp_id) <= 0) {
      setErrorMsg('Please enter a valid numeric Employee ID (e.g. 101, 102).');
      return;
    }

    if (!formData.emp_name.trim()) {
      setErrorMsg('Please enter the employee full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!formData.designation.trim()) {
      setErrorMsg('Please specify designation or role.');
      return;
    }

    if (!formData.stack.trim()) {
      setErrorMsg('Please specify tech stack or unit.');
      return;
    }

    if (!formData.password || formData.password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Please accept the attendance compliance agreement.');
      return;
    }

    setLoading(true);

    try {
      const result = await registerEmployee({
        emp_id: formData.emp_id,
        emp_name: formData.emp_name.trim(),
        email: formData.email.trim(),
        designation: formData.designation.trim(),
        stack: formData.stack.trim(),
        password: formData.password
      });

      if (result.success) {
        setSuccessMsg('Employee registered successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      } else {
        setErrorMsg(result.message || 'Registration failed. Employee ID or email may already exist.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server connection failed. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-10 col-lg-7 col-xl-6">

          {/* Header */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex p-3 rounded-3 mb-2"
              style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb'
              }}
            >
              <UserPlus size={28} />
            </div>
            <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem' }}>Employee Registration</h2>
            <p className="text-secondary small">Create a new employee profile in the HRMS system</p>
          </div>

          {/* Clean Card */}
          <div className="clean-card p-4 p-md-4">
            
            {errorMsg && (
              <div 
                className="alert d-flex align-items-center justify-content-between gap-2 mb-3 py-2 px-3 rounded-2" 
                style={{ 
                  backgroundColor: '#fff1f2', 
                  border: '1px solid #fecdd3',
                  color: '#e11d48',
                  fontSize: '0.85rem'
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                {errorMsg.toLowerCase().includes('already') && (
                  <Link 
                    to="/Login" 
                    className="btn btn-sm btn-outline-danger py-0 px-2 fw-semibold text-nowrap" 
                    style={{ fontSize: '0.78rem' }}
                  >
                    Sign In →
                  </Link>
                )}
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

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Employee ID */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-0">
                    <label className="hrms-label" htmlFor="emp_id">
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <IdCard size={17} className="hrms-input-icon" />
                    <input
                      id="emp_id"
                      name="emp_id"
                      type="number"
                      className="hrms-input"
                      placeholder="e.g. 102"
                      value={formData.emp_id}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-0">
                    <label className="hrms-label" htmlFor="emp_name">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <User size={17} className="hrms-input-icon" />
                    <input
                      id="emp_name"
                      name="emp_name"
                      type="text"
                      className="hrms-input"
                      placeholder="e.g. Rahul Verma"
                      value={formData.emp_name}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="hrms-input-group mb-0">
                    <label className="hrms-label" htmlFor="email">
                      Official Email <span className="text-danger">*</span>
                    </label>
                    <Mail size={17} className="hrms-input-icon" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="hrms-input"
                      placeholder="e.g. rahul@hcl.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-1">
                    <label className="hrms-label" htmlFor="designation">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <Briefcase size={17} className="hrms-input-icon" />
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      className="hrms-input"
                      placeholder="e.g. Software Engineer"
                      value={formData.designation}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {designationSuggestions.slice(0, 3).map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="badge border text-decoration-none py-1 px-2 rounded-1"
                        style={{
                          backgroundColor: formData.designation === item ? '#eff6ff' : '#f8fafc',
                          color: formData.designation === item ? '#1d4ed8' : '#64748b',
                          borderColor: formData.designation === item ? '#bfdbfe' : '#e2e8f0',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData({ ...formData, designation: item })}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-1">
                    <label className="hrms-label" htmlFor="stack">
                      Tech Stack / Unit <span className="text-danger">*</span>
                    </label>
                    <Layers size={17} className="hrms-input-icon" />
                    <input
                      id="stack"
                      name="stack"
                      type="text"
                      className="hrms-input"
                      placeholder="e.g. Java / Spring Boot"
                      value={formData.stack}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {stackSuggestions.slice(0, 3).map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="badge border text-decoration-none py-1 px-2 rounded-1"
                        style={{
                          backgroundColor: formData.stack === item ? '#eff6ff' : '#f8fafc',
                          color: formData.stack === item ? '#1d4ed8' : '#64748b',
                          borderColor: formData.stack === item ? '#bfdbfe' : '#e2e8f0',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData({ ...formData, stack: item })}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-0">
                    <label className="hrms-label" htmlFor="password">
                      Password <span className="text-danger">*</span>
                    </label>
                    <KeyRound size={17} className="hrms-input-icon" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="hrms-input"
                      placeholder="Min 4 characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="hrms-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-12 col-md-6">
                  <div className="hrms-input-group mb-0">
                    <label className="hrms-label" htmlFor="confirmPassword">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <KeyRound size={17} className="hrms-input-icon" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="hrms-input"
                      placeholder="Repeat password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="col-12 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label className="form-check-label text-muted small" htmlFor="agreeTerms">
                      I agree to the HR Attendance Policy & Data Recording Guidelines
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn-hrms-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Registering Employee...
                      </>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-3 pt-3 border-top border-light">
              <span className="text-secondary small">Already have an employee account? </span>
              <Link 
                to="/Login" 
                className="text-decoration-none fw-semibold"
                style={{ color: '#2563eb', fontSize: '0.875rem' }}
              >
                Sign In here
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}