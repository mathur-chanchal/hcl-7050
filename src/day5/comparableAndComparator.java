package day5;

import java.util.*;

class Student implements Comparable<Student> {
    String name;
    int rollNo;
    int age;
    double marks;

    Student(String name, int rollNo, int age, double marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.age = age;
        this.marks = marks;
    }

    // Comparable: sort by roll number
    @Override
    public int compareTo(Student s) {
        return Integer.compare(this.rollNo, s.rollNo);
    }

    void display() {
        System.out.println(name + " " + rollNo + " " + age + " " + marks);
    }
}

public class comparableAndComparator {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();

        students.add(new Student("Aman", 104, 21, 85.5));
        students.add(new Student("Riya", 101, 20, 92.0));
        students.add(new Student("Karan", 103, 22, 78.5));
        students.add(new Student("Priya", 102, 20, 95.0));
        students.add(new Student("Rahul", 105, 21, 88.0));

        System.out.println("Sorted by Roll Number (Comparable):");
        Collections.sort(students);

        for (Student s : students) {
            s.display();
        }

        // Comparator: sort by age in ascending order
        Comparator<Student> byAge =
                (s1, s2) -> Integer.compare(s1.age, s2.age);

        students.sort(byAge);

        System.out.println("\nSorted by Age (Comparator):");
        for (Student s : students) {
            s.display();
        }

        // Comparator: sort by marks in descending order
        Comparator<Student> byMarks =
                (s1, s2) -> Double.compare(s2.marks, s1.marks);

        students.sort(byMarks);

        System.out.println("\nSorted by Marks (Descending):");
        for (Student s : students) {
            s.display();
        }
    }
}
