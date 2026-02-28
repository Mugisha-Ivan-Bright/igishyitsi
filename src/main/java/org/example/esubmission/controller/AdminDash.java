package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.*;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.Submission;
import org.example.esubmission.model.StudentClass;
import org.example.esubmission.model.Subject;
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
     * Data access object for subjects.
     */
    private SubjectDAO subjectDAO;

    /**
     * Data access object for submissions.
     */
    private SubmissionDAO submissionDAO;

    /**
     * Data access object for announcements.
     */
    private AnnouncementDAO announcementDAO;

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
        this.subjectDAO = new SubjectDAO();
        this.submissionDAO = new SubmissionDAO();
        this.announcementDAO = new AnnouncementDAO();
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
            // Fetch everything once
            List<User> allUsers = userDAO.findAll();
            List<Assignment> assignments = assignmentDAO.findAll();
            List<Subject> subjects = subjectDAO.findAll();
            List<Submission> submissions = submissionDAO.findAll();
            List<org.example.esubmission.model.Announcement> announcements = announcementDAO.findAll();

            // Filter users safely
            List<User> students = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.STUDENT)
                    .collect(Collectors.toList());

            List<User> teachers = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.TEACHER)
                    .collect(Collectors.toList());

            List<User> admins = allUsers.stream()
                    .filter(u -> u.getRole() == UserRole.ADMIN)
                    .collect(Collectors.toList());

            List<String> allClasses = studentClassDAO.findAllClasses();

            // Prepare Enriched Students for Table (Projection)
            List<Map<String, Object>> enrichedStudents = students.stream().map(s -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", s.getId());
                map.put("name", s.getName());
                map.put("email", s.getEmail());
                map.put("phone", s.getPhone());
                map.put("status", "Active");
                
                List<StudentClass> studentClasses = studentClassDAO.findStudentClassesByStudent(s.getId());
                map.put("class", !studentClasses.isEmpty() ? studentClasses.get(0).getClassName() : "Unassigned");
                return map;
            }).collect(Collectors.toList());

            // Prepare Enriched Teachers for Table (Projection)
            List<Map<String, Object>> enrichedTeachers = teachers.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", t.getId());
                map.put("name", t.getName());
                map.put("email", t.getEmail());
                
                List<String> teacherClasses = studentClassDAO.findClassesByTeacher(t.getId());
                map.put("department", teacherClasses.isEmpty() ? "General" : teacherClasses.get(0).split(" ")[0]);
                map.put("subjects", String.join(", ", teacherClasses));
                return map;
            }).collect(Collectors.toList());

            // Prepare Safe Projections for other entities
            List<Map<String, Object>> safeSubjects = subjects.stream().map(sub -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", sub.getId());
                map.put("code", sub.getCode());
                map.put("name", sub.getName());
                map.put("department", sub.getDepartment());
                map.put("credits", sub.getCredits());
                if (sub.getTeacher() != null) {
                    Map<String, Object> t = new HashMap<>();
                    t.put("id", sub.getTeacher().getId());
                    t.put("name", sub.getTeacher().getName());
                    map.put("teacher", t);
                }
                return map;
            }).collect(Collectors.toList());

            List<Map<String, Object>> safeAnnouncements = announcements.stream().map(ann -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", ann.getId());
                map.put("title", ann.getTitle());
                map.put("content", ann.getContent());
                map.put("createdAt", ann.getCreatedAt());
                map.put("audience", ann.getAudience());
                map.put("priority", ann.getPriority());
                if (ann.getAuthor() != null) {
                    Map<String, Object> a = new HashMap<>();
                    a.put("id", ann.getAuthor().getId());
                    a.put("name", ann.getAuthor().getName());
                    map.put("author", a);
                }
                return map;
            }).collect(Collectors.toList());

            List<Map<String, Object>> safeAssignments = assignments.stream().limit(100).map(asn -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", asn.getId());
                map.put("title", asn.getTitle());
                map.put("description", asn.getDescription());
                map.put("className", asn.getClassName());
                map.put("deadline", asn.getDeadline());
                map.put("points", asn.getPoints());
                map.put("status", asn.getStatus());
                if (asn.getTeacher() != null) {
                    Map<String, Object> t = new HashMap<>();
                    t.put("id", asn.getTeacher().getId());
                    t.put("name", asn.getTeacher().getName());
                    map.put("teacher", t);
                }
                return map;
            }).collect(Collectors.toList());

            // Prepare Activity Logs (Safe Projection)
            List<Map<String, Object>> activityLogs = new java.util.ArrayList<>();
            submissions.stream().limit(10).forEach(sub -> {
                if (sub != null && sub.getStudent() != null && sub.getAssignment() != null) {
                    Map<String, Object> log = new HashMap<>();
                    log.put("action", "Assignment Submission");
                    log.put("user", sub.getStudent().getName());
                    log.put("time", sub.getSubmittedAt() != null ? sub.getSubmittedAt().toString() : "");
                    log.put("details", "Submitted " + sub.getAssignment().getTitle());
                    activityLogs.add(log);
                }
            });
            assignments.stream().limit(5).forEach(asn -> {
                if (asn != null && asn.getTeacher() != null) {
                    Map<String, Object> log = new HashMap<>();
                    log.put("action", "New Assignment Created");
                    log.put("user", asn.getTeacher().getName());
                    log.put("time", asn.getCreatedAt() != null ? asn.getCreatedAt().toString() : "");
                    log.put("details", "Created " + asn.getTitle());
                    activityLogs.add(log);
                }
            });

            // Projection for Users (SECURITY: Exclude passwords)
            List<Map<String, Object>> safeUsers = allUsers.stream().map(u -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", u.getId());
                map.put("name", u.getName());
                map.put("email", u.getEmail());
                map.put("role", u.getRole());
                map.put("phone", u.getPhone());
                return map;
            }).collect(Collectors.toList());

            Map<String, Integer> stats = new HashMap<>();
            stats.put("students", students.size());
            stats.put("teachers", teachers.size());
            stats.put("classes", allClasses.size());
            stats.put("assignments", assignments.size());
            stats.put("subjects", subjects.size());

            // Serialize Projections only
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
            
            Map<String, Object> realData = new HashMap<>();
            User currentUser = (User) request.getSession().getAttribute("user");
            if (currentUser != null) {
                Map<String, Object> safeCurrent = new HashMap<>();
                safeCurrent.put("id", currentUser.getId());
                safeCurrent.put("name", currentUser.getName());
                safeCurrent.put("role", currentUser.getRole());
                realData.put("currentUser", safeCurrent);
            }

            realData.put("users", safeUsers);
            realData.put("students", enrichedStudents);
            realData.put("teachers", enrichedTeachers);
            realData.put("subjects", safeSubjects);
            realData.put("assignments", safeAssignments);
            realData.put("classes", allClasses);
            realData.put("logs", activityLogs);
            realData.put("stats", stats);
            realData.put("announcements", safeAnnouncements);

            String realDataJson = mapper.writeValueAsString(realData);
            request.setAttribute("realData", realDataJson);
            request.setAttribute("stats", stats);
            request.setAttribute("students", enrichedStudents);
            request.setAttribute("teachers", enrichedTeachers);
            request.setAttribute("subjects", subjects);

            request.getRequestDispatcher("/WEB-INF/pages/schoolAdmin.jsp").forward(request, response);
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
