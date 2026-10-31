const API_BASE = 'http://localhost:8080';

export async function loginEmployee(identifier, password) {
  // Try the new auth endpoint first
  try {
    const res = await fetch(`${API_BASE}/v1/user/login-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, employee: data.employee, message: data.message };
    }
  } catch (err) {
    console.warn('login-auth failed, attempting fallback endpoint...', err);
  }

  // Fallback to existing login endpoint
  try {
    let empId = identifier;
    const isNum = /^\d+$/.test(identifier);
    if (!isNum) {
      return { success: false, message: 'Please enter a valid numeric Employee ID or register first.' };
    }

    const res = await fetch(`${API_BASE}/v1/user/login?emp_id=${encodeURIComponent(empId)}&password=${encodeURIComponent(password)}`, {
      method: 'POST'
    });
    const text = await res.text();

    if (text.toLowerCase().includes('successful')) {
      // Fetch full employee details
      const empRes = await fetch(`${API_BASE}/v1/user/findById/${empId}`);
      if (empRes.ok) {
        const empData = await empRes.json();
        return { success: true, employee: empData, message: text };
      }
      return {
        success: true,
        employee: { emp_id: Number(empId), emp_name: `Employee #${empId}` },
        message: text
      };
    } else {
      return { success: false, message: text || 'Invalid credentials!' };
    }
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Failed to connect to backend server on port 8080. Please ensure the backend is running.' };
  }
}

export async function registerEmployee(employeeData) {
  try {
    const res = await fetch(`${API_BASE}/v1/user/addemp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emp_id: Number(employeeData.emp_id),
        emp_name: employeeData.emp_name,
        email: employeeData.email,
        designation: employeeData.designation,
        stack: employeeData.stack,
        password: employeeData.password
      })
    });
    const raw = await res.text();
    let message = raw;
    
    // Check if response is raw JSON error
    if (raw.startsWith('{') && raw.includes('"error"')) {
      try {
        const parsed = JSON.parse(raw);
        if (raw.includes('Duplicate entry') || raw.includes('DataIntegrityViolationException')) {
          message = 'This Email or Employee ID is already registered! Please sign in or use a different one.';
        } else if (parsed.message) {
          message = parsed.message;
        } else {
          message = 'Registration failed. Please verify employee details.';
        }
      } catch {
        message = 'Registration failed. Please verify employee details.';
      }
    } else if (raw.includes('Duplicate entry')) {
      message = 'This Email or Employee ID is already registered! Please sign in or use a different one.';
    }

    const isSuccess = res.ok && raw.toLowerCase().includes('success');
    return { success: isSuccess, message: message || 'Registration completed.' };
  } catch (err) {
    console.error('Registration error:', err);
    return { success: false, message: 'Failed to connect to backend server. Please verify port 8080.' };
  }
}

export async function markAttendance(empId, comment = 'Present') {
  try {
    const now = new Date();
    // format as YYYY-MM-DD
    const dateStr = now.toISOString().split('T')[0];
    // format as ISO string without timezone offset for LocalDateTime
    const timeStr = now.toISOString().slice(0, 19);

    const res = await fetch(`${API_BASE}/v1/user/attendance/markattendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employee: {
          emp_id: Number(empId)
        },
        attendancedate: dateStr,
        inTime: timeStr,
        comment: comment || 'Present'
      })
    });
    const message = await res.text();
    const isSuccess = message.toLowerCase().includes('success');
    return { success: isSuccess, message };
  } catch (err) {
    console.error('Mark attendance error:', err);
    return { success: false, message: 'Could not mark attendance. Server error.' };
  }
}

export async function punchOutAttendance(empId, comment = '') {
  try {
    const res = await fetch(`${API_BASE}/v1/user/attendance/punchout/${empId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
    });
    const message = await res.text();
    const isSuccess = message.toLowerCase().includes('success');
    return { success: isSuccess, message };
  } catch (err) {
    console.error('Punch out error:', err);
    return { success: false, message: 'Could not punch out. Server error.' };
  }
}

export async function getTodayAttendance(empId) {
  try {
    const res = await fetch(`${API_BASE}/v1/user/attendance/today/${empId}`);
    if (res.ok) {
      const text = await res.text();
      if (!text) return null;
      return JSON.parse(text);
    }
    return null;
  } catch (err) {
    console.error('Get today attendance error:', err);
    return null;
  }
}

export async function getEmployeeAttendanceHistory(empId) {
  try {
    const res = await fetch(`${API_BASE}/v1/user/attendance/findByEmpId/${empId}`);
    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (err) {
    console.error('Get attendance history error:', err);
    return [];
  }
}

export async function getEmployeeDetails(empId) {
  try {
    const res = await fetch(`${API_BASE}/v1/user/findById/${empId}`);
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (err) {
    console.error('Get employee details error:', err);
    return null;
  }
}
