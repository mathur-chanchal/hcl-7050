package org.abesproject.hclhrms.entity;

public class Employee {
    private long emp_id;
    private String emp_name;
    private String designation;
    private String propStack;
    private String email;

    public long getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(long emp_id) {
        this.emp_id = emp_id;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public String getPropStack() {
        return propStack;
    }

    public void setPropStack(String propStack) {
        this.propStack = propStack;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Employee(long emp_id, String emp_name, String designation, String propStack, String email) {
        this.emp_id = emp_id;
        this.emp_name = emp_name;
        this.designation = designation;
        this.propStack = propStack;
        this.email = email;
    }

}

