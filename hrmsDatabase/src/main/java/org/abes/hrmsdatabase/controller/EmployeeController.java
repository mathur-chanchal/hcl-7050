package org.abes.hrmsdatabase.controller;

import org.abes.hrmsdatabase.model.Employee;
import org.abes.hrmsdatabase.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1/user/")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/")
    public String msg() {
        return "program run sccessfulyy";
    }

    @PostMapping("/addemp")
    public org.springframework.http.ResponseEntity<String> addNemlpoyee(@RequestBody Employee emp) {
        String result = employeeService.creatNewEmployee(emp);
        if (result.contains("already registered") || result.contains("already exists") || result.contains("required") || result.contains("valid")) {
            return org.springframework.http.ResponseEntity.badRequest().body(result);
        }
        return org.springframework.http.ResponseEntity.ok(result);
    }

    @GetMapping({ "/findById/{emp_id}", "/findyId/{emp_id}", "/{emp_id:\\d+}" })
    public Employee getEmpById(@PathVariable long emp_id) {

        System.out.println("Employee id : " + emp_id);
        return employeeService.getEmpById(emp_id);
    }

    @DeleteMapping("/deleteById/{emp_id}")
    public String deleteById(@PathVariable long emp_id) {
        return employeeService.deleteById(emp_id);
    }

    @PutMapping("/updateById/{emp_id}")
    public String updateById(@PathVariable long emp_id) {
        return employeeService.updateById(emp_id);
    }

    @RequestMapping(value = { "/login", "/verification" }, method = { RequestMethod.POST, RequestMethod.GET })
    public String login(@RequestParam long emp_id, @RequestParam String password) {
        return employeeService.login(emp_id, password);
    }

    @PostMapping("/login-auth")
    public org.springframework.http.ResponseEntity<?> loginAuth(@RequestBody java.util.Map<String, String> body) {
        String identifier = body.get("identifier");
        if (identifier == null) {
            identifier = body.get("emp_id");
        }
        if (identifier == null) {
            identifier = body.get("email");
        }
        String password = body.get("password");
        if (identifier == null || password == null) {
            return org.springframework.http.ResponseEntity.badRequest().body(java.util.Map.of("success", false, "message", "Employee ID/Email and password are required!"));
        }

        Employee emp = employeeService.authenticate(identifier, password);
        if (emp != null) {
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of(
                "success", true,
                "message", "Login Successful!!",
                "employee", emp
            ));
        } else {
            return org.springframework.http.ResponseEntity.status(401).body(java.util.Map.of(
                "success", false,
                "message", "Invalid Employee ID/Email or password!!"
            ));
        }
    }

}
