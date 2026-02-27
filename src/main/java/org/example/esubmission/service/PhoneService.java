package org.example.esubmission.service;

/**
 * Service for sending SMS verification codes.
 * placeholder implementation for future SMS provider integration (e.g., Twilio).
 */
public class PhoneService {

    /**
     * Mocks the sending of a verification SMS.
     *
     * @param phoneNumber target phone number
     * @param code        verification code
     */
    public void sendVerificationSMS(String phoneNumber, String code) {
        // In a real implementation, you would use an SMS API here.
        System.out.println("[SMS MOCK] Sending verification code " + code + " to " + phoneNumber);
    }
}
