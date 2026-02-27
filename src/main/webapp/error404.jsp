<%@ page contentType="text/html; charset=UTF-8" language="java" isErrorPage="true" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Lost in Space</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/toast.css">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', sans-serif;
                background: #0a0e1a;
                color: #fff;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                position: relative;
            }

            .space-scene {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at center, #0a0e1a 0%, #000000 100%);
                z-index: -1;
            }

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

            .error-container {
                text-align: center;
                z-index: 10;
                padding: 40px;
                background: rgba(45, 51, 57, 0.4);
                backdrop-filter: blur(20px);
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }

            h1 {
                font-size: 120px;
                font-weight: 700;
                color: #8b9cb6;
                margin-bottom: 10px;
                line-height: 1;
            }

            h2 {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 20px;
                color: #f7fafc;
            }

            p {
                color: #a0aec0;
                margin-bottom: 30px;
                line-height: 1.6;
            }

            .btn {
                display: inline-block;
                padding: 14px 30px;
                background: #8b9cb6;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s;
            }

            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(139, 156, 182, 0.4);
                background: #9aadc4;
            }

            .planet {
                position: absolute;
                border-radius: 50%;
                filter: blur(1px);
                animation: float 8s ease-in-out infinite;
            }

            .planet-404 {
                width: 250px;
                height: 250px;
                background: radial-gradient(circle at 30% 30%, #5a8db8 0%, #2d5a7b 100%);
                box-shadow: 0 0 40px rgba(90, 141, 184, 0.4);
                top: -100px;
                right: -80px;
                opacity: 0.6;
            }

            @keyframes float {

                0%,
                100% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-20px);
                }
            }
        </style>
    </head>

    <body>
        <div class="space-scene" id="stars"></div>
        <div class="error-container">
            <div class="planet planet-404"></div>
            <h1>404</h1>
            <h2>Lost in Space</h2>
            <p>The page you're looking for has drifted beyond the horizon. It might have been moved or never existed in
                this orbit.</p>
            <a href="${pageContext.request.contextPath}/" class="btn">Return to Base</a>
        </div>

        <script>
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.top = Math.random() * 100 + '%';
                star.style.left = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        </script>
        <script src="${pageContext.request.contextPath}/js/toast.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const errorMsg = "${error}";
                if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
                    showMessage('error', errorMsg);
                }
            });
        </script>
    </body>

    </html>