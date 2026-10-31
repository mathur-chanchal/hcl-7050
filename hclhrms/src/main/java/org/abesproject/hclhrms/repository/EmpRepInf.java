package org.abesproject.hclhrms.repository;

import org.abesproject.hclhrms.entity.Employee;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmpRepInf implements EmployeeRepo {
    private List<Employee> emplist = new ArrayList<>();

    @Override
    public String addEmp(Employee emp) {
        emplist.add(emp);
        return "Employee added successfully!";
    }

    @Override
    public List<Employee> getAllEmp() {
        return emplist;
    }

    @Override
    public String addEmpBulk(List<Employee> employeeList) {
        if (employeeList != null && !employeeList.isEmpty()) {
            this.emplist.addAll(employeeList);
            System.out.println("Employees added successfully!");
            System.out.println("Current Employee List: " + this.emplist);
        }
        return "Employees added successfully!";
    }

    @Override
    public List<Employee> getEmp() {
        System.out.println("Current Employee List: " + emplist);
        return emplist;
    }

    @Override
    public Employee getEmpById(long emp_id) {
        return emplist.stream().filter(e -> e.getEmp_id() == emp_id).findFirst().orElse(null);
    }
    @Override
    public String deleteById(long emp_id){
        boolean status= false;
        if(getEmpById(emp_id)!= null){
            emplist.removeIf(e->e.getEmp_id() ==emp_id);
            status=true;
        }
        if(status) return "Employee deleted successfully";
        else return "Employee not found " + emp_id + " !!";
    }
    @Override
    public String updatedById(long empid){
        Employee existingEmp= getEmpById(empid);
        if(existingEmp !=null){
            existingEmp.setEmail("divya@gmail.com");
            return "Employee updated successfully";
        }
        return "Employee not found " + empid + " !!";
    }

//    @Override
//    public String deleteById(long emp_id) {
//        boolean removed = emplist.removeIf(emp -> emp.getEmp_id() == emp_id);
//        return removed ? "Employee deleted successfully!" : "Employee not found!";
//    }

//    @Override
//    public String updatedById(long emp_id, Employee updatedEmp) {
//        for (int i = 0; i < emplist.size(); i++) {
//            if (emplist.get(i).getEmp_id() == emp_id) {
//                emplist.set(i, updatedEmp);
//                return "Employee updated successfully!";
//            }
//        }
//        return "Employee not found!";
//    }
}
