package org.example;

import org.example.constructorDI.AppConfig;
import org.example.constructorDI.Employee;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;




public class Main {
    public static void main(String[] args) {
//        ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
//        Employee emp1 = ctx.getBean(Employee.class);
//        Employee emp2 = ctx.getBean(Employee.class);
//
//        emp1.display();
//        emp2.display();
        // to see how IntelliJ IDEA suggests fixing it.

        ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
        Employee emp =ctx.getBean(Employee.class);
        emp.getEmpAddress();

    }    }






























