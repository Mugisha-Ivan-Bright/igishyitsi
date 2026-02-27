// Admin Dashboard JavaScript - Full Functionality with Dummy Data

console.log('Admin Dashboard JavaScript loaded successfully!');

// Global State Management
const adminState = {
    currentUser: {
        name: 'Admin User',
        role: 'Super Admin',
        avatar: 'AD'
    },
    users: [
        { id: 1, name: 'Emma Johnson', email: 'emma.j@email.com', type: 'student', status: 'active', joined: '2023-09-15', avatar: 'EJ' },
        { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', type: 'student', status: 'active', joined: '2023-09-20', avatar: 'MC' },
        { id: 3, name: 'Sarah Williams', email: 'sarah.w@email.com', type: 'teacher', status: 'active', joined: '2023-08-10', avatar: 'SW' },
        { id: 4, name: 'David Brown', email: 'david.b@email.com', type: 'student', status: 'inactive', joined: '2023-10-05', avatar: 'DB' },
        { id: 5, name: 'Lisa Anderson', email: 'lisa.a@email.com', type: 'teacher', status: 'active', joined: '2023-07-22', avatar: 'LA' },
        { id: 6, name: 'James Wilson', email: 'james.w@email.com', type: 'student', status: 'active', joined: '2023-11-12', avatar: 'JW' },
        { id: 7, name: 'Emily Davis', email: 'emily.d@email.com', type: 'teacher', status: 'active', joined: '2023-06-30', avatar: 'ED' },
        { id: 8, name: 'Robert Taylor', email: 'robert.t@email.com', type: 'student', status: 'suspended', joined: '2023-09-28', avatar: 'RT' },
        { id: 9, name: 'Jessica Moore', email: 'jessica.m@email.com', type: 'student', status: 'active', joined: '2023-10-18', avatar: 'JM' },
        { id: 10, name: 'Admin User', email: 'admin@igishyitsi.com', type: 'admin', status: 'active', joined: '2023-01-01', avatar: 'AD' }
    ],
    courses: [
        { id: 1, title: 'Web Development Bootcamp', teacher: 'Sarah Williams', students: 89, rating: 4.8, status: 'active', icon: '💻', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 2, title: 'Data Science Fundamentals', teacher: 'Lisa Anderson', students: 67, rating: 4.7, status: 'active', icon: '📊', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 3, title: 'UI/UX Design Mastery', teacher: 'Emily Davis', students: 54, rating: 4.9, status: 'active', icon: '🎨', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 4, title: 'Mobile App Development', teacher: 'Sarah Williams', students: 43, rating: 4.6, status: 'active', icon: '📱', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { id: 5, title: 'Machine Learning Basics', teacher: 'Lisa Anderson', students: 38, rating: 4.8, status: 'pending', icon: '🤖', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { id: 6, title: 'Digital Marketing', teacher: 'Emily Davis', students: 72, rating: 4.5, status: 'active', icon: '📢', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }
    ],
    activities: [
        { id: 1, icon: '👤', text: 'New user registration: Jessica Moore', time: '5 minutes ago' },
        { id: 2, icon: '📚', text: 'New course submitted: Machine Learning Basics', time: '1 hour ago' },
        { id: 3, icon: '💰', text: 'Payment received: $49.99 from Emma Johnson', time: '2 hours ago' },
        { id: 4, icon: '⭐', text: 'New 5-star review on Web Development Bootcamp', time: '3 hours ago' },
        { id: 5, icon: '🎓', text: 'Course completed: Michael Chen finished Data Science', time: '5 hours ago' },
        { id: 6, icon: '📝', text: 'Assignment submitted: 45 new submissions', time: '6 hours ago' }
    ],
    transactions: [
        { id: 1, date: '2024-02-05', user: 'Emma Johnson', course: 'Web Development Bootcamp', amount: 49.99, status: 'completed' },
        { id: 2, date: '2024-02-05', user: 'Michael Chen', course: 'Data Science Fundamentals', amount: 59.99, status: 'completed' },
        { id: 3, date: '2024-02-04', user: 'Jessica Moore', course: 'UI/UX Design Mastery', amount: 54.99, status: 'completed' },
        { id: 4, date: '2024-02-04', user: 'James Wilson', course: 'Mobile App Development', amount: 44.99, status: 'pending' },
        { id: 5, date: '2024-02-03', user: 'David Brown', course: 'Web Development Bootcamp', amount: 49.99, status: 'completed' }
    ]
};

// Navigation Function
function navigateTo(event, sectionId) {
    if (event) {
        event.preventDefault();
    }

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Load section-specific data
    switch (sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsers();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'revenue':
            loadRevenue();
            break;
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.querySelector('.hamburger');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Toast Notification System
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

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

// Load Dashboard
function loadDashboard() {
    loadActivityFeed();
    animateMetrics();
}

function loadActivityFeed() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;

    feed.innerHTML = adminState.activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

function animateMetrics() {
    const metrics = [
        { id: 'totalUsers', target: 1247 },
        { id: 'activeCourses', target: 156 },
        { id: 'monthlyRevenue', target: 45280, prefix: '$' },
        { id: 'avgRating', target: 4.8 }
    ];

    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (!element) return;

        let current = 0;
        const increment = metric.target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= metric.target) {
                current = metric.target;
                clearInterval(timer);
            }

            if (metric.prefix) {
                element.textContent = metric.prefix + Math.floor(current).toLocaleString();
            } else {
                element.textContent = metric.target < 10 ? current.toFixed(1) : Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Load Users
function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    renderUsersTable(adminState.users);
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="badge badge-${user.type}">${user.type}</span></td>
            <td>${user.email}</td>
            <td>${formatDate(user.joined)}</td>
            <td><span class="badge badge-${user.status}">${user.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-icon-btn" onclick="viewUser(${user.id})" title="View">👁️</button>
                    <button class="action-icon-btn" onclick="editUser(${user.id})" title="Edit">✏️</button>
                    <button class="action-icon-btn" onclick="deleteUser(${user.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const typeFilter = document.getElementById('userTypeFilter').value;
    const statusFilter = document.getElementById('userStatusFilter').value;

    const filtered = adminState.users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || user.type === typeFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    renderUsersTable(filtered);
}

function filterUsersByType(type) {
    const typeFilter = document.getElementById('userTypeFilter');
    if (type === 'all') {
        typeFilter.value = '';
    } else {
        typeFilter.value = type;
    }
    filterUsers();
}

function viewUser(userId) {
    const user = adminState.users.find(u => u.id === userId);
    showToast(`Viewing profile for ${user.name}`, 'info');
}

function editUser(userId) {
    const user = adminState.users.find(u => u.id === userId);
    showToast(`Editing ${user.name}'s profile`, 'info');
}

function deleteUser(userId) {
    const user = adminState.users.find(u => u.id === userId);
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        adminState.users = adminState.users.filter(u => u.id !== userId);
        loadUsers();
        showToast(`${user.name} has been deleted`, 'success');
    }
}

function exportUsers() {
    const data = JSON.stringify(adminState.users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-export-${Date.now()}.json`;
    link.click();
    showToast('Users exported successfully!', 'success');
}

function showAddUserModal() {
    showToast('Add User modal would open here', 'info');
}

// Load Courses
function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;

    grid.innerHTML = adminState.courses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div class="course-icon" style="background: ${course.gradient}">
                    ${course.icon}
                </div>
                <span class="badge badge-${course.status === 'active' ? 'active' : 'inactive'}">${course.status}</span>
            </div>
            <div class="course-title">${course.title}</div>
            <div class="course-teacher">By ${course.teacher}</div>
            <div class="course-stats">
                <div class="course-stat">
                    <span>👥</span>
                    <span>${course.students} students</span>
                </div>
                <div class="course-stat">
                    <span>⭐</span>
                    <span>${course.rating}</span>
                </div>
            </div>
            <div class="course-actions">
                <button class="btn btn-secondary" style="flex: 1;" onclick="viewCourse(${course.id})">View</button>
                ${course.status === 'pending' ?
            `<button class="btn btn-primary" style="flex: 1;" onclick="approveCourse(${course.id})">Approve</button>` :
            `<button class="btn btn-secondary" style="flex: 1;" onclick="editCourse(${course.id})">Edit</button>`
        }
            </div>
        </div>
    `).join('');
}

function viewCourse(courseId) {
    const course = adminState.courses.find(c => c.id === courseId);
    showToast(`Viewing ${course.title}`, 'info');
}

function editCourse(courseId) {
    const course = adminState.courses.find(c => c.id === courseId);
    showToast(`Editing ${course.title}`, 'info');
}

function approveCourse(courseId) {
    const course = adminState.courses.find(c => c.id === courseId);
    course.status = 'active';
    loadCourses();
    showToast(`${course.title} has been approved!`, 'success');
}

function exportCourses() {
    const data = JSON.stringify(adminState.courses, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses-export-${Date.now()}.json`;
    link.click();
    showToast('Courses exported successfully!', 'success');
}

function showCreateCourseModal() {
    showToast('Create Course modal would open here', 'info');
}

// Load Analytics
function loadAnalytics() {
    const chartContainer = document.getElementById('userGrowthChart');
    if (chartContainer) {
        chartContainer.parentElement.innerHTML = `
            <div class="chart-container">
                <div style="text-align: center; color: var(--text-muted);">
                    <div style="font-size: 48px; margin-bottom: 16px;">📈</div>
                    <div>User Growth Chart</div>
                    <div style="font-size: 12px; margin-top: 8px;">Chart visualization would be rendered here</div>
                </div>
            </div>
        `;
    }
}

function updateAnalytics() {
    const timeRange = document.getElementById('analyticsTimeRange').value;
    showToast(`Analytics updated for last ${timeRange} days`, 'info');
}

// Load Revenue
function loadRevenue() {
    const tbody = document.getElementById('transactionsBody');
    if (!tbody) return;

    tbody.innerHTML = adminState.transactions.map(transaction => `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.user}</td>
            <td>${transaction.course}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td><span class="badge badge-${transaction.status === 'completed' ? 'active' : 'inactive'}">${transaction.status}</span></td>
        </tr>
    `).join('');
}

function exportRevenue() {
    const data = JSON.stringify(adminState.transactions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `revenue-export-${Date.now()}.json`;
    link.click();
    showToast('Revenue data exported successfully!', 'success');
}

function generateInvoice() {
    showToast('Generating invoice...', 'info');
    setTimeout(() => {
        showToast('Invoice generated successfully!', 'success');
    }, 1500);
}

function showAllTransactions() {
    showToast('Showing all transactions', 'info');
}

// Reports
function generateReport(type) {
    showToast(`Generating ${type} report...`, 'info');
    setTimeout(() => {
        const data = type === 'users' ? adminState.users :
            type === 'courses' ? adminState.courses :
                type === 'revenue' ? adminState.transactions :
                    { message: 'Engagement data' };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${type}-report-${Date.now()}.json`;
        link.click();

        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated!`, 'success');
    }, 1500);
}

// Dashboard Actions
function refreshDashboard() {
    showToast('Refreshing dashboard...', 'info');
    setTimeout(() => {
        loadDashboard();
        showToast('Dashboard refreshed!', 'success');
    }, 1000);
}

function exportReport() {
    showToast('Exporting platform report...', 'info');
    setTimeout(() => {
        const report = {
            generated: new Date().toISOString(),
            users: adminState.users.length,
            courses: adminState.courses.length,
            transactions: adminState.transactions.length,
            totalRevenue: adminState.transactions.reduce((sum, t) => sum + t.amount, 0)
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `platform-report-${Date.now()}.json`;
        link.click();

        showToast('Report exported successfully!', 'success');
    }, 1500);
}

function sendBroadcast() {
    showToast('Opening broadcast message composer...', 'info');
}

// Settings
function saveGeneralSettings() {
    const platformName = document.getElementById('platformName').value;
    const supportEmail = document.getElementById('supportEmail').value;
    const timezone = document.getElementById('timezone').value;

    showToast('Settings saved successfully!', 'success');
}

function toggleSetting(setting) {
    const settingNames = {
        '2fa': 'Two-Factor Authentication',
        'emailVerify': 'Email Verification',
        'autoSuspend': 'Auto-Suspend Inactive Users'
    };

    showToast(`${settingNames[setting]} setting updated`, 'success');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadDashboard();

    // Close mobile sidebar when clicking overlay
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            const sidebar = document.querySelector('.sidebar');
            const hamburger = document.querySelector('.hamburger');
            if (sidebar && hamburger) {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    showToast('Welcome to Admin Dashboard! 👋', 'success');
});
