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
import java.util.stream.Collectors;

/**
 * Servlet responsible for displaying student grades and statistics.
 * <p>
 * This servlet retrieves all submissions for the logged-in student,
 * filters for graded ones, and computes statistics such as average, 
 * highest, and lowest grades.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class GradesServlet extends HttpServlet {
    
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
     * Handles GET requests to display student grades.
     * <p>
     * Retrieves submissions, calculates statistics, and forwards to {@code grades.jsp}.
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
            List<Submission> allSubmissions = submissionDAO.findByStudentId(student.getId());
            
            // Filter only graded submissions
            List<Submission> gradedSubmissions = allSubmissions.stream()
                .filter(s -> s.getGrade() != null)
                .collect(Collectors.toList());
            
            // Calculate statistics
            double averageGrade = gradedSubmissions.stream()
                .mapToInt(Submission::getGrade)
                .average()
                .orElse(0.0);
            
            int highestGrade = gradedSubmissions.stream()
                .mapToInt(Submission::getGrade)
                .max()
                .orElse(0);
            
            int lowestGrade = gradedSubmissions.stream()
                .mapToInt(Submission::getGrade)
                .min()
                .orElse(0);
            
            request.setAttribute("allSubmissions", allSubmissions);
            request.setAttribute("gradedSubmissions", gradedSubmissions);
            request.setAttribute("averageGrade", averageGrade);
            request.setAttribute("highestGrade", highestGrade);
            request.setAttribute("lowestGrade", lowestGrade);
            
            request.getRequestDispatcher("/grades.jsp").forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading grades");
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
