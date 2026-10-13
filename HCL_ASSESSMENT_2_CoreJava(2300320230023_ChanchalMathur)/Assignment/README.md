# Library Management System

**Name:** Chanchal Mathur  
**Roll number:** 2300320230023 
**Batch:** 2027

A console Library Management System in core Java. It lends Books, Magazines and DVDs to Members, charges late fees, keeps a waitlist for issued items and exports a report.

## How to compile and run

Run from inside the `Assignment` folder.

Windows (Command Prompt):
```
mkdir out
dir /s /b src\*.java > sources.txt
javac -d out @sources.txt
java -cp out com.hcl.library.Main
```

## Design note

- `LibraryItem` (abstract, has the abstract method `lateFee`) -> `Book`, `Magazine`, `DVD`
- `LibraryItem` implements the interface `Borrowable` and `Comparable<LibraryItem>`
- `Member` holds the borrowed items
- `LibraryException` (extends `RuntimeException`) -> `ItemNotFoundException`, `ItemNotAvailableException`, `BorrowLimitExceededException`
- `Repository<T, ID>` (interface) -> `InMemoryRepository<T, ID>` (uses a `HashMap`)
- `LibraryService` has all the business rules, `Main` only has the menu
- `CollectionUtils` (generic helper methods) and `SearchCache` (LRU cache)

## Test cases

Setup: add Book "Clean Code", 2008, Robert Martin, ISBN 111 (id 1001); add three more items (ids 1002-1004); register Asha (member 1) and Ravi (member 2).

| # | Test | Input | Expected output |
|---|------|-------|-----------------|
| 1 | Successful borrow | Borrow: member 1, item 1001 | `Issued: Book[1001, Clean Code, 2008, Robert Martin]` |
| 2 | Borrow an unavailable item | Borrow: member 2, item 1001 | `ERROR: Item 1001 is not available.` then `Add to waitlist? (y/n):` |
| 3 | Exceed the borrow limit | Member 1 borrows 1002, 1003, 1004, then tries 1001 | `ERROR: Member 1 cannot borrow more than 3 items.` |
| 4 | Invalid item id | Borrow: member 1, item 9999 | `ERROR: Item 9999 does not exist.` |
| 5 | Waitlist notification | Answer `y` in test 2, then Return: item 1001, late by 3 days | `Late fee: 6.0` and `Notification: Member 2 (Ravi) is next in the waitlist for 1001.` |

## LRU cache and memory leaks

`SearchCache` extends `LinkedHashMap` with access order and overrides `removeEldestEntry`, so it keeps only the last 5 searches and removes the oldest automatically.
An unbounded `static` map lives as long as the program runs, so everything put into it stays reachable.
The garbage collector can never free those entries, even if nobody uses them again.
Memory then keeps growing with every new search, which is a memory leak.

## Challenges and what I learned

- Removing from a list while looping over it causes `ConcurrentModificationException`, so I used `removeIf`.
- Business rules belong in `LibraryService`, which keeps `Main` simple.
- I learned how `equals`/`hashCode`, `Comparable`/`Comparator`, generics and custom exceptions work together in one project.
