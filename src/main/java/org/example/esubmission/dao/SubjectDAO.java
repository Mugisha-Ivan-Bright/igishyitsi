package org.example.esubmission.dao;

import org.example.esubmission.model.Subject;
import org.example.esubmission.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

/**
 * Data Access Object for Subject entity.
 */
public class SubjectDAO {

    public List<Subject> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Subject ORDER BY code", Subject.class).list();
        }
    }

    public Subject findById(Long id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Subject.class, id);
        }
    }

    public Subject save(Subject subject) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Subject saved = session.merge(subject);
            tx.commit();
            return saved;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to save subject", e);
        }
    }

    public void delete(Long id) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Subject subject = session.get(Subject.class, id);
            if (subject != null) {
                session.remove(subject);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to delete subject", e);
        }
    }
}
