package day3;
interface Calculator {
    int VALUE = 10;  // implicitly public static final

    static void display() {
        System.out.println("Static method");
        System.out.println(VALUE);
    }
}

class Interface {
    public static void main(String[] args) {
        System.out.println(Calculator.VALUE);
        Calculator.display();
    }
}
