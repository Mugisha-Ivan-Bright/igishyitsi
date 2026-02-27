package org.example.esubmission.util;
import org.mindrot.jbcrypt.BCrypt;
/**
 * Utility class for password hashing and verification.
 * <p>
 * Uses BCrypt algorithm for secure password management.
 * </p>
 */
public class PasswordUtils {

    /**
     * Hashes a plain-text password using BCrypt.
     *
     * @param password the plain-text password
     * @return the hashed password
     */
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }
    /**
     * Verifies a plain-text password against a hashed password.
     *
     * @param password       the plain-text password
     * @param hashedPassword the hashed password to check against
     * @return {@code true} if the password matches, {@code false} otherwise
     */
    public static boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password,  hashedPassword);
    }
}

