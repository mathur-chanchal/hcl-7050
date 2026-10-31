package org.abesproject.hclhrms.controller;

import org.abesproject.hclhrms.EmpServiceImp;
import org.abesproject.hclhrms.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {
    @Autowired
    private EmpServiceImp empServiceImp;

    @GetMapping("/")
    public String welcomeMsg() {
        return "Welcome to ABES HRMs";
    }

    // Both /add and /address supported so either URL works
    @GetMapping({ "/add", "/address" })
    public String addNewEmp() {
        return empServiceImp.addEmp();
    }

    @GetMapping({ "/getEmp", "/getAllEmp" })
    public List<Employee> getEmp() {
        return empServiceImp.getEmp();
    }

    @GetMapping({ "/addBulk", "/addEmpBulk" })
    public String addEmpBulk() {
        return empServiceImp.addEmpBulk();
    }

    @GetMapping("/getEmpById")
    public Employee getEmpById(@RequestParam(required = false, defaultValue = "1001") long id) {
        return empServiceImp.getEmpById(id);
    }

    @GetMapping("/getEmpById/{id}")
    public Employee getEmpByIdPath(@PathVariable long id) {
        return empServiceImp.getEmpById(id);
    }
    @RequestMapping(value = "/deleteById", method = { RequestMethod.DELETE, RequestMethod.GET })
    public String deleteById(@RequestParam(name = "emp_id", required = false, defaultValue = "1001") long emp_id) {
        return empServiceImp.deleteById(emp_id);
    }

    @RequestMapping(value = "/deleteById/{id}", method = { RequestMethod.DELETE, RequestMethod.GET })
    public String deleteByIdPath(@PathVariable long id) {
        return empServiceImp.deleteById(id);
    }
    @GetMapping("/updatedById")
    public String updatedById(@RequestParam(name = "emp_id", required = false, defaultValue = "1001") long emp_id){
        return empServiceImp.updatedById(emp_id);
    }

    @GetMapping("/updatedById/{id}")
    public String updatedByIdPath(@PathVariable long id){
        return empServiceImp.updatedById(id);
    }
}
