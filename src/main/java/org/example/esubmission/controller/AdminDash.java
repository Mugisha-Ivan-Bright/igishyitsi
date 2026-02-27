package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.AssignmentDAO;
import org.example.esubmission.dao.StudentClassDAO;
import org.example.esubmission.dao.UserDAO;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.User;
import org.example.esubmission.util.UserRole;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Servlet responsible for rendering the admin dashboard.
 * <p>
 * This servlet collects statistics about users, classes, and assignments
 * and forwards the data to {@code schoolAdmin.jsp} for display.
 * </p>
 *
 * Handles both GET and POST requests. POST requests are redirected to GET.
 *
 * @author Mugisha Ivan Bright
 */
public class AdminDash extends HttpServlet {

    /**
     * Data access object for users.
     */
    private UserDAO userDAO;

    /**
     * Data access object for student classes.
     */
    private StudentClassDAO studentClassDAO;

    /**
     * Data access object for assignments.
     */
    private AssignmentDAO assignmentDAO;

    /**
     * Initializes the servlet and DAO instances.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.userDAO = new UserDAO();
        this.studentClassDAO = new StudentClassDAO();
        this.assignmentDAO = new AssignmentDAO();
    }

    /**
     * Handles GET requests to the admin dashboard.
     * <p>
     * Retrieves all users, separates them by role, collects assignments and classes,
     * computes statistics, sets attributes for JSP, and forwards the request.
     * </p>
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            List<User> allUsers = userDAO.findAll();

            List<User> students = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.STUDENT)
                    .collect(Collectors.toList());

            List<User> teachers = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.TEACHER)
                    .collect(Collectors.toList());

            List<User> admins = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.ADMIN)
                    .collect(Collectors.toList());

            List<Assignment> assignments = assignmentDAO.findAll();

            List<String> classes = studentClassDAO.findAllClasses();

            Map<String, Integer> stats = new HashMap<>();
            stats.put("students", students.size());
            stats.put("teachers", teachers.size());
            stats.put("classes", classes.size());
            stats.put("assignments", assignments.size());

            request.setAttribute("stats", stats);
            request.setAttribute("students", students);
            request.setAttribute("teachers", teachers);
            request.setAttribute("classes", classes);
            request.setAttribute("assignments", assignments);

            request.getRequestDispatcher("/WEB-INF/pages/schoolAdmin.jsp")
                    .forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading admin dashboard");
        }
    }

    /**
     * Handles POST requests by redirecting to {@link #doGet(HttpServletRequest, HttpServletResponse)}.
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
