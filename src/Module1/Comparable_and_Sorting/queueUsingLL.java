package day4;
import java.util.*;
class queueUsingLL {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();

        // Insert elements
        q.offer(10);
        q.offer(20);
        q.add(30);

        System.out.println(q);       // [10, 20, 30]

        // View front element
        System.out.println(q.peek()); // 10

        // Remove front element
        System.out.println(q.poll()); // 10

        System.out.println(q);       // [20, 30]

        // Size and check
        System.out.println(q.size()); // 2
        System.out.println(q.isEmpty()); // false
        System.out.println(q.contains(20)); // true
    }
}
