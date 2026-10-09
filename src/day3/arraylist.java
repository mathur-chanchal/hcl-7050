import java.util.ArrayList;

public class arraylist {
    public static void main(String[] args) {

        // Create an ArrayList
        ArrayList<Integer> list = new ArrayList<>();

        // Add 10 elements
        for (int i = 1; i <= 10; i++) {
            list.add(i * 10);
        }

        // Update two elements using set(index, value)
        list.set(2, 100);  // Update element at index 2
        list.set(5, 200);  // Update element at index 5

        // Print the two updated elements
        System.out.println("First updated element: " + list.get(2));
        System.out.println("Second updated element: " + list.get(5));

        // Print the complete updated list
        System.out.println("Updated ArrayList: " + list);
        list.clear();
        System.out.println("Updated ArrayList: " + list);
        list.add(200);
        System.out.println("Updated ArrayList Size: " + list.size());
    }
}
