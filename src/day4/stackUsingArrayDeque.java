package day4;
import java.util.*;
public class stackUsingArrayDeque {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();

        dq.addFirst(10);  // Insert at front
        dq.addLast(20);   // Insert at rear
        dq.addFirst(5);   // Insert at front

        System.out.println(dq); // [5, 10, 20]

        dq.removeFirst(); // Remove from front
        dq.removeLast();  // Remove from rear

        System.out.println(dq); // [10]
    }
}
