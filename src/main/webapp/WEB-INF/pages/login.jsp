<%@ page contentType="text/html; charset=UTF-8" language="java" %>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in - Igishyitsi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/toast.css">
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #3a3f47;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
    }

    .container {
      display: flex;
      width: 100%;
      max-width: 1100px;
      height: 600px;
      background: #2d3339;
      backdrop-filter: blur(20px);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    /* Window Controls */
    .window-controls {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .window-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }

    .window-dot:nth-child(1) {
      background: rgba(255, 95, 86, 0.8);
    }

    .window-dot:nth-child(2) {
      background: rgba(255, 189, 46, 0.8);
    }

    .window-dot:nth-child(3) {
      background: rgba(39, 201, 63, 0.8);
    }

    /* Left Side - Form */
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px 50px;
      background: #3d4349;
      position: relative;
    }

    .form {
      width: 100%;
      max-width: 380px;
    }

    .signin-title {
      font-size: 28px;
      font-weight: 600;
      color: #f7fafc;
      margin-bottom: 40px;
      letter-spacing: -0.5px;
    }

    .form-control {
      margin-bottom: 24px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #a0aec0;
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }

    .password-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .forgot-password {
      font-size: 12px;
      color: #718096;
      text-decoration: none;
      transition: color 0.2s;
    }

    .forgot-password:hover {
      color: #a0aec0;
    }

    .input-wrapper {
      position: relative;
    }

    input {
      width: 100%;
      height: 48px;
      background: rgba(26, 32, 44, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0 16px;
      font-size: 14px;
      color: #e2e8f0;
      transition: all 0.3s;
      font-family: 'Inter', sans-serif;
    }

    input::placeholder {
      color: #4a5568;
    }

    input:focus {
      outline: none;
      border-color: rgba(99, 179, 237, 0.5);
      background: rgba(26, 32, 44, 0.95);
    }

    .password-input {
      padding-right: 45px;
    }

    .toggle-password {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
    }

    .toggle-password:hover {
      opacity: 0.7;
    }

    .toggle-password svg {
      width: 20px;
      height: 20px;
      fill: #718096;
    }

    .submit {
      width: 100%;
      height: 48px;
      background: #8b9cb6;
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 8px;
      letter-spacing: 0.3px;
    }

    .submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 156, 182, 0.4);
      background: #9aadc4;
    }

    .submit:active {
      transform: translateY(0);
    }

    .signup-link {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 13px;
      color: #718096;
      white-space: nowrap;
    }

    .signup-link a {
      color: #a0aec0;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .signup-link a:hover {
      color: #cbd5e0;
    }

    /* Right Side - Illustration */
    .right {
      flex: 1;
      background: #000000;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .space-scene {
      width: 100%;
      height: 100%;
      position: relative;
      background: radial-gradient(ellipse at center, #0a0e1a 0%, #000000 100%);
    }

    /* Stars */
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s infinite;
    }

    @keyframes twinkle {

      0%,
      100% {
        opacity: 0.3;
      }

      50% {
        opacity: 1;
      }
    }

    /* Planets */
    .planet {
      position: absolute;
      border-radius: 50%;
      filter: blur(1px);
    }

    .planet-large {
      width: 180px;
      height: 180px;
      background: radial-gradient(circle at 30% 30%, #b8d4e8 0%, #5a8db8 50%, #2d5a7b 100%);
      box-shadow:
        0 0 40px rgba(90, 141, 184, 0.6),
        inset -20px -20px 40px rgba(0, 0, 0, 0.3);
      top: 45%;
      left: 35%;
      animation: float 8s ease-in-out infinite;
    }

    .planet-small {
      width: 60px;
      height: 60px;
      background: radial-gradient(circle at 30% 30%, #d4e8f0 0%, #7aa8c4 50%, #4a7a9a 100%);
      box-shadow:
        0 0 20px rgba(122, 168, 196, 0.5),
        inset -10px -10px 20px rgba(0, 0, 0, 0.3);
      top: 15%;
      right: 25%;
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {

      0%,
      100% {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-20px);
      }
    }

    /* Vertical lines */
    .line {
      position: absolute;
      width: 1px;
      height: 200px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
    }

    .line-1 {
      left: 25%;
      top: 10%;
      animation: lineFloat 7s ease-in-out infinite;
    }

    .line-2 {
      right: 20%;
      top: 50%;
      height: 150px;
      animation: lineFloat 9s ease-in-out infinite 1s;
    }

    @keyframes lineFloat {

      0%,
      100% {
        transform: translateY(0px);
        opacity: 0.3;
      }

      50% {
        transform: translateY(-30px);
        opacity: 0.6;
      }
    }

    /* Branding */
    .branding {
      position: absolute;
      bottom: 30px;
      right: 40px;
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 1px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        height: auto;
        max-width: 500px;
      }

      .right {
        min-height: 300px;
      }

      .left {
        padding: 40px 30px;
      }

      .signup-link {
        position: static;
        transform: none;
        margin-top: 30px;
        text-align: center;
      }
    }

    /* Loader Overlay */
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 14, 26, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }

    .loader-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .spinner-container {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .planet-spinner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #5a8db8 0%, #2d5a7b 100%);
      box-shadow: 0 0 20px rgba(90, 141, 184, 0.6);
      animation: spinner-pulse 2s infinite ease-in-out;
      position: relative;
    }

    .spinner-ring {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 2px solid transparent;
      border-top: 2px solid rgba(255, 255, 255, 0.3);
      border-right: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: spinner-spin 1.5s linear infinite;
    }

    @keyframes spinner-pulse {

      0%,
      100% {
        transform: scale(0.95);
        opacity: 0.9;
      }

      50% {
        transform: scale(1.05);
        opacity: 1;
      }
    }

    @keyframes spinner-spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
      white-space: nowrap;
      animation: fadeIn 0.5s ease-out;
    }
  </style>

  <body>
    <div class="container">
      <div class="window-controls">
        <div class="window-dot"></div>
        <div class="window-dot"></div>
        <div class="window-dot"></div>
      </div>

      <div class="left">
        <form class="form" method="post" action="${pageContext.request.contextPath}/login">
          <h1 class="signin-title">Sign in</h1>

          <div class="form-control">
            <label for="email">Your email</label>
            <input type="email" id="email" name="email" placeholder="Charles@igishyitsi.co" required>
          </div>

          <div class="form-control">
            <div class="password-header">
              <label for="password">Password</label>
              <a href="${pageContext.request.contextPath}/forgotPassword" class="forgot-password">Forgot password?</a>
            </div>
            <div class="input-wrapper">
              <input type="password" id="password" name="password" class="password-input" placeholder="••••••••••"
                required>
              <button type="button" class="toggle-password" onclick="togglePassword()">
                <svg id="eye-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="form-control">
            <label for="captcha">Security Verification</label>
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
              <img src="${pageContext.request.contextPath}/captcha" id="captchaImg"
                style="border-radius: 8px; cursor: pointer; height: 48px; width: 150px; background: white;"
                title="Click to refresh"
                onclick="this.src='${pageContext.request.contextPath}/captcha?'+new Date().getTime()">
              <span style="color: #718096; font-size: 11px;">(Click image to refresh)</span>
            </div>
            <input type="text" id="captcha" name="captcha" placeholder="Enter characters above" required>
          </div>

          <button type="submit" class="submit">Sign in</button>
        </form>

        <div class="signup-link">
          Don't have an account? <a href="${pageContext.request.contextPath}/signup">Sign up</a>
        </div>
      </div>

      <div class="right">
        <div class="space-scene">
          <!-- Stars -->
          <div class="star" style="top: 15%; left: 20%;"></div>
          <div class="star" style="top: 25%; left: 45%;"></div>
          <div class="star" style="top: 35%; left: 70%;"></div>
          <div class="star" style="top: 50%; left: 15%;"></div>
          <div class="star" style="top: 60%; left: 85%;"></div>
          <div class="star" style="top: 75%; left: 30%;"></div>
          <div class="star" style="top: 80%; left: 60%;"></div>
          <div class="star" style="top: 10%; left: 80%; animation-delay: 1s;"></div>
          <div class="star" style="top: 40%; left: 25%; animation-delay: 1.5s;"></div>
          <div class="star" style="top: 70%; left: 75%; animation-delay: 2s;"></div>

          <!-- Vertical Lines -->
          <div class="line line-1"></div>
          <div class="line line-2"></div>

          <!-- Planets -->
          <div class="planet planet-large"></div>
          <div class="planet planet-small"></div>

          <!-- Branding -->
          <div class="branding">igishyitsi</div>
        </div>
      </div>
    </div>

    <!-- Loader Overlay -->
    <div class="loader-overlay" id="loaderOverlay">
      <div class="spinner-container">
        <div class="planet-spinner"></div>
        <div class="spinner-ring"></div>
        <div class="loading-text">Authenticating...</div>
      </div>
    </div>

    <script src="${pageContext.request.contextPath}/js/toast.js"></script>
    <script>
      function togglePassword() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eye-icon');

        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
        } else {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        }
      }

      // Loader Middleware
      document.querySelector('.form').addEventListener('submit', function (e) {
        if (this.checkValidity()) {
          const btn = this.querySelector('.submit');
          btn.disabled = true;
          btn.style.opacity = '0.7';
          btn.innerText = 'Signing in...';

          document.getElementById('loaderOverlay').classList.add('active');
        }
      });

      // Toast trigger
      document.addEventListener('DOMContentLoaded', function () {
        const errorMsg = "${error}";
        if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
          showMessage('error', errorMsg);
        }

        const successMsg = "${sessionScope.success}";
        if (successMsg && successMsg.trim() !== "" && successMsg !== "null") {
          showMessage('success', successMsg);
            <% session.removeAttribute("success"); %>
          }
      });
    </script>
  </body>

  </html>