package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Part;
import org.example.esubmission.dao.AssignmentDAO;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Servlet responsible for handling assignment submissions.
 * <p>
 * This servlet supports multi-part requests for file uploads and stores 
 * submitted files in the server's {@code uploads} directory.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
                 maxFileSize = 1024 * 1024 * 10,      // 10MB
                 maxRequestSize = 1024 * 1024 * 50)   // 50MB
public class SubmitAssignmentServlet extends HttpServlet {
    
    private AssignmentDAO assignmentDAO;
    private SubmissionDAO submissionDAO;
    private static final String UPLOAD_DIR = "uploads";

    /**
     * Initializes the servlet and ensures the upload directory exists.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.assignmentDAO = new AssignmentDAO();
        this.submissionDAO = new SubmissionDAO();
        
        // Create upload directory if it doesn't exist
        String applicationPath = getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
        File uploadDir = new File(uploadFilePath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
    }

    /**
     * Handles GET requests to display the assignment submission form.
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

        String assignmentIdStr = request.getParameter("id");
        if (assignmentIdStr == null || assignmentIdStr.isEmpty()) {
            response.sendError(400, "Assignment ID is required");
            return;
        }

        try {
            Long assignmentId = Long.parseLong(assignmentIdStr);
            Assignment assignment = assignmentDAO.findById(assignmentId);
            
            if (assignment == null) {
                response.sendError(404, "Assignment not found");
                return;
            }

            // Check if student has already submitted
            Submission existingSubmission = submissionDAO.findByStudentAndAssignment(student.getId(), assignmentId);
            if (existingSubmission != null) {
                request.setAttribute("submission", existingSubmission);
            }

            request.setAttribute("assignment", assignment);
            request.getRequestDispatcher("/submitAssignment.jsp").forward(request, response);
            
        } catch (NumberFormatException e) {
            response.sendError(400, "Invalid assignment ID");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error loading assignment");
        }
    }

    /**
     * Handles POST requests to submit an assignment.
     * <p>
     * Processes file uploads, saves them to disk, and records the submission
     * in the database.
     * </p>
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

        try {
            String assignmentIdStr = request.getParameter("assignmentId");
            String content = request.getParameter("content");
            Part filePart = request.getPart("file");

            if (assignmentIdStr == null || assignmentIdStr.isEmpty()) {
                response.sendError(400, "Assignment ID is required");
                return;
            }

            Long assignmentId = Long.parseLong(assignmentIdStr);
            Assignment assignment = assignmentDAO.findById(assignmentId);
            
            if (assignment == null) {
                response.sendError(404, "Assignment not found");
                return;
            }

            // Check if already submitted
            Submission existingSubmission = submissionDAO.findByStudentAndAssignment(student.getId(), assignmentId);
            if (existingSubmission != null) {
                request.setAttribute("error", "You have already submitted this assignment");
                request.setAttribute("assignment", assignment);
                request.setAttribute("submission", existingSubmission);
                request.getRequestDispatcher("/submitAssignment.jsp").forward(request, response);
                return;
            }

            // Handle file upload
            String fileUrl = null;
            if (filePart != null && filePart.getSize() > 0) {
                String fileName = extractFileName(filePart);
                if (fileName != null && !fileName.isEmpty()) {
                    fileUrl = saveFile(filePart, fileName);
                }
            }

            // Create submission
            Submission submission = new Submission();
            submission.setAssignment(assignment);
            submission.setStudent(student);
            submission.setContent(content);
            submission.setFileUrl(fileUrl);

            submissionDAO.save(submission);

            // Broadcast new submission to the teacher
            String jsonMessage = String.format("{\"type\":\"NEW_SUBMISSION\", \"studentName\":\"%s\", \"assignmentTitle\":\"%s\"}",
                student.getName().replace("\"", "\\\""),
                assignment.getTitle().replace("\"", "\\\"")
            );
            org.example.esubmission.websocket.AssignmentWebSocket.broadcastToUser(assignment.getTeacher().getId(), jsonMessage);

            // Redirect to dashboard with success message
            session.setAttribute("message", "Assignment submitted successfully!");
            response.sendRedirect(request.getContextPath() + "/studentDash");

        } catch (NumberFormatException e) {
            response.sendError(400, "Invalid assignment ID");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(500, "Error submitting assignment");
        }
    }

    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length() - 1);
            }
        }
        return null;
    }

    private String saveFile(Part filePart, String fileName) throws IOException {
        String applicationPath = getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
        
        // Create unique filename to avoid conflicts
        String uniqueFileName = System.currentTimeMillis() + "_" + fileName;
        Path filePath = Paths.get(uploadFilePath, uniqueFileName);
        
        try (InputStream input = filePart.getInputStream()) {
            Files.copy(input, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        
        return UPLOAD_DIR + "/" + uniqueFileName;
    }
}
