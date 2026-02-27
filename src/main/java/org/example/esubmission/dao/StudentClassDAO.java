package org.example.esubmission.dao;

import org.example.esubmission.model.StudentClass;
import org.example.esubmission.model.User;
import org.example.esubmission.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

/**
 * Data Access Object for {@link StudentClass} entity.
 * <p>
 * This class manages the relationships between students, teachers, and classes.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class StudentClassDAO {
    
    /**
     * Saves a new student-class allocation.
     *
     * @param studentClass the student-class allocation to save
     * @return the saved entity
     * @throws RuntimeException if the operation fails
     */
    public StudentClass save(StudentClass studentClass) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(studentClass);
            tx.commit();
            return studentClass;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Failed to save student class", e);
        }
    }

    /**
     * Retrieves students enrolled in a specific class under a specific teacher.
     *
     * @param teacherId the ID of the teacher
     * @param className the name of the class
     * @return a list of students, ordered by name
     */
    public List<User> findStudentsByTeacherAndClass(Long teacherId, String className) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery(
                    "SELECT sc.student FROM StudentClass sc WHERE sc.teacher.id = :teacherId AND sc.className = :className ORDER BY sc.student.name", User.class)
                    .setParameter("teacherId", teacherId)
                    .setParameter("className", className)
                    .list();
        }
    }

    /**
     * Retrieves all unique class names associated with a specific teacher.
     *
     * @param teacherId the ID of the teacher
     * @return a list of class names, ordered alphabetically
     */
    public List<String> findClassesByTeacher(Long teacherId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("SELECT DISTINCT sc.className FROM StudentClass sc WHERE sc.teacher.id = :teacherId ORDER BY sc.className", String.class)
                    .setParameter("teacherId", teacherId)
                    .list();
        }
    }

    /**
     * Retrieves all unique class names in the system.
     *
     * @return a list of class names, ordered alphabetically
     */
    public List<String> findAllClasses() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("SELECT DISTINCT sc.className FROM StudentClass sc ORDER BY sc.className", String.class)
                    .list();
        }
    }

    /**
     * Retrieves all unique class names associated with a specific student.
     *
     * @param studentId the ID of the student
     * @return a list of class names, ordered alphabetically
     */
    /**
     * Retrieves all student-class allocations for a specific student.
     *
     * @param studentId the ID of the student
     * @return a list of StudentClass entities, ordered by class name
     */
    public List<StudentClass> findStudentClassesByStudent(Long studentId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM StudentClass sc WHERE sc.student.id = :studentId ORDER BY sc.className", StudentClass.class)
                    .setParameter("studentId", studentId)
                    .list();
        }
    }
    /**
     * Counts the total number of unique students enrolled in all classes of a teacher.
     *
     * @param teacherId the ID of the teacher
     * @return the count of unique students
     */
    public Long countStudentsByTeacher(Long teacherId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("SELECT COUNT(DISTINCT sc.student.id) FROM StudentClass sc WHERE sc.teacher.id = :teacherId", Long.class)
                    .setParameter("teacherId", teacherId)
                    .uniqueResult();
        }
    }

    /**
     * Retrieves all enrollment records for a teacher.
     *
     * @param teacherId the ID of the teacher
     * @return a list of StudentClass records
     */
    public List<StudentClass> findEnrollmentsByTeacher(Long teacherId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM StudentClass sc WHERE sc.teacher.id = :teacherId ORDER BY sc.student.name", StudentClass.class)
                    .setParameter("teacherId", teacherId)
                    .list();
        }
    }
}
