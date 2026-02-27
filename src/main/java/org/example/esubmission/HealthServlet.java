package org.example.esubmission;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.annotation.WebServlet;

/**
 * Health check servlet for Render deployment monitoring
 */
@WebServlet(name = "healthServlet", value = "/health")
public class HealthServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        
        PrintWriter out = response.getWriter();
        out.println("{\"status\":\"healthy\",\"service\":\"furnit-backend\",\"timestamp\":" + System.currentTimeMillis() + "}");
    }
}
