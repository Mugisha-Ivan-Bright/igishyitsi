package org.example.esubmission.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * Servlet that generates a simple image CAPTCHA.
 * The generated code is stored in the user's session under the key "captcha".
 */
public class CaptchaServlet extends HttpServlet {

    private static final String ALPHA_NUMERIC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int WIDTH = 150;
    private static final int HEIGHT = 50;
    private static final int CODE_LENGTH = 5;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Generate random code
        String captchaCode = generateCaptchaCode();
        
        // Store in session
        HttpSession session = request.getSession();
        session.setAttribute("captcha", captchaCode);
        
        // Create image
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = image.createGraphics();
        
        // Background
        g2.setColor(Color.WHITE);
        g2.fillRect(0, 0, WIDTH, HEIGHT);
        
        // Anti-aliasing
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        
        // Add noise (lines)
        Random random = new Random();
        g2.setColor(Color.LIGHT_GRAY);
        for (int i = 0; i < 10; i++) {
            int x1 = random.nextInt(WIDTH);
            int y1 = random.nextInt(HEIGHT);
            int x2 = random.nextInt(WIDTH);
            int y2 = random.nextInt(HEIGHT);
            g2.drawLine(x1, y1, x2, y2);
        }
        
        // Draw text
        g2.setFont(new Font("Arial", Font.BOLD, 30));
        FontMetrics fm = g2.getFontMetrics();
        int x = (WIDTH - fm.stringWidth(captchaCode)) / 2;
        int y = (HEIGHT - fm.getHeight()) / 2 + fm.getAscent();
        
        for (int i = 0; i < captchaCode.length(); i++) {
            g2.setColor(new Color(random.nextInt(150), random.nextInt(150), random.nextInt(150)));
            g2.drawString(String.valueOf(captchaCode.charAt(i)), x + (i * 25), y + (random.nextInt(10) - 5));
        }
        
        g2.dispose();
        
        // Output image
        response.setContentType("image/jpeg");
        try (OutputStream out = response.getOutputStream()) {
            ImageIO.write(image, "jpg", out);
        }
    }

    private String generateCaptchaCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHA_NUMERIC.charAt(random.nextInt(ALPHA_NUMERIC.length())));
        }
        return sb.toString();
    }
}
