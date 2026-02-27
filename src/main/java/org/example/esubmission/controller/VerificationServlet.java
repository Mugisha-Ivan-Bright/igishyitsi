package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.esubmission.dao.UserDAO;
import org.example.esubmission.model.User;
import org.example.esubmission.service.UserService;

import java.io.IOException;

/**
 * Servlet that handles 2FA verification code submission.
 */
public class VerificationServlet extends HttpServlet {

    private UserService userService;

    @Override
    public void init() throws ServletException {
        this.userService = new UserService(new UserDAO());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("pendingUser");

        if (user == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        request.getRequestDispatcher("/WEB-INF/pages/verify.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String code = request.getParameter("code");
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("pendingUser");

        if (user == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        if (code == null || code.trim().length() != 6) {
            request.setAttribute("error", "Please enter a valid 6-digit code.");
            request.getRequestDispatcher("/WEB-INF/pages/verify.jsp").forward(request, response);
            return;
        }

        if (userService.verifyCode(user.getEmail(), code.trim())) {
            // Success! Complete login
            session.removeAttribute("pendingUser");
            LoginServlet.completeLogin(user, request, response);
        } else {
            request.setAttribute("error", "Invalid or expired verification code.");
            request.getRequestDispatcher("/WEB-INF/pages/verify.jsp").forward(request, response);
        }
    }
}
