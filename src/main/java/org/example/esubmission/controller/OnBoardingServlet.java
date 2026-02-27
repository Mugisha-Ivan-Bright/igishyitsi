package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Servlet responsible for handling the user onboarding process.
 * <p>
 * This servlet forwards the user to the onboarding page where they can
 * complete their profile or get started with the system.
 * </p>
 *
 * @author Mugisha Ivan Bright
 */
public class OnBoardingServlet extends HttpServlet {

    /**
     * Handles POST requests for onboarding actions.
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

    /**
     * Handles GET requests to display the onboarding page.
     *
     * @param req  the HttpServletRequest
     * @param resp the HttpServletResponse
     * @throws ServletException if a servlet error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("onboarding.jsp").forward(req, resp);
    }
}
