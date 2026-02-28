package org.example.esubmission.dao;

import org.example.esubmission.model.Announcement;
import org.example.esubmission.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

/**
 * Data Access Object for Appointment entity.
 */
public class AnnouncementDAO {

    public List<Announcement> findAll() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        List<Announcement> announcements = session.createQuery("FROM Announcement ORDER BY createdAt DESC", Announcement.class).list();
        session.close();
        return announcements;
    }

    public Announcement findById(long id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Announcement announcement = session.get(Announcement.class, id);
        session.close();
        return announcement;
    }

    public Announcement save(Announcement announcement) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Announcement saved = session.merge(announcement);
            tx.commit();
            return saved;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to save announcement", e);
        }
    }

    public void delete(long id) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Announcement announcement = session.get(Announcement.class, id);
            if (announcement != null) {
                session.remove(announcement);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to delete announcement", e);
        }
    }
}
