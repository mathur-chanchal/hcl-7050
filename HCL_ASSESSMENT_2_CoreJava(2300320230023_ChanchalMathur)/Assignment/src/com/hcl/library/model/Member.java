package com.hcl.library.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Member {

    private static int idCounter = 1;

    private final int id;
    private final String name;
    private final String email;
    private final List<LibraryItem> borrowedItems = new ArrayList<>();

    public Member(int id, String name, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name must not be blank.");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email must contain '@'.");
        }
        this.id = id;
        this.name = name.trim();
        this.email = email.trim();
    }

    public Member(String name, String email) {
        this(idCounter, name, email);
        idCounter++;
    }

    public void addBorrowedItem(LibraryItem item) {
        borrowedItems.add(item);
    }

    public void removeBorrowedItem(LibraryItem item) {
        borrowedItems.remove(item);
    }

    public int borrowedCount() {
        return borrowedItems.size();
    }

    public boolean hasBorrowed(LibraryItem item) {
        return borrowedItems.contains(item);
    }

    public List<LibraryItem> getBorrowedItems() {
        return Collections.unmodifiableList(borrowedItems);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "Member[" + id + ", " + name + ", " + email + "]";
    }
}
