package org.example.esubmission;

import java.io.*;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

/**
 * A simple servlet that returns a "Hello World!" message.
 * <p>
 * Used primarily for testing basic servlet functionality.
 * </p>
 */
@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    /**
     * Initializes the servlet with a default message.
     */
    public void init() {
        message = "Hello World!";
    }

    /**
     * Handles GET requests by returning an HTML "Hello World!" message.
     *
     * @param request  the HttpServletRequest
     * @param response the HttpServletResponse
     * @throws IOException if an I/O error occurs
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        // Hello
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + message + "</h1>");
        out.println("</body></html>");
    }

    /**
     * Cleanup resources when the servlet is destroyed.
     */
    public void destroy() {
    }
}