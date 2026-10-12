package day5;

import java.util.*;
import java.util.function.*;

public class LambdaDemo {

    @FunctionalInterface
    interface MathOperation {
        int operate(int a, int b);
    }

    @FunctionalInterface
    interface Greeting {
        void greet(String name);
    }

    static int compute(int x, int y, MathOperation operation) {
        return operation.operate(x, y);
    }

    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;

        MathOperation multiply = (a, b) -> a * b;

        MathOperation divide = (a, b) -> {
            if (b == 0) {
                throw new ArithmeticException("Cannot divide by zero");
            }
            return a / b;
        };

        System.out.println("Add: " + add.operate(10, 5));
        System.out.println("Multiply: " + multiply.operate(10, 5));
        System.out.println("Divide: " + divide.operate(10, 5));

        System.out.println("Subtract: " + compute(8, 2, (a, b) -> a - b));

        Greeting greeting = name -> System.out.println("Hello, " + name + "!");
        greeting.greet("Bhen");

        Function<Integer, Integer> square = n -> n * n;
        Predicate<String> isEmpty = s -> s.isEmpty();
        Consumer<String> printer = s -> System.out.println("Consumer: " + s);
        Supplier<String> supplier = () -> "Supplier se aaya value";
        BiFunction<Integer, Integer, Integer> max = (a, b) -> Math.max(a, b);

        System.out.println("Square of 5: " + square.apply(5));
        System.out.println("Is empty: " + isEmpty.test(""));
        printer.accept("Java Lambda");
        System.out.println(supplier.get());
        System.out.println("Max of 7 and 12: " + max.apply(7, 12));

        Runnable task = () -> System.out.println("Runnable chal raha hai");
        task.run();

        List<String> names = new ArrayList<>(List.of("Priya", "Aman", "Karan", "Ri"));
        names.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));
        System.out.println("Sorted by length: " + names);

        names.forEach(n -> System.out.println("Name: " + n));
        names.forEach(System.out::println);
    }
}