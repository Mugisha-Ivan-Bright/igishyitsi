package org.example.esubmission.dao;

import org.example.esubmission.model.Assignment;
import org.example.esubmission.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

/**
 * Data Access Object for {@link Assignment} entity.
 * <p>
 * This class provides methods to perform CRUD operations on assignments
 * in the database using Hibernate.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class AssignmentDAO {
    
    /**
     * Saves a new assignment or updates an existing one.
     *
     * @param assignment the assignment to save
     * @return the saved assignment
     * @throws RuntimeException if the operation fails
     */
    public Assignment save(Assignment assignment) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(assignment);
            tx.commit();
            return assignment;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to save assignment", e);
        }
    }

    /**
     * Retrieves all assignments created by a specific teacher.
     *
     * @param teacherId the unique identifier of the teacher
     * @return a list of assignments, ordered by creation date descending
     */
    public List<Assignment> findByTeacherId(Long teacherId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Assignment WHERE teacher.id = :teacherId ORDER BY createdAt DESC", Assignment.class)
                    .setParameter("teacherId", teacherId)
                    .list();
        }
    }

    /**
     * Retrieves an assignment by its unique identifier.
     *
     * @param id the unique identifier of the assignment
     * @return the assignment entity, or {@code null} if not found
     */
    public Assignment findById(Long id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Assignment.class, id);
        }
    }

    /**
     * Retrieves all assignments assigned to a specific class.
     *
     * @param className the name of the class
     * @return a list of assignments, ordered by deadline descending
     */
    public List<Assignment> findByClassName(String className) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Assignment WHERE className = :className ORDER BY deadline DESC", Assignment.class)
                    .setParameter("className", className)
                    .list();
        }
    }

    /**
     * Retrieves all assignments in the system.
     *
     * @return a list of all assignments, ordered by creation date descending
     */
    public List<Assignment> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Assignment ORDER BY createdAt DESC", Assignment.class)
                    .list();
        }
    }

    /**
     * Counts the total number of assignments created by a specific teacher.
     *
     * @param teacherId the ID of the teacher
     * @return the count of assignments
     */
    public Long countByTeacherId(Long teacherId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("SELECT COUNT(a) FROM Assignment a WHERE a.teacher.id = :teacherId", Long.class)
                    .setParameter("teacherId", teacherId)
                    .uniqueResult();
        }
    }
}
