package org.example.esubmission.service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.example.esubmission.util.ConfigUtil;

import java.util.Properties;

/**
 * Service responsible for sending emails, specifically for 2FA verification.
 */
public class EmailService {

    // SMTP Configuration (Should be moved to environment variables/config file in production)
    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "587";
    private static final String SMTP_USER = ConfigUtil.getProperty("smtp.user");
    private static final String SMTP_PASS = ConfigUtil.getProperty("smtp.pass");

    /**
     * Sends a verification email with a 6-digit code.
     *
     * @param toEmail target email address
     * @param code    verification code to send
     */
    public void sendVerificationEmail(String toEmail, String code) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override 
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(SMTP_USER, SMTP_PASS);
            } 
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(SMTP_USER));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("Igishyitsi - Your Verification Code");
            
            String htmlContent = "<h1>Welcome to Igishyitsi</h1>" +
                                 "<p>Your security verification code is:</p>" +
                                 "<h2 style='color: #3b82f6; letter-spacing: 5px;'>" + code + "</h2>" +
                                 "<p>This code will expire in 10 minutes.</p>" +
                                 "<p>If you did not request this, please ignore this email.</p>";
            
            message.setContent(htmlContent, "text/html");

            Transport.send(message);
            System.out.println("Verification email sent to " + toEmail);

        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            // In a real scenario, we might want to throw a custom exception
        }
    }

    /**
     * Sends a password reset email with a link.
     *
     * @param toEmail target email address
     * @param token   reset token
     */
    public void sendPasswordResetEmail(String toEmail, String token) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(SMTP_USER, SMTP_PASS);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(SMTP_USER));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("Igishyitsi - Reset Your Password");
            
            String resetLink = "http://localhost:8080/furnitBackend/resetPassword?token=" + token;
            
            String htmlContent = "<h1>Password Reset Request</h1>" +
                                 "<p>You requested to reset your password. Click the link below to set a new password:</p>" +
                                 "<p><a href='" + resetLink + "' style='display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;'>Reset Password</a></p>" +
                                 "<p>This link will expire in 1 hour.</p>" +
                                 "<p>If you did not request this, please ignore this email.</p>";
            
            message.setContent(htmlContent, "text/html");

            Transport.send(message);
            System.out.println("Password reset email sent to " + toEmail);

        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
