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
                                <p class="header-subtitle">Manage and track your assignment progress</p>
                            </div>
                            <div class="header-actions">
                                <select id="assignmentFilter" onchange="filterAssignments()">
                                    <option value="all">All Assignments</option>
                                    <option value="pending">Pending</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="graded">Graded</option>
                                </select>
                            </div>
                        </header>

                        <div class="assignments-container" id="assignmentsContainer">
                            <!-- Assignments will be populated here -->
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
                <script>
                    window.realData = {
                        user: {
                            name: '${user.name}',
                            email: '${user.email}',
                            id: 'ST${user.id}'
                        },
                        stats: {
                            coursesEnrolled: ${ stats.totalCourses },
                    assignmentsPending: ${ stats.pendingAssignments },
                    completedAssignments: ${ stats.submittedAssignments },
                    averageGrade: 92.0
                        },
                    courses: [
                        <c:forEach var="sc" items="${enrolledClasses}" varStatus="status">
                            {
                                id: ${sc.id},
                            title: '${sc.className}',
                            instructor: 'Prof. ${sc.teacher.name}',
                            progress: 100,
                            grade: 'A-',
                            rating: 4.9,
                            avatar: '${sc.className.substring(0, 2).toUpperCase()}',
                            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            nextClass: 'ActiveSession',
                            modules: ['Introduction', 'Core Concepts', 'Advanced Topics'],
                            description: 'Enrolled in ${sc.className}'
                                }${not status.last ? ',' : ''}
                        </c:forEach>
                    ],
                        assignments: [
                            <c:forEach var="asgn" items="${assignments}" varStatus="status">
                                {
                                    id: ${asgn.id},
                                title: '${asgn.title}',
                                course: '${asgn.className}',
                                difficulty: 'General',
                                points: 100,
                                dueDate: '<fmt:formatDate value="${asgn.deadline}" pattern="yyyy-MM-dd" />',
                                status: 'pending',
                                grade: null,
                                description: '${asgn.description}',
                                requirements: ['Submit on time', 'Follow guidelines']
                                }${not status.last ? ',' : ''}
                            </c:forEach>
                        ]
                    };
                </script>
                <script src="${pageContext.request.contextPath}/js/studentDash-fixed.js"></script>
                <script>
                    const errorMsg = "${error}";
                    if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
                        showMessage('error', errorMsg);
                    }
                    const successMsg = "${success}";
                    if (successMsg && successMsg.trim() !== "" && successMsg !== "null") {
                        showMessage('success', successMsg);
                    }
                </script>
            </body>

            </html>