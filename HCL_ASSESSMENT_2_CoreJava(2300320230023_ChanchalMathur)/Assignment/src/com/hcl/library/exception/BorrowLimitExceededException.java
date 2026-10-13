package com.hcl.library.exception;

/** Thrown when a member tries to borrow more items than allowed. */
public class BorrowLimitExceededException extends LibraryException {
    private static final long serialVersionUID = 1L;


    public BorrowLimitExceededException(String message) {
        super(message);
    }

    public BorrowLimitExceededException(String message, Throwable cause) {
        super(message, cause);
    }
}
