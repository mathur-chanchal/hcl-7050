package com.hcl.library.service;

import com.hcl.library.exception.BorrowLimitExceededException;
import com.hcl.library.exception.ItemNotFoundException;
import com.hcl.library.exception.LibraryException;
import com.hcl.library.model.Book;
import com.hcl.library.model.LibraryItem;
import com.hcl.library.model.Member;
import com.hcl.library.repository.InMemoryRepository;
import com.hcl.library.repository.Repository;
import com.hcl.library.util.CollectionUtils;
import com.hcl.library.util.SearchCache;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class LibraryService {

    private static final int MAX_BORROW_LIMIT = 3;

    private final Repository<LibraryItem, Integer> items = new InMemoryRepository<>(LibraryItem::getId);
    private final Repository<Member, Integer> members = new InMemoryRepository<>(Member::getId);
    private final Set<String> isbns = new HashSet<>();
    private final Map<Integer, Queue<Member>> waitlist = new HashMap<>();
    private final SearchCache searchCache = new SearchCache();

    public void checkIsbn(String isbn) {
        if (isbns.contains(isbn)) {
            throw new LibraryException("A book with ISBN " + isbn + " already exists.");
        }
    }

    public void addItem(LibraryItem item) {
        if (item instanceof Book) {
            Book book = (Book) item;
            checkIsbn(book.getIsbn());
            isbns.add(book.getIsbn());
        }
        items.save(item);
    }

    public void addMember(Member member) {
        members.save(member);
    }

    private LibraryItem findItem(int itemId) {
        return items.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item " + itemId + " does not exist."));
    }

    private Member findMember(int memberId) {
        return members.findById(memberId)
                .orElseThrow(() -> new LibraryException("Member " + memberId + " does not exist."));
    }

    public LibraryItem borrowItem(int memberId, int itemId) {
        Member member = findMember(memberId);
        LibraryItem item = findItem(itemId);
        if (member.getBorrowedItems().size() >= MAX_BORROW_LIMIT) {
            throw new BorrowLimitExceededException(
                    "Member " + memberId + " cannot borrow more than " + MAX_BORROW_LIMIT + " items.");
        }
        item.borrow();
        member.addBorrowedItem(item);
        Queue<Member> queue = waitlist.get(itemId);
        if (queue != null) {
            queue.remove(member);
        }
        return item;
    }

    public void joinWaitlist(int memberId, int itemId) {
        Member member = findMember(memberId);
        LibraryItem item = findItem(itemId);
        if (item.isAvailable()) {
            throw new LibraryException("Item " + itemId + " is available, borrow it directly.");
        }
        Queue<Member> queue = waitlist.get(itemId);
        if (queue != null && queue.contains(member)) {
            throw new LibraryException("Member " + memberId + " is already on the waitlist.");
        }
        if (queue == null) {
            queue = new ArrayDeque<>();
            waitlist.put(itemId, queue);
        }
        queue.add(member);
    }

    public double returnItem(int itemId, int daysLate) {
        LibraryItem item = findItem(itemId);
        for (Member member : members.findAll()) {
            if (member.getBorrowedItems().contains(item)) {
                member.removeBorrowedItem(item);
                item.giveBack();
                return item.lateFee(daysLate);
            }
        }
        throw new LibraryException("Item " + itemId + " is not currently borrowed.");
    }

    public Member nextInWaitlist(int itemId) {
        Queue<Member> queue = waitlist.get(itemId);
        return (queue == null) ? null : queue.peek();
    }

    public List<LibraryItem> listByTitle() {
        List<LibraryItem> list = new ArrayList<>(items.findAll());
        list.sort(null);
        return list;
    }

    public List<LibraryItem> listByYearThenTitle() {
        List<LibraryItem> list = new ArrayList<>(items.findAll());
        list.sort(Comparator.comparing(LibraryItem::getYear).reversed()
                .thenComparing(LibraryItem::getTitle, String.CASE_INSENSITIVE_ORDER));
        return list;
    }

    public List<LibraryItem> search(String text) {
        searchCache.record(text);
        List<LibraryItem> result = new ArrayList<>();
        for (LibraryItem item : listByTitle()) {
            if (item.getTitle().toLowerCase().contains(text.toLowerCase())) {
                result.add(item);
            }
        }
        return result;
    }

    public List<String> recentSearches() {
        return new ArrayList<>(searchCache.values());
    }

    public int removeOldItems(int beforeYear) {
        List<LibraryItem> toRemove = new ArrayList<>(items.findAll());
        toRemove.removeIf(item -> item.getYear() >= beforeYear || !item.isAvailable());
        for (LibraryItem item : toRemove) {
            items.deleteById(item.getId());
            if (item instanceof Book) {
                isbns.remove(((Book) item).getIsbn());
            }
        }
        return toRemove.size();
    }

    public String buildReport() {
        List<LibraryItem> all = listByTitle();
        StringBuilder sb = new StringBuilder("===== LIBRARY REPORT =====\n");
        for (LibraryItem item : all) {
            sb.append(item)
                    .append(" | ").append(item.isAvailable() ? "Available" : "Issued")
                    .append(" | late fee per day: ").append(item.lateFee(1)) // polymorphism
                    .append('\n');
        }
        sb.append("Items per type: ").append(CollectionUtils.countByType(all)).append('\n');
        return sb.toString();
    }

    public void exportReport(String path) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(path))) {
            writer.write(buildReport());
        } catch (IOException e) {
            throw new LibraryException("Could not write the report file.", e);
        }
    }
}
