// Student Dashboard JavaScript - Clean Implementation
console.log('Student Dashboard JS loading...');

// Application State - Purged of Mock Data
let appState = {
    user: {},
    stats: {},
    courses: [],
    assignments: [],
    liveClasses: [], // Still mock-only for now
    messages: [],    // Still mock-only for now
    achievements: []  // Still mock-only for now
};

// Merge real data provided by JSP
if (window.serverData) {
    console.log('Initializing with backend data...');
    appState.user = {
        name: window.serverData.currentUser?.name || 'User',
        email: window.serverData.currentUser?.email || '',
        avatar: (window.serverData.currentUser?.name || 'U').substring(0, 2).toUpperCase(),
        role: 'student',
        id: 'STU' + (window.serverData.currentUser?.id || '000')
    };

    appState.stats = {
        coursesEnrolled: window.serverData.stats?.totalCourses || 0,
        assignmentsPending: window.serverData.stats?.pendingAssignments || 0,
        completedAssignments: window.serverData.stats?.submittedAssignments || 0,
        averageGrade: 0,
        studyStreak: 0
    };

    appState.courses = (window.serverData.enrolledClasses || []).map((c, idx) => ({
        id: c.id,
        title: c.className,
        instructor: 'Faculty', // Placeholder until teacher joined
        progress: 0,
        grade: 'N/A',
        rating: 5.0,
        avatar: c.className.substring(0, 2).toUpperCase(),
        gradient: idx % 2 === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        nextClass: 'Consult Schedule',
        modules: [],
        description: 'Enrolled Course'
    }));

    appState.assignments = (window.serverData.assignments || []).map(a => {
        const submission = (window.serverData.recentSubmissions || []).find(s => s.assignment.id === a.id);
        return {
            id: a.id,
            title: a.title,
            course: a.className,
            courseId: 0,
            difficulty: 'Medium',
            points: a.points || 100,
            dueDate: a.deadline,
            status: submission ? (submission.grade ? 'graded' : 'submitted') : 'pending',
            grade: submission?.grade,
            description: a.description,
            requirements: ['Submit via Google Form']
        };
    });
}

// Navigation Function
function navigateTo(event, sectionId) {
    event.preventDefault();
    console.log('Navigating to:', sectionId);

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');

    // Show selected section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Close mobile sidebar
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }

    // Load section-specific data
    loadSectionData(sectionId);

    // Track navigation
    trackUserActivity('navigation', { section: sectionId });
}

