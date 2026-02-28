package org.example.esubmission.service;

import org.example.esubmission.dao.AssignmentDAO;
import org.example.esubmission.dao.StudentClassDAO;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service class for managing assignment-related business logic.
 * <p>
 * This class orchestrates operations between {@link AssignmentDAO}, 
 * {@link SubmissionDAO}, and {@link StudentClassDAO}.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class AssignmentService {
    private final AssignmentDAO assignmentDAO;
    private final SubmissionDAO submissionDAO;
    private final StudentClassDAO studentClassDAO;

    /**
     * Constructs a new AssignmentService with required DAOs.
     *
     * @param assignmentDAO   the DAO for assignments
     * @param submissionDAO   the DAO for submissions
     * @param studentClassDAO the DAO for student-class relationships
     */
    public AssignmentService(AssignmentDAO assignmentDAO, SubmissionDAO submissionDAO, StudentClassDAO studentClassDAO) {
        this.assignmentDAO = assignmentDAO;
        this.submissionDAO = submissionDAO;
        this.studentClassDAO = studentClassDAO;
    }

    /**
     * Creates and persists a new assignment.
     *
     * @param teacher     the teacher creating the assignment
     * @param title       the title of the assignment
     * @param description the description of the assignment
     * @param className   the name of the class the assignment is for
     * @param deadline    the submission deadline
     * @return the created assignment
     */
    public Assignment createAssignment(User teacher, String title, String description, String className, LocalDateTime deadline) {
        Assignment assignment = new Assignment();
        assignment.setTeacher(teacher);
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setClassName(className);
        assignment.setDeadline(deadline);
        Assignment savedAssignment = assignmentDAO.save(assignment);
        
        // Broadcast new assignment to the class using JSON string
        String jsonMessage = String.format("{\"type\":\"NEW_ASSIGNMENT\", \"id\":%d, \"title\":\"%s\", \"description\":\"%s\", \"course\":\"%s\", \"dueDate\":\"%s\"}", 
            savedAssignment.getId(),
            title.replace("\"", "\\\""), 
            description.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r"),
            className.replace("\"", "\\\""), 
            deadline.toString()
        );
        org.example.esubmission.websocket.AssignmentWebSocket.broadcastToClass(teacher.getId(), className, jsonMessage);
        
        return savedAssignment;
    }

    /**
     * Retrieves all assignments created by a specific teacher.
     *
     * @param teacherId the unique identifier of the teacher
     * @return a list of assignments
     */
    public List<Assignment> getTeacherAssignments(Long teacherId) {
        return assignmentDAO.findByTeacherId(teacherId);
    }

    /**
     * Retrieves an assignment by its ID.
     *
     * @param id the unique identifier of the assignment
     * @return the assignment
     */
    public Assignment getAssignment(Long id) {
        return assignmentDAO.findById(id);
    }

    /**
     * Retrieves all submissions for a specific assignment.
     *
     * @param assignmentId the unique identifier of the assignment
     * @return a list of submissions
     */
    public List<Submission> getAssignmentSubmissions(Long assignmentId) {
        return submissionDAO.findByAssignmentId(assignmentId);
    }

    /**
     * Identifies students who have not yet submitted a specific assignment.
     *
     * @param assignmentId the unique identifier of the assignment
     * @param className    the name of the class
     * @param teacherId    the ID of the teacher
     * @return a list of students who are missing a submission
     */
    public List<User> getMissingStudents(Long assignmentId, String className, Long teacherId) {
        List<User> allStudents = studentClassDAO.findStudentsByTeacherAndClass(teacherId, className);
        List<Submission> submissions = submissionDAO.findByAssignmentId(assignmentId);
        
        allStudents.removeIf(student -> 
            submissions.stream().anyMatch(sub -> sub.getStudent().getId().equals(student.getId()))
        );
        
        return allStudents;
    }
}
