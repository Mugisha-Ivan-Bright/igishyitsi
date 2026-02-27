package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.StudentClassDAO;
import org.example.esubmission.model.StudentClass;

import java.io.IOException;

/**
 * Servlet responsible for managing classes within the system.
 * <p>
 * Currently handles requests related to class operations, primarily
 * through redirection to the admin dashboard for student-class allocation.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class ManageClassesServlet extends HttpServlet {

    private StudentClassDAO studentClassDAO;

    /**
     * Initializes the servlet and its DAO.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.studentClassDAO = new StudentClassDAO();
    }

    /**
     * Handles POST requests for class management actions.
     * <p>
     * Validates actions such as class creation and redirects as appropriate.
     * </p>
     *
     * @param req  the HttpServletRequest
     * @param resp the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        
        if ("create".equals(action)) {
            String className = req.getParameter("name");
            
            if (className != null && !className.trim().isEmpty()) {
                // Class creation is handled through StudentClass allocation
                // For now, just redirect back
                resp.sendRedirect(req.getContextPath() + "/admin/dashboard");
            } else {
                resp.sendRedirect(req.getContextPath() + "/admin/dashboard?error=invalid_class_name");
            }
        }
    }
}
