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
import java.io.PrintWriter;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * JSON API endpoint that returns the authenticated student's assignments with their submission status.
 * <p>
 * GET /api/student/assignments
 * Returns a JSON array — each element includes all assignment fields plus a
 * {@code submission} object (or null) representing the current student's submission.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class AssignmentsApiServlet extends HttpServlet {

    private AssignmentDAO assignmentDAO;
    private SubmissionDAO submissionDAO;
    private StudentClassDAO studentClassDAO;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @Override
    public void init() throws ServletException {
        this.assignmentDAO = new AssignmentDAO();
        this.submissionDAO = new SubmissionDAO();
        this.studentClassDAO = new StudentClassDAO();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json;charset=UTF-8");
        resp.setHeader("Cache-Control", "no-cache");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Not authenticated\"}");
            return;
        }

        User student = (User) session.getAttribute("user");
        PrintWriter out = resp.getWriter();

        try {
            List<StudentClass> classes = studentClassDAO.findStudentClassesByStudent(student.getId());
            List<Assignment> allAssignments = new ArrayList<>();
            for (StudentClass sc : classes) {
                allAssignments.addAll(assignmentDAO.findByClassName(sc.getClassName()));
            }

            out.print("[");
            for (int i = 0; i < allAssignments.size(); i++) {
                Assignment a = allAssignments.get(i);
                Submission sub = submissionDAO.findByStudentAndAssignment(student.getId(), a.getId());
                out.print(toJson(a, sub));
                if (i < allAssignments.size() - 1) out.print(",");
            }
            out.print("]");

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write("{\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    private String toJson(Assignment a, Submission sub) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"id\":").append(a.getId()).append(",");
        sb.append("\"title\":\"").append(escapeJson(a.getTitle())).append("\",");
        sb.append("\"description\":\"").append(escapeJson(a.getDescription())).append("\",");
        sb.append("\"className\":\"").append(escapeJson(a.getClassName())).append("\",");
        sb.append("\"points\":").append(a.getPoints() != null ? a.getPoints() : 100).append(",");
        sb.append("\"deadline\":\"").append(a.getDeadline() != null ? a.getDeadline().format(FORMATTER) : "").append("\",");
        sb.append("\"status\":\"").append(a.getStatus()).append("\",");
        sb.append("\"googleFormUrl\":").append(a.getGoogleFormUrl() != null ? "\"" + escapeJson(a.getGoogleFormUrl()) + "\"" : "null").append(",");
        if (sub != null) {
            sb.append("\"submission\":{");
            sb.append("\"id\":").append(sub.getId()).append(",");
            sb.append("\"submittedAt\":\"").append(sub.getSubmittedAt() != null ? sub.getSubmittedAt().format(FORMATTER) : "").append("\",");
            sb.append("\"grade\":").append(sub.getGrade() != null ? sub.getGrade() : "null").append(",");
            sb.append("\"feedback\":").append(sub.getFeedback() != null ? "\"" + escapeJson(sub.getFeedback()) + "\"" : "null").append(",");
            sb.append("\"fileUrl\":").append(sub.getFileUrl() != null ? "\"" + escapeJson(sub.getFileUrl()) + "\"" : "null");
            sb.append("}");
        } else {
            sb.append("\"submission\":null");
        }
        sb.append("}");
        return sb.toString();
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
