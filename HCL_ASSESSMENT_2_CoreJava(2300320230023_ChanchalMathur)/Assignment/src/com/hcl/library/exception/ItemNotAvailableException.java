package com.hcl.library.exception;

/** Thrown when borrowing an item that is already issued. */
public class ItemNotAvailableException extends LibraryException {
    private static final long serialVersionUID = 1L;


    public ItemNotAvailableException(String message) {
        super(message);
    }

    public ItemNotAvailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
