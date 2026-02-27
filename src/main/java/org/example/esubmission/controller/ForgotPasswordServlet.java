package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.esubmission.dao.UserDAO;
import org.example.esubmission.service.EmailService;
import org.example.esubmission.service.UserService;

import java.io.IOException;

public class ForgotPasswordServlet extends HttpServlet {
    private UserService userService;
    private EmailService emailService;

    @Override
    public void init() throws ServletException {
        this.userService = new UserService(new UserDAO());
        this.emailService = new EmailService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/pages/forgotPassword.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");

        if (email == null || email.trim().isEmpty()) {
            request.setAttribute("error", "Email is required");
            request.getRequestDispatcher("/WEB-INF/pages/forgotPassword.jsp").forward(request, response);
            return;
        }

        try {
            String token = userService.initiatePasswordReset(email.trim());
            emailService.sendPasswordResetEmail(email.trim(), token);
            request.setAttribute("success", "Password reset link sent! Please check your email.");
            request.getRequestDispatcher("/WEB-INF/pages/forgotPassword.jsp").forward(request, response);
        } catch (Exception e) {
            // We don't want to reveal if email exists or not for security, 
            // but for this project we'll show the error if it's explicitly about user not found
            request.setAttribute("success", "If an account exists with this email, a reset link will be sent.");
            request.getRequestDispatcher("/WEB-INF/pages/forgotPassword.jsp").forward(request, response);
        }
    }
}
