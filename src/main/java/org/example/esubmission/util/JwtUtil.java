package org.example.esubmission.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.example.esubmission.model.User;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class for JSON Web Token (JWT) management.
 * <p>
 * Provides methods for generating, validating, and extracting information 
 * from JWT tokens used for authentication and session management.
 * </p>
 */
public class JwtUtil {
    // Use a strong secret key (in production, load from environment variable)
    private static final String SECRET_KEY = ConfigUtil.getProperty("jwt.secret", "default-fallback-secret-key-change-this-in-config-properties");
    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60; // 1 hour
    private static final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7; // 7 days

    /**
     * Generates a signing key from the secret key string.
     *
     * @return the SecretKey
     */
    private static SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /**
     * Generates an access token for a given user.
     * <p>
     * The token includes user ID, email, and role as claims.
     * </p>
     *
     * @param user the user to generate the token for
     * @return the generated access token
     */
    public static String generateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole().toString());
        
        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Generates a refresh token for a given user.
     *
     * @param user the user to generate the token for
     * @return the generated refresh token
     */
    public static String generateRefreshToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Validates a JWT token and returns its claims.
     *
     * @param token the token to validate
     * @return the claims contained in the token
     */
    public static Claims validateToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Extracts the user email from a JWT token.
     *
     * @param token the JWT token
     * @return the email subject
     */
    public static String getEmailFromToken(String token) {
        return validateToken(token).getSubject();
    }

    /**
     * Checks if a JWT token has expired.
     *
     * @param token the JWT token
     * @return {@code true} if expired or invalid, {@code false} otherwise
     */
    public static boolean isTokenExpired(String token) {
        try {
            return validateToken(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
