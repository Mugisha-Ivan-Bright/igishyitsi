<%@ page contentType="text/html; charset=UTF-8" language="java" %>
    <%@ taglib prefix="c" uri="jakarta.tags.core" %>
        <%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Teacher Dashboard - Igishyitsi</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet">
                <link rel="stylesheet"
                    href="${pageContext.request.contextPath}/css/teacherDash.css?v=${pageContext.session.creationTime}">
            </head>

            <body>
                <!-- Toast Container -->d
                <div id="toastContainer" class="toast-container"></div>

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
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'live-class')">
                                    <span class="nav-icon">🎥</span>
                                    <span>Live Class</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'messages')">
                                    <span class="nav-icon">💬</span>
                                    <span>Messages</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'students')">
                                    <span class="nav-icon">👥</span>
                                    <span>My Students</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'courses')">
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
                                <a href="#" class="nav-link" onclick="navigateTo(event, 'analytics')">
                                    <span class="nav-icon">📈</span>
                                    <span>Analytics</span>
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
                                <h2>Dashboard Overview</h2>
                                <p class="header-subtitle">Welcome back! Here's what's happening today</p>
                            </div>
                        </header>

                        <!-- Stats Grid - Linkable -->
                        <div class="stats-grid">
                            <div class="stat-card" onclick="navigateTo(event, 'students')" style="cursor: pointer;">
                                <div class="stat-label">Enrolled Students</div>
                                <div class="stat-value">${studentCount != null ? studentCount : 0}</div>
                                <div class="stat-change">↑ 12% across your courses</div>
                            </div>
                            <div class="stat-card" onclick="navigateTo(event, 'courses')" style="cursor: pointer;">
                                <div class="stat-label">My Courses</div>
                                <div class="stat-value">${classes != null ? classes.size() : 0}</div>
                                <div class="stat-change">Active this semester</div>
                            </div>
                            <div class="stat-card" onclick="navigateTo(event, 'assignments')" style="cursor: pointer;">
                                <div class="stat-label">Pending Assignments</div>
                                <div class="stat-value">${assignmentCount != null ? assignmentCount : 0}</div>
                                <div class="stat-change">↓ 8 from last week</div>
                            </div>
                            <div class="stat-card" onclick="navigateTo(event, 'analytics')" style="cursor: pointer;">
                                <div class="stat-label">Completion Rate</div>
                                <div class="stat-value">92%</div>
                                <div class="stat-change">↑ 5% from last month</div>
                            </div>
                        </div>

                        <!-- Dashboard Grid -->
                        <div class="dashboard-grid">
                            <!-- Recent Activity -->
                            <div class="section-card">
                                <div class="section-header">
                                    <h3 class="section-title">Recent Activity</h3>
                                    <a href="#" class="see-all"
                                        onclick="event.preventDefault(); showToast('Showing all activity logs', 'info')">View
                                        All</a>
                                </div>
                                <div class="activity-feed">
                                    <div class="activity-item">
                                        <div class="activity-icon">📝</div>
                                        <div class="activity-content">
                                            <div class="activity-text">Emma Johnson submitted "Web Dev Project"</div>
                                            <div class="activity-time">2 hours ago</div>
                                        </div>
                                    </div>
                                    <div class="activity-item">
                                        <div class="activity-icon">👤</div>
                                        <div class="activity-content">
                                            <div class="activity-text">New enrollment: Michael Chen</div>
                                            <div class="activity-time">5 hours ago</div>
                                        </div>
                                    </div>
                                    <div class="activity-item">
                                        <div class="activity-icon">📢</div>
                                        <div class="activity-content">
                                            <div class="activity-text">Announcement posted: "Mid-term Schedule"</div>
                                            <div class="activity-time">Yesterday</div>
                                        </div>
                                    </div>
                                    <div class="activity-item">
                                        <div class="activity-icon">✅</div>
                                        <div class="activity-content">
                                            <div class="activity-text">Graded "React Components" for 25 students</div>
                                            <div class="activity-time">2 days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div style="display: flex; flex-direction: column; gap: 24px;">
                                <!-- Quick Actions -->
                                <div class="section-card">
                                    <div class="section-header">
                                        <h3 class="section-title">Quick Actions</h3>
                                    </div>
                                    <div class="quick-actions">
                                        <div class="action-card-btn" onclick="navigateTo(event, 'assignments')">
                                            <div class="action-icon">✅</div>
                                            <div class="action-label">Grade Work</div>
                                        </div>
                                        <div class="action-card-btn" onclick="navigateTo(event, 'messages')">
                                            <div class="action-icon">📢</div>
                                            <div class="action-label">Announce</div>
                                        </div>
                                        <div class="action-card-btn" onclick="navigateTo(event, 'assignments')">
                                            <div class="action-icon">➕</div>
                                            <div class="action-label">New Task</div>
                                        </div>
                                        <div class="action-card-btn" onclick="navigateTo(event, 'messages')">
                                            <div class="action-icon">✉️</div>
                                            <div class="action-label">Message</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Upcoming -->
                                <div class="section-card">
                                    <div class="section-header">
                                        <h3 class="section-title">Upcoming</h3>
                                        <a href="#" class="see-all"
                                            onclick="navigateTo(event, 'assignments')">Calendar</a>
                                    </div>
                                    <div class="upcoming-list">
                                        <div class="upcoming-item">
                                            <div class="upcoming-info">
                                                <h4>Final Presentation</h4>
                                                <p>Tomorrow, 10:00 AM</p>
                                            </div>
                                            <div class="upcoming-status">High</div>
                                        </div>
                                        <div class="upcoming-item">
                                            <div class="upcoming-info">
                                                <h4>Staff Meeting</h4>
                                                <p>Feb 28, 2:00 PM</p>
                                            </div>
                                            <div class="upcoming-status status-closed">Normal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Live Class Section -->
                    <div id="live-class" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Live Classroom</h2>
                                <p class="header-subtitle">Stream lessons and interact with students in real-time</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="toggleScreenShare()" id="shareBtn">🖥️ Share
                                    Screen</button>
                                <button class="btn btn-primary btn-danger" id="streamBtn" onclick="toggleStream()">▶
                                    Start
                                    Stream</button>
                            </div>
                        </header>
                        <div class="live-grid">
                            <div class="video-container" id="videoContainer">
                                <video id="webcamFeed" autoplay playsinline muted></video>

                                <!-- Placeholder / Status -->
                                <div class="video-placeholder" id="videoPlaceholder">
                                    <div class="video-icon">🎥</div>
                                    <h3 id="streamStatus">Ready to join?</h3>
                                    <p id="streamText" style="margin-bottom: 16px;">Click "Start Camera" to begin.</p>
                                    <button class="btn btn-primary" style="background: #3b82f6;"
                                        onclick="toggleStream()">Start
                                        Camera</button>
                                </div>

                                <!-- Screen Share Overlay -->
                                <div id="screenShareOverlay" class="video-overlay" style="display: none;">
                                    <div class="video-icon">🖥️</div>
                                    <h3>You are presenting to everyone</h3>
                                    <button class="btn btn-sm btn-danger" onclick="stopScreenShare()">Stop
                                        Presenting</button>
                                </div>

                                <!-- Google Meet Style Controls -->
                                <div class="meet-controls-bar">
                                    <div class="meet-controls-group">
                                        <button class="meet-btn" id="micBtn" onclick="toggleMic()"
                                            title="Turn off microphone (ctrl + d)">
                                            🎤
                                        </button>
                                        <button class="meet-btn" id="camBtn" onclick="toggleCam()"
                                            title="Turn off camera (ctrl + e)">
                                            📹
                                        </button>
                                        <button class="meet-btn" id="shareBtn" onclick="toggleScreenShare()"
                                            title="Present now">
                                            ⬆️
                                        </button>
                                        <button class="meet-btn btn-end" onclick="toggleStream()" title="Leave call">
                                            📞
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-sidebar">
                                <div class="chat-header">
                                    <h3>Live Chat</h3>
                                    <span class="viewer-count">👥 24 Online</span>
                                </div>
                                <div class="chat-messages" id="liveChatMessages">
                                    <div class="chat-msg">
                                        <span class="msg-author">Emma:</span>
                                        <span class="msg-text">Hello teacher!</span>
                                    </div>
                                    <div class="chat-msg">
                                        <span class="msg-author">Michael:</span>
                                        <span class="msg-text">Can we review the last assignment?</span>
                                    </div>
                                </div>
                                <div class="chat-input-area">
                                    <input type="text" id="liveChatInput" placeholder="Type a message..."
                                        onkeypress="handleEnter(event, 'liveChatInput', 'liveChatMessages')">
                                    <button class="btn-send"
                                        onclick="sendMessage('liveChatInput', 'liveChatMessages')">➤</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Messages Section -->
                    <div id="messages" class="content-section">
                        <div class="messages-container">
                            <div class="contacts-list">
                                <div class="contacts-header">
                                    <div class="contacts-header-top">
                                        <h3>Messages</h3>
                                        <button class="btn-icon" title="New Message"
                                            onclick="startNewMessage()">✏️</button>
                                    </div>
                                    <div class="contact-search-bar">
                                        <span class="search-icon">🔍</span>
                                        <input type="text" id="contactSearchInput" placeholder="Search contacts..."
                                            onkeyup="filterContacts()">
                                    </div>
                                </div>
                                <div class="contact-item active" onclick="switchContact('Emma Johnson')">
                                    <div class="contact-avatar">EJ</div>
                                    <div class="contact-info">
                                        <h4>Emma Johnson</h4>
                                        <p>Submitted the project!</p>
                                    </div>
                                    <span class="time">2m</span>
                                </div>
                                <div class="contact-item" onclick="switchContact('Michael Chen')">
                                    <div class="contact-avatar">MC</div>
                                    <div class="contact-info">
                                        <h4>Michael Chen</h4>
                                        <p>I have a question about...</p>
                                    </div>
                                    <span class="time">1h</span>
                                </div>
                                <div class="contact-item" onclick="switchContact('Web Dev Class')">
                                    <div class="contact-avatar avatar-yellow">Class</div>
                                    <div class="contact-info">
                                        <h4>Web Dev Class</h4>
                                        <p>Reminder: Test tomorrow</p>
                                    </div>
                                    <span class="time">1d</span>
                                </div>
                            </div>
                            <div class="chat-area">
                                <div class="chat-area-header">
                                    <div class="contact-info">
                                        <h3 id="currentContactName">Emma Johnson</h3>
                                        <p id="currentContactStatus">Web Development • Active now</p>
                                    </div>
                                    <div class="header-actions">
                                        <button class="btn btn-secondary" onclick="viewCurrentContactProfile()">View
                                            Profile</button>
                                    </div>
                                </div>
                                <div class="chat-area-messages" id="mainChatMessages">
                                    <div class="message received">
                                        <p>Hi Professor, I just submitted the Web Dev project. Let me know if you
                                            received it!
                                        </p>
                                        <span class="msg-time">10:30 AM</span>
                                    </div>
                                    <div class="message sent">
                                        <p>Hi Emma, yes I see it. I'll review it by tomorrow.</p>
                                        <span class="msg-time">10:32 AM</span>
                                    </div>
                                    <div class="message received">
                                        <p>Great, thanks!</p>
                                        <span class="msg-time">10:33 AM</span>
                                    </div>
                                </div>
                                <div class="chat-input-area">
                                    <input type="text" id="mainChatInput" placeholder="Type a message..."
                                        onkeypress="handleEnter(event, 'mainChatInput', 'mainChatMessages')">
                                    <button class="btn-send"
                                        onclick="sendMessage('mainChatInput', 'mainChatMessages')">➤</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Student Detail Section (Extensive View) -->
                    <div id="student-detail" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <button class="btn-back" onclick="navigateTo(event, 'students')">← Back to
                                    Students</button>
                                <h2 id="detailName">Emma Johnson</h2>
                                <p id="detailEmail" class="header-subtitle">emma.j@email.com</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="navigateTo(event, 'messages')">💬
                                    Message</button>
                                <button class="btn btn-primary"
                                    onclick="showToast('Feature coming soon: Editing Profile', 'info')">✏️ Edit
                                    Profile</button>
                            </div>
                        </header>

                        <!-- Profile Tabs Navigation -->
                        <div class="profile-tabs">
                            <div class="tab-link active" onclick="switchStudentTab('overview')">Overview</div>
                            <div class="tab-link" onclick="switchStudentTab('assignments')">Assignments</div>
                            <div class="tab-link" onclick="switchStudentTab('grades')">Grades History</div>
                            <div class="tab-link" onclick="switchStudentTab('management')">Management</div>
                        </div>

                        <div class="dashboard-grid">
                            <!-- Main Content Area -->
                            <div style="display: flex; flex-direction: column; gap: 24px;">

                                <!-- Overview Tab -->
                                <div id="tab-overview" class="tab-content active">
                                    <div class="section-card">
                                        <div class="section-header">
                                            <h3 class="section-title">Academic Standing</h3>
                                        </div>
                                        <div class="profile-stats"
                                            style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
                                            <div class="p-stat">
                                                <span class="label">Attendance</span>
                                                <span class="value">95%</span>
                                            </div>
                                            <div class="p-stat">
                                                <span class="label">Course Grade</span>
                                                <span id="detailGradePill" class="value">A</span>
                                            </div>
                                            <div class="p-stat">
                                                <span class="label">Completion</span>
                                                <span class="value">92%</span>
                                            </div>
                                        </div>
                                        <div class="detail-pills">
                                            <span class="detail-pill">Enrolled: Sept 2023</span>
                                            <span class="detail-pill">Scholarship Student</span>
                                            <span class="detail-pill">Active Participant</span>
                                        </div>
                                    </div>

                                    <div class="section-card" style="margin-top: 24px;">
                                        <div class="section-header">
                                            <h3 class="section-title">Enrolled Courses</h3>
                                        </div>
                                        <div class="upcoming-list" id="detailCourses">
                                            <!-- Dynamic courses -->
                                        </div>
                                    </div>
                                </div>

                                <!-- Assignments Tab -->
                                <div id="tab-assignments" class="tab-content">
                                    <div class="section-card">
                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Assignment</th>
                                                        <th>Status</th>
                                                        <th>Grade</th>
                                                        <th>Submitted</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="detailAssignmentsTable">
                                                    <!-- Dynamic data -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!-- Grades Tab -->
                                <div id="tab-grades" class="tab-content">
                                    <div class="section-card">
                                        <div class="section-header">
                                            <h3 class="section-title">Performance Trend</h3>
                                        </div>
                                        <p style="color: var(--text-muted); margin-bottom: 24px;">Historical grade
                                            performance
                                            across all semesters.</p>
                                        <div
                                            style="height: 200px; background: rgba(255,255,255,0.02); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px dashed var(--glass-border);">
                                            <span style="color: var(--text-muted);">Grade Chart Visualization
                                                Placeholder</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Management Tab -->
                                <div id="tab-management" class="tab-content">
                                    <div class="section-card">
                                        <div class="section-header">
                                            <h3 class="section-title">Administrative Actions</h3>
                                            <p class="section-subtitle">Manage student status and permissions</p>
                                        </div>
                                        <div class="management-actions">
                                            <div class="action-card"
                                                onclick="showToast('Reset link sent to student email', 'success')">
                                                <h4>🔑 Reset Password</h4>
                                                <p>Send a secure password reset link</p>
                                            </div>
                                            <div class="action-card"
                                                onclick="showToast('Official warning issued', 'warning')">
                                                <h4>⚠️ Issue Warning</h4>
                                                <p>Flag for lack of participation</p>
                                            </div>
                                            <div class="action-card danger"
                                                onclick="confirm('Suspend student access?') && showToast('Student suspended', 'error')">
                                                <h4>🚫 Suspend Access</h4>
                                                <p>Temporarily disable dashboard access</p>
                                            </div>
                                            <div class="action-card"
                                                onclick="showToast('Opening student dashboard view...', 'info')">
                                                <h4>👁️ View as Student</h4>
                                                <p>Preview dashboard as this student</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Sidebar (Profile Card) -->
                            <div class="section-card profile-card" style="height: fit-content;">
                                <div class="profile-header-center"
                                    style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid var(--glass-border);">
                                    <div class="profile-avatar-lg" id="detailAvatar"
                                        style="width: 80px; height: 80px; margin: 0 auto 16px; font-size: 32px; background: var(--accent-gradient); color: #000; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 800;">
                                        EJ</div>
                                    <h3 id="detailSidebarName">Emma Johnson</h3>
                                    <p id="detailSidebarCourse"
                                        style="color: var(--accent-cyan); font-weight: 600; margin-top: 4px;">Web
                                        Development
                                    </p>
                                </div>
                                <div style="margin-top: 24px;">
                                    <h4
                                        style="font-size: 14px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">
                                        Notes</h4>
                                    <textarea
                                        style="width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px; color: white; transition: 0.3s; height: 120px;"
                                        placeholder="Add private notes about this student..."></textarea>
                                    <button class="btn btn-sm btn-secondary" style="margin-top: 12px; width: 100%;"
                                        onclick="showToast('Notes saved', 'success')">Save Notes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Students Section -->
                    <div id="students" class="content-section">
                        <!-- Header -->
                        <header class="header">
                            <div class="header-title">
                                <h2>My Students</h2>
                                <p class="header-subtitle">Track progress of students enrolled in your courses</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="exportData()">📥 Export List</button>
                                <button class="btn btn-primary" onclick="openAddModal()">➕ Enroll Student</button>
                            </div>
                        </header>

                        <!-- Stats Grid -->
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Total Enrollments</div>
                                <div class="stat-value">${studentCount != null ? studentCount : 0}</div>
                                <div class="stat-change">↑ 12% from last month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Active Students</div>
                                <div class="stat-value">${studentCount != null ? studentCount : 0}</div>
                                <div class="stat-change">↑ 8% from last month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Average Grade</div>
                                <div class="stat-value">85.4</div>
                                <div class="stat-change">↑ 3.2% from last month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Retention Rate</div>
                                <div class="stat-value">96%</div>
                                <div class="stat-change">↑ 2% from last month</div>
                            </div>
                        </div>

                        <!-- Controls -->
                        <div class="controls">
                            <div class="search-box">
                                <span class="search-icon">🔍</span>
                                <input type="text" id="searchInput" placeholder="Search students by name or email..."
                                    onkeyup="filterStudents()">
                            </div>
                            <select id="gradeFilter" onchange="filterStudents()">
                                <option value="">All Grades</option>
                                <option value="A">Grade A</option>
                                <option value="B">Grade B</option>
                                <option value="C">Grade C</option>
                                <option value="D">Grade D</option>
                            </select>
                            <select id="statusFilter" onchange="filterStudents()">
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        <!-- Students Table -->
                        <div class="table-container">
                            <div class="table-header">
                                <h3>Students List</h3>
                            </div>
                            <table id="studentsTable">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Course</th>
                                        <th>Grade</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="studentsTableBody">
                                    <!-- Data will be populated by JavaScript -->
                                </tbody>
                            </table>
                        </div>

                    </div>


                    <!-- Courses Section -->
                    <div id="courses" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>My Courses</h2>
                                <p class="header-subtitle">Manage curriculum for your assigned courses</p>
                            </div>
                            <div class="header-actions">
                                <div class="search-box" style="width: 300px;">
                                    <span class="search-icon">🔍</span>
                                    <input type="text" id="courseSearchInput" placeholder="Search courses..."
                                        onkeyup="filterCourses()">
                                </div>
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
                                <p class="header-subtitle">Create and manage student assignments</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-primary" onclick="showCreateAssignment()">➕ Create
                                    Assignment</button>
                            </div>
                        </header>

                        <div class="dashboard-grid">
                            <div class="section-card">
                                <h3>New Assignment</h3>
                                <form style="margin-top: 20px;" onsubmit="createAssignment(event)">
                                    <div class="form-group">
                                        <label>Assignment Title</label>
                                        <input type="text" id="assignTitle" placeholder="e.g. Final Project" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Course</label>
                                        <select name="className" required>
                                            <option value="">Select one of your courses</option>
                                            <c:forEach var="cls" items="${classes}">
                                                <option value="${cls}">${cls}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                    <div class="form-group"
                                        style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                        <div>
                                            <label>Due Date</label>
                                            <input type="date" required>
                                        </div>
                                        <div>
                                            <label>Points</label>
                                            <input type="number" placeholder="100" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Upload Materials</label>
                                        <div class="upload-area" onclick="document.getElementById('fileInput').click()">
                                            <input type="file" id="fileInput" name="file" style="display: none;"
                                                onchange="handleFileUpload(this)">
                                            <p class="upload-text" id="uploadText">Drag files here or click to upload
                                            </p>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" style="width: 100%;">Create Assignment</button>
                                </form>
                            </div>

                            <div class="section-card">
                                <h3>Recent Assignments</h3>
                                <div class="upcoming-list" id="assignmentList" style="margin-top: 16px;">
                                    <c:forEach var="assignment" items="${assignments}">
                                        <div class="upcoming-item" onclick="openAssignmentDetail('${assignment.title}')"
                                            style="cursor: pointer;">
                                            <div class="upcoming-info">
                                                <h4>${assignment.title}</h4>
                                                <p>${assignment.className} • Due ${assignment.formattedDeadline}</p>
                                            </div>
                                            <div class="upcoming-status">${assignment.status}</div>
                                        </div>
                                    </c:forEach>
                                    <c:if test="${empty assignments}">
                                        <p style="text-align: center; color: #a0aec0; padding: 20px;">No assignments
                                            found.</p>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Course Detail Section (Hidden) -->
                    <div id="course-detail" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <button class="btn-back" onclick="navigateTo(event, 'courses')">← Back to
                                    Courses</button>
                                <h2 id="cdTitle">Web Development Bootcamp</h2>
                                <p class="header-subtitle">Course Management & Analytics</p>
                            </div>
                        </header>
                        <div class="dashboard-grid">
                            <div class="section-card">
                                <h3>Course Modules</h3>
                                <div class="upcoming-list" id="cdModules">
                                    <!-- Populated by JS -->
                                </div>
                            </div>
                            <div class="section-card">
                                <h3>Performance Overview</h3>
                                <div class="stats-grid"
                                    style="grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
                                    <div class="stat-card" style="padding: 15px;">
                                        <div class="stat-label">Avg Grade</div>
                                        <div class="stat-value">88%</div>
                                    </div>
                                    <div class="stat-card" style="padding: 15px;">
                                        <div class="stat-label">Completion</div>
                                        <div class="stat-value">72%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Assignment Detail Section (Hidden) -->
                    <div id="assignment-detail" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <button class="btn-back" onclick="navigateTo(event, 'assignments')">← Back</button>
                                <h2 id="adTitle">Assignment Details</h2>
                            </div>
                        </header>
                        <div class="table-container">
                            <div class="table-header">
                                <h3>Student Submissions</h3>
                                <button class="btn btn-secondary">Download All</button>
                            </div>
                            <table id="adTable">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Status</th>
                                        <th>File</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="adBody">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Analytics Section -->
                    <div id="analytics" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Analytics & Reports</h2>
                                <p class="header-subtitle">Track performance and generate insights</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="generateReport()">📊 Generate Report</button>
                            </div>
                        </header>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Engagement Rate</div>
                                <div class="stat-value">78%</div>
                                <div class="stat-change">↑ 6% from last month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Active Hours</div>
                                <div class="stat-value">1,247</div>
                                <div class="stat-change">↑ 124 hours this month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Success Rate</div>
                                <div class="stat-value">91%</div>
                                <div class="stat-change">↑ 4% from last month</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Retention Rate</div>
                                <div class="stat-value">96%</div>
                                <div class="stat-change">↑ 2% from last month</div>
                            </div>
                        </div>

                        <!-- Charts Grid -->
                        <div class="charts-grid">
                            <!-- Performance Chart -->
                            <div class="section-card">
                                <div class="section-header">
                                    <h3 class="section-title">Average Performance (Last 6 Months)</h3>
                                </div>
                                <div class="chart-container">
                                    <div class="bar-group" data-tooltip="Sep: 65%">
                                        <div class="bar" style="height: 65%;"></div>
                                        <span class="bar-label">Sep</span>
                                    </div>
                                    <div class="bar-group" data-tooltip="Oct: 72%">
                                        <div class="bar" style="height: 72%;"></div>
                                        <span class="bar-label">Oct</span>
                                    </div>
                                    <div class="bar-group" data-tooltip="Nov: 68%">
                                        <div class="bar" style="height: 68%;"></div>
                                        <span class="bar-label">Nov</span>
                                    </div>
                                    <div class="bar-group" data-tooltip="Dec: 85%">
                                        <div class="bar" style="height: 85%;"></div>
                                        <span class="bar-label">Dec</span>
                                    </div>
                                    <div class="bar-group" data-tooltip="Jan: 78%">
                                        <div class="bar" style="height: 78%;"></div>
                                        <span class="bar-label">Jan</span>
                                    </div>
                                    <div class="bar-group" data-tooltip="Feb: 88%">
                                        <div class="bar" style="height: 88%;"></div>
                                        <span class="bar-label">Feb</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Distribution Chart -->
                            <div class="section-card">
                                <div class="section-header">
                                    <h3 class="section-title">Grade Distribution</h3>
                                </div>
                                <div class="pie-chart-container">
                                    <div class="pie-chart"></div>
                                </div>
                                <div class="chart-legend">
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #34d399;"></div>
                                        <span>A (35%)</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #60a5fa;"></div>
                                        <span>B (30%)</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #fbbf24;"></div>
                                        <span>C (20%)</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: #f87171;"></div>
                                        <span>D (15%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Section -->
                    <div id="settings" class="content-section">
                        <header class="header">
                            <div class="header-title">
                                <h2>Settings</h2>
                                <p class="header-subtitle">Manage your account and preferences</p>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-primary" onclick="showToast('All changes saved', 'success')">💾
                                    Save
                                    All</button>
                            </div>
                        </header>
                        <div class="settings-section">
                            <!-- Profile Settings -->
                            <div class="section-card">
                                <h3>Profile Information</h3>
                                <form style="margin-top: 20px;"
                                    onsubmit="event.preventDefault(); showToast('Profile updated!', 'success')">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" value="${user.name}">
                                    </div>
                                    <div class="form-group">
                                        <label>Email Address</label>
                                        <input type="email" value="${user.email}">
                                    </div>
                                    <div class="form-group">
                                        <label>Department</label>
                                        <input type="text" value="Computer Science" disabled
                                            style="background: rgba(255,255,255,0.05); color: #6b7280;">
                                    </div>
                                    <button class="btn btn-primary">Save Profile</button>
                                </form>
                            </div>

                            <!-- Notification Settings -->
                            <div class="section-card">
                                <h3>Notifications</h3>
                                <div style="margin-top: 24px;">
                                    <div class="toggle-switch">
                                        <span class="toggle-label">Email Notifications</span>
                                        <input type="checkbox" class="toggle-input" checked>
                                    </div>
                                    <div class="toggle-switch">
                                        <span class="toggle-label">SMS Alerts</span>
                                        <input type="checkbox" class="toggle-input">
                                    </div>
                                    <div class="toggle-switch">
                                        <span class="toggle-label">Assignment Submissions</span>
                                        <input type="checkbox" class="toggle-input" checked>
                                    </div>
                                    <div class="toggle-switch" style="border-bottom: none;">
                                        <span class="toggle-label">Weekly Reports</span>
                                        <input type="checkbox" class="toggle-input" checked>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Add/Edit Student Modal -->
                <div class="modal" id="studentModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 id="modalTitle">Enroll New Student</h3>
                            <p>Add a student to one of your courses</p>
                        </div>
                        <form id="studentForm" onsubmit="saveStudent(event)">
                            <div class="form-group">
                                <label for="studentName">Full Name</label>
                                <input type="text" id="studentName" required>
                            </div>
                            <div class="form-group">
                                <label for="studentEmail">Email Address</label>
                                <input type="email" id="studentEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="studentCourse">Course</label>
                                <select id="studentCourse" required>
                                    <option value="">Select a course</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="studentGrade">Initial Grade (Optional)</label>
                                <select id="studentGrade">
                                    <option value="Pending">Pending</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Enroll Student</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Syllabus Modal -->
                <div class="modal" id="syllabusModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 id="syllabusTitle">Course Syllabus</h3>
                            <p>Curriculum Details</p>
                        </div>
                        <div style="padding: 24px; color: #a0aec0; line-height: 1.6;">
                            <h4>Module 1: Introduction</h4>
                            <p>Overview of core concepts and environment setup.</p>
                            <br>
                            <h4>Module 2: Core Fundamentals</h4>
                            <p>Deep dive into syntax, structures, and algorithms.</p>
                            <br>
                            <h4>Module 3: Advanced Topics</h4>
                            <p>Frameworks, state management, and deployment strategies.</p>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn btn-primary" onclick="closeSyllabusModal()">Close</button>
                        </div>
                    </div>
                </div>


                <script>
                    // --- TOAST NOTIFICATIONS ---
                    function showToast(message, type = 'info') {
                        const container = document.getElementById('toastContainer');
                        const toast = document.createElement('div');
                        toast.className = `toast ${type}`;

                        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
                        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

                        container.appendChild(toast);

                        setTimeout(() => {
                            toast.style.animation = 'fadeOut 0.3s forwards';
                            setTimeout(() => toast.remove(), 300);
                        }, 3000);
                    }

                    // Sidebar toggle for mobile
                    function toggleSidebar() {
                        const sidebar = document.querySelector('.sidebar');
                        const hamburger = document.querySelector('.hamburger');
                        const overlay = document.querySelector('.sidebar-overlay');

                        sidebar.classList.toggle('active');
                        hamburger.classList.toggle('active');
                        overlay.classList.toggle('active');
                    }

                    // Navigation between sections
                    function navigateTo(event, sectionId) {
                        if (event) event.preventDefault();

                        // Hide all sections
                        document.querySelectorAll('.content-section').forEach(section => {
                            section.classList.remove('active');
                        });

                        // Show selected section
                        document.getElementById(sectionId).classList.add('active');

                        // Update active nav link
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
                                link.classList.add('active');
                            }
                        });

                        // Close sidebar on mobile after navigation
                        if (window.innerWidth <= 768) {
                            const sidebar = document.querySelector('.sidebar');
                            if (sidebar.classList.contains('active')) toggleSidebar();
                        }

                        // Helpful toast for stat card clicks
                        if (sectionId !== 'dashboard' && event && event.currentTarget.classList.contains('stat-card')) {
                            // showToast(`Navigated to ${sectionId}`, 'info');
                        }
                    }

                    // --- REAL FUNCTIONALITY ---



                    function toggleControl(btn) {
                        btn.classList.toggle('off');
                        btn.style.opacity = btn.classList.contains('off') ? '0.5' : '1';

                        const type = btn.title.includes('Mic') ? 'Microphone' : 'Camera';
                        const state = btn.classList.contains('off') ? 'muted' : 'active';
                        showToast(`${type} is now ${state}`, 'info');
                    }

                    // Generate Report
                    function generateReport() {
                        showToast('Generating report...', 'info');

                        setTimeout(() => {
                            // Create a mock CSV
                            const csvContent = "data:text/csv;charset=utf-8,"
                                + "Student,Course,Grade,Status\n"
                                + "Emma Johnson,Web Dev,A,Active\n"
                                + "Michael Chen,Data Science,A,Active\n"
                                + "Sarah Williams,UI/UX,B,Active";

                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "student_report_2024.csv");
                            document.body.appendChild(link); // Required for FF

                            link.click();
                            link.remove();

                            showToast('Report downloaded successfully!', 'success');
                        }, 1000);
                    }

                    // Assignment Creation
                    function showCreateAssignment() {
                        // Focus on title
                        document.getElementById('assignTitle').focus();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }

                    function createAssignment(event) {
                        event.preventDefault();
                        const title = document.getElementById('assignTitle').value;

                        // Add to list
                        const list = document.getElementById('assignmentList');
                        const newItem = `
                <div class="upcoming-item" style="animation: slideIn 0.3s forwards">
                    <div class="upcoming-info">
                        <h4>${title}</h4>
                        <p>Web Development • Just Created</p>
                    </div>
                    <div class="upcoming-status">Draft</div>
                </div>
            `;
                        list.insertAdjacentHTML('afterbegin', newItem);

                        showToast(`Assignment "${title}" created successfully!`, 'success');
                        event.target.reset();
                    }

                    // Student Detail Editing
                    function saveDetails() {
                        const btn = document.getElementById('saveDetailBtn');
                        const originalText = btn.innerHTML;

                        btn.innerHTML = 'Saving...';
                        setTimeout(() => {
                            btn.innerHTML = '✅ Saved';
                            showToast('Student profile updated', 'success');
                            setTimeout(() => {
                                btn.innerHTML = originalText;
                            }, 2000);
                        }, 800);
                    }

                    // Syllabus & Roster
                    function viewSyllabus(title) {
                        document.getElementById('syllabusTitle').textContent = `Syllabus: ${title}`;
                        document.getElementById('syllabusModal').classList.add('active');
                    }

                    function closeSyllabusModal() {
                        document.getElementById('syllabusModal').classList.remove('active');
                    }

                    function viewRoster(courseTitle) {
                        document.getElementById('searchInput').value = courseTitle;
                        filterStudents(); // Filter list
                        navigateTo(null, 'students'); // Go to students
                        showToast(`Filtering students for ${courseTitle}`, 'info');
                    }

                    // ==========================================
                    // PROTOTYPE DATA & LOGIC
                    // ==========================================

                    // --- Data from Backend ---
                    let students = [
                        <c:forEach var="e" items="${enrollments}" varStatus="status">
                            {id: "${e.student.id}", name: "${e.student.name}", email: "${e.student.email}", course: "${e.className}", grade: "B", progress: 75, status: "Active" }<c:if test="${!status.last}">,</c:if>
                        </c:forEach>
                    ];

                    const courses = [
                        <c:forEach var="c" items="${classes}" varStatus="status">
                            {id: "${status.index + 1}", title: "${c}", students: 0, assignments: 0, rating: 4.8, progress: 0, color: "#3b82f6", image: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }<c:if test="${!status.last}">,</c:if>
                        </c:forEach>
                    ];

                    let editingId = null;

                    // Render Students
                    function renderStudents(data = students) {
                        const tbody = document.getElementById('studentsTableBody');
                        tbody.innerHTML = '';

                        data.forEach(student => {
                            const initials = student.name.split(' ').map(n => n[0]).join('');
                            const statusClass = student.status === 'Active' ? 'badge-success' :
                                student.status === 'Pending' ? 'badge-warning' : 'badge-danger';

                            const row = `
                    <tr onclick="openStudentDetail(${student.id})" style="cursor: pointer;">
                        <td>
                            <div class="student-info">
                                <div class="student-avatar">${initials}</div>
                                <div class="student-details">
                                    <div class="student-name">${student.name}</div>
                                    <div class="student-email">${student.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>${student.course}</td>
                        <td><span class="badge badge-info">${student.grade}</span></td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${student.progress}%"></div>
                            </div>
                        </td>
                        <td><span class="badge ${statusClass}">${student.status}</span></td>
                        <td>
                            <div class="actions">
                                <button class="action-btn" onclick="event.stopPropagation(); editStudent(${student.id})" title="Edit">✏️</button>
                                <button class="action-btn" onclick="event.stopPropagation(); deleteStudent(${student.id})" title="Remove">🗑️</button>
                            </div>
                        </td>
                    </tr>
                `;
                            tbody.innerHTML += row;
                        });
                    }

                    // Render Courses Grid
                    function renderCourses() {
                        const grid = document.getElementById('coursesGrid');
                        grid.innerHTML = '';

                        courses.forEach(course => {
                            const card = `
                <div class="course-card">
                    <div class="course-image">
                        <div class="course-badge">Online</div>
                    </div>
                    <div class="course-content">
                        <div class="course-title">${course.title}</div>
                        <div class="course-meta">
                            <span>👥 ${course.students} Students</span>
                            <span>⭐ ${course.rating}</span>
                        </div>
                        <div class="course-progress">
                            <div class="course-progress-bar" style="width: ${course.progress}%"></div>
                        </div>
                        <div class="course-actions">
                            <button class="btn-outline" onclick="openCourseDetail(${course.id})">View Details</button>
                            <button class="btn-outline" onclick="viewRoster('${course.title}')">Roster</button>
                        </div>
                    </div>
                </div>`;
                            grid.innerHTML += card;
                        });
                    }

                    // Filter students logic
                    function filterStudents() {
                        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
                        const gradeFilter = document.getElementById('gradeFilter').value;
                        const statusFilter = document.getElementById('statusFilter').value;

                        const filtered = students.filter(student => {
                            const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                                student.email.toLowerCase().includes(searchTerm) ||
                                student.course.toLowerCase().includes(searchTerm);
                            const matchesGrade = !gradeFilter || student.grade === gradeFilter;
                            const matchesStatus = !statusFilter || student.status === statusFilter;

                            return matchesSearch && matchesGrade && matchesStatus;
                        });

                        renderStudents(filtered);
                    }

                    // --- Interactive Chat Logic ---

                    function handleEnter(event, inputId, containerId) {
                        if (event.key === 'Enter') {
                            sendMessage(inputId, containerId);
                        }
                    }

                    function sendMessage(inputId, containerId) {
                        const input = document.getElementById(inputId);
                        const container = document.getElementById(containerId);
                        const text = input.value.trim();

                        if (!text) return;

                        // Add user message
                        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        // Different markup for Live Chat vs Messages
                        if (containerId === 'liveChatMessages') {
                            container.innerHTML += `
                    <div class="chat-msg">
                        <span class="msg-author" style="color: var(--accent-cyan);">You:</span>
                        <span class="msg-text">\${text}</span>
                    </div>
                `;
                        } else {
                            container.innerHTML += `
                    <div class="message sent">
                         <p>\${text}</p>
                         <span class="msg-time">\${time}</span>
                    </div>
                `;
                        }

                        input.value = '';
                        container.scrollTop = container.scrollHeight;

                        // Simulate Reply
                        setTimeout(() => {
                            const replies = [
                                "That sounds good!",
                                "I'll check that right away.",
                                "Thanks for letting me know.",
                                "Could you clarify that?"
                            ];
                            const randomReply = replies[Math.floor(Math.random() * replies.length)];

                            if (containerId === 'liveChatMessages') {
                                container.innerHTML += `
                        <div class="chat-msg">
                            <span class="msg-author">Student:</span>
                            <span class="msg-text">\${randomReply}</span>
                        </div>
                    `;
                            } else {
                                const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                container.innerHTML += `
                        <div class="message received">
                             <p>\${randomReply}</p>
                             <span class="msg-time">\${replyTime}</span>
                        </div>
                    `;
                            }
                            container.scrollTop = container.scrollHeight;
                        }, 1500);
                    }

                    // Interactive Contact Switching
                    function switchContact(name) {
                        document.getElementById('currentContactName').textContent = name;
                        document.getElementById('mainChatMessages').innerHTML = `
                <div style="text-align: center; color: #6b7280; padding: 20px; font-size: 13px;">
                    Beginning of chat history with \${name}
                </div>
            `;
                        // Highlight active contact
                        document.querySelectorAll('.contact-item').forEach(el => el.classList.remove('active'));
                        // Find the element clicked - this relies on event bubbling or explicit binding
                        // For now, simpler to just re-render or let the click handler handle class
                        // Since we pass name string, we just look for text match or assume event.target
                        // But for simplicity in this prototype:
                        const items = document.querySelectorAll('.contact-item');
                        items.forEach(item => {
                            if (item.querySelector('h4').textContent === name) item.classList.add('active');
                        });
                    }

                    // Messaging Features
                    function startNewMessage() {
                        const name = prompt("Enter student name to message:");
                        if (name) {
                            switchContact(name);
                            showToast(`Started new chat with \${name}`, 'success');
                        }
                    }

                    function viewCurrentContactProfile() {
                        const name = document.getElementById('currentContactName').textContent;
                        // Reuse student detail modal? First find the student
                        const student = students.find(s => s.name === name);
                        if (student) {
                            openStudentDetail(student.id);
                        } else {
                            // If not in student list (e.g. "Web Dev Class"), show basic info
                            showToast(`Profile for ${name}: No detailed records found.`, 'info');
                        }
                    }

                    // Mock Student Detail Navigation
                    function openStudentDetail(id) {
                        const student = students.find(s => s.id === id);
                        if (student) {
                            document.getElementById('detailName').textContent = student.name;
                            document.getElementById('detailEmail').textContent = student.email;
                            document.getElementById('detailSidebarName').textContent = student.name;
                            document.getElementById('detailSidebarCourse').textContent = student.course;
                            document.getElementById('detailGradePill').textContent = student.grade;
                            document.getElementById('detailAvatar').textContent = student.name.split(' ').map(n => n[0]).join('');

                            // Populate dynamic sections
                            renderDetailAssignments(student);
                            renderDetailCourses(student);

                            // Reset to overview tab
                            switchStudentTab('overview');
                        }
                        navigateTo({ preventDefault: () => { } }, 'student-detail');
                    }

                    function switchStudentTab(tabId) {
                        // Update links
                        document.querySelectorAll('.tab-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.textContent.toLowerCase() === tabId) link.classList.add('active');
                        });

                        // Update content
                        document.querySelectorAll('.tab-content').forEach(content => {
                            content.classList.remove('active');
                        });
                        document.getElementById(`tab-${tabId}`).classList.add('active');
                    }

                    function renderDetailAssignments(student) {
                        const tbody = document.getElementById('detailAssignmentsTable');
                        tbody.innerHTML = `
                <tr>
                    <td>Web Dev Project</td>
                    <td><span class="badge badge-success">Graded</span></td>
                    <td>95/100</td>
                    <td>2 days ago</td>
                </tr>
                <tr>
                    <td>React Basics</td>
                    <td><span class="badge badge-success">Graded</span></td>
                    <td>88/100</td>
                    <td>1 week ago</td>
                </tr>
                <tr>
                    <td>CSS Grid</td>
                    <td><span class="badge badge-warning">Delayed</span></td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;
                    }

                    function renderDetailCourses(student) {
                        const container = document.getElementById('detailCourses');
                        container.innerHTML = `
                <div class="upcoming-item">
                    <div class="upcoming-info">
                        <h4>${student.course}</h4>
                        <p>Core Curriculum • Active</p>
                    </div>
                    <div class="upcoming-status">Enrolled</div>
                </div>
                <div class="upcoming-item">
                    <div class="upcoming-info">
                        <h4>UI/UX Fundamentals</h4>
                        <p>Elective • Completed</p>
                    </div>
                    <div class="upcoming-status status-closed">Completed</div>
                </div>
            `;
                    }

                    // Student Data CRUD (Mock)
                    function openAddModal() {
                        editingId = null;
                        document.getElementById('modalTitle').textContent = 'Enroll New Student';
                        document.getElementById('studentForm').reset();
                        document.getElementById('studentModal').classList.add('active');
                    }

                    function editStudent(id) {
                        editingId = id;
                        const student = students.find(s => s.id === id);

                        document.getElementById('modalTitle').textContent = 'Edit Student Enrollment';
                        document.getElementById('studentName').value = student.name;
                        document.getElementById('studentEmail').value = student.email;
                        document.getElementById('studentCourse').value = student.course;
                        document.getElementById('studentGrade').value = student.grade;
                        document.getElementById('studentModal').classList.add('active');
                    }

                    function saveStudent(event) {
                        event.preventDefault();

                        const studentData = {
                            name: document.getElementById('studentName').value,
                            email: document.getElementById('studentEmail').value,
                            course: document.getElementById('studentCourse').value,
                            grade: document.getElementById('studentGrade').value,
                            progress: Math.floor(Math.random() * 30) + 70,
                            status: 'Active'
                        };

                        if (editingId) {
                            const index = students.findIndex(s => s.id === editingId);
                            students[index] = { ...students[index], ...studentData };
                            showToast(`Student ${studentData.name} updated successfully`, 'success');
                        } else {
                            studentData.id = students.length + 1;
                            students.push(studentData);
                            showToast(`Student ${studentData.name} enrolled`, 'success');
                        }

                        closeModal();
                        renderStudents();
                    }

                    function deleteStudent(id) {
                        if (confirm('Are you sure you want to remove this student from the course?')) {
                            students = students.filter(s => s.id !== id);
                            renderStudents();
                            showToast('Student removed from course', 'info');
                        }
                    }

                    function closeModal() {
                        document.getElementById('studentModal').classList.remove('active');
                    }

                    function exportData() {
                        showToast('Downloading roster as CSV...', 'info');
                    }

                    // Close modal on outside click
                    document.getElementById('studentModal').addEventListener('click', function (e) {
                        if (e.target === this) {
                            closeModal();
                        }
                    });

                    document.getElementById('syllabusModal').addEventListener('click', function (e) {
                        if (e.target === this) {
                            closeSyllabusModal();
                        }
                    });

                    // Initialize
                    renderStudents();
                    renderCourses();

                    // ==========================================
                    // STREAMING LOGIC (Google Meet Style)
                    // ==========================================

                    let mediaStream = null;
                    let screenStream = null;
                    let isMicOn = true;
                    let isCamOn = true;

                    async function toggleStream() {
                        const videoElement = document.getElementById('webcamFeed');
                        const status = document.getElementById('streamStatus');
                        const text = document.getElementById('streamText');
                        const placeholder = document.getElementById('videoPlaceholder');
                        const controls = document.querySelector('.meet-controls-bar');

                        if (!mediaStream && !screenStream) {
                            // Start Camera Stream
                            try {
                                status.textContent = 'Connecting...';
                                mediaStream = await navigator.mediaDevices.getUserMedia({
                                    video: { width: { ideal: 1280 }, height: { ideal: 720 } },
                                    audio: true
                                });

                                videoElement.srcObject = mediaStream;
                                videoElement.onloadedmetadata = () => {
                                    videoElement.play();
                                };
                                videoElement.classList.add('active');

                                // Hide placeholder, show controls
                                if (placeholder) placeholder.style.display = 'none';
                                if (controls) controls.style.opacity = '1';

                                status.textContent = 'Live • 720p';
                                text.textContent = 'Braodcasting';
                                showToast('You joined the call', 'success');

                            } catch (err) {
                                console.error("Error accessing webcam: ", err);
                                showToast('Could not access camera: ' + err.message, 'error');
                            }
                        } else {
                            // End Call / Stop Stream
                            stopMediaStream();
                            if (screenStream) stopScreenShare();

                            if (placeholder) placeholder.style.display = 'flex';
                            status.textContent = 'Ready to join?';
                            text.textContent = 'Click "Start Camera" to begin.';
                            showToast('You left the call', 'info');
                        }
                    }

                    function stopMediaStream() {
                        const videoElement = document.getElementById('webcamFeed');
                        if (mediaStream) {
                            mediaStream.getTracks().forEach(track => track.stop());
                            mediaStream = null;
                        }
                        videoElement.srcObject = null;
                        videoElement.classList.remove('active');
                    }

                    async function toggleScreenShare() {
                        const videoElement = document.getElementById('webcamFeed');
                        const overlay = document.getElementById('screenShareOverlay');
                        const shareBtn = document.getElementById('shareBtn');
                        const placeholder = document.getElementById('videoPlaceholder');

                        try {
                            if (screenStream) {
                                stopScreenShare();
                                return;
                            }

                            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

                            // If webcam was on, pause it (or just switch view)
                            // In meet, you usually see your screen. For this prototype, we replace the video feed.

                            videoElement.srcObject = screenStream;
                            videoElement.play();
                            videoElement.classList.add('active');
                            if (placeholder) placeholder.style.display = 'none'; // Ensure placeholder is gone

                            if (overlay) overlay.style.display = 'flex';
                            shareBtn.classList.add('active'); // Use active class for 'on' state

                            // Handle system stop
                            screenStream.getVideoTracks()[0].onended = () => {
                                stopScreenShare();
                            };

                            showToast('You are presenting your screen', 'success');

                        } catch (err) {
                            console.error("Error sharing screen: ", err);
                            showToast('Screen share cancelled.', 'error');
                        }
                    }

                    function stopScreenShare() {
                        const videoElement = document.getElementById('webcamFeed');
                        const overlay = document.getElementById('screenShareOverlay');
                        const shareBtn = document.getElementById('shareBtn');

                        if (screenStream) {
                            screenStream.getTracks().forEach(track => track.stop());
                            screenStream = null;
                        }

                        if (overlay) overlay.style.display = 'none';
                        shareBtn.classList.remove('active');

                        // Restore webcam if it was active
                        // Restore webcam if it was active
                        if (mediaStream) {
                            videoElement.srcObject = mediaStream;
                            videoElement.play();
                            videoElement.classList.add('active');
                        } else {
                            videoElement.srcObject = null;
                            videoElement.classList.remove('active');
                            if (document.getElementById('videoPlaceholder')) {
                                document.getElementById('videoPlaceholder').style.display = 'flex';
                            }
                        }

                        showToast('Stopped presenting', 'info');
                    }

                    function toggleMic() {
                        const btn = document.getElementById('micBtn');
                        if (mediaStream) {
                            const audioTrack = mediaStream.getAudioTracks()[0];
                            if (audioTrack) {
                                isMicOn = !isMicOn;
                                audioTrack.enabled = isMicOn;
                                btn.classList.toggle('active', !isMicOn); // Red if off
                                btn.innerHTML = isMicOn ? '🎤' : '🔇';
                                showToast(`Microphone ${isMicOn ? 'on' : 'off'}`, 'info');
                            }
                        } else {
                            showToast('Join the call first to use microphone', 'warning');
                        }
                    }

                    function toggleCam() {
                        const btn = document.getElementById('camBtn');
                        const videoElement = document.getElementById('webcamFeed');
                        const placeholder = document.getElementById('videoPlaceholder');

                        if (mediaStream) {
                            const videoTrack = mediaStream.getVideoTracks()[0];
                            if (videoTrack) {
                                isCamOn = !isCamOn;
                                videoTrack.enabled = isCamOn;
                                btn.classList.toggle('active', !isCamOn); // Red if off
                                btn.innerHTML = isCamOn ? '📹' : '📷'; // Change icon? 

                                // Visual feedback for local user
                                videoElement.style.opacity = isCamOn ? '1' : '0';
                                // If cam is off, maybe show avatar in placeholder? 
                                // For now, simple opacity toggle.

                                showToast(`Camera ${isCamOn ? 'on' : 'off'}`, 'info');
                            }
                        } else {
                            // If not in call, maybe this starts the call?
                            showToast('Join the call first to use camera', 'warning');
                        }
                    }

                    // ==========================================
                    // DETAILED VIEWS LOGIC
                    // ==========================================

                    function handleFileUpload(input) {
                        const text = document.getElementById('uploadText');
                        if (input.files && input.files[0]) {
                            text.textContent = `📄 ${input.files[0].name}`;
                            text.style.color = '#3b82f6';
                            text.style.fontWeight = '500';
                        }
                    }

                    function openCourseDetail(courseId) {
                        const course = courses.find(c => c.id === courseId);
                        if (!course) return;

                        document.getElementById('cdTitle').textContent = course.title;

                        // Mock Modules
                        const modulesContainer = document.getElementById('cdModules');
                        modulesContainer.innerHTML = `
                <div class="upcoming-item">
                    <div class="upcoming-info">
                        <h4>Module 1: Introduction</h4>
                        <p>Completed • 4 Lessons</p>
                    </div>
                    <div class="upcoming-status badge-success">Done</div>
                </div>
                <div class="upcoming-item">
                    <div class="upcoming-info">
                        <h4>Module 2: Core Concepts</h4>
                        <p>In Progress • 2/6 Lessons</p>
                    </div>
                    <div class="upcoming-status badge-warning">Active</div>
                </div>
                <div class="upcoming-item">
                    <div class="upcoming-info">
                        <h4>Module 3: Advanced Topics</h4>
                        <p>Locked</p>
                    </div>
                    <div class="upcoming-status">Locked</div>
                </div>
            `;

                        navigateTo(null, 'course-detail');
                    }

                    function openAssignmentDetail(title) {
                        document.getElementById('adTitle').textContent = title;

                        const tbody = document.getElementById('adBody');
                        tbody.innerHTML = '';

                        // Mock Submissions
                        const submissions = [
                            { name: 'Emma Johnson', status: 'Submitted', file: 'project_final.zip', grade: '95/100' },
                            { name: 'Michael Chen', status: 'Grading', file: 'analysis.pdf', grade: '-' },
                            { name: 'Sarah Williams', status: 'Late', file: 'ui_mockups.fig', grade: '85/100' },
                        ];

                        submissions.forEach(sub => {
                            const statusClass = sub.status === 'Submitted' ? 'badge-success' : sub.status === 'Late' ? 'badge-danger' : 'badge-warning';
                            tbody.innerHTML += `
                    <tr>
                        <td>\${sub.name}</td>
                        <td><span class="badge \${statusClass}">\${sub.status}</span></td>
                        <td><a href="#" style="color: #3b82f6;">\${sub.file}</a></td>
                        <td>
                             \${sub.grade === '-' ? '<button class="btn-sm btn-primary">Grade</button>' : sub.grade}
                        </td>
                    </tr>
                `;
                        });

                        navigateTo(null, 'assignment-detail');
                    }
                </script>
                <script src="${pageContext.request.contextPath}/js/toast.js"></script>
                <script>
                    document.addEventListener('DOMContentLoaded', function () {
                        const errorMsg = "${error}";
                        if (errorMsg && errorMsg.trim() !== "" && errorMsg !== "null") {
                            showMessage('error', errorMsg);
                        }
                        const successMsg = "${success}";
                        if (successMsg && successMsg.trim() !== "" && successMsg !== "null") {
                            showMessage('success', successMsg);
                        }
                    });
                </script>
                <script>
                    // Real-Time WebSocket Connection
                    (function () {
                        let ws;
                        function connectWebSocket() {
                            const userId = '${teacher.id}';
                            if (!userId) return;

                            const host = window.location.host;
                            const ctx = '${pageContext.request.contextPath}';
                            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                            const wsUrl = protocol + '//' + host + ctx + '/ws/assignments/' + userId;

                            ws = new WebSocket(wsUrl);

                            ws.onopen = function () {
                                console.log("Connected to real-time notification service (Teacher)");
                            };

                            ws.onmessage = function (event) {
                                try {
                                    const data = JSON.parse(event.data);
                                    if (data.type === 'NEW_SUBMISSION') {
                                        showMessage('success', `New submission from ${data.studentName} for: ${data.assignmentTitle}`);

                                        // Update stats slightly if requested
                                        // If they are on the assignment page, we could refresh it dynamically
                                        // In a real scenario you would update the DOM elements for that specific assignment's submissions count
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