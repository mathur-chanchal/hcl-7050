package day3;

import java.util.Stack;

public class stack {
    public static void main(String[] args) {
        // 1. Create a Stack
        Stack<Integer> stack = new Stack<>();

        // 2. Push elements
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);
        stack.push(50);

        System.out.println("Stack: " + stack);

        // 3. Peek - view top element
        System.out.println("Top element: " + stack.peek());

        // 4. Search - find offset from the top
        int offset = stack.search(30);
        System.out.println("Offset of 30 from top: " + offset);

        // Search for an element that does not exist
        System.out.println("Search 100: " + stack.search(100));

        // 5. Update an element using its index
        stack.set(2, 35);
        System.out.println("After update: " + stack);

        // 6. Check if an element exists
        System.out.println("Contains 40? " + stack.contains(40));

        // 7. Get element using index
        System.out.println("Element at index 1: " + stack.get(1));

        // 8. Remove top element
        System.out.println("Popped element: " + stack.pop());
        System.out.println("After pop: " + stack);

        // 9. Size and empty check
        System.out.println("Size: " + stack.size());
        System.out.println("Is empty? " + stack.empty());

        // 10. Clear stack
        stack.clear();
        System.out.println("After clear: " + stack);
        System.out.println("Is empty? " + stack.empty());
    }
}
