package day4;

import java.util.*;

class queueUsingArrayDeque {
    public static void main(String[] args) {
        Deque<Integer> q = new ArrayDeque<>();

        // Normal queue operations
        q.offerLast(10);
        q.offerLast(20);
        q.offerLast(30);

        System.out.println(q.peekFirst()); // 10
        System.out.println(q.pollFirst()); // 10

        // Deque-specific operations
        q.offerFirst(5);
        q.offerLast(40);

        System.out.println(q); // [5, 20, 30, 40]
    }
}
