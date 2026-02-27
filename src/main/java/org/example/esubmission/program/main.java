package org.example.esubmission.program;


import org.example.esubmission.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class main {
    public static void main(String[] args) {

        SessionFactory factory = new Configuration()

                .configure("hibernate.cfg.xml")
                        .buildSessionFactory();

        User user = new User();

        Session session = factory.openSession();

        session.persist(user);
        System.out.println("User saved into database");

        session.close();
        factory.close();

        }
}
