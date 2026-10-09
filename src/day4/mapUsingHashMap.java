package day4;
import java.util.*;

public class mapUsingHashMap {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();

        // Insert key-value pairs
        map.put(1, "Chanchal");
        map.put(2, "Aman");
        map.put(3, "Riya");

        // Access value using key
        System.out.println(map.get(1)); // Chanchal

        // Check key
        System.out.println(map.containsKey(2)); // true

        // Check value
        System.out.println(map.containsValue("Riya")); // true

        // Remove an entry
        map.remove(3);

        // Size
        System.out.println(map.size()); // 2

        // Traverse the map
        for (Map.Entry<Integer, String> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }

        // Traverse using entrySet() and enhanced for loop
        for (Map.Entry<Integer, String> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }

        // Traverse using forEach() and lambda expression
        map.forEach((key, value) -> System.out.println(key + " " + value));
    }
}
