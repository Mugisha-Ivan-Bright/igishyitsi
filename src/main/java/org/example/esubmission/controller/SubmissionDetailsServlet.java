package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Servlet responsible for displaying and managing submission details.
 * <p>
 * This servlet allows students and teachers to view submission information
 * and download submitted files from the server's storage.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class SubmissionDetailsServlet extends HttpServlet {
    
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
     * Handles GET requests to view submission details.
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

        String submissionIdStr = request.getParameter("id");
        if (submissionIdStr == null || submissionIdStr.isEmpty()) {
            response.sendError(400, "Submission ID is required");
            return;
        }

        try {
            Long submissionId = Long.parseLong(submissionIdStr);
            Submission submission = submissionDAO.findById(submissionId);
            
            if (submission == null) {
                response.sendError(404, "Submission not found");
                return;
            }

            // Check if the submission belongs to the current student
            if (!submission.getStudent().getId().equals(student.getId())) {
                response.sendError(403, "Access denied");
                return;
            }

            request.setAttribute("submission", submission);
            request.getRequestDispatcher("/submissionDetails.jsp").forward(request, response);
            
        } catch (NumberFormatException e) {
            response.sendError(400, "Invalid submission ID");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading submission details");
        }
    }

    /**
     * Handles POST requests for submission management (e.g., file downloads).
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        User student = (User) session.getAttribute("user");

        if (student == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String action = request.getParameter("action");
        String submissionIdStr = request.getParameter("submissionId");

        if ("download".equals(action)) {
            try {
                Long submissionId = Long.parseLong(submissionIdStr);
                Submission submission = submissionDAO.findById(submissionId);
                
                if (submission == null || !submission.getStudent().getId().equals(student.getId())) {
                    response.sendError(404, "Submission not found");
                    return;
                }

                String fileUrl = submission.getFileUrl();
                if (fileUrl == null || fileUrl.isEmpty()) {
                    response.sendError(404, "No file attached");
                    return;
                }

                // Get file path
                String applicationPath = getServletContext().getRealPath("");
                Path filePath = Paths.get(applicationPath, fileUrl);
                
                if (!Files.exists(filePath)) {
                    response.sendError(404, "File not found");
                    return;
                }

                // Set response headers for file download
                String fileName = filePath.getFileName().toString();
                response.setContentType("application/octet-stream");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
                response.setContentLength((int) Files.size(filePath));

                // Write file to response
                try (OutputStream out = response.getOutputStream()) {
                    Files.copy(filePath, out);
                }

            } catch (NumberFormatException e) {
                response.sendError(400, "Invalid submission ID");
            } catch (Exception e) {
                e.printStackTrace();
                response.sendError(500, "Error downloading file");
            }
        } else {
            response.sendError(400, "Invalid action");
        }
    }
}
