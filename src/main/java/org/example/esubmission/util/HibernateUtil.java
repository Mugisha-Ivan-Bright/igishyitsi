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
            
            // Try DATABASE_URL first (Render format)
            String databaseUrl = ConfigUtil.getProperty("DATABASE_URL");
            if (databaseUrl != null) {
                // Parse Render DATABASE_URL format: postgres://user:pass@host:port/dbname
                String jdbcUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
                configuration.setProperty("hibernate.connection.url", jdbcUrl);
                
                // Extract username and password from DATABASE_URL if needed
                // Or use separate environment variables
                String dbUser = ConfigUtil.getProperty("db.user");
                String dbPass = ConfigUtil.getProperty("db.pass");
                
                if (dbUser != null) configuration.setProperty("hibernate.connection.username", dbUser);
                if (dbPass != null) configuration.setProperty("hibernate.connection.password", dbPass);
            } else {
                // Fallback to individual database properties
                String dbUrl = ConfigUtil.getProperty("db.url");
                String dbUser = ConfigUtil.getProperty("db.user");
                String dbPass = ConfigUtil.getProperty("db.pass");
                
                if (dbUrl != null) configuration.setProperty("hibernate.connection.url", dbUrl);
                if (dbUser != null) configuration.setProperty("hibernate.connection.username", dbUser);
                if (dbPass != null) configuration.setProperty("hibernate.connection.password", dbPass);
            }
            
            // Override other Hibernate settings from environment
            String dialect = ConfigUtil.getProperty("HIBERNATE_DIALECT");
            if (dialect != null) configuration.setProperty("hibernate.dialect", dialect);
            
            String showSql = ConfigUtil.getProperty("HIBERNATE_SHOW_SQL");
            if (showSql != null) configuration.setProperty("hibernate.show_sql", showSql);
            
            String formatSql = ConfigUtil.getProperty("HIBERNATE_FORMAT_SQL");
            if (formatSql != null) configuration.setProperty("hibernate.format_sql", formatSql);
            
            String hbm2ddl = ConfigUtil.getProperty("HIBERNATE_HBM2DDL_AUTO");
            if (hbm2ddl != null) configuration.setProperty("hibernate.hbm2ddl.auto", hbm2ddl);
            
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
