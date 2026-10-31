package org.abes.hrmsdatabase.controller;

import org.abes.hrmsdatabase.model.Attendance;
import org.abes.hrmsdatabase.service.AttendenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("v1/user/attendance")
public class AttendanceController {

    @Autowired
    private AttendenceService attendenceService;

    @PostMapping("/markattendance")
    public String markAttendance(@RequestBody Attendance attendance) {
        return attendenceService.markAttendence(attendance);
    }

    @PostMapping("/punchout/{emp_id}")
    public String punchOut(@PathVariable long emp_id, @RequestBody(required = false) java.util.Map<String, String> body) {
        String comment = body != null ? body.get("comment") : null;
        return attendenceService.punchOut(emp_id, comment);
    }

    @GetMapping("/today/{emp_id}")
    public Attendance getTodayAttendance(@PathVariable long emp_id) {
        return attendenceService.getTodayAttendance(emp_id);
    }

    @GetMapping("/all")
    public List<Attendance> getAllAttendance() {
        return attendenceService.getAllAttendance();
    }

    @GetMapping("/findByEmpId/{emp_id}")
    public List<Attendance> getAttendanceByEmpId(@PathVariable long emp_id) {
        return attendenceService.getAttendanceByEmployeeId(emp_id);
    }

    @GetMapping("/findById/{attendanceId}")
    public Attendance getAttendanceById(@PathVariable Long attendanceId) {
        return attendenceService.getAttendanceById(attendanceId);
    }
}
