package org.example.esubmission.exception;

/**
 * Exception thrown when a requested user cannot be found in the system.
 */
public class UserNotFoundException extends RuntimeException{
    /**
     * Constructs a new UserNotFoundException with the specified message.
     *
     * @param message the detail message
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
