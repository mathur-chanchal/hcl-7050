package org.abes.hrmsdatabase.service;

import org.abes.hrmsdatabase.model.Attendance;
import org.abes.hrmsdatabase.model.Employee;
import org.abes.hrmsdatabase.repository.AttendenceRepository;
import org.abes.hrmsdatabase.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendenceService {

    @Autowired
    private AttendenceRepository attendenceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public String markAttendence(Attendance attendance) {
        if (attendance == null || attendance.getEmployee() == null) {
            return "Employee details are required!";
        }

        long empId = attendance.getEmployee().getEmp_id();
        Employee employee = employeeRepository.findById(empId).orElse(null);

        if (employee == null) {
            return "Employee not found " + empId + " !!";
        }

        if (attendance.getAttendancedate() == null) {
            attendance.setAttendancedate(LocalDate.now());
        }

        if (attendance.getInTime() == null) {
            attendance.setInTime(LocalDateTime.now());
        }

        if (attendenceRepository.existsByEmployeeAndAttendancedate(employee, attendance.getAttendancedate())) {
            return "Attendance already marked for date " + attendance.getAttendancedate() + " !!";
        }

        attendance.setEmployee(employee);
        attendenceRepository.save(attendance);
        return "Attendance marked successfully!";
    }

    public List<Attendance> getAllAttendance() {
        return attendenceRepository.findAll();
    }

    public Attendance getAttendanceById(Long attendanceId) {
        return attendenceRepository.findById(attendanceId).orElse(null);
    }

    public List<Attendance> getAttendanceByEmployeeId(long emp_id) {
        Employee employee = employeeRepository.findById(emp_id).orElse(null);
        if (employee != null) {
            return attendenceRepository.findByEmployee(employee);
        }
        return List.of();
    }

    public String punchOut(long empId, String comment) {
        Employee employee = employeeRepository.findById(empId).orElse(null);
        if (employee == null) {
            return "Employee not found " + empId + " !!";
        }
        LocalDate today = LocalDate.now();
        java.util.Optional<Attendance> opt = attendenceRepository.findByEmployeeAndAttendancedate(employee, today);
        if (opt.isEmpty()) {
            return "No check-in found for today! Please mark attendance (punch in) first.";
        }
        Attendance attendance = opt.get();
        if (attendance.getOutTime() != null) {
            return "Punch out already marked for today!";
        }
        attendance.setOutTime(LocalDateTime.now());
        if (comment != null && !comment.trim().isEmpty()) {
            String existingComment = attendance.getComment();
            if (existingComment != null && !existingComment.trim().isEmpty()) {
                attendance.setComment(existingComment + " | " + comment.trim());
            } else {
                attendance.setComment(comment.trim());
            }
        }
        attendenceRepository.save(attendance);
        return "Punch out marked successfully!";
    }

    public Attendance getTodayAttendance(long empId) {
        Employee employee = employeeRepository.findById(empId).orElse(null);
        if (employee != null) {
            return attendenceRepository.findByEmployeeAndAttendancedate(employee, LocalDate.now()).orElse(null);
        }
        return null;
    }
}
