// School Admin Dashboard - Complete Functionality
console.log('School Admin Dashboard loaded successfully!');

// Global State with Extensive Dummy Data
// Global State - Initialized from server if available, else fallback to dummy
const schoolState = {
    currentUser: window.serverData?.currentUser || { name: 'Admin User', role: 'Super Admin', avatar: 'AD' },

    users: window.serverData?.users || [],
    students: window.serverData?.students || [],
    teachers: window.serverData?.teachers || [],
    classes: window.serverData?.classes || [],
    subjects: window.serverData?.subjects || [],
    assignments: window.serverData?.assignments || [],
    enrollments: window.serverData?.enrollments || [],
    logs: window.serverData?.logs || [],
    events: [],
    announcements: window.serverData?.announcements || []
};

// Data Generation Functions
// Data generation functions removed as we are now using real data.

// Navigation Functions
// Navigation Functions
function navigateTo(event, sectionId) {
    if (event) event.preventDefault();

    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.submenu a').forEach(l => l.classList.remove('active'));

    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active');

    const navLink = document.querySelector(`.nav-link[onclick*="${sectionId}"]`);
    if (navLink) navLink.classList.add('active');

    const submenuLink = document.querySelector(`.submenu a[onclick*="${sectionId}"]`);
    if (submenuLink) {
        submenuLink.classList.add('active');
        const parentSubmenu = submenuLink.closest('.submenu');
        if (parentSubmenu) parentSubmenu.classList.add('open');
    }

    loadSectionData(sectionId);

    if (window.innerWidth <= 768) toggleSidebar();
}

function loadDashboard() {
    const feed = document.getElementById('activityFeed');
    if (feed) {
        if (schoolState.logs && schoolState.logs.length > 0) {
            feed.innerHTML = schoolState.logs.map(log => `
                <div class="activity-item">
                    <div class="activity-icon">📝</div>
                    <div class="activity-content">
                        <div class="activity-text"><strong>${log.user}</strong>: ${log.details}</div>
                        <div class="activity-time">${log.time}</div>
                    </div>
                </div>
            `).join('');
        } else {
            feed.innerHTML = '<div class="no-data">No recent activity found.</div>';
        }
    }
    updateStats();
}

function updateStats() {
    const stats = window.serverData?.stats || {};

    if (document.getElementById('stats-total-students')) {
        document.getElementById('stats-total-students').textContent = (stats.students || 0).toLocaleString();
        document.getElementById('stats-active-students').textContent = (stats.students || 0).toLocaleString(); // Simplified
    }

    if (document.getElementById('stats-total-teachers')) {
        document.getElementById('stats-total-teachers').textContent = (stats.teachers || 0).toLocaleString();
        document.getElementById('stats-full-teachers').textContent = (stats.teachers || 0).toLocaleString(); // Simplified
    }
}

function toggleSubmenu(event, submenuId) {
    event.preventDefault();
    const submenu = document.getElementById(submenuId);
    const parent = event.currentTarget.parentElement;

    submenu.classList.toggle('open');
    parent.classList.toggle('open');
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
}

function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard': loadDashboard(); break;
        case 'all-users': loadAllUsers(); break;
        case 'students': loadStudents(); break;
        case 'teachers': loadTeachers(); break;
        case 'classes': loadClasses(); break;
        case 'subjects': loadSubjects(); break;
        case 'assignments': loadAssignmentsTable(); break;
        case 'enrollment': loadEnrollment(); break;
        case 'timetable': loadTimetableSelect(); break;
        case 'attendance': loadAttendanceTable(); break;
        case 'exams': loadExams(); break;
        case 'results': loadResults(); break;
        case 'announcements': loadAnnouncements(); break;
        case 'calendar': loadCalendar(); break;
        case 'fees': loadFees(); break;
        case 'roles': loadRoles(); break;
        case 'backup': loadBackupLogs(); break;
    }
}

