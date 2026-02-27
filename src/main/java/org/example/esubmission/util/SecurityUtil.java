package org.example.esubmission.util;

import java.security.SecureRandom;

/**
 * Utility class for security-related operations.
 * Provides methods for input sanitization and secure code generation.
 */
public class SecurityUtil {

    private static final String DIGITS = "0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    /**
     * Sanitizes input string to prevent XSS and other injection attacks.
     * 
     * @param input the raw input string
     * @return the sanitized string
     */
    public static String sanitizeInput(String input) {
        if (input == null) return null;
        
        // Remove HTML tags
        String sanitized = input.replaceAll("<[^>]*>", "");
        
        // Escape common special characters
        sanitized = sanitized.replace("&", "&amp;")
                            .replace("<", "&lt;")
                            .replace(">", "&gt;")
                            .replace("\"", "&quot;")
                            .replace("'", "&#x27;")
                            .replace("/", "&#x2F;");
                            
        return sanitized.trim();
    }

    /**
     * Generates a secure 6-digit numeric verification code.
     * 
     * @return a 6-digit numeric string
     */
    public static String generateVerificationCode() {
        StringBuilder pb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            pb.append(DIGITS.charAt(RANDOM.nextInt(DIGITS.length())));
        }
        return pb.toString();
    }
}
