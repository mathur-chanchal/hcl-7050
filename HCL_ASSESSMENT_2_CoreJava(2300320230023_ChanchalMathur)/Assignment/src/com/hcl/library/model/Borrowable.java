package com.hcl.library.model;

/** Anything that can be issued to a member and given back. */
public interface Borrowable {

    boolean isAvailable();

    void borrow();

    void giveBack();
}
