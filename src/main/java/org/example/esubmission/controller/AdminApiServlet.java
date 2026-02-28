package org.example.esubmission.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.AssignmentDAO;
import org.example.esubmission.dao.SubjectDAO;
import org.example.esubmission.dao.UserDAO;
import org.example.esubmission.dao.AnnouncementDAO;
import org.example.esubmission.model.Assignment;
import org.example.esubmission.model.Subject;
import org.example.esubmission.model.User;
import org.example.esubmission.model.Announcement;
import org.example.esubmission.util.PasswordUtils;
import org.example.esubmission.util.UserRole;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * API Servlet for Admin Dashboard operations.
 */
public class AdminApiServlet extends HttpServlet {

    private UserDAO userDAO;
    private SubjectDAO subjectDAO;
    private AssignmentDAO assignmentDAO;
    private AnnouncementDAO announcementDAO;
    private ObjectMapper objectMapper;

    @Override
    public void init() throws ServletException {
        this.userDAO = new UserDAO();
        this.subjectDAO = new SubjectDAO();
        this.assignmentDAO = new AssignmentDAO();
        this.announcementDAO = new AnnouncementDAO();
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String action = request.getParameter("action");
        response.setContentType("application/json");

        try {
            if ("updateRole".equals(action)) {
                handleUpdateRole(request, response);
                return;
            }

            if (pathInfo == null || pathInfo.equals("/")) {
                sendError(response, "Invalid path or action");
                return;
            }

            if (pathInfo.equals("/users")) {
                handleSaveUser(request, response);
            } else if (pathInfo.equals("/subjects")) {
                handleSaveSubject(request, response);
            } else if (pathInfo.equals("/announcements")) {
                handleSaveAnnouncement(request, response);
            } else {
                sendError(response, "Endpoint not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendError(response, "Server error: " + e.getMessage());
        }
    }

    private void handleUpdateRole(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String userIdStr = request.getParameter("userId");
        String roleStr = request.getParameter("role");

        if (userIdStr == null || roleStr == null) {
            sendError(response, "Missing userId or role");
            return;
        }

        try {
            Long userId = Long.parseLong(userIdStr);
            UserRole role = UserRole.valueOf(roleStr);
            User user = userDAO.findById(userId);
            
            if (user == null) {
                sendError(response, "User not found");
                return;
            }

            user.setRole(role);
            userDAO.save(user);
            sendSuccess(response, "Role updated to " + role);
        } catch (IllegalArgumentException e) {
            sendError(response, "Invalid role value");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        response.setContentType("application/json");

        try {
            if (pathInfo == null) {
                sendError(response, "Invalid path");
                return;
            }

            String idStr = request.getParameter("id");
            if (idStr == null) {
                sendError(response, "ID missing");
                return;
            }
            Long id = Long.parseLong(idStr);

            if (pathInfo.equals("/users")) {
                // Should probably check if deleting self
                // For MVP, just delete
                // userDAO.delete(id); // Need to add delete to UserDAO if not present
                sendError(response, "Delete not implemented yet for security");
            } else if (pathInfo.equals("/subjects")) {
                subjectDAO.delete(id);
                sendSuccess(response, "Subject deleted");
            } else if (pathInfo.equals("/announcements")) {
                announcementDAO.delete(id);
                sendSuccess(response, "Announcement deleted");
            } else {
                sendError(response, "Endpoint not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendError(response, "Server error: " + e.getMessage());
        }
    }

    private void handleSaveUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        User userRequest = objectMapper.readValue(request.getInputStream(), User.class);
        
        if (userRequest.getEmail() == null || userRequest.getName() == null) {
            sendError(response, "Missing required fields");
            return;
        }

        User existing = userDAO.findByEmail(userRequest.getEmail());
        if (userRequest.getId() == null && existing != null) {
            sendError(response, "User with this email already exists");
            return;
        }

        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            userRequest.setPassword(PasswordUtils.hashPassword(userRequest.getPassword()));
        } else if (userRequest.getId() != null) {
            // Keep old password
            User old = userDAO.findById(userRequest.getId());
            userRequest.setPassword(old.getPassword());
        } else {
            // Default password for new users
            userRequest.setPassword(PasswordUtils.hashPassword("Default123!"));
        }

        userDAO.save(userRequest);
        sendSuccess(response, "User saved successfully");
    }

    private void handleSaveSubject(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String, Object> data = objectMapper.readValue(request.getInputStream(), new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        
        Subject subject = new Subject();
        if (data.get("id") != null) subject.setId(Long.parseLong(data.get("id").toString()));
        subject.setCode((String) data.get("code"));
        subject.setName((String) data.get("name"));
        subject.setDepartment((String) data.get("dept"));
        if (data.get("credits") != null) subject.setCredits(Integer.parseInt(data.get("credits").toString()));
        
        if (data.get("teacherId") != null && !data.get("teacherId").toString().isEmpty()) {
            Long teacherId = Long.parseLong(data.get("teacherId").toString());
            User teacher = userDAO.findById(teacherId);
            subject.setTeacher(teacher);
        }
        
        subjectDAO.save(subject);
        sendSuccess(response, "Subject saved successfully");
    }

    private void handleSaveAnnouncement(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Announcement announcement = objectMapper.readValue(request.getInputStream(), Announcement.class);
        User currentAdmin = (User) request.getSession().getAttribute("user");
        announcement.setAuthor(currentAdmin);
        Announcement saved = announcementDAO.save(announcement);
        
        // Broadcast to all
        String jsonMessage = String.format("{\"type\":\"NEW_ANNOUNCEMENT\", \"id\":%d, \"title\":\"%s\", \"content\":\"%s\", \"priority\":\"%s\"}",
            saved.getId(),
            saved.getTitle().replace("\"", "\\\""),
            saved.getContent().replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r"),
            saved.getPriority()
        );
        org.example.esubmission.websocket.AssignmentWebSocket.broadcastToAll(jsonMessage);
        
        sendSuccess(response, "Announcement posted successfully");
    }

    private void sendSuccess(HttpServletResponse response, String message) throws IOException {
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", message);
        objectMapper.writeValue(response.getWriter(), res);
    }

    private void sendError(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        Map<String, Object> res = new HashMap<>();
        res.put("success", false);
        res.put("message", message);
        objectMapper.writeValue(response.getWriter(), res);
    }
}
