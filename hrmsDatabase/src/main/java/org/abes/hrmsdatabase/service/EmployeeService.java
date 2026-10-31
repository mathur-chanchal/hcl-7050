package org.abes.hrmsdatabase.service;

import org.abes.hrmsdatabase.model.Employee;
import org.abes.hrmsdatabase.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public String creatNewEmployee(Employee newemp) {
        if (newemp == null) {
            return "Employee data is required!";
        }
        if (newemp.getEmp_id() <= 0) {
            return "Please provide a valid numeric Employee ID!";
        }
        if (employeeRepository.existsById(newemp.getEmp_id())) {
            return "Employee ID " + newemp.getEmp_id() + " is already registered! Please sign in or use another ID.";
        }
        if (newemp.getEmail() != null && !newemp.getEmail().trim().isEmpty()) {
            if (employeeRepository.findByEmail(newemp.getEmail().trim()).isPresent()) {
                return "Email '" + newemp.getEmail().trim() + "' is already registered! Please sign in with this account.";
            }
        }
        try {
            employeeRepository.save(newemp);
            return "Employee is added successfully!!";
        } catch (Exception ex) {
            return "Employee ID or Email already exists! Please verify your details or sign in.";
        }
    }

    public Employee getEmpById(long emp_id) {
        return employeeRepository.findById(emp_id).orElse(null);
    }

    public String deleteById(long emp_id) {
        boolean status = false;
        if (getEmpById(emp_id) != null) {
            employeeRepository.deleteById(emp_id);
            status = true;
        }
        if (status) {
            return " Employee deleted successfully!";
        } else {
            return "Employee not found " + emp_id + " !!";
        }
    }

    public Employee getEmpByEmail(String email) {
        return employeeRepository.findByEmail(email).orElse(null);
    }

    public String updateById(long emp_id) {
        Employee existingEmp = getEmpById(emp_id);
        if (existingEmp != null) {
            existingEmp.setDesignation("Senior Manager"); // koi bhi field update kar sakte hain
            employeeRepository.save(existingEmp); // Database me save/update karta hai
            return "Employee updated successfully!";
        }
        return "Employee not found " + emp_id + " !!";
    }

    public String login(long emp_id, String password) {
        Employee existingEmp = getEmpById(emp_id);
        if (existingEmp == null) {
            return "Employee not found " + emp_id + " !!";
        }
        if (existingEmp.getPassword() != null && existingEmp.getPassword().equals(password)) {
            return "Login Successful!!";
        } else {
            return "Invalid password!!";
        }
    }

    public Employee authenticate(String identifier, String password) {
        Employee emp = null;
        try {
            long empId = Long.parseLong(identifier.trim());
            emp = getEmpById(empId);
        } catch (NumberFormatException ignored) {
            // Not numeric, try as email
        }

        if (emp == null && identifier != null) {
            emp = getEmpByEmail(identifier.trim());
        }

        if (emp != null && emp.getPassword() != null && emp.getPassword().equals(password)) {
            return emp;
        }
        return null;
    }

    public String verification(long emp_id, String password) {
        return login(emp_id, password);
    }
}
