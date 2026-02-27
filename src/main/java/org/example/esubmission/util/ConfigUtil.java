package org.example.esubmission.util;

import java.io.InputStream;
import java.util.Properties;

/**
 * Utility class for loading configuration properties from config.properties.
 */
public class ConfigUtil {
    private static final Properties properties = new Properties();

    static {
        try (InputStream input = ConfigUtil.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                System.err.println("Sorry, unable to find config.properties");
            } else {
                properties.load(input);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        // Try environment variable first (upper case with underscores)
        String envKey = key.replace('.', '_').toUpperCase();
        String envValue = System.getenv(envKey);
        if (envValue != null) return envValue;
        
        // Then try direct key in environment
        envValue = System.getenv(key);
        if (envValue != null) return envValue;

        return properties.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        String value = getProperty(key);
        return value != null ? value : defaultValue;
    }
}
