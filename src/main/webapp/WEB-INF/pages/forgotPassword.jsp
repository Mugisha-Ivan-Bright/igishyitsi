<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - Igishyitsi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
            position: relative;
        }

        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 30px;
            text-align: center;
            letter-spacing: 1px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            color: #f7fafc;
            margin-bottom: 12px;
            text-align: center;
        }

        .subtitle {
            font-size: 14px;
            color: #a0aec0;
            margin-bottom: 32px;
            text-align: center;
            line-height: 1.5;
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
        }

        input:focus {
            outline: none;
            border-color: rgba(99, 179, 237, 0.5);
            background: rgba(26, 32, 44, 0.95);
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
        }

        .submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(139, 156, 182, 0.4);
            background: #9aadc4;
        }

        .back-link {
            display: block;
            text-align: center;
            margin-top: 24px;
            font-size: 13px;
            color: #718096;
            text-decoration: none;
            transition: color 0.2s;
        }

        .back-link:hover {
            color: #a0aec0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">igishyitsi</div>
        <h1 class="title">Forgot Password?</h1>
        <p class="subtitle">Enter your email address and we'll send you a link to reset your password.</p>

        <form action="${pageContext.request.contextPath}/forgotPassword" method="POST">
            <div class="form-control">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="name@example.com" required>
            </div>

            <button type="submit" class="submit">Send Reset Link</button>
        </form>

        <a href="${pageContext.request.contextPath}/login" class="back-link">Back to Sign In</a>
    </div>

    <script src="${pageContext.request.contextPath}/js/toast.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const error = "${error}";
            const success = "${success}";
            if (error && error !== "null") showMessage('error', error);
            if (success && success !== "null") showMessage('success', success);
        });
    </script>
</body>

</html>