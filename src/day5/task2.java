package day5;

import java.util.function.*;

public class task2 {

    @FunctionalInterface
    interface NumberChecker {
        boolean check(int number);
    }

    public static void main(String[] args) {

        // 1. Custom functional interface
        NumberChecker isEven = n -> n % 2 == 0;

        // 2. Built-in Predicate
        Predicate<Integer> isOdd = n -> n % 2 != 0;

        // 3. Function that returns "Even" or "Odd"
        Function<Integer, String> evenOrOdd = n -> n % 2 == 0 ? "Even" : "Odd";

        int num = 7;

        System.out.println(num + " is even? " + isEven.check(num));
        System.out.println(num + " is odd? " + isOdd.test(num));
        System.out.println(num + " is " + evenOrOdd.apply(num));

        // Check multiple numbers
        int[] numbers = {2, 5, 10, 13, 20};
        for (int n : numbers) {
            System.out.println(n + " -> " + evenOrOdd.apply(n));
        }
    }
}