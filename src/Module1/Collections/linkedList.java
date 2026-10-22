package day3;
import java.util.*;

public class linkedList {
    public static void main(String[] args) {
        // 1. Create a LinkedList
        LinkedList<Integer> list = new LinkedList<>(
                Arrays.asList(10, 20, 30, 40, 50)
        );

        System.out.println("Original List: " + list);

        // 2. Add elements
        list.add(60);              // Add at end
        list.addFirst(5);          // Add at beginning
        list.addLast(70);          // Add at end
        list.add(2, 15);           // Add at index 2
        System.out.println("After adding: " + list);

        // 3. Access elements
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
        System.out.println("Element at index 2: " + list.get(2));

        //using iterator for inserting
        ListIterator<Integer> it = list.listIterator();
        while (it.hasNext()) {
            int value = it.next();
            if (value == 30) {
                it.add(35);
                break;
            }
        }
        System.out.println("After adding: " + list);
        // 4. Update elements
        list.set(2, 100);
        System.out.println("After update: " + list);

        // 5. Search elements
        System.out.println("Contains 30? " + list.contains(30));
        System.out.println("Index of 40: " + list.indexOf(40));
        System.out.println("Last index of 20: " + list.lastIndexOf(20));

        // 6. Get size and check empty
        System.out.println("Size: " + list.size());
        System.out.println("Is empty? " + list.isEmpty());

        // 7. Remove elements
        list.removeFirst();        // Remove first
        list.removeLast();         // Remove last
        list.remove(Integer.valueOf(40)); // Remove by value
        list.remove(1);            // Remove by index
        System.out.println("After removing: " + list);

        // 8. Queue methods
        list.offer(80);            // Add at end
        list.offerFirst(1);        // Add at beginning
        list.offerLast(90);        // Add at end
        System.out.println("After offer: " + list);

        System.out.println("Peek first: " + list.peek());
        System.out.println("Peek last: " + list.peekLast());

        // 9. Deque methods
        System.out.println("Poll first: " + list.pollFirst());
        System.out.println("Poll last: " + list.pollLast());

        // 10. Sort
        Collections.sort(list);
        System.out.println("Ascending: " + list);

        list.sort(Collections.reverseOrder());
        System.out.println("Descending: " + list);

        // 11. Reverse
        Collections.reverse(list);
        System.out.println("Reversed: " + list);

        // 12. Minimum and maximum
        System.out.println("Minimum: " + Collections.min(list));
        System.out.println("Maximum: " + Collections.max(list));

        // 13. Frequency
        list.add(20);
        System.out.println("Frequency of 20: " +
                Collections.frequency(list, 20));

        // 14. Iterate
        System.out.print("Elements: ");
        for (int x : list) {
            System.out.print(x + " ");
        }
        System.out.println();

        // 15. Clear
        list.clear();
        System.out.println("After clear: " + list);
        System.out.println("Is empty? " + list.isEmpty());
    }
}
