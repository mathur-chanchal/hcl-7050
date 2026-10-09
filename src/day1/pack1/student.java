package day1.pack1;

public class student {
    private String name;
    private int rollNo;

    public student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public int getRollNo() {
        return rollNo;
    }

    public void display() {
        System.out.println("Student Name: " + name + ", Roll No: " + rollNo);
    }
}