// Load Functions
function loadAllUsers() {
    const tbody = document.getElementById('allUsersTableBody');
    if (!tbody) return;

    if (schoolState.users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No users found in database.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td><span class="badge badge-info">${user.role}</span></td>
            <td>
                <select onchange="updateUserRole(${user.id}, this.value)" class="role-selector">
                    <option value="STUDENT" ${user.role === 'STUDENT' ? 'selected' : ''}>Student</option>
                    <option value="TEACHER" ${user.role === 'TEACHER' ? 'selected' : ''}>Teacher</option>
                    <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>Admin</option>
                </select>
            </td>
        </tr>
    `).join('');
}

async function updateUserRole(userId, newRole) {
    try {
        const response = await fetch(`${contextPath}/admin/api?action=updateRole`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `userId=${userId}&role=${newRole}`
        });
        const result = await response.json();
        if (result.success) {
            showToast('User role updated successfully!', 'success');
            // Update local state and refresh
            const user = schoolState.users.find(u => u.id == userId);
            if (user) user.role = newRole;
            loadAllUsers();
        } else {
            showToast(result.message || 'Error updating role', 'error');
        }
    } catch (e) {
        showToast('Error connecting to server', 'error');
    }
}

function loadStudents() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    if (schoolState.students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No students found in database.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.students.map(student => `
        <tr>
            <td>STU${String(student.id).padStart(4, '0')}</td>
            <td>${student.name}</td>
            <td>${student.class || 'Unassigned'}</td>
            <td>${student.email}</td>
            <td><span class="badge badge-${(student.status || 'Active').toLowerCase()}">${student.status || 'Active'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('student', '${student.id}')">View</button>
                    <button class="action-btn" onclick="editItem('student', '${student.id}')">Edit</button>
                    <button class="action-btn" onclick="deleteItem('student', '${student.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadTeachers() {
    const tbody = document.getElementById('teachersTableBody');
    if (!tbody) return;

    if (schoolState.teachers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No teachers found in database.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.teachers.map(teacher => `
        <tr>
            <td>TCH${String(teacher.id).padStart(3, '0')}</td>
            <td>${teacher.name}</td>
            <td>${teacher.department || 'General'}</td>
            <td>${teacher.subjects || 'N/A'}</td>
            <td>${teacher.email}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('teacher', '${teacher.id}')">View</button>
                    <button class="action-btn" onclick="editItem('teacher', '${teacher.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadClasses() {
    const grid = document.getElementById('classesGrid');
    if (!grid) return;

    if (schoolState.classes.length === 0) {
        grid.innerHTML = '<div class="no-data">No classes defined.</div>';
        return;
    }

    grid.innerHTML = schoolState.classes.map(cls => `
        <div class="class-card">
            <div class="class-title">${cls}</div>
            <div class="class-info">Academic Year: 2023-2024</div>
        </div>
    `).join('');
}

function loadSubjects() {
    const tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;

    if (schoolState.subjects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No subjects found.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.subjects.map(subject => `
        <tr>
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.department}</td>
            <td>${subject.credits}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editItem('subject', '${subject.id}')">Edit</button>
                    <button class="action-btn" onclick="deleteItem('subject', '${subject.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadAssignmentsTable() {
    const tbody = document.getElementById('assignmentsTableBody');
    if (!tbody) return;

    if (schoolState.assignments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No assignments found.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.assignments.map(asn => `
        <tr>
            <td>${asn.teacher.name}</td>
            <td>${asn.title}</td>
            <td>${asn.className}</td>
            <td>${new Date(asn.deadline).toLocaleString()}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('assignment', '${asn.id}')">View</button>
                    <button class="action-btn" onclick="deleteItem('assignment', '${asn.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadEnrollment() {
    const tbody = document.getElementById('enrollmentTableBody');
    if (!tbody) return;

    if (!schoolState.enrollments || schoolState.enrollments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No enrollment records found.</td></tr>';
        return;
    }

    tbody.innerHTML = schoolState.enrollments.map(enr => `
        <tr>
            <td>${enr.student.name}</td>
            <td>${enr.className}</td>
            <td>${enr.teacher.name}</td>
            <td>${enr.id}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('enrollment', '${enr.id}')">View</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadTimetableSelect() {
    const select = document.getElementById('timetableClassSelect');
    if (select && select.options.length === 1) {
        schoolState.classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            select.appendChild(option);
        });
    }
}

function loadTimetable() {
    const grid = document.getElementById('timetableGrid');
    if (!grid) return;

    grid.innerHTML = `
        <table class="timetable-table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>9:00 - 10:00</td>
                    <td><div class="period-cell">Mathematics</div></td>
                    <td><div class="period-cell">English</div></td>
                    <td><div class="period-cell">Science</div></td>
                    <td><div class="period-cell">History</div></td>
                    <td><div class="period-cell">Arts</div></td>
                </tr>
                <tr>
                    <td>10:00 - 11:00</td>
                    <td><div class="period-cell">Science</div></td>
                    <td><div class="period-cell">Mathematics</div></td>
                    <td><div class="period-cell">English</div></td>
                    <td><div class="period-cell">PE</div></td>
                    <td><div class="period-cell">History</div></td>
                </tr>
            </tbody>
        </table>
    `;
}

function loadAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.attendance.slice(0, 30).map(att => `
        <tr>
            <td>${att.student}</td>
            <td>${att.class}</td>
            <td><span class="badge badge-${att.status.toLowerCase()}">${att.status}</span></td>
            <td>${att.time}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editItem('attendance', '${att.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadExams() {
    const tbody = document.getElementById('examsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.exams.map(exam => `
        <tr>
            <td>${exam.name}</td>
            <td>${exam.subject}</td>
            <td>${exam.class}</td>
            <td>${exam.date}</td>
            <td>${exam.duration}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('exam', '${exam.id}')">View</button>
                    <button class="action-btn" onclick="editItem('exam', '${exam.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadResults() {
    const tbody = document.getElementById('resultsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.results.slice(0, 50).map(result => `
        <tr>
            <td>${result.student}</td>
            <td>${result.exam}</td>
            <td>${result.subject}</td>
            <td>${result.marks}</td>
            <td><span class="badge badge-active">${result.grade}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editItem('result', '${result.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadAnnouncements() {
    const grid = document.getElementById('announcementsGrid');
    if (!grid) return;

    if (!schoolState.announcements || schoolState.announcements.length === 0) {
        grid.innerHTML = '<p class="empty-message">No announcements found in database.</p>';
        return;
    }

    grid.innerHTML = schoolState.announcements.map(ann => `
        <div class="announcement-card">
            <div class="announcement-header">
                <div class="announcement-title"><h3>${ann.title}</h3></div>
                <div class="announcement-meta">
                    <span class="badge badge-info">${ann.audience || 'all'}</span>
                    <span class="badge badge-${ann.priority === 'urgent' ? 'danger' : (ann.priority === 'high' ? 'warning' : 'success')}">${ann.priority || 'normal'}</span>
                    <span class="announcement-date">${new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="announcement-content">${ann.content}</div>
            <div class="announcement-footer">
                <span class="announcement-author">By: ${ann.author?.name || 'Admin'}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteItem('announcement', '${ann.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="calendar-header">
            <h3>February 2024</h3>
            <div>
                <button class="btn btn-secondary">← Prev</button>
                <button class="btn btn-secondary">Next →</button>
            </div>
        </div>
        <div class="calendar-grid">
            ${Array.from({ length: 28 }, (_, i) => `
                <div class="calendar-day ${i === 4 ? 'today' : ''} ${i % 7 === 0 ? 'has-event' : ''}">${i + 1}</div>
            `).join('')}
        </div>
    `;
}

function loadFees() {
    const tbody = document.getElementById('feesTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.fees.slice(0, 30).map(fee => `
        <tr>
            <td>${fee.student}</td>
            <td>${fee.class}</td>
            <td>$${fee.totalFee}</td>
            <td>$${fee.paid}</td>
            <td>$${fee.pending}</td>
            <td><span class="badge badge-${fee.status === 'Paid' ? 'active' : 'pending'}">${fee.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('fee', '${fee.id}')">View</button>
                    <button class="action-btn" onclick="recordPayment('${fee.id}')">Pay</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadRoles() {
    const grid = document.getElementById('rolesGrid');
    if (!grid) return;

    grid.innerHTML = schoolState.roles.map(role => `
        <div class="role-card">
            <div class="role-title">${role.name}</div>
            <div class="role-permissions">${role.permissions}</div>
        </div>
    `).join('');
}

function loadBackupLogs() {
    const backupList = document.getElementById('backupList');
    const logsList = document.getElementById('logsList');

    if (backupList) {
        backupList.innerHTML = schoolState.backups.slice(0, 5).map(backup => `
            <div class="backup-item">
                <div class="backup-info">
                    <div class="backup-name">${backup.name}</div>
                    <div class="backup-date">${backup.date} - ${backup.size}</div>
                </div>
                <button class="btn btn-secondary" onclick="restoreBackup('${backup.id}')">Restore</button>
            </div>
        `).join('');
    }

    if (logsList) {
        logsList.innerHTML = schoolState.logs.slice(0, 10).map(log => `
            <div class="log-item">
                <div class="log-info">
                    <div class="log-action">${log.action}</div>
                    <div class="log-time">${log.time}</div>
                </div>
            </div>
        `).join('');
    }
}

// Modal Functions
function openModal(title, bodyContent, footerButtons = []) {
    const modal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    modalTitle.textContent = title;
    modalBody.innerHTML = bodyContent;
    modalFooter.innerHTML = footerButtons.map(btn =>
        `<button class="btn ${btn.class}" onclick="${btn.onclick}">${btn.text}</button>`
    ).join('');

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('universalModal');
    modal.classList.remove('active');
}

// View Item Functions
function viewItem(type, id) {
    const item = findItem(type, id);
    if (!item) return showToast('Item not found', 'error');

    let content = '';
    let title = '';

    switch (type) {
        case 'student':
            title = `Student Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Personal Information</h3>
                        <div class="detail-row"><span class="detail-label">Student ID</span><span class="detail-value">${item.id}</span></div>
                        <div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${item.email}</span></div>
                        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge badge-${item.status.toLowerCase()}">${item.status}</span></span></div>
                    </div>
                    <div class="detail-section">
                        <h3>Academic Information</h3>
                        <div class="detail-row"><span class="detail-label">Class</span><span class="detail-value">${item.class}</span></div>
                        <div class="detail-row"><span class="detail-label">Join Date</span><span class="detail-value">${item.joinDate}</span></div>
                        <div class="detail-row"><span class="detail-label">Attendance</span><span class="detail-value">94%</span></div>
                        <div class="detail-row"><span class="detail-label">GPA</span><span class="detail-value">3.8</span></div>
                    </div>
                </div>`;
            break;

        case 'teacher':
            title = `Teacher Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Personal Information</h3>
                        <div class="detail-row"><span class="detail-label">ID</span><span class="detail-value">${item.id}</span></div>
                        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${item.email}</span></div>
                        <div class="detail-row"><span class="detail-label">Experience</span><span class="detail-value">${item.experience} years</span></div>
                    </div>
                    <div class="detail-section">
                        <h3>Professional</h3>
                        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${item.department}</span></div>
                        <div class="detail-row"><span class="detail-label">Subjects</span><span class="detail-value">${item.subjects}</span></div>
                    </div>
                </div>`;
            break;

        case 'class':
            title = `Class Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Class Information</h3>
                        <div class="detail-row"><span class="detail-label">Class Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Teacher ID</span><span class="detail-value">${item.teacher}</span></div>
                        <div class="detail-row"><span class="detail-label">Capacity</span><span class="detail-value">${item.capacity}</span></div>
                    </div>
                </div>`;
            break;

        case 'subject':
            title = `Subject Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Subject Info</h3>
                        <div class="detail-row"><span class="detail-label">Code</span><span class="detail-value">${item.code}</span></div>
                        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${item.dept}</span></div>
                        <div class="detail-row"><span class="detail-label">Credits</span><span class="detail-value">${item.credits}</span></div>
                    </div>
                </div>`;
            break;

        case 'parent':
            title = `Parent Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Contact Info</h3>
                        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${item.phone}</span></div>
                        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${item.email}</span></div>
                    </div>
                    <div class="detail-section">
                        <h3>Children</h3>
                         <div class="detail-row"><span class="detail-label">IDs</span><span class="detail-value">${item.students.join(', ')}</span></div>
                    </div>
                </div>`;
            break;

        case 'staff':
            title = `Staff Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Details</h3>
                        <div class="detail-row"><span class="detail-label">ID</span><span class="detail-value">${item.id}</span></div>
                        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${item.name}</span></div>
                        <div class="detail-row"><span class="detail-label">Role</span><span class="detail-value">${item.role}</span></div>
                        <div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">${item.department}</span></div>
                        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${item.email}</span></div>
                    </div>
                </div>`;
            break;

        case 'exam':
            title = `Exam Details - ${item.name}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Exam Info</h3>
                        <div class="detail-row"><span class="detail-label">ID</span><span class="detail-value">${item.id}</span></div>
                        <div class="detail-row"><span class="detail-label">Subject</span><span class="detail-value">${item.subject}</span></div>
                        <div class="detail-row"><span class="detail-label">Class</span><span class="detail-value">${item.class}</span></div>
                    </div>
                    <div class="detail-section">
                        <h3>Timing</h3>
                        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${item.date}</span></div>
                        <div class="detail-row"><span class="detail-label">Duration</span><span class="detail-value">${item.duration}</span></div>
                    </div>
                </div>`;
            break;

        case 'result':
            title = `Result Details - ${item.id}`;
            content = `<div class="detail-grid"><div class="detail-section"><h3>Info</h3><div class="detail-row"><span class="detail-label">Student</span><span class="detail-value">${item.studentName}</span></div><div class="detail-row"><span class="detail-label">Subject</span><span class="detail-value">${item.subject}</span></div><div class="detail-row"><span class="detail-label">Marks</span><span class="detail-value">${item.marks}</span></div><div class="detail-row"><span class="detail-label">Grade</span><span class="detail-value">${item.grade}</span></div></div></div>`;
            break;

        case 'fee':
            const feeItem = schoolState.fees.find(f => f.id === id);
            title = `Fee Details - ${feeItem.student}`;
            content = `
                <div class="detail-grid">
                    <div class="detail-section">
                         <h3>Status</h3>
                        <div class="detail-row"><span class="detail-label">Student</span><span class="detail-value">${feeItem.student}</span></div>
                        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${feeItem.status}</span></div>
                    </div>
                    <div class="detail-section">
                        <h3>Amount</h3>
                        <div class="detail-row"><span class="detail-label">Total Fee</span><span class="detail-value">$${feeItem.totalFee}</span></div>
                        <div class="detail-row"><span class="detail-label">Paid</span><span class="detail-value">$${feeItem.paid}</span></div>
                        <div class="detail-row"><span class="detail-label">Pending</span><span class="detail-value">$${feeItem.pending}</span></div>
                    </div>
                </div>`;
            break;

        case 'enrollment':
            title = `Enrollment Details - ${item.id}`;
            content = `<div class="detail-grid"><div class="detail-section"><h3>Info</h3><div class="detail-row"><span class="detail-label">Student</span><span class="detail-value">${item.student}</span></div><div class="detail-row"><span class="detail-label">Class</span><span class="detail-value">${item.class}</span></div><div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${item.enrollDate}</span></div></div></div>`;
            break;

        default:
            title = `Details: ${type}`;
            content = `<p>Details for ${type} ID: ${id}</p>`;
    }

    openModal(title, content, [
        { text: 'Edit', class: 'btn-primary', onclick: `closeModal(); editItem('${type}', '${id}')` },
        { text: 'Close', class: 'btn-secondary', onclick: 'closeModal()' }
    ]);
}
// Add Item Functions
function showAddModal(type) {
    let title = '';
    let content = '';

    switch (type) {
        case 'student':
            title = 'Allocate User as Student';
            content = `
                <form class="modal-form" id="addStudentForm">
                    <div class="form-group full-width">
                        <label>Select User *</label>
                        <select name="id" required>
                            <option value="">Select User from System</option>
                            ${schoolState.users.filter(u => u.role !== 'STUDENT').map(u => `<option value="${u.id}">${u.name} (${u.email})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select name="class" required>
                            <option value="">Select Class</option>
                            ${schoolState.classes.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" required>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </form>
            `;
            break;
        case 'teacher':
            title = 'Allocate User as Teacher';
            content = `
                <form class="modal-form" id="addTeacherForm">
                    <div class="form-group full-width">
                        <label>Select User *</label>
                        <select name="id" required>
                            <option value="">Select User from System</option>
                            ${schoolState.users.filter(u => u.role !== 'TEACHER').map(u => `<option value="${u.id}">${u.name} (${u.email})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <select name="department" required>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Experience (years)</label>
                        <input type="number" name="experience" min="0">
                    </div>
                </form>
            `;
            break;
        case 'enrollment':
            title = 'Allocate Student to Class';
            content = `
                <form class="modal-form" id="allocateForm" method="POST" action="${contextPath}/admin/allocate">
                    <div class="form-group">
                        <label>Student *</label>
                        <select name="studentId" required>
                            <option value="">Select Student</option>
                            ${schoolState.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Teacher *</label>
                        <select name="teacherId" required>
                            <option value="">Select Teacher</option>
                            ${schoolState.teachers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Class Name *</label>
                        <select name="className" required>
                            <option value="">Select Class</option>
                            ${schoolState.classes.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                </form>
            `;
            break;
        case 'exam':
            title = 'Create New Exam';
            content = `
                <form class="modal-form" id="addExamForm">
                    <div class="form-group">
                        <label>Exam Name *</label>
                        <input type="text" name="name" required placeholder="e.g., Mid-term Mathematics">
                    </div>
                    <div class="form-group">
                        <label>Subject *</label>
                        <select name="subject" required>
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select name="class" required>
                            <option value="">Select Class</option>
                            <option value="Grade 1-A">Grade 1-A</option>
                            <option value="Grade 2-A">Grade 2-A</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Date *</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Duration (minutes) *</label>
                        <input type="number" name="duration" required min="30" step="15">
                    </div>
                    <div class="form-group">
                        <label>Total Marks</label>
                        <input type="number" name="totalMarks" value="100">
                    </div>
                </form>
            `;
            break;
        case 'subject':
            title = 'Create New Course/Subject';
            content = `
                <form class="modal-form" id="addSubjectForm">
                    <div class="form-group">
                        <label>Subject Code *</label>
                        <input type="text" name="code" required placeholder="e.g., CS101">
                    </div>
                    <div class="form-group">
                        <label>Subject Name *</label>
                        <input type="text" name="name" required placeholder="e.g., Introduction to Programming">
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <select name="dept" required>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Credits *</label>
                        <input type="number" name="credits" value="3" min="1" max="10">
                    </div>
                    <div class="form-group full-width">
                        <label>Assign Teacher</label>
                        <select name="teacherId">
                            <option value="">-- No Teacher Assigned --</option>
                            ${schoolState.teachers.map(t => `<option value="${t.id}">${t.name} (${t.email})</option>`).join('')}
                        </select>
                    </div>
                </form>
            `;
            break;
        case 'announcement':
            title = 'Create New Announcement';
            content = `
                <form class="modal-form" id="addAnnouncementForm">
                    <div class="form-group full-width">
                        <label>Title *</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group full-width">
                        <label>Content *</label>
                        <textarea name="content" rows="6" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Target Audience</label>
                        <select name="audience">
                            <option value="all">All</option>
                            <option value="students">Students</option>
                            <option value="teachers">Teachers</option>
                            <option value="parents">Parents</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Priority</label>
                        <select name="priority">
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                </form>
            `;
            break;
        case 'event':
            title = 'Add Calendar Event';
            content = `
                <form class="modal-form" id="addEventForm">
                    <div class="form-group">
                        <label>Event Title *</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label>Event Type *</label>
                        <select name="type" required>
                            <option value="academic">Academic</option>
                            <option value="sports">Sports</option>
                            <option value="cultural">Cultural</option>
                            <option value="holiday">Holiday</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Date *</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" name="time">
                    </div>
                    <div class="form-group full-width">
                        <label>Description</label>
                        <textarea name="description" rows="4"></textarea>
                    </div>
                </form>
            `;
            break;

        case 'class':
            title = 'Add New Class';
            content = `
                <form class="modal-form" id="addClassForm">
                    <div class="form-group">
                        <label>Class Name *</label>
                        <input type="text" name="name" required placeholder="e.g. Grade 1-A">
                    </div>
                    <div class="form-group">
                        <label>Teacher ID</label>
                        <input type="text" name="teacher" placeholder="TCH...">
                    </div>
                    <div class="form-group">
                        <label>Capacity</label>
                        <input type="number" name="capacity" value="35">
                    </div>
                    <div class="form-group">
                        <label>Room Number</label>
                        <input type="text" name="room">
                    </div>
                </form>`;
            break;

        case 'subject':
            title = 'Add New Subject';
            content = `
                <form class="modal-form" id="addSubjectForm">
                     <div class="form-group">
                        <label>Subject Code *</label>
                        <input type="text" name="code" required placeholder="e.g. MAT101">
                    </div>
                    <div class="form-group">
                        <label>Subject Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" name="dept">
                    </div>
                    <div class="form-group">
                        <label>Credits</label>
                        <input type="number" name="credits" value="3">
                    </div>
                </form>`;
            break;

        case 'assignment':
            title = 'Add New Assignment';
            content = `
                <form class="modal-form" id="addAssignmentForm">
                    <div class="form-group">
                        <label>Title *</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label>Subject Code *</label>
                        <input type="text" name="subject" required>
                    </div>
                     <div class="form-group">
                        <label>Class *</label>
                        <input type="text" name="class" required>
                    </div>
                    <div class="form-group">
                        <label>Due Date *</label>
                        <input type="date" name="dueDate" required>
                    </div>
                </form>`;
            break;

        default:
            title = `Add New ${type}`;
            content = `<p>Add form for ${type} coming soon.</p>`;
    }

    openModal(title, content, [
        { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: 'Save', class: 'btn-primary', onclick: `submitAdd('${type}')` }
    ]);
}

// Edit Item Functions
function editItem(type, id) {
    const item = findItem(type, id);
    if (!item) return showToast('Item not found', 'error');

    let title = '';
    let content = '';

    switch (type) {
        case 'user':
            title = `Edit User - ${item.name}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                        <label>User ID</label>
                        <input type="text" value="${item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${item.email}" required>
                    </div>
                    <div class="form-group">
                        <label>Role *</label>
                        <select name="role" required>
                            <option value="STUDENT" ${item.role === 'STUDENT' ? 'selected' : ''}>Student</option>
                            <option value="TEACHER" ${item.role === 'TEACHER' ? 'selected' : ''}>Teacher</option>
                            <option value="ADMIN" ${item.role === 'ADMIN' ? 'selected' : ''}>Admin</option>
                        </select>
                    </div>
                </form>
            `;
            break;
        case 'student':
            title = `Edit Student - ${item.name}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                        <label>Student ID</label>
                        <input type="text" value="${item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${item.email}" required>
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select name="class" required>
                            <option value="${item.class}" selected>${item.class}</option>
                            <option value="Grade 1-A">Grade 1-A</option>
                            <option value="Grade 2-A">Grade 2-A</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" required>
                            <option value="Active" ${item.status === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="Inactive" ${item.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Join Date</label>
                        <input type="date" name="joinDate" value="${item.joinDate}">
                    </div>
                </form>
            `;
            break;
        case 'teacher':
            title = `Edit Teacher - ${item.name}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                        <label>Teacher ID</label>
                        <input type="text" value="${item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${item.email}" required>
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <select name="department" required>
                            <option value="${item.department}" selected>${item.department}</option>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Subjects</label>
                        <input type="text" name="subjects" value="${item.subjects}">
                    </div>
                </form>
            `;
            break;

        case 'class':
            title = `Edit Class - ${item.name}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                        <label>Class ID</label>
                        <input type="text" value="${item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Class Name</label>
                        <input type="text" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Teacher ID</label>
                        <input type="text" name="teacher" value="${item.teacher}">
                    </div>
                    <div class="form-group">
                        <label>Capacity</label>
                        <input type="number" name="capacity" value="${item.capacity}">
                    </div>
                </form>`;
            break;

        case 'subject':
            title = `Edit Subject - ${item.name}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                         <label>Subject Code</label>
                         <input type="text" name="code" value="${item.code || item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Subject Name</label>
                        <input type="text" name="name" value="${item.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" name="dept" value="${item.dept}">
                    </div>
                    <div class="form-group">
                        <label>Credits</label>
                        <input type="number" name="credits" value="${item.credits}">
                    </div>
                    <div class="form-group full-width">
                        <label>Assign Teacher</label>
                        <select name="teacherId">
                            <option value="">-- No Teacher Assigned --</option>
                            ${schoolState.teachers.map(t => `<option value="${t.id}" ${item.teacherId == t.id ? 'selected' : ''}>${t.name} (${t.email})</option>`).join('')}
                        </select>
                    </div>
                </form>`;
            break;

        case 'assignment':
            title = `Edit Assignment - ${item.title}`;
            content = `
                <form class="modal-form" id="editForm">
                    <div class="form-group">
                        <label>ID</label>
                        <input type="text" value="${item.id}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value="${item.title}" required>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" name="dueDate" value="${item.dueDate}">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                         <select name="status">
                            <option value="Pending" ${item.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Submitted" ${item.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                            <option value="Graded" ${item.status === 'Graded' ? 'selected' : ''}>Graded</option>
                        </select>
                    </div>
                </form>`;
            break;
        default:
            content = `<p>Edit form for ${type}: ${id}</p>`;
    }

    openModal(title, content, [
        { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: 'Save Changes', class: 'btn-primary', onclick: `submitEdit('${type}', '${id}')` }
    ]);
}

// Delete Item Functions
function deleteItem(type, id) {
    const item = findItem(type, id);
    if (!item) return showToast('Item not found', 'error');

    const itemName = item.name || item.title || id;
    const content = `
        <div class="delete-confirmation">
            <div class="delete-icon">⚠️</div>
            <h3>Delete ${type}?</h3>
            <p>Are you sure you want to delete <strong>${itemName}</strong>?</p>
            <div class="delete-warning">
                ⚠️ This action cannot be undone. All associated data will be permanently removed.
            </div>
        </div>
    `;

    openModal(`Delete ${type}`, content, [
        { text: 'Cancel', class: 'btn-secondary', onclick: 'closeModal()' },
        { text: 'Delete', class: 'btn-primary', onclick: `confirmDelete('${type}', '${id}')` }
    ]);
}

// Helper Functions
function findItem(type, id) {
    const dataMap = {
        'student': 'students',
        'teacher': 'teachers',
        'exam': 'exams',
        'result': 'results',
        'fee': 'fees',
        'assignment': 'assignments',
        'enrollment': 'enrollments',
        'attendance': 'attendance',
        'class': 'classes',
        'subject': 'subjects'
    };

    const dataKey = dataMap[type];
    if (!dataKey || !schoolState[dataKey]) return null;

    return schoolState[dataKey].find(item => item.id === id || item.code === id);
}


function submitAdd(type) {
    const form = document.querySelector('.modal-form');
    if (!form) return closeModal();

    if (type === 'enrollment') {
        form.submit();
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    let endpoint = '';
    if (type === 'student' || type === 'teacher' || type === 'user') {
        endpoint = `${contextPath}/admin/api/users`;

        // If selecting existing user, enrich data
        if (data.id) {
            const existingUser = schoolState.users.find(u => u.id == data.id);
            if (existingUser) {
                data.name = existingUser.name;
                data.email = existingUser.email;
                data.id = existingUser.id;
            }
        }

        if (type === 'student') data.role = 'STUDENT';
        if (type === 'teacher') data.role = 'TEACHER';
    } else if (type === 'subject') {
        endpoint = `${contextPath}/admin/api/subjects`;
    } else if (type === 'announcement') {
        endpoint = `${contextPath}/admin/api/announcements`;
    }

    if (endpoint) {
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    showToast(res.message, 'success');
                    closeModal();
                    setTimeout(() => location.reload(), 1000);
                } else {
                    showToast(res.message, 'error');
                }
            })
            .catch(err => {
                showToast('Server error', 'error');
                console.error(err);
            });
        return;
    }

    closeModal();
}

function submitEdit(type, id) {
    const form = document.querySelector('.modal-form');
    if (!form) return closeModal();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (id && id !== 'undefined' && id !== 'null' && id !== '') {
        data.id = id;
    }

    let endpoint = '';
    if (type === 'student' || type === 'teacher' || type === 'user') {
        endpoint = `${contextPath}/admin/api/users`;
        if (type === 'student') data.role = 'STUDENT';
        if (type === 'teacher') data.role = 'TEACHER';
    } else if (type === 'subject') {
        endpoint = `${contextPath}/admin/api/subjects`;
    }

    if (endpoint) {
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    showToast(res.message, 'success');
                    closeModal();
                    setTimeout(() => location.reload(), 1000);
                } else {
                    showToast(res.message, 'error');
                }
            })
            .catch(err => {
                showToast('Server error', 'error');
                console.error(err);
            });
        return;
    }

    showToast('Persistent save not implemented for this type yet', 'info');
    closeModal();
}

function confirmDelete(type, id) {
    let endpoint = '';
    if (type === 'student' || type === 'teacher' || type === 'user') {
        endpoint = `${contextPath}/admin/api/users?id=${id}`;
    } else if (type === 'subject') {
        endpoint = `${contextPath}/admin/api/subjects?id=${id}`;
    } else if (type === 'announcement') {
        endpoint = `${contextPath}/admin/api/announcements?id=${id}`;
    }

    if (endpoint) {
        fetch(endpoint, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    showToast(res.message, 'success');
                    closeModal();
                    setTimeout(() => location.reload(), 1000);
                } else {
                    showToast(res.message, 'error');
                }
            })
            .catch(err => {
                showToast('Server error', 'error');
                console.error(err);
            });
        return;
    }

    showToast('Delete not implemented for this type yet', 'info');
    closeModal();
}

function exportData(type) {
    const data = schoolState[type] || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-export-${Date.now()}.json`;
    link.click();
    showToast(`${type} data exported successfully!`, 'success');
}

function filterTable(type) {
    showToast(`Filtering ${type}...`, 'info');
}

function filterBy(type, filter) {
    showToast(`Showing ${filter} ${type}`, 'info');
}

function markAttendance() {
    showToast('Attendance marking interface would open here', 'info');
}

function recordPayment(feeId) {
    showToast(`Recording payment for ${feeId}`, 'success');
}

function generateReport(type) {
    showToast(`Generating ${type} report...`, 'info');
    setTimeout(() => showToast(`${type} report generated!`, 'success'), 1500);
}

function refreshDashboard() {
    showToast('Refreshing dashboard...', 'info');
    setTimeout(() => {
        loadDashboard();
        showToast('Dashboard refreshed!', 'success');
    }, 1000);
}

function saveSettings() {
    showToast('Settings saved successfully!', 'success');
}

function saveProfile() {
    showToast('Profile updated successfully!', 'success');
}

function createBackup() {
    showToast('Creating backup...', 'info');
    setTimeout(() => showToast('Backup created successfully!', 'success'), 2000);
}

function restoreBackup(id) {
    if (confirm('Are you sure you want to restore this backup?')) {
        showToast('Restoring backup...', 'info');
        setTimeout(() => showToast('Backup restored successfully!', 'success'), 2000);
    }
}

function handleLogout(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        showToast('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = (typeof contextPath !== 'undefined' ? contextPath : '') + '/logout';
        }, 1000);
    }
}

// Toast Notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadDashboard();
    showToast('Welcome to School Admin Dashboard! 🎓', 'success');
});

// Export functions for global access
window.showAddModal = showAddModal;
window.closeModal = closeModal;
window.editItem = editItem;
window.deleteItem = deleteItem;
window.viewItem = viewItem;
window.loadDashboard = loadDashboard;
window.showToast = showToast;
