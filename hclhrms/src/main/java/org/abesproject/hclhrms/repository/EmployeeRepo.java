package org.abesproject.hclhrms.repository;
import org.abesproject.hclhrms.entity.Employee;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo {
    String addEmp();
    Employee getEmp();
    Employee getEmpById(long empid);
    String deleteById(long empid);
    String updateById(long empid.Employee updatedEmp);
}
