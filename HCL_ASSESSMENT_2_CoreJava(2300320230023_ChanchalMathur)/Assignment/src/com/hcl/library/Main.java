package com.hcl.library;

import com.hcl.library.exception.ItemNotAvailableException;
import com.hcl.library.exception.ItemNotFoundException;
import com.hcl.library.exception.LibraryException;
import com.hcl.library.exception.BorrowLimitExceededException;
import com.hcl.library.model.Book;
import com.hcl.library.model.DVD;
import com.hcl.library.model.LibraryItem;
import com.hcl.library.model.Magazine;
import com.hcl.library.model.Member;
import com.hcl.library.service.LibraryService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class Main {

    private static final String REPORT_FILE = "library_report.txt";
    private static final Scanner scanner = new Scanner(System.in);
    private static final LibraryService service = new LibraryService();

    public static void main(String[] args) {
        boolean running = true;
        while (running) {
            printMenu();
            try {
                int choice = readInt("Choice: ");
                switch (choice) {
                    case 1: addItem(); break;
                    case 2: registerMember(); break;
                    case 3: borrow(); break;
                    case 4: returnItem(); break;
                    case 5: waitlist(); break;
                    case 6: listItems(); break;
                    case 7: search(); break;
                    case 8: exportReport(); break;
                    case 9: removeOldItems(); break;
                    case 0: running = false; System.out.println("Goodbye!"); break;
                    default: System.out.println("ERROR: Unknown choice.");
                }
            } catch (ItemNotFoundException | ItemNotAvailableException | BorrowLimitExceededException e) {
                System.out.println("ERROR: " + e.getMessage());
            } catch (LibraryException e) {
                System.out.println("ERROR: " + e.getMessage()
                        + (e.getCause() != null ? " Cause: " + e.getCause().getMessage() : ""));
            } catch (NumberFormatException e) {
                System.out.println("ERROR: Please enter a number.");
            } catch (IllegalArgumentException e) {
                System.out.println("ERROR: " + e.getMessage());
            } catch (NoSuchElementException e) {
                System.out.println("Input ended.");
                running = false;
            } finally {
                System.out.println(); // always go back to the menu
            }
        }
    }

    private static void printMenu() {
        System.out.println("===== LIBRARY MENU =====");
        System.out.println("1. Add item  2. Register member  3. Borrow  4. Return");
        System.out.println("5. Waitlist  6. List items  7. Search  8. Export report");
        System.out.println("9. Remove old items  0. Exit");
    }

    private static void addItem() {
        int type = readInt("Type (1=Book, 2=Magazine, 3=DVD): ");
        String title = readText("Title: ");
        int year = readInt("Year: ");
        LibraryItem item;
        if (type == 1) {
            String author = readText("Author: ");
            String isbn = readText("ISBN: ");
            service.checkIsbn(isbn);
            item = new Book(title, year, author, isbn);
        } else if (type == 2) {
            item = new Magazine(title, year, readInt("Issue number: "));
        } else if (type == 3) {
            item = new DVD(title, year, readInt("Duration (minutes): "));
        } else {
            throw new IllegalArgumentException("Type must be 1, 2 or 3.");
        }
        service.addItem(item);
        System.out.println("Added: " + item);
    }

    private static void registerMember() {
        Member member = new Member(readText("Name: "), readText("Email: "));
        service.addMember(member);
        System.out.println("Registered: " + member);
    }

    private static void borrow() {
        int memberId = readInt("Member id: ");
        int itemId = readInt("Item id: ");
        try {
            System.out.println("Issued: " + service.borrowItem(memberId, itemId));
        } catch (ItemNotAvailableException e) {
            System.out.println("ERROR: " + e.getMessage());
            if (readText("Add to waitlist? (y/n): ").equalsIgnoreCase("y")) {
                service.joinWaitlist(memberId, itemId);
                System.out.println("Added to waitlist.");
            }
        }
    }

    private static void returnItem() {
        int itemId = readInt("Item id: ");
        int daysLate = readInt("Late by (days): ");
        System.out.println("Late fee: " + service.returnItem(itemId, daysLate));
        Member next = service.nextInWaitlist(itemId);
        if (next != null) {
            System.out.println("Notification: Member " + next.getId() + " (" + next.getName()
                    + ") is next in the waitlist for " + itemId + ".");
        }
    }

    private static void waitlist() {
        service.joinWaitlist(readInt("Member id: "), readInt("Item id: "));
        System.out.println("Added to waitlist.");
    }

    private static void listItems() {
        int sort = readInt("Sort by (1=title, 2=year newest first then title): ");
        if (sort == 1) {
            print(service.listByTitle());
        } else if (sort == 2) {
            print(service.listByYearThenTitle());
        } else {
            throw new IllegalArgumentException("Sort option must be 1 or 2.");
        }
    }

    private static void search() {
        print(service.search(readText("Title contains: ")));
        System.out.println("Recent searches: " + service.recentSearches());
    }

    private static void exportReport() {
        service.exportReport(REPORT_FILE);
        System.out.println("Report saved to " + REPORT_FILE);
    }

    private static void removeOldItems() {
        int removed = service.removeOldItems(readInt("Remove available items older than year: "));
        System.out.println("Removed " + removed + " item(s).");
    }

    private static void print(List<LibraryItem> items) {
        StringBuilder sb = new StringBuilder();
        for (LibraryItem item : items) {
            sb.append(item).append(item.isAvailable() ? " (available)" : " (issued)").append('\n');
        }
        System.out.print(items.isEmpty() ? "No items found.\n" : sb.toString());
    }

    private static String readText(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }

    private static int readInt(String prompt) {
        return Integer.parseInt(readText(prompt));
    }
}
