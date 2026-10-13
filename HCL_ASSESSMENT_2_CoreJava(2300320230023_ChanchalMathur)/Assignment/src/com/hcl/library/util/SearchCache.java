package com.hcl.library.util;

import java.util.LinkedHashMap;
import java.util.Map;

/** LRU cache that remembers only the last 5 searched titles. */
public class SearchCache extends LinkedHashMap<String, String> {

    private static final long serialVersionUID = 1L;
    private static final int MAX_SIZE = 5;

    public SearchCache() {
        super(16, 0.75f, true); // true = order by most recent access (LRU)
    }

    public void record(String title) {
        put(title.toLowerCase(), title);
    }

    // Called automatically after put(): drop the oldest entry when we have more than 5.
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        return size() > MAX_SIZE;
    }
}
