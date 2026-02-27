package org.example.esubmission.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter responsible for setting the character encoding for requests and responses.
 * <p>
 * Ensures that all data is processed using {@code UTF-8} encoding to prevent
 * character corruption, especially for non-ASCII characters.
 * </p>
 */
public class CharacterEncodingFilter implements Filter {

    /**
     * Sets the request and response character encoding to UTF-8.
     *
     * @param request  the ServletRequest
     * @param response the ServletResponse
     * @param chain    the FilterChain
     * @throws IOException      if an I/O error occurs
     * @throws ServletException if a servlet error occurs
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);
    }
}
