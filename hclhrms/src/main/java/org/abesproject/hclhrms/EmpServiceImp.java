package org.abesproject.hclhrms;

import org.abesproject.hclhrms.entity.Employee;
import org.abesproject.hclhrms.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpServiceImp {
    @Autowired
    private EmployeeRepo emprepo;

    public String addEmp() {
        Employee emp1 = new Employee("saumya@gmail.com", 230052, "Saumyaa", "Manager", "Java");
        return emprepo.addEmp(emp1);
    }

    public List<Employee> getAllEmp() {
        return emprepo.getAllEmp();
    }

    public List<Employee> getEmp() {
        return emprepo.getEmp();
    }

    public String addEmpBulk() {
        List<Employee> bulkList = List.of(
                new Employee("saumya@gmail.com", 1001, "Saumyaa", "HR", "Java"),
                new Employee("prakhar@gmail.com", 1002, "Prakhar", "Manager", "Full Stack"),
                new Employee("madhuri@gmail.com", 1003, "Madhuri", "Fresher", "Frontend"),
                new Employee("sunil@gmail.com", 1004, "Sunil", "Fresher", "Backend")
        );
        return emprepo.addEmpBulk(bulkList);
    }

    public Employee getEmpById(long emp_id) {
        return emprepo.getEmpById(emp_id);
    }

    public Employee getEmpById() {
        return emprepo.getEmpById(1001);
    }
    public String deleteById(long emp_id){
        return emprepo.deleteById(emp_id);
    }
    public String updateById(long emp_id){
        return emprepo.updatedById(emp_id);
    }

    public String updatedById(long emp_id){
        return emprepo.updatedById(emp_id);
    }
}

