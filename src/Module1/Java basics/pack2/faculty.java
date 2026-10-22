package day1.pack2;

import day1.pack1.student;

public class faculty {
    public static void main(String[] args) {
        student s1 = new student("Chanchal", 101);
        s1.display();

        System.out.println("Name using getter: " + s1.getName());
    }
}
