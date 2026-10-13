package com.hcl.library.model;

public class Book extends LibraryItem {

    private static final double FEE_PER_DAY = 2.0;

    private final String author;
    private final String isbn;

    public Book(String title, int year, String author, String isbn) {
        super(title, year);
        if (author == null || author.trim().isEmpty()) {
            throw new IllegalArgumentException("Author must not be blank.");
        }
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN must not be blank.");
        }
        this.author = author.trim();
        this.isbn = isbn.trim();
    }

    @Override
    public double lateFee(int daysLate) {
        return chargeableDays(daysLate) * FEE_PER_DAY;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    @Override
    public String toString() {
        return "Book[" + super.toString() + ", " + author + "]";
    }
}
