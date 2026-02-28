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
import org.example.esubmission.model.User;
import org.example.esubmission.service.AssignmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Servlet responsible for rendering the teacher dashboard.
 * <p>
 * This servlet displays assignments created by the teacher and the classes
 * they are assigned to. It also handles the creation of new assignments.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class TeachersDash extends HttpServlet {

    private AssignmentService assignmentService;
    private StudentClassDAO studentClassDAO;

    /**
     * Initializes the servlet and its services.
     *
     * @throws ServletException if initialization fails
     */
    @Override
    public void init() throws ServletException {
        this.assignmentService = new AssignmentService(new AssignmentDAO(), new SubmissionDAO(), new StudentClassDAO());
        this.studentClassDAO = new StudentClassDAO();
    }

    /**
     * Handles GET requests to display the teacher dashboard.
     * <p>
     * Retrieves the teacher's assignments and classes and forwards the data
     * to {@code teacherDash.jsp}.
     * </p>
     *
     * @param req  the HttpServletRequest
     * @param resp the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("TeachersDash doGet called");
        
        HttpSession session = req.getSession(false);
        if (session == null) {
            System.out.println("No session found");
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }
        
        User teacher = (User) session.getAttribute("user");
        if (teacher == null) {
            System.out.println("No user in session");
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        System.out.println("Teacher: " + teacher.getName());

        try {
            // Get teacher's assignments
            List<Assignment> assignments = assignmentService.getTeacherAssignments(teacher.getId());
            req.setAttribute("assignments", assignments);

            // Get teacher's classes
            List<String> classes = studentClassDAO.findClassesByTeacher(teacher.getId());
            req.setAttribute("classes", classes);

            // Get Stats
            Long studentCount = studentClassDAO.countStudentsByTeacher(teacher.getId());
            Long assignmentCount = new AssignmentDAO().countByTeacherId(teacher.getId());
            Long submissionCount = new SubmissionDAO().countByTeacherId(teacher.getId());
            
            req.setAttribute("studentCount", studentCount);
            req.setAttribute("assignmentCount", assignmentCount);
            req.setAttribute("submissionCount", submissionCount);

            // Get all enrollments for the students table
            List<StudentClass> enrollments = studentClassDAO.findEnrollmentsByTeacher(teacher.getId());
            req.setAttribute("enrollments", enrollments);

            // Get recent submissions for activity feed
            List<org.example.esubmission.model.Submission> recentSubmissions = new SubmissionDAO().findAll(); // Or filter by teacher's assignments
            // In a real app we'd filter or join, but for now we'll take all to show activity
            req.setAttribute("recentSubmissions", recentSubmissions);

            // Serialize all data to JSON for frontend
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            
            Map<String, Object> realData = new HashMap<>();
            realData.put("currentUser", teacher);
            realData.put("assignments", assignments);
            realData.put("classes", classes);
            realData.put("enrollments", enrollments);
            realData.put("recentSubmissions", recentSubmissions);
            realData.put("stats", Map.of(
                "studentCount", studentCount,
                "assignmentCount", assignmentCount,
                "submissionCount", submissionCount
            ));
            
            String realDataJson = mapper.writeValueAsString(realData);
            req.setAttribute("realData", realDataJson);

            req.getRequestDispatcher("/WEB-INF/pages/teacherDash.jsp").forward(req, resp);
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(500, "Error loading dashboard: " + e.getMessage());
        }
    }

    /**
     * Handles POST requests for teacher actions, such as creating assignments.
     *
     * @param req  the HttpServletRequest
     * @param resp the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User teacher = (User) session.getAttribute("user");

        String action = req.getParameter("action");

        if ("createAssignment".equals(action)) {
            String title = req.getParameter("title");
            String description = req.getParameter("description");
            String className = req.getParameter("className");
            String deadlineStr = req.getParameter("deadline");
            String googleFormUrl = req.getParameter("googleFormUrl");
            String pointsStr = req.getParameter("points");

            try {
                Integer points = (pointsStr != null && !pointsStr.isEmpty()) ? Integer.parseInt(pointsStr) : 100;
                LocalDateTime deadline;
                // Accept both date (yyyy-MM-dd) and datetime-local (yyyy-MM-ddTHH:mm)
                if (deadlineStr.contains("T")) {
                    deadline = LocalDateTime.parse(deadlineStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                } else {
                    deadline = java.time.LocalDate.parse(deadlineStr).atTime(23, 59);
                }
                assignmentService.createAssignment(teacher, title, description, className, deadline, googleFormUrl, points);
                resp.sendRedirect(req.getContextPath() + "/teacher/dashboard");
            } catch (Exception e) {
                e.printStackTrace();
                req.setAttribute("error", "Failed to create assignment: " + e.getMessage());
                doGet(req, resp);
            }
        }
    }
}
