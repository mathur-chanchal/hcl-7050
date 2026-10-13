package com.hcl.library.util;

import com.hcl.library.model.LibraryItem;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class CollectionUtils {

    private CollectionUtils() {
    }

    public static <T extends Comparable<T>> T maxOf(List<T> list) {
        T max = list.get(0);
        for (T element : list) {
            if (element.compareTo(max) > 0) {
                max = element;
            }
        }
        return max;
    }

    public static double totalFees(List<? extends LibraryItem> items, int daysLate) {
        double total = 0;
        for (LibraryItem item : items) {
            total += item.lateFee(daysLate);
        }
        return total;
    }

    public static Map<String, Integer> countByType(List<? extends LibraryItem> items) {
        Map<String, Integer> counts = new HashMap<>();
        for (LibraryItem item : items) {
            String type = item.getClass().getSimpleName();
            counts.put(type, counts.getOrDefault(type, 0) + 1);
        }
        return counts;
    }
}
