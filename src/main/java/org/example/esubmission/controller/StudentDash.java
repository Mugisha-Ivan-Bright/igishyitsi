package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.esubmission.dao.AssignmentDAO;
import org.example.esubmission.dao.StudentClassDAO;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.StudentClass;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Servlet responsible for rendering the student dashboard.
 * <p>
 * This servlet collects assignments for the classes the student is enrolled in,
 * retrieves submission status, computes statistics, and forwards the data
 * to {@code studentDash.jsp}.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class StudentDash extends HttpServlet {
    
    private AssignmentDAO assignmentDAO;
    private SubmissionDAO submissionDAO;
    private StudentClassDAO studentClassDAO;

    /**
     * Initializes the servlet and its DAOs.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.assignmentDAO = new AssignmentDAO();
        this.submissionDAO = new SubmissionDAO();
        this.studentClassDAO = new StudentClassDAO();
    }

    /**
     * Handles GET requests to display the student dashboard.
     * <p>
     * Retrieves student classes, assignments, and submissions, calculates stats,
     * and forwards to the dashboard page.
     * </p>
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User student = (User) session.getAttribute("user");

        if (student == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        try {
            Long studentId = student.getId();
            List<StudentClass> studentClasses = studentClassDAO.findStudentClassesByStudent(studentId);
            
            List<Assignment> allAssignments = new ArrayList<>();
            for (StudentClass sc : studentClasses) {
                allAssignments.addAll(assignmentDAO.findByClassName(sc.getClassName()));
            }
            
            List<Submission> submissions = submissionDAO.findByStudentId(studentId);
            
            int totalAssignments = allAssignments.size();
            int submitted = submissions.size();
            int pending = 0;
            
            // Calculate pending
            for (Assignment a : allAssignments) {
                boolean isSubmitted = false;
                for (Submission s : submissions) {
                    if (s.getAssignment().getId().equals(a.getId())) {
                        isSubmitted = true;
                        break;
                    }
                }
                if (!isSubmitted) {
                    pending++;
                }
            }
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalCourses", studentClasses.size());
            stats.put("totalAssignments", totalAssignments);
            stats.put("submittedAssignments", submitted);
            stats.put("pendingAssignments", pending);
            
            request.setAttribute("stats", stats);
            request.setAttribute("assignments", allAssignments);
            request.setAttribute("recentSubmissions", submissions);
            request.setAttribute("enrolledClasses", studentClasses);
            
            request.getRequestDispatcher("/WEB-INF/pages/studentDash.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading student dashboard");
        }
    }

    /**
     * Handles POST requests by delegating to {@link #doGet(HttpServletRequest, HttpServletResponse)}.
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
