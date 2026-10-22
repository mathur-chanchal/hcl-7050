package Exception Handling;

public class custom_exception {
    static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Access denied: you are under age");
        } else {
            System.out.println("Access Granted");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (ArithmeticException e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}