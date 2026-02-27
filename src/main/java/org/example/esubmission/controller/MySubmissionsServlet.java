package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;

import java.io.IOException;
import java.util.List;

/**
 * Servlet responsible for displaying a student's own submissions.
 * <p>
 * This servlet retrieves all assignments submitted by the logged-in student
 * and forwards the data to {@code mySubmissions.jsp}.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class MySubmissionsServlet extends HttpServlet {
    
    private SubmissionDAO submissionDAO;

    /**
     * Initializes the servlet and its DAO.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.submissionDAO = new SubmissionDAO();
    }

    /**
     * Handles GET requests to display the student's submissions.
     * <p>
     * Retrieves submissions from the database and forwards to {@code mySubmissions.jsp}.
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
        
        HttpSession session = request.getSession();
        User student = (User) session.getAttribute("user");

        if (student == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        try {
            List<Submission> submissions = submissionDAO.findByStudentId(student.getId());
            request.setAttribute("submissions", submissions);
            request.getRequestDispatcher("/mySubmissions.jsp").forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading submissions");
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doGet(request, response);
    }
}
