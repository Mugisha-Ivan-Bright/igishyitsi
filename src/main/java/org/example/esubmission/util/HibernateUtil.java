package org.example.esubmission.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Utility class for managing Hibernate SessionFactory.
 * <p>
 * This class ensures that a singleton {@link SessionFactory} is created
 * and exposed for use throughout the application.
 * </p>
 */
public class HibernateUtil {
    private static SessionFactory factory;
    static {
        try{
            Configuration configuration = new Configuration().configure();
            
            // Override with values from config.properties if available
            String dbUrl = ConfigUtil.getProperty("db.url");
            String dbUser = ConfigUtil.getProperty("db.user");
            String dbPass = ConfigUtil.getProperty("db.pass");
            
            if (dbUrl != null) configuration.setProperty("hibernate.connection.url", dbUrl);
            if (dbUser != null) configuration.setProperty("hibernate.connection.username", dbUser);
            if (dbPass != null) configuration.setProperty("hibernate.connection.password", dbPass);
            
            factory = configuration.buildSessionFactory();
        }
        catch(Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            ex.printStackTrace();
            throw new ExceptionInInitializerError(ex);
        }
    }

    /**
     * Returns the singleton SessionFactory instance.
     *
     * @return the SessionFactory
     */
    public static SessionFactory getSessionFactory() {
        return factory;
    }
}
