package day2;


abstract class Animal {
    // Encapsulation: private data member
    private String name;

    Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    // Abstraction: abstract method
    abstract void sound();
}

// Inheritance
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    // Polymorphism: method overriding
    @Override
    void sound() {
        System.out.println(getName() + " barks");
    }
}

public class OOPs {
    public static void main(String[] args) {
        Animal a = new Dog("Tommy");
        a.sound();
    }
}

