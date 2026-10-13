#!/bin/sh
# Run once from the folder that CONTAINS Assignment/ (the repo root).
# Make sure git knows who you are first:
#   git config --global user.name "Your Name"
#   git config --global user.email "you@example.com"
set -e
[ -d .git ] || git init
B=Assignment/src/com/hcl/library
git add Assignment/.gitignore Assignment/README.md
git commit -m "Add project skeleton, .gitignore and README template"
git add $B/exception
git commit -m "Add LibraryException hierarchy"
git add $B/model/Borrowable.java $B/model/LibraryItem.java $B/model/Book.java $B/model/Magazine.java $B/model/DVD.java
git commit -m "Add LibraryItem hierarchy"
git add $B/model/Member.java
git commit -m "Add Member with email validation and overloaded constructor"
git add $B/repository
git commit -m "Add generic Repository and InMemoryRepository"
git add $B/util
git commit -m "Add CollectionUtils and LRU SearchCache"
git add $B/service
git commit -m "Add LibraryService with borrow, return, waitlist and report export"
git add $B/Main.java
git commit -m "Add console menu in Main"
git add Assignment
git commit -m "Finalize README with design note and test cases" || true
git branch -M main
git log --oneline
echo "Now run:  git remote add origin https://github.com/<username>/hcl-java-training-<rollno>.git  &&  git push -u origin main"
