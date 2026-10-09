package day4;
import java.util.*;
public class priorityQueue {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        pq.add(30);
        pq.add(10);
        pq.add(20);

        System.out.println(pq.peek()); // 10

        System.out.println(pq.poll()); // 10
        System.out.println(pq.poll()); // 20

        System.out.println(pq.size()); // 1
        System.out.println(pq.isEmpty()); // false
    }
}
