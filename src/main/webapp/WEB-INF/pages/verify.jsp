<%@ page contentType="text/html; charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Identity - Igishyitsi</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/toast.css">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', sans-serif;
                background: #3a3f47;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .container {
                width: 100%;
                max-width: 450px;
                background: #2d3339;
                backdrop-filter: blur(20px);
                border-radius: 24px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.08);
                text-align: center;
            }

            h1 {
                color: #f7fafc;
                font-size: 24px;
                margin-bottom: 15px;
            }

            p {
                color: #a0aec0;
                font-size: 14px;
                margin-bottom: 30px;
                line-height: 1.5;
            }

            .code-inputs {
                display: flex;
                gap: 12px;
                justify-content: center;
                margin-bottom: 30px;
            }

            .code-inputs input {
                width: 50px;
                height: 60px;
                background: rgba(26, 32, 44, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                text-align: center;
                font-size: 24px;
                font-weight: 700;
                color: #3b82f6;
                transition: all 0.3s;
            }

            .code-inputs input:focus {
                outline: none;
                border-color: #3b82f6;
                background: rgba(26, 32, 44, 1);
                box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
            }

            .submit {
                width: 100%;
                height: 48px;
                background: #3b82f6;
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }

            .submit:hover {
                background: #2563eb;
                transform: translateY(-2px);
            }

            .resend {
                margin-top: 20px;
                font-size: 13px;
                color: #718096;
            }

            .resend a {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="branding"
                style="font-weight: 700; color: #3b82f6; margin-bottom: 20px; font-size: 1.2rem; letter-spacing: 2px;">
                IGISHYITSI</div>
            <h1>Verify Your Account</h1>
            <p>We've sent a 6-digit verification code to your email. Please enter it below to complete your login.</p>

            <form action="${pageContext.request.contextPath}/verify" method="POST">
                <div class="code-inputs" id="otp-inputs">
                    <input type="text" maxlength="1" pattern="\d*" required>
                    <input type="text" maxlength="1" pattern="\d*" required>
                    <input type="text" maxlength="1" pattern="\d*" required>
                    <input type="text" maxlength="1" pattern="\d*" required>
                    <input type="text" maxlength="1" pattern="\d*" required>
                    <input type="text" maxlength="1" pattern="\d*" required>
                </div>
                <input type="hidden" name="code" id="finalCode">
                <button type="submit" class="submit">Verify & Continue</button>
            </form>

            <div class="resend">
                Didn't receive the code? <a href="#" onclick="resendCode()">Resend Code</a>
            </div>
        </div>

        <script src="${pageContext.request.contextPath}/js/toast.js"></script>
        <script>
            const inputs = document.querySelectorAll('#otp-inputs input');
            const finalCodeInput = document.getElementById('finalCode');

            inputs.forEach((input, index) => {
                input.addEventListener('input', (e) => {
                    if (e.target.value.length > 1) {
                        e.target.value = e.target.value.slice(0, 1);
                    }
                    if (e.target.value && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                    updateFinalCode();
                });

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        inputs[index - 1].focus();
                    }
                });
            });

            function updateFinalCode() {
                let code = "";
                inputs.forEach(input => code += input.value);
                finalCodeInput.value = code;
            }

            function resendCode() {
                showMessage('info', 'Code resending feature coming soon!');
            }

            document.addEventListener('DOMContentLoaded', function () {
                const errorMsg = "${error}";
                if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
                    showMessage('error', errorMsg);
                }
            });
        </script>
    </body>

    </html>