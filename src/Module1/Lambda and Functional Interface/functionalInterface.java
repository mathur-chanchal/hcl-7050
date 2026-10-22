package day5;
@FunctionalInterface
interface MyInterface {
    void display();
}

class Demo implements MyInterface {
    @Override
    public void display() {
        System.out.println("Traditional implementation");
    }
}

public class functionalInterface {
    public static void main(String[] args) {
        Demo obj = new Demo();
        obj.display();
    }
}
