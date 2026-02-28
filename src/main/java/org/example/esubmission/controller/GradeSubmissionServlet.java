package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.SubmissionDAO;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.User;
import org.example.esubmission.util.UserRole;

import java.io.IOException;

/**
 * Servlet for handling assignment grading by teachers.
 */
@WebServlet("/teacher/grade")
public class GradeSubmissionServlet extends HttpServlet {

    private SubmissionDAO submissionDAO;

    @Override
    public void init() throws ServletException {
        this.submissionDAO = new SubmissionDAO();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        User user = (User) request.getSession().getAttribute("user");
        if (user == null || user.getRole() != UserRole.TEACHER) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Only teachers can grade assignments.");
            return;
        }

        String submissionIdStr = request.getParameter("submissionId");
        String gradeStr = request.getParameter("grade");

        if (submissionIdStr == null || gradeStr == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameters.");
            return;
        }

        try {
            Long submissionId = Long.parseLong(submissionIdStr);
            int grade = Integer.parseInt(gradeStr);

            Submission submission = submissionDAO.findById(submissionId);
            if (submission == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Submission not found.");
                return;
            }

            // Verify teacher owns this assignment
            if (!submission.getAssignment().getTeacher().getId().equals(user.getId())) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "You can only grade your own assignments.");
                return;
            }

            submission.setGrade(grade);
            submissionDAO.save(submission);

            response.setContentType("application/json");
            response.getWriter().write("{\"success\": true, \"message\": \"Grade published successfully\"}");

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid format.");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error saving grade.");
        }
    }
}