// Load Section Data
function loadSectionData(sectionId) {
    console.log('Loading section data for:', sectionId);

    switch (sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'my-courses':
            loadCourses();
            break;
        case 'assignments':
            loadAssignments();
            break;
        case 'live-class':
            loadLiveClasses();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'grades':
            loadGrades();
            break;
        case 'achievements':
            loadAchievements();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Dashboard Loader
function loadDashboard() {
    console.log('Loading dashboard...');

    // Update user info
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');

    if (userName) userName.textContent = appState.user.name;
    if (userEmail) userEmail.textContent = appState.user.email;
    if (userAvatar) userAvatar.textContent = appState.user.avatar;

    // Update stats
    updateStatCard('coursesEnrolled', appState.stats.coursesEnrolled);
    updateStatCard('assignmentsPending', appState.stats.assignmentsPending);
    updateStatCard('averageGrade', appState.stats.averageGrade + '%');
    updateStatCard('studyStreak', appState.stats.studyStreak + ' days');

    // Load activity feed
    loadActivityFeed();
}

function updateStatCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function loadActivityFeed() {
    const submissions = window.serverData.recentSubmissions || [];
    const activities = submissions.map(sub => ({
        type: 'assignment',
        text: `Submitted ${sub.assignment.title}`,
        time: sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Recently',
        icon: '📝'
    }));

    // If no submissions, show a welcome message
    if (activities.length === 0) {
        activities.push({
            type: 'info',
            text: 'Welcome to Igishyitsi! Enroll in classes to get started.',
            time: 'Just now',
            icon: '👋'
        });
    }

    const activityFeed = document.querySelector('.activity-feed');
    if (activityFeed) {
        activityFeed.innerHTML = activities.map(activity =>
            '<div class="activity-item">' +
            '<div class="activity-icon">' + activity.icon + '</div>' +
            '<div class="activity-content">' +
            '<div class="activity-text">' + activity.text + '</div>' +
            '<div class="activity-time">' + activity.time + '</div>' +
            '</div>' +
            '</div>'
        ).join('');
    }
}

// Courses Loader
function loadCourses() {
    console.log('Loading courses...');
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = appState.courses.map(course =>
        '<div class="section-card neumorphic course-card" data-course-id="' + course.id + '">' +
        '<div class="course-avatar" style="background: ' + course.gradient + '; width: 60px; height: 60px; margin: 0 auto 16px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 18px;">' +
        '<span>' + course.avatar + '</span>' +
        '</div>' +
        '<h3 style="text-align: center; margin-bottom: 8px; color: #ffffff;">' + course.title + '</h3>' +
        '<p style="text-align: center; color: #a0aec0; margin-bottom: 16px; font-size: 14px;">' + course.instructor + '</p>' +

        '<div style="margin-bottom: 16px;">' +
        '<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">' +
        '<span style="font-size: 12px; color: #a0aec0;">Progress</span>' +
        '<span style="font-size: 12px; color: #ffffff;">' + course.progress + '%</span>' +
        '</div>' +
        '<div class="progress-bar">' +
        '<div class="progress-fill" style="width: ' + course.progress + '%;"></div>' +
        '</div>' +
        '</div>' +

        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
        '<div style="text-align: center; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">' +
        '<div style="font-size: 18px; font-weight: 600; color: #ffffff;">' + course.grade + '</div>' +
        '<div style="font-size: 11px; color: #a0aec0;">Grade</div>' +
        '</div>' +
        '<div style="text-align: center; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">' +
        '<div style="font-size: 18px; font-weight: 600; color: #ffffff;">' + course.rating + '</div>' +
        '<div style="font-size: 11px; color: #a0aec0;">Rating</div>' +
        '</div>' +
        '</div>' +

        '<div style="margin-bottom: 16px;">' +
        '<div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Next Class</div>' +
        '<div style="font-size: 14px; color: #ffffff;">' + course.nextClass + '</div>' +
        '</div>' +

        '<div style="display: flex; gap: 8px;">' +
        '<button class="btn btn-primary" style="flex: 1;" onclick="openCourse(' + course.id + ')">' +
        'View Course' +
        '</button>' +
        '<button class="btn btn-secondary" onclick="showCourseDetails(' + course.id + ')">' +
        'ℹ️' +
        '</button>' +
        '</div>' +
        '</div>'
    ).join('');
}

// Assignments Loader
function loadAssignments(filter = 'all') {
    console.log('Loading assignments...');
    const assignmentsContainer = document.getElementById('assignmentsContainer');
    if (!assignmentsContainer) return;

    let filteredAssignments = appState.assignments;
    if (filter !== 'all') {
        filteredAssignments = appState.assignments.filter(a => a.status === filter);
    }

    assignmentsContainer.innerHTML = filteredAssignments.map(assignment => {
        const statusColor = assignment.status === 'pending' ? '#f59e0b' :
            assignment.status === 'submitted' ? '#3b82f6' : '#10b981';
        const statusText = assignment.status === 'pending' ? 'Pending' :
            assignment.status === 'submitted' ? 'Submitted' : 'Graded';

        return '<div class="section-card neumorphic assignment-card" data-assignment-id="' + assignment.id + '">' +
            '<div class="section-header">' +
            '<h3 class="section-title">' + assignment.title + '</h3>' +
            '<span style="padding: 4px 12px; background: ' + statusColor + '20; color: ' + statusColor + '; border-radius: 12px; font-size: 12px; font-weight: 500;">' +
            statusText +
            '</span>' +
            '</div>' +

            '<p style="color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">' +
            assignment.course +
            '</p>' +

            '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">' +
            '<div style="display: flex; gap: 12px;">' +
            '<span class="difficulty">' + assignment.difficulty + '</span>' +
            '<span class="points">' + assignment.points + ' pts</span>' +
            '</div>' +
            (assignment.grade ? '<span style="color: #10b981; font-weight: 600;">Grade: ' + assignment.grade + '</span>' : '') +
            '</div>' +

            '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">' +
            '<span style="font-size: 12px; color: #a0aec0;">Due: ' + formatDate(assignment.dueDate) + '</span>' +
            '<span style="font-size: 12px; color: #ffffff;">' + assignment.points + ' points</span>' +
            '</div>' +

            (assignment.status === 'pending' ?
                '<button class="btn btn-primary" style="width: 100%;" onclick="startAssignment(' + assignment.id + ')">' +
                'Start Assignment' +
                '</button>' :
                assignment.status === 'submitted' ?
                    '<button class="btn btn-secondary" style="width: 100%;" onclick="viewSubmission(' + assignment.id + ')">' +
                    'View Submission' +
                    '</button>' :
                    '<button class="btn btn-secondary" style="width: 100%;" onclick="viewResults(' + assignment.id + ')">' +
                    'View Results' +
                    '</button>'
            ) +
            '</div>';
    }).join('');
}

// Live Classes Loader
function loadLiveClasses() {
    console.log('Loading live classes...');
    const liveClassesGrid = document.getElementById('liveClassesGrid');
    if (!liveClassesGrid) return;

    liveClassesGrid.innerHTML = appState.liveClasses.map(liveClass => {
        const statusColor = liveClass.status === 'live' ? '#ef4444' :
            liveClass.status === 'upcoming' ? '#3b82f6' : '#6b7280';
        const statusText = liveClass.status === 'live' ? '🔴 LIVE NOW' :
            liveClass.status === 'upcoming' ? 'Upcoming' : 'Recorded';

        return '<div class="section-card neumorphic live-class-card" data-class-id="' + liveClass.id + '">' +
            '<div class="section-header">' +
            '<h3 class="section-title">' + liveClass.title + '</h3>' +
            '<span style="padding: 4px 12px; background: ' + statusColor + '20; color: ' + statusColor + '; border-radius: 12px; font-size: 12px; font-weight: 500;">' +
            statusText +
            '</span>' +
            '</div>' +

            '<p style="color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">' +
            liveClass.topic +
            '</p>' +

            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
            '<div>' +
            '<div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Instructor</div>' +
            '<div style="font-size: 14px; color: #ffffff;">' + liveClass.instructor + '</div>' +
            '</div>' +
            '<div>' +
            '<div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Time</div>' +
            '<div style="font-size: 14px; color: #ffffff;">' + liveClass.time + '</div>' +
            '</div>' +
            '</div>' +

            '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">' +
            '<div style="display: flex; gap: 12px;">' +
            '<span class="duration">' + liveClass.duration + '</span>' +
            (liveClass.participants > 0 ? '<span class="participants">👥 ' + liveClass.participants + ' students</span>' : '') +
            '</div>' +
            '</div>' +

            (liveClass.status === 'live' ?
                '<button class="btn btn-primary" style="width: 100%; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);" onclick="joinLiveClass(' + liveClass.id + ')">' +
                'Join Live Session' +
                '</button>' :
                liveClass.status === 'upcoming' ?
                    '<button class="btn btn-secondary" style="width: 100%;" onclick="setReminder(' + liveClass.id + ')">' +
                    (liveClass.reminderSet ? '✅ Reminder Set' : 'Set Reminder') +
                    '</button>' :
                    '<button class="btn btn-secondary" style="width: 100%;" onclick="showToast(\'Loading recording for ' + liveClass.title + '\', \'info\')">' +
                    'Watch Recording' +
                    '</button>'
            ) +
            '</div>';
    }).join('');
}

// Messages Loader
function loadMessages() {
    console.log('Loading messages...');
    const contactsList = document.querySelector('.contacts-list');
    if (!contactsList) return;

    const contactsHtml = appState.messages.map(contact =>
        '<div class="contact-item ' + (contact.unread > 0 ? 'unread' : '') + '" onclick="switchContact(\'' + contact.contactName + '\')">' +
        '<div class="contact-avatar">' + contact.contactAvatar + '</div>' +
        '<div class="contact-info">' +
        '<h4>' + contact.contactName + '</h4>' +
        '<p>' + contact.lastMessage + '</p>' +
        '</div>' +
        '<span class="time">' + contact.time + '</span>' +
        (contact.unread > 0 ? '<span class="unread-badge">' + contact.unread + '</span>' : '') +
        '</div>'
    ).join('');

    const header = contactsList.querySelector('.contacts-header');
    if (header) {
        header.insertAdjacentHTML('afterend', contactsHtml);
    }

    if (appState.messages.length > 0) {
        switchContact(appState.messages[0].contactName);
    }
}

// Grades Loader
function loadGrades() {
    console.log('Loading grades...');
    const gradeList = document.getElementById('gradeList');
    if (!gradeList) return;

    const courseGrades = appState.courses.map(course => {
        const avgScore = course.progress / 100;
        return {
            course: course.title,
            grade: course.grade,
            percentage: Math.round(avgScore * 25), // Convert to percentage
            credits: Math.floor(Math.random() * 3) + 2, // Random credits for demo
            progress: course.progress,
            color: course.grade === 'A' ? '#10b981' : course.grade === 'B' ? '#3b82f6' : '#f59e0b'
        };
    });

    gradeList.innerHTML = courseGrades.map(grade =>
        '<div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 8px; margin-bottom: 8px; cursor: pointer;" onclick="showGradeDetails(\'' + grade.course + '\')">' +
        '<div style="flex: 1;">' +
        '<div style="font-size: 14px; font-weight: 500; color: #ffffff; margin-bottom: 4px;">' + grade.course + '</div>' +
        '<div style="font-size: 12px; color: #a0aec0;">' + grade.credits + ' credits</div>' +
        '</div>' +
        '<div style="text-align: center; margin-right: 20px;">' +
        '<div style="font-size: 18px; font-weight: 600; color: ' + grade.color + ';">' + grade.grade + '</div>' +
        '<div style="font-size: 12px; color: #a0aec0;">' + grade.percentage + '%</div>' +
        '</div>' +
        '<div style="width: 60px;">' +
        '<div class="progress-bar">' +
        '<div class="progress-fill" style="width: ' + grade.progress + '%; background: ' + grade.color + ';"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    ).join('');
}

// Achievements Loader
function loadAchievements() {
    console.log('Loading achievements...');
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (!achievementsGrid) return;

    achievementsGrid.innerHTML = appState.achievements.map(achievement =>
        '<div class="section-card neumorphic ' + (achievement.unlocked ? '' : 'locked') + '" style="' + (!achievement.unlocked ? 'opacity: 0.7;' : '') + '" onclick="showAchievementDetails(' + achievement.id + ')">' +
        '<div style="text-align: center; margin-bottom: 16px;">' +
        '<div style="font-size: 48px; margin-bottom: 8px;">' + achievement.icon + '</div>' +
        '<span style="padding: 4px 12px; background: ' + (achievement.unlocked ? '#10b98120' : '#6b728020') + '; color: ' + (achievement.unlocked ? '#10b981' : '#6b7280') + '; border-radius: 12px; font-size: 12px; font-weight: 500;">' +
        achievement.category +
        '</span>' +
        '</div>' +

        '<h3 style="text-align: center; margin-bottom: 8px; color: #ffffff;">' + achievement.title + '</h3>' +
        '<p style="text-align: center; color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">' +
        achievement.description +
        '</p>' +

        (!achievement.unlocked ?
            '<div style="margin-bottom: 16px;">' +
            '<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">' +
            '<span style="font-size: 12px; color: #a0aec0;">Progress</span>' +
            '<span style="font-size: 12px; color: #ffffff;">' + (achievement.currentCount || 0) + '/' + (achievement.targetCount || 0) + '</span>' +
            '</div>' +
            '<div class="progress-bar">' +
            '<div class="progress-fill" style="width: ' + achievement.progress + '%;"></div>' +
            '</div>' +
            '</div>' +
            '<div style="margin-bottom: 16px;">' +
            '<div style="font-size: 12px; color: #a0aec0;">Reward</div>' +
            '<div style="font-size: 14px; color: #fbbf24;">' + achievement.reward + '</div>' +
            '</div>'
            :
            '<div style="margin-bottom: 16px;">' +
            '<div style="font-size: 12px; color: #10b981; margin-bottom: 4px;">Unlocked on ' + achievement.unlockedDate + '</div>' +
            '<div style="font-size: 14px; color: #fbbf24;">Reward: ' + achievement.reward + '</div>' +
            '</div>'
        ) +

        '<button class="btn ' + (achievement.unlocked ? 'btn-secondary' : 'btn-primary') + '" style="width: 100%;">' +
        (achievement.unlocked ? 'View Details' : 'Track Progress') +
        '</button>' +
        '</div>'
    ).join('');
}

// Settings Loader
function loadSettings() {
    console.log('Loading settings...');
    // Settings implementation would go here
}

// Interactive Functions
function openCourse(courseId) {
    console.log('Opening course:', courseId);
    const course = appState.courses.find(c => c.id === courseId);
    if (!course) return;

    showToast('Opening course: ' + course.title, 'info');
    trackUserActivity('course_view', { courseId });
}

function startAssignment(assignmentId) {
    console.log('Starting assignment:', assignmentId);
    const assignment = appState.assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    showToast('Starting assignment: ' + assignment.title, 'info');
    trackUserActivity('assignment_start', { assignmentId });
}

function joinLiveClass(classId) {
    console.log('Joining live class:', classId);
    const liveClass = appState.liveClasses.find(c => c.id === classId);
    if (!liveClass) return;

    showToast('Joining live class: ' + liveClass.title, 'success');
    trackUserActivity('live_class_join', { classId });
}

function setReminder(classId) {
    console.log('Setting reminder for class:', classId);
    const liveClass = appState.liveClasses.find(c => c.id === classId);
    if (!liveClass) return;

    liveClass.reminderSet = !liveClass.reminderSet;
    showToast(liveClass.reminderSet ? 'Reminder set for ' + liveClass.title : 'Reminder removed for ' + liveClass.title, 'success');
    loadLiveClasses(); // Refresh the display
    trackUserActivity('reminder_set', { classId, set: liveClass.reminderSet });
}

function switchContact(contactName) {
    console.log('Switching to contact:', contactName);
    const contact = appState.messages.find(c => c.contactName === contactName);
    if (!contact) return;

    // Mark messages as read
    contact.unread = 0;

    // Load chat messages
    loadChatMessages(contactName);
    trackUserActivity('message_view', { contactName });
}

function loadChatMessages(contactName) {
    const messagesContainer = document.getElementById('mainChatMessages');
    if (!messagesContainer) return;

    const contact = appState.messages.find(c => c.contactName === contactName);
    if (!contact) return;

    messagesContainer.innerHTML = contact.messages.map(msg =>
        '<div class="message ' + msg.type + '">' +
        '<p>' + msg.text + '</p>' +
        '<span class="msg-time">' + msg.time + '</span>' +
        '</div>'
    ).join('');

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showAchievementDetails(achievementId) {
    console.log('Showing achievement details:', achievementId);
    const achievement = appState.achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    if (achievement.unlocked) {
        showToast('🎉 Achievement unlocked: ' + achievement.title + '!', 'success');
    } else {
        const progress = achievement.currentCount || 0;
        const target = achievement.targetCount || 0;
        showToast('Progress: ' + progress + '/' + target + ' (' + achievement.progress + '%)', 'info');
    }

    trackUserActivity('achievement_view', { achievementId });
}

function showGradeDetails(courseName) {
    console.log('Showing grade details for:', courseName);
    showToast('Grade details for ' + courseName, 'info');
    trackUserActivity('grade_details_view', { courseName });
}

function showCourseDetails(courseId) {
    console.log('Showing course details:', courseId);
    const course = appState.courses.find(c => c.id === courseId);
    if (!course) return;

    showToast('Course details: ' + course.title, 'info');
    trackUserActivity('course_details_view', { courseId });
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showToast(message, type = 'info', options = {}) {
    console.log('Toast:', message, type);

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;

    // Add to page
    document.body.appendChild(toast);

    // Show animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

function trackUserActivity(action, data) {
    console.log('Activity tracked:', action, data);
    // In a real app, this would send data to analytics
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing dashboard...');

    // Load initial dashboard data
    loadDashboard();

    // Set up event listeners
    setupEventListeners();

    console.log('Dashboard initialized successfully');
});

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleSidebar);
    }

    // Close overlays on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllOverlays();
        }
    });

    // Close overlays when clicking outside
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            closeAllOverlays();
        }
    });
}

function closeAllOverlays() {
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });
}

// Export functions for global access
window.navigateTo = navigateTo;
window.openCourse = openCourse;
window.startAssignment = startAssignment;
window.joinLiveClass = joinLiveClass;
window.setReminder = setReminder;
window.switchContact = switchContact;
window.showAchievementDetails = showAchievementDetails;
window.showGradeDetails = showGradeDetails;
window.showCourseDetails = showCourseDetails;
window.showToast = showToast;

console.log('Student Dashboard JS loaded successfully');
