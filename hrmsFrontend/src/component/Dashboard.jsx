import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  markAttendance, 
  punchOutAttendance, 
  getEmployeeAttendanceHistory, 
  getTodayAttendance 
} from '../utils/api';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Briefcase, 
  Layers, 
  Mail, 
  IdCard, 
  Search, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Play, 
  Square, 
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Attendance state
  const [history, setHistory] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [workMode, setWorkMode] = useState('Work From Office');
  const [customComment, setCustomComment] = useState('');
  const [alert, setAlert] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data
  const fetchData = async () => {
    if (!user || !user.emp_id) return;
    setLoading(true);
    try {
      const records = await getEmployeeAttendanceHistory(user.emp_id);
      setHistory(Array.isArray(records) ? records : []);

      const today = new Date().toISOString().split('T')[0];
      const foundToday = records.find(r => r.attendancedate === today);
      if (foundToday) {
        setTodayRecord(foundToday);
      } else {
        const directToday = await getTodayAttendance(user.emp_id);
        setTodayRecord(directToday);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.emp_id) {
      fetchData();
    }
  }, [user]);

  // Format Helpers
  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) return timeStr;
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    } catch {
      return timeStr;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const calculateHours = (inTimeStr, outTimeStr) => {
    if (!inTimeStr) return '--';
    const inDate = new Date(inTimeStr);
    const outDate = outTimeStr ? new Date(outTimeStr) : new Date();
    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) return '--';

    const diffMs = outDate - inDate;
    if (diffMs < 0) return '0h 0m';
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // Live Duration
  const activeSessionDuration = useMemo(() => {
    if (!todayRecord || !todayRecord.inTime || todayRecord.outTime) return null;
    return calculateHours(todayRecord.inTime, currentTime.toISOString());
  }, [todayRecord, currentTime]);

  // Punch In
  const handlePunchIn = async () => {
    if (!user || !user.emp_id) return;
    setActionLoading(true);
    setAlert(null);

    const comment = customComment.trim() 
      ? `${workMode} - ${customComment.trim()}`
      : workMode;

    try {
      const result = await markAttendance(user.emp_id, comment);
      if (result.success) {
        setAlert({ type: 'success', text: 'Attendance marked successfully! Have a great day.' });
        setCustomComment('');
        
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });

        await fetchData();
      } else {
        setAlert({ type: 'error', text: result.message || 'Could not mark attendance.' });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', text: 'Connection error while marking attendance.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Punch Out
  const handlePunchOut = async () => {
    if (!user || !user.emp_id) return;
    setActionLoading(true);
    setAlert(null);

    const comment = customComment.trim() ? customComment.trim() : 'Logged out';

    try {
      const result = await punchOutAttendance(user.emp_id, comment);
      if (result.success) {
        setAlert({ type: 'success', text: 'Punch out recorded successfully! Have a restful evening.' });
        setCustomComment('');
        await fetchData();
      } else {
        setAlert({ type: 'error', text: result.message || 'Could not record punch out.' });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', text: 'Connection error while recording punch out.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!history.length) return;
    const headers = ['Date', 'In Time', 'Out Time', 'Duration', 'Comment'];
    const rows = history.map(item => [
      item.attendancedate,
      formatTime(item.inTime),
      item.outTime ? formatTime(item.outTime) : 'In Progress',
      calculateHours(item.inTime, item.outTime),
      `"${item.comment || 'Present'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_Emp_${user.emp_id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered History
  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      return !searchQuery ||
        (item.attendancedate && item.attendancedate.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.comment && item.comment.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [history, searchQuery]);

  // If not logged in
  if (!user) {
    return (
      <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div className="clean-card text-center p-5" style={{ maxWidth: '440px' }}>
          <div 
            className="d-inline-flex p-3 rounded-circle mb-3"
            style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
          >
            <ShieldCheck size={36} />
          </div>
          <h4 className="fw-bold text-dark mb-2">Login Required</h4>
          <p className="text-secondary mb-4 small">
            Please sign in with your employee account to view and mark attendance.
          </p>
          <div className="d-flex flex-column gap-2">
            <Link to="/Login" className="btn-hrms-primary w-100 justify-content-center">
              <span>Sign In to Your Account</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/Registration" className="btn-hrms-outline w-100 justify-content-center">
              Register New Employee
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 px-md-5 py-4">

      {/* Alert Notification */}
      {alert && (
        <div 
          className="alert d-flex align-items-center justify-content-between py-2 px-3 rounded-2 mb-3 shadow-sm"
          style={{
            backgroundColor: alert.type === 'success' ? '#ecfdf5' : '#fff1f2',
            border: `1px solid ${alert.type === 'success' ? '#a7f3d0' : '#fecdd3'}`,
            color: alert.type === 'success' ? '#047857' : '#e11d48',
            fontSize: '0.875rem'
          }}
        >
          <div className="d-flex align-items-center gap-2">
            {alert.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="fw-medium">{alert.text}</span>
          </div>
          <button 
            type="button" 
            className="btn-close btn-sm" 
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )}

      {/* Clean Header Bar */}
      <div className="clean-card p-3 p-md-4 mb-4">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-8 d-flex align-items-center gap-3">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#ffffff'
            }}>
              {user.emp_name ? user.emp_name.charAt(0).toUpperCase() : 'E'}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h4 className="fw-bold text-dark mb-0" style={{ fontSize: '1.4rem' }}>
                  {user.emp_name || `Employee #${user.emp_id}`}
                </h4>
                <span className="badge-glass badge-primary">
                  ID: #{user.emp_id}
                </span>
                {user.designation && (
                  <span className="badge-glass badge-neutral">
                    <Briefcase size={13} /> {user.designation}
                  </span>
                )}
                {user.stack && (
                  <span className="badge-glass badge-present">
                    <Layers size={13} /> {user.stack}
                  </span>
                )}
              </div>
              <p className="text-secondary small mb-0 mt-1">
                {user.email || 'Employee Profile'} • Human Resources Portal
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-center gap-2">
            <button 
              onClick={fetchData} 
              className="btn btn-hrms-outline btn-sm d-flex align-items-center gap-1"
              title="Refresh attendance records"
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={exportToCSV} 
              className="btn btn-hrms-outline btn-sm d-flex align-items-center gap-1"
              title="Export records to CSV"
              disabled={!history.length}
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Clock & Punch Action */}
      <div className="row g-4 mb-4">
        
        {/* Attendance Action Card */}
        <div className="col-12 col-lg-7 col-xl-8">
          <div className="clean-card p-4 h-100">
            
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="pulse-dot" style={{ backgroundColor: todayRecord?.outTime ? '#0891b2' : todayRecord ? '#d97706' : '#059669' }}></div>
                <span className="text-secondary fw-bold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  Today's Attendance Status
                </span>
              </div>

              {/* Status Badge */}
              {todayRecord?.outTime ? (
                <span className="badge-glass badge-completed">
                  <CheckCircle2 size={13} /> Shift Completed
                </span>
              ) : todayRecord ? (
                <span className="badge-glass badge-active">
                  <Clock size={13} /> Checked In • Working
                </span>
              ) : (
                <span className="badge-glass badge-present">
                  Ready to Clock In
                </span>
              )}
            </div>

            <div className="row align-items-center g-3 my-2">
              
              {/* Digital Clock */}
              <div className="col-12 col-md-6">
                <div className="digital-clock">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary mt-1 small">
                  <Calendar size={15} />
                  <span>
                    {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                {activeSessionDuration && (
                  <div 
                    className="mt-2 p-2 px-3 rounded-2 d-inline-flex align-items-center gap-2"
                    style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}
                  >
                    <Clock size={15} color="#b45309" />
                    <span style={{ color: '#b45309', fontSize: '0.85rem', fontWeight: 600 }}>
                      Session Duration: {activeSessionDuration}
                    </span>
                  </div>
                )}
              </div>

              {/* In / Out Info */}
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-2" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div className="row g-2 text-center">
                    <div className="col-6 border-end">
                      <span className="text-secondary d-block" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>
                        In Time
                      </span>
                      <span className="fw-bold text-dark fs-6">
                        {todayRecord?.inTime ? formatTime(todayRecord.inTime) : '--:--'}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary d-block" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>
                        Out Time
                      </span>
                      <span className="fw-bold text-dark fs-6">
                        {todayRecord?.outTime ? formatTime(todayRecord.outTime) : (todayRecord ? 'Active' : '--:--')}
                      </span>
                    </div>
                  </div>

                  {todayRecord?.comment && (
                    <div className="mt-2 pt-2 border-top text-center">
                      <span className="text-secondary small" style={{ fontSize: '0.78rem' }}>
                        Note: <span className="text-dark fw-medium">{todayRecord.comment}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Attendance Buttons */}
            <div className="mt-4 pt-3 border-top">
              
              {!todayRecord ? (
                /* State 1: Punch In */
                <div>
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-md-5">
                      <label className="hrms-label" style={{ fontSize: '0.75rem' }}>Work Location</label>
                      <select 
                        className="hrms-input-no-icon py-2" 
                        value={workMode} 
                        onChange={(e) => setWorkMode(e.target.value)}
                        style={{ fontSize: '0.875rem' }}
                      >
                        <option value="Work From Office">Work From Office</option>
                        <option value="Work From Home">Work From Home (Remote)</option>
                        <option value="Client Site / Field">Client Site / On Duty</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-7">
                      <label className="hrms-label" style={{ fontSize: '0.75rem' }}>Daily Task / Note (Optional)</label>
                      <input 
                        type="text" 
                        className="hrms-input-no-icon py-2" 
                        placeholder="e.g. Feature development & code review"
                        value={customComment}
                        onChange={(e) => setCustomComment(e.target.value)}
                        style={{ fontSize: '0.875rem' }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handlePunchIn}
                    className="btn-hrms-emerald w-100 py-2"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Recording Attendance...
                      </>
                    ) : (
                      <>
                        <Play size={16} fill="#ffffff" />
                        <span>Punch In / Mark Attendance</span>
                      </>
                    )}
                  </button>
                </div>
              ) : !todayRecord.outTime ? (
                /* State 2: Punch Out */
                <div>
                  <div className="mb-3">
                    <label className="hrms-label" style={{ fontSize: '0.75rem' }}>Checkout Note (Optional)</label>
                    <input 
                      type="text" 
                      className="hrms-input-no-icon py-2" 
                      placeholder="e.g. Finished sprint tasks"
                      value={customComment}
                      onChange={(e) => setCustomComment(e.target.value)}
                      style={{ fontSize: '0.875rem' }}
                    />
                  </div>

                  <button 
                    onClick={handlePunchOut}
                    className="btn-hrms-amber w-100 py-2"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Recording Punch Out...
                      </>
                    ) : (
                      <>
                        <Square size={16} fill="#ffffff" />
                        <span>Punch Out / Check Out</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* State 3: Completed */
                <div 
                  className="p-3 rounded-2 text-center" 
                  style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
                >
                  <p className="text-success fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
                    ✓ Today's Attendance is Fully Marked!
                  </p>
                  <span className="text-secondary small">
                    Total Time Worked Today: <span className="text-dark fw-bold">{calculateHours(todayRecord.inTime, todayRecord.outTime)}</span>
                  </span>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Employee Info & Stats */}
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="d-flex flex-column gap-3 h-100">
            
            {/* Quick Metrics */}
            <div className="row g-2">
              <div className="col-6">
                <div className="clean-card p-3 text-center">
                  <span className="text-secondary small d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                    Days Recorded
                  </span>
                  <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '1.65rem' }}>
                    {history.length}
                  </h3>
                </div>
              </div>

              <div className="col-6">
                <div className="clean-card p-3 text-center">
                  <span className="text-secondary small d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                    Completed Shifts
                  </span>
                  <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '1.65rem' }}>
                    {history.filter(h => h.outTime).length}
                  </h3>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="clean-card p-3 flex-grow-1">
              <h6 className="text-secondary fw-bold text-uppercase small mb-3" style={{ letterSpacing: '0.4px', fontSize: '0.75rem' }}>
                Employee Information
              </h6>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between py-1 border-bottom border-light">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <IdCard size={14} /> ID
                  </span>
                  <span className="text-dark fw-semibold small">
                    #{user.emp_id}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between py-1 border-bottom border-light">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <User size={14} /> Name
                  </span>
                  <span className="text-dark fw-semibold small">
                    {user.emp_name || '--'}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between py-1 border-bottom border-light">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <Mail size={14} /> Email
                  </span>
                  <span className="text-dark fw-semibold small text-truncate" style={{ maxWidth: '160px' }}>
                    {user.email || '--'}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between py-1 border-bottom border-light">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <Briefcase size={14} /> Designation
                  </span>
                  <span className="text-dark fw-semibold small">
                    {user.designation || 'Staff'}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between py-1">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <Layers size={14} /> Stack
                  </span>
                  <span className="text-dark fw-semibold small">
                    {user.stack || 'General'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Attendance History Table */}
      <div className="clean-card p-4">
        
        {/* Table Toolbar */}
        <div className="row align-items-center g-3 mb-3">
          <div className="col-12 col-md-6">
            <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.15rem' }}>
              Attendance History & Log
            </h5>
            <span className="text-secondary small">
              All clock-in and clock-out timestamps recorded in the database
            </span>
          </div>

          <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end gap-2">
            <div className="position-relative" style={{ minWidth: '220px' }}>
              <Search size={15} className="hrms-input-icon" style={{ top: '12px', left: '10px' }} />
              <input
                type="text"
                className="hrms-input py-1 ps-4"
                placeholder="Search date or note..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="btn btn-sm btn-outline-secondary"
                style={{ fontSize: '0.8rem' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            <p className="text-secondary mt-2 small">Loading attendance records...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-5 border rounded-2" style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
            <Calendar size={36} className="text-secondary opacity-50 mb-2" />
            <h6 className="text-dark fw-bold mb-1">No Attendance Records Found</h6>
            <p className="text-secondary small mb-3">
              {searchQuery ? 'No records match your search filter.' : 'You have not marked attendance yet.'}
            </p>
            {!todayRecord && (
              <button onClick={handlePunchIn} className="btn-hrms-emerald btn-sm">
                Punch In Now
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="hrms-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Total Duration</th>
                  <th>Work Note</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => {
                  const isCompleted = !!item.outTime;
                  const duration = calculateHours(item.inTime, item.outTime);

                  return (
                    <tr key={item.attendanceId || index}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Calendar size={14} color="#2563eb" />
                          <span className="fw-medium text-dark">
                            {formatDate(item.attendancedate)}
                          </span>
                        </div>
                      </td>
                      <td>
                        {isCompleted ? (
                          <span className="badge-glass badge-present">
                            <CheckCircle2 size={12} /> Present
                          </span>
                        ) : (
                          <span className="badge-glass badge-active">
                            <Clock size={12} /> In Progress
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="text-dark fw-medium">
                          {formatTime(item.inTime)}
                        </span>
                      </td>
                      <td>
                        <span className={isCompleted ? 'text-dark fw-medium' : 'text-secondary'}>
                          {isCompleted ? formatTime(item.outTime) : 'Pending / Active'}
                        </span>
                      </td>
                      <td>
                        <span className="badge-glass badge-neutral">
                          {duration}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary small">
                          {item.comment || 'Present'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}