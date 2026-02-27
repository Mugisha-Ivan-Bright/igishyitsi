<%@ page contentType="text/html; charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy"
            content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://fonts.googleapis.com https://fonts.gstatic.com;">
        <title>School Admin - Igishyitsi</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet">
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/css/schoolAdmin.css?v=${pageContext.session.creationTime}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/toast.css">
    </head>

    <body>
        <!-- Toast Container -->
        <div id="toastContainer" class="toast-container"></div>

        <!-- Universal Modal -->
        <div id="universalModal" class="modal">
            <div class="modal-overlay" onclick="closeModal()"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2 id="modalTitle">Modal Title</h2>
                    <button class="modal-close" onclick="closeModal()">✕</button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Dynamic content will be inserted here -->
                </div>
                <div class="modal-footer" id="modalFooter">
                    <!-- Dynamic buttons will be inserted here -->
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
                <div class="logo-icon">🎓</div>
                <h1>IGISHYITSI ADMIN</h1>
            </div>
            <nav>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link active" onclick="navigateTo(event, 'dashboard')">
                            <span class="nav-icon">📊</span>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <!-- User Management -->
                    <li class="nav-item has-submenu">
                        <a href="#" class="nav-link" onclick="toggleSubmenu(event, 'user-management')">
                            <span class="nav-icon">👥</span>
                            <span>User Management</span>
                            <span class="submenu-arrow">›</span>
                        </a>
                        <ul class="submenu" id="user-management">
                            <li><a href="#" onclick="navigateTo(event, 'students')">Students</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'teachers')">Teachers</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'parents')">Parents</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'staff')">Staff</a></li>
                        </ul>
                    </li>

                    <!-- Academic Management -->
                    <li class="nav-item has-submenu">
                        <a href="#" class="nav-link" onclick="toggleSubmenu(event, 'academic-management')">
                            <span class="nav-icon">📚</span>
                            <span>Academic</span>
                            <span class="submenu-arrow">›</span>
                        </a>
                        <ul class="submenu" id="academic-management">
                            <li><a href="#" onclick="navigateTo(event, 'classes')">Class Management</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'subjects')">Subject Management</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'assignments')">Teacher Assignments</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'enrollment')">Student Enrollment</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'timetable')">Timetable</a></li>
                        </ul>
                    </li>

                    <!-- Operations -->
                    <li class="nav-item has-submenu">
                        <a href="#" class="nav-link" onclick="toggleSubmenu(event, 'operations')">
                            <span class="nav-icon">⚙️</span>
                            <span>Operations</span>
                            <span class="submenu-arrow">›</span>
                        </a>
                        <ul class="submenu" id="operations">
                            <li><a href="#" onclick="navigateTo(event, 'attendance')">Attendance</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'exams')">Exam Management</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'results')">Results</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'announcements')">Announcements</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" onclick="navigateTo(event, 'calendar')">
                            <span class="nav-icon">📅</span>
                            <span>School Calendar</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" onclick="navigateTo(event, 'reports')">
                            <span class="nav-icon">📈</span>
                            <span>Reports & Analytics</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" onclick="navigateTo(event, 'fees')">
                            <span class="nav-icon">💰</span>
                            <span>Fees / Payments</span>
                        </a>
                    </li>

                    <!-- System -->
                    <li class="nav-item has-submenu">
                        <a href="#" class="nav-link" onclick="toggleSubmenu(event, 'system')">
                            <span class="nav-icon">🔧</span>
                            <span>System</span>
                            <span class="submenu-arrow">›</span>
                        </a>
                        <ul class="submenu" id="system">
                            <li><a href="#" onclick="navigateTo(event, 'settings')">System Settings</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'roles')">Roles & Permissions</a></li>
                            <li><a href="#" onclick="navigateTo(event, 'backup')">Backup & Logs</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" onclick="navigateTo(event, 'profile')">
                            <span class="nav-icon">👤</span>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" onclick="handleLogout(event)">
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
                <header class="header">
                    <div class="header-title">
                        <h2>Dashboard Overview</h2>
                        <p class="header-subtitle">Welcome back! Here's what's happening in your school</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="refreshDashboard()">🔄 Refresh</button>
                    </div>
                </header>

                <!-- Stats Grid -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-content">
                            <div class="stat-label">Total Students</div>
                            <div class="stat-value" id="totalStudents">${stats.students}</div>
                            <div class="stat-change positive">↑ 12% from last year</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-content">
                            <div class="stat-label">Total Teachers</div>
                            <div class="stat-value" id="totalTeachers">${stat.teachers}</div>
                            <div class="stat-change positive">↑ 5% from last year</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-content">
                            <div class="stat-label">Classes</div>
                            <div class="stat-value" id="totalClasses">42</div>
                            <div class="stat-change">Across 12 grades</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-content">
                            <div class="stat-label">Attendance Today</div>
                            <div class="stat-value" id="attendanceToday">94%</div>
                            <div class="stat-change positive">↑ 2% from yesterday</div>
                        </div>
                    </div>
                </div>

                <!-- Dashboard Grid -->
                <div class="dashboard-grid">
                    <div class="section-card">
                        <div class="section-header">
                            <h3 class="section-title">Recent Activity</h3>
                        </div>
                        <div class="activity-feed" id="activityFeed"></div>
                    </div>

                    <div class="section-card">
                        <div class="section-header">
                            <h3 class="section-title">Upcoming Events</h3>
                        </div>
                        <div class="events-list" id="upcomingEvents"></div>
                    </div>
                </div>
            </div>

            <!-- Students Section -->
            <div id="students" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Students Management</h2>
                        <p class="header-subtitle">Manage all student records and information</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('students')">📥 Export</button>
                        <button class="btn btn-primary" onclick="showAddModal('student')">➕ Add Student</button>
                    </div>
                </header>

                <div class="stats-grid">
                    <div class="stat-card" onclick="filterBy('students', 'all')">
                        <div class="stat-label">Total Students</div>
                        <div class="stat-value">1,247</div>
                    </div>
                    <div class="stat-card" onclick="filterBy('students', 'active')">
                        <div class="stat-label">Active</div>
                        <div class="stat-value">1,189</div>
                    </div>
                    <div class="stat-card" onclick="filterBy('students', 'new')">
                        <div class="stat-label">New This Year</div>
                        <div class="stat-value">156</div>
                    </div>
                    <div class="stat-card" onclick="filterBy('students', 'inactive')">
                        <div class="stat-label">Inactive</div>
                        <div class="stat-value">58</div>
                    </div>
                </div>

                <div class="controls">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="studentSearch" placeholder="Search by name, ID, or email..."
                            onkeyup="filterTable('students')">
                    </div>
                    <select id="studentClassFilter" onchange="filterTable('students')">
                        <option value="">All Classes</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                    </select>
                    <select id="studentStatusFilter" onchange="filterTable('students')">
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div class="table-container">
                    <table id="studentsTable">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="studentsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Teachers Section -->
            <div id="teachers" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Teachers Management</h2>
                        <p class="header-subtitle">Manage teaching staff and assignments</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('teachers')">📥 Export</button>
                        <button class="btn btn-primary" onclick="showAddModal('teacher')">➕ Add Teacher</button>
                    </div>
                </header>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Teachers</div>
                        <div class="stat-value">87</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Full-Time</div>
                        <div class="stat-value">72</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Part-Time</div>
                        <div class="stat-value">15</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Avg. Experience</div>
                        <div class="stat-value">8.5 yrs</div>
                    </div>
                </div>

                <div class="controls">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="teacherSearch" placeholder="Search teachers..."
                            onkeyup="filterTable('teachers')">
                    </div>
                    <select id="teacherDeptFilter" onchange="filterTable('teachers')">
                        <option value="">All Departments</option>
                        <option value="Science">Science</option>
                        <option value="Math">Mathematics</option>
                        <option value="English">English</option>
                    </select>
                </div>

                <div class="table-container">
                    <table id="teachersTable">
                        <thead>
                            <tr>
                                <th>Teacher ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Subjects</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="teachersTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Parents Section -->
            <div id="parents" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Parents Management</h2>
                        <p class="header-subtitle">Manage parent accounts and student relationships</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('parents')">📥 Export</button>
                        <button class="btn btn-primary" onclick="showAddModal('parent')">➕ Add Parent</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="parentsTable">
                        <thead>
                            <tr>
                                <th>Parent Name</th>
                                <th>Student(s)</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="parentsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Staff Section -->
            <div id="staff" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Staff Management</h2>
                        <p class="header-subtitle">Manage non-teaching staff members</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('staff')">📥 Export</button>
                        <button class="btn btn-primary" onclick="showAddModal('staff')">➕ Add Staff</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="staffTable">
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="staffTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Classes Section -->
            <div id="classes" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Class Management</h2>
                        <p class="header-subtitle">Manage classes and sections</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('class')">➕ Add Class</button>
                    </div>
                </header>

                <div class="classes-grid" id="classesGrid"></div>
            </div>

            <!-- Subjects Section -->
            <div id="subjects" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Subject Management</h2>
                        <p class="header-subtitle">Manage subjects and curriculum</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('subject')">➕ Add Subject</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="subjectsTable">
                        <thead>
                            <tr>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Department</th>
                                <th>Credits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="subjectsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Teacher Assignments Section -->
            <div id="assignments" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Teacher Assignments</h2>
                        <p class="header-subtitle">Assign teachers to classes and subjects</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('assignment')">➕ New Assignment</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="assignmentsTable">
                        <thead>
                            <tr>
                                <th>Teacher</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Schedule</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="assignmentsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Student Enrollment Section -->
            <div id="enrollment" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Student Enrollment</h2>
                        <p class="header-subtitle">Enroll students in classes and subjects</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('enrollment')">➕ Enroll Student</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="enrollmentTable">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Subjects</th>
                                <th>Enrollment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="enrollmentTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Timetable Section -->
            <div id="timetable" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Timetable Management</h2>
                        <p class="header-subtitle">Create and manage class schedules</p>
                    </div>
                    <div class="header-actions">
                        <select id="timetableClassSelect" onchange="loadTimetable()">
                            <option value="">Select Class</option>
                        </select>
                        <button class="btn btn-secondary" onclick="exportData('timetable')">📥 Export</button>
                    </div>
                </header>

                <div class="timetable-grid" id="timetableGrid"></div>
            </div>

            <!-- Attendance Section -->
            <div id="attendance" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Attendance Overview</h2>
                        <p class="header-subtitle">Track and manage student attendance</p>
                    </div>
                    <div class="header-actions">
                        <input type="date" id="attendanceDate" onchange="loadAttendance()">
                        <button class="btn btn-primary" onclick="markAttendance()">✓ Mark Attendance</button>
                    </div>
                </header>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Present Today</div>
                        <div class="stat-value">1,172</div>
                        <div class="stat-change positive">94%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Absent</div>
                        <div class="stat-value">75</div>
                        <div class="stat-change">6%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Late</div>
                        <div class="stat-value">23</div>
                        <div class="stat-change">1.8%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Avg. Attendance</div>
                        <div class="stat-value">93.5%</div>
                        <div class="stat-change positive">This month</div>
                    </div>
                </div>

                <div class="table-container">
                    <table id="attendanceTable">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="attendanceTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Exams Section -->
            <div id="exams" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Exam Management</h2>
                        <p class="header-subtitle">Create and manage examinations</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('exam')">➕ Create Exam</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="examsTable">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="examsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Results Section -->
            <div id="results" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Results Management</h2>
                        <p class="header-subtitle">Enter and manage exam results</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('results')">📥 Export Results</button>
                        <button class="btn btn-primary" onclick="showAddModal('result')">➕ Enter Results</button>
                    </div>
                </header>

                <div class="table-container">
                    <table id="resultsTable">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Exam</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="resultsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Announcements Section -->
            <div id="announcements" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Announcements</h2>
                        <p class="header-subtitle">Create and manage school announcements</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('announcement')">➕ New
                            Announcement</button>
                    </div>
                </header>

                <div class="announcements-grid" id="announcementsGrid"></div>
            </div>

            <!-- Calendar Section -->
            <div id="calendar" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>School Calendar</h2>
                        <p class="header-subtitle">Manage events, holidays, and important dates</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('event')">➕ Add Event</button>
                    </div>
                </header>

                <div class="calendar-container" id="calendarContainer"></div>
            </div>

            <!-- Reports Section -->
            <div id="reports" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Reports & Analytics</h2>
                        <p class="header-subtitle">Generate comprehensive reports</p>
                    </div>
                </header>

                <div class="reports-grid">
                    <div class="report-card" onclick="generateReport('students')">
                        <div class="report-icon">👨‍🎓</div>
                        <h3>Student Report</h3>
                        <p>Complete student data and performance</p>
                        <button class="btn btn-secondary">Generate</button>
                    </div>
                    <div class="report-card" onclick="generateReport('attendance')">
                        <div class="report-icon">📊</div>
                        <h3>Attendance Report</h3>
                        <p>Attendance statistics and trends</p>
                        <button class="btn btn-secondary">Generate</button>
                    </div>
                    <div class="report-card" onclick="generateReport('academic')">
                        <div class="report-icon">📚</div>
                        <h3>Academic Report</h3>
                        <p>Exam results and performance analysis</p>
                        <button class="btn btn-secondary">Generate</button>
                    </div>
                    <div class="report-card" onclick="generateReport('financial')">
                        <div class="report-icon">💰</div>
                        <h3>Financial Report</h3>
                        <p>Fee collection and payment status</p>
                        <button class="btn btn-secondary">Generate</button>
                    </div>
                </div>
            </div>

            <!-- Fees Section -->
            <div id="fees" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Fees / Payments</h2>
                        <p class="header-subtitle">Manage fee structure and payments</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="exportData('fees')">📥 Export</button>
                        <button class="btn btn-primary" onclick="showAddModal('payment')">➕ Record Payment</button>
                    </div>
                </header>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Collected</div>
                        <div class="stat-value">$2.4M</div>
                        <div class="stat-change positive">This year</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Pending</div>
                        <div class="stat-value">$340K</div>
                        <div class="stat-change">Outstanding</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">This Month</div>
                        <div class="stat-value">$185K</div>
                        <div class="stat-change positive">↑ 12%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Collection Rate</div>
                        <div class="stat-value">87%</div>
                        <div class="stat-change positive">On track</div>
                    </div>
                </div>

                <div class="table-container">
                    <table id="feesTable">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Total Fee</th>
                                <th>Paid</th>
                                <th>Pending</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="feesTableBody"></tbody>
                    </table>
                </div>
            </div>

            <!-- Settings Section -->
            <div id="settings" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>System Settings</h2>
                        <p class="header-subtitle">Configure system-wide settings</p>
                    </div>
                </header>

                <div class="settings-grid">
                    <div class="section-card">
                        <h3>School Information</h3>
                        <div class="settings-form">
                            <div class="form-group">
                                <label for="schoolName">School Name</label>
                                <input type="text" value="Igishyitsi International School" id="schoolName">
                            </div>
                            <div class="form-group">
                                <label for="schoolEmail">Email</label>
                                <input type="email" value="admin@igishyitsi.edu" id="schoolEmail">
                            </div>
                            <div class="form-group">
                                <label for="schoolPhone">Phone</label>
                                <input type="tel" value="+1 234 567 8900" id="schoolPhone">
                            </div>
                            <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                        </div>
                    </div>

                    <div class="section-card">
                        <h3>Academic Year</h3>
                        <div class="settings-form">
                            <div class="form-group">
                                <label for="academicYear">Current Year</label>
                                <input type="text" value="2023-2024" id="academicYear">
                            </div>
                            <div class="form-group">
                                <label for="yearStart">Start Date</label>
                                <input type="date" value="2023-09-01" id="yearStart">
                            </div>
                            <div class="form-group">
                                <label for="yearEnd">End Date</label>
                                <input type="date" value="2024-06-30" id="yearEnd">
                            </div>
                            <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Roles Section -->
            <div id="roles" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Roles & Permissions</h2>
                        <p class="header-subtitle">Manage user roles and access control</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="showAddModal('role')">➕ Add Role</button>
                    </div>
                </header>

                <div class="roles-grid" id="rolesGrid"></div>
            </div>

            <!-- Backup Section -->
            <div id="backup" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>Backup & Logs</h2>
                        <p class="header-subtitle">System backups and activity logs</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="createBackup()">💾 Create Backup</button>
                    </div>
                </header>

                <div class="dashboard-grid">
                    <div class="section-card">
                        <h3>Recent Backups</h3>
                        <div class="backup-list" id="backupList"></div>
                    </div>

                    <div class="section-card">
                        <h3>Activity Logs</h3>
                        <div class="logs-list" id="logsList"></div>
                    </div>
                </div>
            </div>

            <!-- Profile Section -->
            <div id="profile" class="content-section">
                <header class="header">
                    <div class="header-title">
                        <h2>My Profile</h2>
                        <p class="header-subtitle">Manage your account settings</p>
                    </div>
                </header>

                <div class="profile-container">
                    <div class="section-card">
                        <div class="profile-header">
                            <div class="profile-avatar-large">AD</div>
                            <h3>Admin User</h3>
                            <p>Super Administrator</p>
                        </div>
                        <div class="settings-form">
                            <div class="form-group">
                                <label for="profileName">Full Name</label>
                                <input type="text" value="Admin User" id="profileName">
                            </div>
                            <div class="form-group">
                                <label for="profileEmail">Email</label>
                                <input type="email" value="admin@igishyitsi.edu" id="profileEmail">
                            </div>
                            <div class="form-group">
                                <label for="profilePhone">Phone</label>
                                <input type="tel" value="+1 234 567 8900" id="profilePhone">
                            </div>
                            <div class="form-group">
                                <label for="profilePassword">New Password</label>
                                <input type="password" placeholder="Leave blank to keep current" id="profilePassword">
                            </div>
                            <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script src="${pageContext.request.contextPath}/js/toast.js"></script>
        <script src="${pageContext.request.contextPath}/js/schoolAdmin.js"></script>
        <script>
            const contextPath = "${pageContext.request.contextPath}";
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
    </body>

    </html>