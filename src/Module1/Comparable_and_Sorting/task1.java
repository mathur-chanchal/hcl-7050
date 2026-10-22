package day4;

import java.util.*;

class Student implements Comparable<Student> {
    String name;
    int age;
    int rollNo;
    double marks;

    Student(String name, int age, int rollNo, double marks) {
        this.name = name;
        this.age = age;
        this.rollNo = rollNo;
        this.marks = marks;
    }

    @Override
    public int compareTo(Student s) {
        int result = Integer.compare(this.age, s.age);

        if (result == 0) {
            return Double.compare(this.marks, s.marks);
        }

        return result;
    }
}

class task1 {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Riya", 20, 3, 85.5));
        students.add(new Student("Aman", 19, 1, 90.0));
        students.add(new Student("Chanchal", 20, 2, 92.5));
        students.add(new Student("Rahul", 21, 4, 78.0));
        students.add(new Student("Priya", 19, 5, 88.5));
        students.add(new Student("Karan", 20, 6, 85.0));
        students.add(new Student("Neha", 21, 7, 91.0));
        students.add(new Student("Simran", 19, 8, 95.0));
        students.add(new Student("Arjun", 20, 9, 89.0));
        students.add(new Student("Anjali", 21, 10, 82.0));

        Collections.sort(students);

        students.forEach(s ->
                System.out.println(s.name + " " + s.age + " "
                        + s.rollNo + " " + s.marks)
        );
    }
}