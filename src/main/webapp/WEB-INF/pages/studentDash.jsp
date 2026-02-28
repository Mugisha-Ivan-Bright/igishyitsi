<%@ page contentType="text/html; charset=UTF-8" language="java" %>
    <%@ taglib prefix="c" uri="jakarta.tags.core" %>
        <%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student Dashboard - Igishyitsi</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet">
                <link rel="stylesheet" href="./studentDash.css">
                <link rel="stylesheet"
                    href="${pageContext.request.contextPath}/css/studentDash.css?v=${pageContext.session.creationTime}">
                <link rel="stylesheet" href="${pageContext.request.contextPath}/css/toast.css">
            </head>

            <body>
                <script id="server-data" type="application/json">
                    ${realData != null && realData != '' ? realData : "{}"}
                </script>
                <script>
                    try {
                        window.serverData = JSON.parse(document.getElementById('server-data').textContent);
                    } catch (e) {
                        window.serverData = {};
                        console.error("Failed to parse serverData", e);
                    }
                    console.log("Student Server Data Loaded:", window.serverData);
                </script>
                <!-- Toast Container -->
                <div id="toastContainer" class="toast-container"></div>

                <!-- Course Details Overlay -->
                <div id="courseDetailsOverlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <h2 id="courseDetailsTitle">Course Details</h2>
                            <button class="close-btn" onclick="closeOverlay('courseDetailsOverlay')">×</button>
                        </div>
                        <div class="overlay-body">
                            <div class="course-details-container">
                                <div class="course-info-section">
                                    <div class="course-avatar-large" id="courseDetailsAvatar"></div>
                                    <h3 id="courseDetailsName"></h3>
                                    <p id="courseDetailsInstructor"></p>
                                    <div class="course-stats">
                                        <div class="stat-item">
                                            <span class="stat-label">Progress</span>
                                            <span class="stat-value" id="courseDetailsProgress"></span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-label">Grade</span>
                                            <span class="stat-value" id="courseDetailsGrade"></span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-label">Rating</span>
                                            <span class="stat-value" id="courseDetailsRating"></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="course-sections">
                                    <div class="section-tabs">
                                        <button class="tab-btn active" onclick="switchTab('modules')">Modules</button>
                                        <button class="tab-btn" onclick="switchTab('assignments')">Assignments</button>
                                        <button class="tab-btn" onclick="switchTab('resources')">Resources</button>
                                        <button class="tab-btn" onclick="switchTab('grades')">Grades</button>
                                    </div>

                                    <div id="modulesTab" class="tab-content active">
                                        <h4>Course Modules</h4>
                                        <div id="courseModulesList"></div>
                                    </div>

                                    <div id="assignmentsTab" class="tab-content">
                                        <h4>Course Assignments</h4>
                                        <div id="courseAssignmentsList"></div>
                                    </div>

                                    <div id="resourcesTab" class="tab-content">
                                        <h4>Course Resources</h4>
                                        <div class="resources-list">
                                            <div class="resource-item">
                                                <span class="resource-icon">📄</span>
                                                <span class="resource-name">Course Syllabus</span>
                                                <button class="download-btn">Download</button>
                                            </div>
                                            <div class="resource-item">
                                                <span class="resource-icon">📹</span>
                                                <span class="resource-name">Video Lectures</span>
                                                <button class="download-btn">Access</button>
                                            </div>
                                            <div class="resource-item">
                                                <span class="resource-icon">📚</span>
                                                <span class="resource-name">Reading Materials</span>
                                                <button class="download-btn">View</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="gradesTab" class="tab-content">
                                        <h4>Course Grades</h4>
                                        <div id="courseGradesList"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Assignment Details Overlay -->
                <div id="assignmentDetailsOverlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <h2 id="assignmentDetailsTitle">Assignment Details</h2>
                            <button class="close-btn" onclick="closeOverlay('assignmentDetailsOverlay')">×</button>
                        </div>
                        <div class="overlay-body">
                            <div class="assignment-details-container">
                                <div class="assignment-header">
                                    <div class="assignment-meta">
                                        <span class="assignment-course" id="assignmentCourse"></span>
                                        <span class="assignment-difficulty" id="assignmentDifficulty"></span>
                                        <span class="assignment-points" id="assignmentPoints"></span>
                                    </div>
                                    <div class="assignment-due">
                                        <span class="due-label">Due Date:</span>
                                        <span id="assignmentDueDate"></span>
                                    </div>
                                </div>

                                <div class="assignment-description">
                                    <h4>Description</h4>
                                    <p id="assignmentDescription"></p>
                                </div>

                                <div class="assignment-requirements">
                                    <h4>Requirements</h4>
                                    <ul id="assignmentRequirements"></ul>
                                </div>

                                <div class="assignment-actions">
                                    <button class="btn btn-secondary"
                                        onclick="closeOverlay('assignmentDetailsOverlay')">Back</button>
                                    <button class="btn btn-primary" id="assignmentActionButton"
                                        onclick="startAssignmentFromDetails()">Start Assignment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Live Class Overlay -->
                <div id="liveClassOverlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <h2 id="liveClassTitle">Live Class</h2>
                            <button class="close-btn" onclick="closeOverlay('liveClassOverlay')">×</button>
                        </div>
                        <div class="overlay-body">
                            <div class="live-class-container">
                                <div class="class-video">
                                    <div class="video-placeholder">
                                        <span class="video-icon">🎥</span>
                                        <p id="liveClassStatus"></p>
                                    </div>
                                </div>

                                <div class="class-info">
                                    <h3 id="liveClassTopic"></h3>
                                    <p id="liveClassInstructor"></p>
                                    <div class="class-stats">
                                        <div class="stat-item">
                                            <span class="stat-label">Duration</span>
                                            <span id="liveClassDuration"></span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-label">Participants</span>
                                            <span id="liveClassParticipants"></span>
                                        </div>
                                    </div>

                                    <div class="class-actions">
                                        <button class="btn btn-secondary"
                                            onclick="closeOverlay('liveClassOverlay')">Close</button>
                                        <button class="btn btn-primary" id="liveClassActionButton"
                                            onclick="joinLiveClassFromOverlay()">Join Session</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Achievement Details Overlay -->
                <div id="achievementDetailsOverlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <h2 id="achievementDetailsTitle">Achievement Details</h2>
                            <button class="close-btn" onclick="closeOverlay('achievementDetailsOverlay')">×</button>
                        </div>
                        <div class="overlay-body">
                            <div class="achievement-details-container">
                                <div class="achievement-showcase">
                                    <div class="achievement-icon-large" id="achievementDetailsIcon"></div>
                                    <h3 id="achievementDetailsName"></h3>
                                    <span class="achievement-category" id="achievementDetailsCategory"></span>
                                </div>

                                <div class="achievement-description">
                                    <h4>Description</h4>
                                    <p id="achievementDetailsDescription"></p>
                                </div>

                                <div class="achievement-progress" id="achievementProgressSection">
                                    <h4>Progress</h4>
                                    <div class="progress-bar-large">
                                        <div class="progress-fill" id="achievementProgressBar"></div>
                                    </div>
                                    <div class="progress-text" id="achievementProgressText"></div>
                                </div>

                                <div class="achievement-reward">
                                    <h4>Reward</h4>
                                    <span class="reward-text" id="achievementReward"></span>
                                </div>

                                <div class="achievement-actions">
                                    <button class="btn btn-secondary"
                                        onclick="closeOverlay('achievementDetailsOverlay')">Close</button>
                                    <button class="btn btn-primary" id="achievementActionButton"
                                        onclick="shareAchievementFromOverlay()">Share Achievement</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hamburger Menu -->
                <div class="hamburger" onclick="toggleSidebar()">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <!-- Sidebar Overlay -->
                <div class="sidebar-overlay" onclick="toggleSidebar()"></div>

                <!-- Sidebar -->
                <aside class="sidebar">
                    <div class="logo">
                        <h1>IGISHYITSI</h1>
                    </div>
                    <nav>
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="#" class="nav-link active" onclick="navigateTo(event, 'dashboard')">
                                    <span class="nav-icon">📊</span>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'my-courses')">
                                    <span class="nav-icon">📚</span>
                                    <span>My Courses</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'assignments')">
                                    <span class="nav-icon">📝</span>
                                    <span>Assignments</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'live-class')">
                                    <span class="nav-icon">🎥</span>
                                    <span>Live Classes</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'messages')">
                                    <span class="nav-icon">💬</span>
                                    <span>Messages</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'grades')">
                                    <span class="nav-icon">📈</span>
                                    <span>Grades</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'achievements')">
                                    <span class="nav-icon">🏆</span>
                                    <span>Achievements</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'settings')">
                                    <span class="nav-icon">⚙️</span>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="${pageContext.request.contextPath}/logout" class="nav-link">
                                    <span class="nav-icon">🚪</span>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="main-content">
                    <!-- Dashboard Section -->
                    <div id="dashboard" class="content-section active">
                        <!-- Header -->
                        <header class="header">
                            <div class="header-title">
                                <h2 id="stName">Welcome back, ${user.name}!</h2>
                                <p class="header-subtitle">You have ${stats.pendingAssignments} assignments due soon</p>
                            </div>
                            <div class="header-actions">
                                <div class="notification-bell" onclick="toggleNotifications()">
                                    <span class="bell-icon">🔔</span>
                                    <span class="notification-badge">5</span>
                                </div>
                            </div>
                        </header>

                        <!-- Stats Grid -->
                        <div class="stats-grid">
                            <div class="stat-card neumorphic">
                                <div class="stat-icon">📚</div>
                                <div class="stat-label">Active Courses</div>
                                <div class="stat-value">${stats.totalCourses}</div>
                                <div class="stat-change">Enrolled</div>
                            </div>
                            <div class="stat-card neumorphic">
                                <div class="stat-icon">✅</div>
                                <div class="stat-label">Completed</div>
                                <div class="stat-value">${stats.submittedAssignments}</div>
                                <div class="stat-change">Assignments</div>
                            </div>
                            <div class="stat-card neumorphic">
                                <div class="stat-icon">⏰</div>
                                <div class="stat-label">Pending</div>
                                <div class="stat-value">${stats.pendingAssignments}</div>
                                <div class="stat-change">To finish</div>
                            </div>
                            <div class="stat-card neumorphic">
                                <div class="stat-icon">📊</div>
                                <div class="stat-label">Average Grade</div>
                                <div class="stat-value">${not empty user.id ? 'A-' : 'N/A'}</div>
                                <div class="stat-change">Calculated</div>
                            </div>
                        </div>

                        <!-- Dashboard Grid -->
                        <div class="dashboard-grid">
                            <!-- Most Popular Courses -->
                            <div class="section-card neumorphic">
                                <div class="section-header">
                                    <h3 class="section-title">Most Popular Courses</h3>
                                    <a href="#" class="see-all" onclick="navigateTo(event, 'my-courses')">View All</a>
                                </div>
                                <div class="courses-list">
                                    <c:forEach var="course" items="${enrolledClasses}">
                                        <div class="course-item" onclick="navigateTo(event, 'my-courses')">
                                            <div class="course-avatar"
                                                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                                <span>${course.className.substring(0, 2).toUpperCase()}</span>
                                            </div>
                                            <div class="course-info">
                                                <h4>${course.className}</h4>
                                                <p>Prof. ${course.teacher.name}</p>
                                                <div class="course-rating">
                                                    <span class="stars">⭐⭐⭐⭐⭐</span>
                                                    <span class="rating-text">4.9</span>
                                                </div>
                                            </div>
                                            <div class="course-progress">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: 100%;"></div>
                                                </div>
                                                <span class="progress-text">Active</span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                    <c:if test="${empty enrolledClasses}">
                                        <p style="padding: 20px; text-align: center; color: var(--text-secondary);">No
                                            courses enrolled yet.</p>
                                    </c:if>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                <!-- Trending Assignments -->
                                <div class="section-card neumorphic">
                                    <div class="section-header">
                                        <h3 class="section-title">Trending Assignments</h3>
                                        <a href="#" class="see-all" onclick="navigateTo(event, 'assignments')">View
                                            All</a>
                                    </div>
                                    <div class="trending-list">
                                        <c:forEach var="asgn" items="${assignments}" varStatus="status">
                                            <c:if test="${status.index < 3}">
                                                <div class="trending-item" onclick="navigateTo(event, 'assignments')">
                                                    <div class="trending-avatar"
                                                        style="background: var(--primary-gradient);">
                                                        <span>${asgn.title.substring(0, 1).toUpperCase()}</span>
                                                    </div>
                                                    <div class="trending-info">
                                                        <h4>${asgn.title}</h4>
                                                        <p>${asgn.className} • Due
                                                            <fmt:formatDate value="${asgn.deadline}" pattern="MMM dd" />
                                                        </p>
                                                        <div class="trending-meta">
                                                            <span class="difficulty">General</span>
                                                            <span class="points">100 pts</span>
                                                        </div>
                                                    </div>
                                                    <button class="choose-btn"
                                                        onclick="event.stopPropagation(); window.location.href='${pageContext.request.contextPath}/submitAssignment?id=${asgn.id}'">
                                                        START
                                                    </button>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                        <c:if test="${empty assignments}">
                                            <p style="padding: 20px; text-align: center; color: var(--text-secondary);">
                                                No trending assignments.</p>
                                        </c:if>
                                    </div>
                                </div>

                                <!-- Featured Achievement -->
                                <div class="section-card neumorphic featured-achievement">
                                    <div class="achievement-header">
                                        <h3 class="section-title">Featured Achievement</h3>
                                        <span class="achievement-badge">🏆</span>
                                    </div>
                                    <div class="achievement-content">
                                        <div class="achievement-icon">🌟</div>
                                        <h4>Code Master</h4>
                                        <p>Complete 25 coding assignments</p>
                                        <div class="achievement-progress">
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: 96%;"></div>
                                            </div>
                                            <span class="progress-text">24/25</span>
                                        </div>
                                        <button class="achievement-btn" onclick="showAchievementDetails()">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- My Courses Section -->
                    <div id="my-courses" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>My Courses</h2>
                                <p class="header-subtitle">Track your progress across all enrolled courses</p>
                            </div>
                        </header>

                        <div class="courses-grid" id="coursesGrid">
                            <!-- Courses will be populated here -->
                        </div>
                    </div>

                    <!-- Assignments Section -->
                    <div id="assignments" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Assignments</h2>
                                <p class="header-subtitle">View, open, and submit your assignments</p>
                            </div>
                            <div class="header-actions">
                                <select id="assignmentFilter" onchange="filterStudentAssignments(this.value)">
                                    <option value="all">All Assignments</option>
                                    <option value="pending">Pending</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="graded">Graded</option>
                                </select>
                            </div>
                        </header>

                        <!-- Server-rendered assignment cards -->
                        <div id="assignmentCards" style="display:flex;flex-direction:column;gap:20px;padding:8px 0;">
                            <c:choose>
                                <c:when test="${empty assignments}">
                                    <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                                        <div style="font-size:56px;margin-bottom:16px;">📭</div>
                                        <h3 style="color:white;margin-bottom:8px;">No Assignments Yet</h3>
                                        <p>Your teacher hasn't posted any assignments for your class yet. Check back
                                            soon!</p>
                                    </div>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach var="asgn" items="${assignments}" varStatus="loop">
                                        <%-- Check if student has submitted this assignment --%>
                                            <c:set var="mySubmission" value="${null}" />
                                            <c:forEach var="sub" items="${recentSubmissions}">
                                                <c:if test="${sub.assignment.id == asgn.id}">
                                                    <c:set var="mySubmission" value="${sub}" />
                                                </c:if>
                                            </c:forEach>

                                            <c:set var="cardStatus"
                                                value="${mySubmission != null ? (mySubmission.grade != null ? 'graded' : 'submitted') : 'pending'}" />

                                            <div class="assignment-card-full neumorphic" data-status="${cardStatus}"
                                                style="border-radius:16px;padding:24px;background:var(--glass-bg);border:1px solid var(--glass-border);">

                                                <!-- Card Header -->
                                                <div
                                                    style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
                                                    <div>
                                                        <h3 style="margin:0 0 4px 0;font-size:18px;color:white;">
                                                            ${asgn.title}</h3>
                                                        <p style="margin:0;font-size:13px;color:var(--text-muted);">
                                                            📚 ${asgn.className} &nbsp;•&nbsp;
                                                            🗓 Due <strong
                                                                style="color:white;">${asgn.formattedDeadline}</strong>
                                                            &nbsp;•&nbsp;
                                                            ⭐ <strong style="color:white;">${asgn.points} pts</strong>
                                                        </p>
                                                    </div>
                                                    <div
                                                        style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                                                        <c:choose>
                                                            <c:when test="${cardStatus == 'graded'}">
                                                                <span
                                                                    style="background:#065f46;color:#6ee7b7;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">
                                                                    ✅ Graded — ${mySubmission.grade}/100
                                                                </span>
                                                            </c:when>
                                                            <c:when test="${cardStatus == 'submitted'}">
                                                                <span
                                                                    style="background:#1e3a5f;color:#93c5fd;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">
                                                                    📤 Submitted
                                                                </span>
                                                            </c:when>
                                                            <c:otherwise>
                                                                <c:choose>
                                                                    <c:when test="${asgn.status == 'Closed'}">
                                                                        <span
                                                                            style="background:#3b1c1c;color:#fca5a5;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">
                                                                            ❌ Closed
                                                                        </span>
                                                                    </c:when>
                                                                    <c:otherwise>
                                                                        <span
                                                                            style="background:#431407;color:#fdba74;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">
                                                                            ⏰ Pending
                                                                        </span>
                                                                    </c:otherwise>
                                                                </c:choose>
                                                            </c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </div>

                                                <!-- Description -->
                                                <p
                                                    style="color:var(--text-secondary);font-size:14px;line-height:1.6;margin-bottom:16px;">
                                                    <c:out value="${asgn.description}" />
                                                </p>

                                                <!-- Optional Google Form link -->
                                                <c:if test="${not empty asgn.googleFormUrl}">
                                                    <a href="${asgn.googleFormUrl}" target="_blank"
                                                        style="display:inline-flex;align-items:center;gap:6px;background:rgba(56,189,248,0.1);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;margin-bottom:16px;">
                                                        🔗 Open Google Form (extra resource)
                                                    </a>
                                                </c:if>

                                                <!-- If GRADED: show grade & feedback -->
                                                <c:if test="${cardStatus == 'graded'}">
                                                    <div
                                                        style="background:rgba(6,95,70,0.2);border:1px solid rgba(110,231,183,0.3);border-radius:12px;padding:16px;margin-top:8px;">
                                                        <p style="color:#6ee7b7;font-weight:600;margin:0 0 6px 0;">
                                                            Grade: ${mySubmission.grade}/100</p>
                                                        <c:if test="${not empty mySubmission.feedback}">
                                                            <p
                                                                style="color:var(--text-secondary);font-size:14px;margin:0;">
                                                                💬 <em>
                                                                    <c:out value="${mySubmission.feedback}" />
                                                                </em>
                                                            </p>
                                                        </c:if>
                                                    </div>
                                                </c:if>

                                                <!-- If SUBMITTED: show submission info -->
                                                <c:if test="${cardStatus == 'submitted'}">
                                                    <div
                                                        style="background:rgba(30,58,95,0.3);border:1px solid rgba(147,197,253,0.2);border-radius:12px;padding:16px;margin-top:8px;">
                                                        <p style="color:#93c5fd;font-weight:600;margin:0 0 4px 0;">
                                                            ✅ Submitted — awaiting grade
                                                        </p>
                                                        <p style="color:var(--text-muted);font-size:12px;margin:0;">
                                                            <fmt:formatDate value="${mySubmission.submittedAt}"
                                                                pattern="MMM dd, yyyy HH:mm" />
                                                        </p>
                                                    </div>
                                                </c:if>

                                                <!-- If PENDING and assignment is still open: show submission form -->
                                                <c:if test="${cardStatus == 'pending' && asgn.status != 'Closed'}">
                                                    <div id="submitSection_${asgn.id}" style="margin-top:4px;">
                                                        <button type="button" onclick="toggleSubmitForm('${asgn.id}')"
                                                            style="background:var(--primary-gradient);color:white;border:none;padding:10px 24px;border-radius:10px;font-weight:600;cursor:pointer;font-size:14px;">
                                                            📤 Submit Assignment
                                                        </button>

                                                        <div id="submitForm_${asgn.id}"
                                                            style="display:none;margin-top:16px;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);border-radius:12px;padding:20px;">
                                                            <form
                                                                action="${pageContext.request.contextPath}/submitAssignment"
                                                                method="POST" enctype="multipart/form-data">
                                                                <input type="hidden" name="assignmentId"
                                                                    value="${asgn.id}">

                                                                <div class="form-group">
                                                                    <label
                                                                        style="font-size:14px;font-weight:600;color:white;">Your
                                                                        Answer / Notes</label>
                                                                    <textarea name="content" rows="4"
                                                                        style="width:100%;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:8px;color:white;padding:10px;font-size:14px;resize:vertical;margin-top:6px;"
                                                                        placeholder="Write your answer, notes, or any comments here..."></textarea>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label
                                                                        style="font-size:14px;font-weight:600;color:white;">Upload
                                                                        File <span
                                                                            style="font-weight:400;color:var(--text-muted);">(optional)</span></label>
                                                                    <div style="margin-top:6px;border:2px dashed var(--glass-border);border-radius:10px;padding:20px;text-align:center;cursor:pointer;"
                                                                        onclick="document.getElementById('file_${asgn.id}').click()">
                                                                        <input type="file" id="file_${asgn.id}"
                                                                            name="file" style="display:none;"
                                                                            onchange="document.getElementById('fileName_${asgn.id}').innerText = this.files[0]?.name || 'No file chosen'">
                                                                        <p id="fileName_${asgn.id}"
                                                                            style="color:var(--text-muted);margin:0;font-size:13px;">
                                                                            📎 Click to attach a file (PDF, DOCX, ZIP,
                                                                            image...)
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <c:if test="${not empty asgn.googleFormUrl}">
                                                                    <div class="form-group">
                                                                        <label
                                                                            style="font-size:14px;font-weight:600;color:#38bdf8;">
                                                                            Google Form Response URL <span
                                                                                style="font-weight:400;color:var(--text-muted);">(optional)</span>
                                                                        </label>
                                                                        <input type="url" name="formResponseUrl"
                                                                            style="width:100%;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:8px;color:white;padding:10px;font-size:14px;margin-top:6px;"
                                                                            placeholder="Paste your form response link (if provided by teacher)">
                                                                    </div>
                                                                </c:if>

                                                                <div style="display:flex;gap:10px;margin-top:4px;">
                                                                    <button type="submit"
                                                                        style="flex:1;background:var(--primary-gradient);color:white;border:none;padding:11px;border-radius:10px;font-weight:600;cursor:pointer;font-size:14px;">
                                                                        ✅ Submit Now
                                                                    </button>
                                                                    <button type="button"
                                                                        onclick="toggleSubmitForm('${asgn.id}')"
                                                                        style="background:rgba(255,255,255,0.07);color:var(--text-secondary);border:1px solid var(--glass-border);padding:11px 20px;border-radius:10px;cursor:pointer;font-size:14px;">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </c:if>
                                            </div>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </div>

                    <!-- Live Class Section -->
                    <div id="live-class" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Live Classes</h2>
                                <p class="header-subtitle">Join live sessions and interact with instructors</p>
                            </div>
                        </header>

                        <div class="live-classes-grid" id="liveClassesGrid">
                            <!-- Live classes will be populated here -->
                        </div>
                    </div>

                    <!-- Messages Section -->
                    <div id="messages" class="content-section">
                        <div class="messages-container">
                            <div class="contacts-list">
                                <div class="contacts-header">
                                    <h3>Messages</h3>
                                    <button class="btn-icon">✏️</button>
                                </div>
                                <div class="contact-item active" onclick="switchContact('Prof. Sarah Johnson')">
                                    <div class="contact-avatar">SJ</div>
                                    <div class="contact-info">
                                        <h4>Prof. Sarah Johnson</h4>
                                        <p>Great work on the project!</p>
                                    </div>
                                    <span class="time">2m</span>
                                </div>
                                <div class="contact-item" onclick="switchContact('Dr. Michael Chen')">
                                    <div class="contact-avatar">MC</div>
                                    <div class="contact-info">
                                        <h4>Dr. Michael Chen</h4>
                                        <p>Don't forget tomorrow's quiz</p>
                                    </div>
                                    <span class="time">1h</span>
                                </div>
                                <div class="contact-item" onclick="switchContact('Study Group')">
                                    <div class="contact-avatar avatar-yellow">SG</div>
                                    <div class="contact-info">
                                        <h4>Study Group</h4>
                                        <p>Meeting at 3 PM today</p>
                                    </div>
                                    <span class="time">3h</span>
                                </div>
                            </div>
                            <div class="chat-area">
                                <div class="chat-area-header">
                                    <div class="contact-info">
                                        <h3 id="currentContactName">Prof. Sarah Johnson</h3>
                                        <p id="currentContactStatus">Web Development • Online</p>
                                    </div>
                                    <div class="header-actions">
                                        <button class="btn btn-secondary">View Profile</button>
                                    </div>
                                </div>
                                <div class="chat-area-messages" id="mainChatMessages">
                                    <div class="message received">
                                        <p>Hi Alex! I just reviewed your React assignment submission. Excellent work!
                                        </p>
                                        <span class="msg-time">10:30 AM</span>
                                    </div>
                                    <div class="message sent">
                                        <p>Thank you professor! I really enjoyed working on it.</p>
                                        <span class="msg-time">10:32 AM</span>
                                    </div>
                                    <div class="message received">
                                        <p>Your attention to detail is impressive. Keep up the great work!</p>
                                        <span class="msg-time">10:33 AM</span>
                                    </div>
                                </div>
                                <div class="chat-input-area">
                                    <input type="text" id="mainChatInput" placeholder="Type a message..."
                                        onkeypress="handleEnter(event, 'mainChatInput', 'mainChatMessages')">
                                    <button class="btn-primary"
                                        onclick="sendMessage('mainChatInput', 'mainChatMessages')">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Grades Section -->
                    <div id="grades" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Grades & Performance</h2>
                                <p class="header-subtitle">Track your academic progress and performance</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="exportGrades()">📥 Export Report</button>
                            </div>
                        </header>

                        <div class="grades-overview">
                            <div class="grade-summary neumorphic">
                                <h3>Current GPA</h3>
                                <div class="gpa-display">3.8</div>
                                <p class="gpa-scale">Out of 4.0</p>
                            </div>

                            <div class="grade-courses neumorphic">
                                <h3>Course Grades</h3>
                                <div class="grade-list" id="gradeList">
                                    <!-- Grades will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Achievements Section -->
                    <div id="achievements" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Achievements</h2>
                                <p class="header-subtitle">Unlock rewards and track your accomplishments</p>
                            </div>
                        </header>

                        <div class="achievements-grid" id="achievementsGrid">
                            <!-- Achievements will be populated here -->
                        </div>
                    </div>

                    <!-- Settings Section -->
                    <div id="settings" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Settings</h2>
                                <p class="header-subtitle">Manage your account and preferences</p>
                            </div>
                        </header>

                        <div class="settings-container">
                            <div class="settings-section neumorphic">
                                <h3>Profile Information</h3>
                                <div class="profile-form">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" value="Alex Thompson" id="fullName">
                                    </div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" value="alex.thompson@university.edu" id="email">
                                    </div>
                                    <div class="form-group">
                                        <label>Student ID</label>
                                        <input type="text" value="ST2024001" id="studentId" readonly>
                                    </div>
                                    <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
                                </div>
                            </div>

                            <div class="settings-section neumorphic">
                                <h3>Preferences</h3>
                                <div class="preferences-list">
                                    <div class="preference-item">
                                        <label class="switch">
                                            <input type="checkbox" checked>
                                            <span class="slider"></span>
                                        </label>
                                        <span>Email Notifications</span>
                                    </div>
                                    <div class="preference-item">
                                        <label class="switch">
                                            <input type="checkbox" checked>
                                            <span class="slider"></span>
                                        </label>
                                        <span>Push Notifications</span>
                                    </div>
                                    <div class="preference-item">
                                        <label class="switch">
                                            <input type="checkbox">
                                            <span class="slider"></span>
                                        </label>
                                        <span>Dark Mode</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Notification Dropdown -->
                <div id="notificationDropdown" class="notification-dropdown">
                    <h4>Notifications</h4>
                    <div class="notification-list">
                        <div class="notification-item">
                            <div class="notification-icon">📝</div>
                            <div class="notification-content">
                                <p>New assignment posted in Web Development</p>
                                <span class="notification-time">2 hours ago</span>
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon">🏆</div>
                            <div class="notification-content">
                                <p>You've earned the "Quick Learner" badge!</p>
                                <span class="notification-time">5 hours ago</span>
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon">💬</div>
                            <div class="notification-content">
                                <p>New message from Prof. Sarah Johnson</p>
                                <span class="notification-time">1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="${pageContext.request.contextPath}/js/toast.js"></script>
                <script src="${pageContext.request.contextPath}/js/studentDash-fixed.js"></script>
                <script>
                    const errorMsg = "${error}";
                    if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
                        showMessage('error', errorMsg);
                    }
                    // Session flash message (set after successful submission redirect)
                    const flashMsg = "${sessionScope.message}";
                    if (flashMsg && flashMsg.trim() !== "" && flashMsg !== "null") {
                        showMessage('success', flashMsg);
                        <% session.removeAttribute("message"); %>
                    }
                    const successMsg = "${success}";
                    if (successMsg && successMsg.trim() !== "" && successMsg !== "null") {
                        showMessage('success', successMsg);
                    }

                    /**
                     * Toggle the inline submission form for a given assignment.
                     * @param {string} assignmentId
                     */
                    function toggleSubmitForm(assignmentId) {
                        const form = document.getElementById('submitForm_' + assignmentId);
                        if (!form) return;
                        form.style.display = form.style.display === 'none' ? 'block' : 'none';
                    }

                    /**
                     * Filter server-rendered assignment cards by status.
                     * @param {string} status one of: all, pending, submitted, graded
                     */
                    function filterStudentAssignments(status) {
                        const cards = document.querySelectorAll('#assignmentCards .assignment-card-full');
                        cards.forEach(function (card) {
                            const cardStatus = card.getAttribute('data-status');
                            if (status === 'all' || cardStatus === status) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                </script>
                <script>
                    // Real-Time WebSocket Connection
                    (function () {
                        let ws;
                        function connectWebSocket() {
                            const userId = '${user.id}';
                            if (!userId) return;

                            const host = window.location.host;
                            const ctx = '${pageContext.request.contextPath}';
                            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                            const wsUrl = protocol + '//' + host + ctx + '/ws/assignments/' + userId;

                            ws = new WebSocket(wsUrl);

                            ws.onopen = function () {
                                console.log("Connected to real-time notification service");
                            };

                            ws.onmessage = function (event) {
                                try {
                                    const data = JSON.parse(event.data);
                                    if (data.type === 'NEW_ASSIGNMENT') {
                                        showMessage('info', `New Assignment in ${data.course}: ${data.title}`);

                                        // Update stats
                                        const pendingBadge = document.querySelector('.header-subtitle');
                                        if (pendingBadge && pendingBadge.innerText.includes('assignments due soon')) {
                                            const currentVal = parseInt(pendingBadge.innerText.match(/\d+/)[0]);
                                            pendingBadge.innerText = `You have ${currentVal + 1} assignments due soon`;
                                        }

                                        // Re-run filter logic to show incoming assignment broadly
                                        if (typeof appState !== 'undefined' && appState.assignments) {
                                            appState.assignments.unshift({
                                                id: data.id,
                                                title: data.title,
                                                course: data.course,
                                                difficulty: 'General',
                                                points: 100,
                                                dueDate: data.dueDate,
                                                status: 'pending',
                                                grade: null,
                                                description: data.description,
                                                requirements: []
                                            });

                                            if (appState.stats) {
                                                appState.stats.assignmentsPending = (appState.stats.assignmentsPending || 0) + 1;
                                            }

                                            if (document.getElementById('assignments') && document.getElementById('assignments').classList.contains('active')) {
                                                const filterVal = document.getElementById('assignmentFilter') ? document.getElementById('assignmentFilter').value : 'all';
                                                if (typeof loadAssignments === 'function') loadAssignments(filterVal);
                                            } else if (document.getElementById('dashboard') && document.getElementById('dashboard').classList.contains('active')) {
                                                if (typeof loadDashboard === 'function') loadDashboard();
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.error("Error parsing websocket message", e);
                                }
                            };

                            ws.onclose = function () {
                                setTimeout(connectWebSocket, 5000);
                            };
                        }

                        document.addEventListener("DOMContentLoaded", connectWebSocket);
                    })();
                </script>
            </body>

            </html>