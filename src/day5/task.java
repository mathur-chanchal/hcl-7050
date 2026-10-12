package day5;

import java.util.*;

class Employee {
    int id;
    String name;
    double salary;

    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    void display() {
        System.out.println("ID: " + id + ", Name: " + name + ", Salary: " + salary);
    }
}

public class task {
    public static void main(String[] args) {

        ArrayList<Employee> employees = new ArrayList<>();

        // CREATE: Add employees
        employees.add(new Employee(103, "Aman", 45000));
        employees.add(new Employee(101, "Riya", 55000));
        employees.add(new Employee(105, "Rahul", 40000));
        employees.add(new Employee(102, "Priya", 60000));
        employees.add(new Employee(104, "Karan", 50000));

        System.out.println("DISPLAY");
        for (Employee e : employees) {
            e.display();
        }

        // READ: Search employee by ID
        System.out.println("READ EMPLOYEE");
        int searchId = 102;
        boolean found = false;

        Iterator<Employee> it = employees.iterator();

        while (it.hasNext()) {
            Employee e = it.next();

            if (e.id == searchId) {
                e.display();
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Employee not found");
        }

        // UPDATE: Update employee details
        System.out.println("\nUPDATE EMPLOYEE");
        for (Employee e : employees) {
            if (e.id == 103) {
                e.name = "Aman Sharma";
                e.salary = 65000;
                break;
            }
        }

        for (Employee e : employees) {
            e.display();
        }

        // DELETE: Remove employee using Iterator
        System.out.println("\nDELETE EMPLOYEE");
        Iterator<Employee> deleteIt = employees.iterator();

        while (deleteIt.hasNext()) {
            Employee e = deleteIt.next();

            if (e.id == 105) {
                deleteIt.remove();
                System.out.println("Employee deleted: " + e.id);
                break;
            }
        }

        // Traverse using Iterator (forward)
        System.out.println("\nITERATOR: FORWARD");
        Iterator<Employee> iterator = employees.iterator();

        while (iterator.hasNext()) {
            iterator.next().display();
        }

        // Traverse using ListIterator (forward)
        System.out.println("\nLISTITERATOR: FORWARD");
        ListIterator<Employee> listIterator = employees.listIterator();

        while (listIterator.hasNext()) {
            listIterator.next().display();
        }

        // Traverse using ListIterator (backward)
        System.out.println("\nLISTITERATOR: BACKWARD");
        while (listIterator.hasPrevious()) {
            listIterator.previous().display();
        }

        // ASCENDING order by employee ID
        System.out.println("\nASCENDING BY ID");
        employees.sort(Comparator.comparingInt(e -> e.id));

        for (Employee e : employees) {
            e.display();
        }

        // DESCENDING order by employee ID
        System.out.println("\nDESCENDING BY ID");
        employees.sort(Comparator.comparingInt(
                (Employee e) -> e.id).reversed());

        for (Employee e : employees) {
            e.display();
        }
    }
}