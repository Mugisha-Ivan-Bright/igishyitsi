// Enhanced Student Dashboard JavaScript with Full Functionality

// Test that JavaScript is loading
console.log('Student Dashboard JavaScript loaded successfully!');

// Global state management
const appState = {
    currentUser: {
        name: 'Alex Thompson',
        email: 'alex.thompson@university.edu',
        id: 'ST2024001',
        avatar: 'AT'
    },
    notifications: [
        { id: 1, type: 'assignment', title: 'New assignment posted in Web Development', time: '2 hours ago', read: false },
        { id: 2, type: 'grade', title: 'Your quiz was graded: A-', time: '5 hours ago', read: false },
        { id: 3, type: 'message', title: 'New message from Prof. Sarah Johnson', time: '1 day ago', read: true },
        { id: 4, type: 'announcement', title: 'Midterm exam schedule updated', time: '2 days ago', read: true },
        { id: 5, type: 'achievement', title: 'You earned the "Quick Learner" badge!', time: '5 hours ago', read: false }
    ],
    courses: [
        {
            id: 1,
            title: 'Web Development',
            instructor: 'Prof. Sarah Johnson',
            progress: 75,
            grade: 'A',
            rating: 4.8,
            avatar: 'WD',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            nextClass: 'Tomorrow, 10:00 AM',
            modules: ['HTML & CSS Basics', 'JavaScript Fundamentals', 'React Components', 'State Management', 'API Integration'],
            assignments: [1, 2, 3]
        },
        {
            id: 2,
            title: 'Data Science',
            instructor: 'Dr. Michael Chen',
            progress: 60,
            grade: 'B+',
            rating: 4.5,
            avatar: 'DS',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            nextClass: 'Today, 2:00 PM',
            modules: ['Python Basics', 'NumPy & Pandas', 'Data Visualization', 'Machine Learning Intro', 'Deep Learning'],
            assignments: [4, 5]
        },
        {
            id: 3,
            title: 'UI/UX Design',
            instructor: 'Prof. Emily Davis',
            progress: 85,
            grade: 'A-',
            rating: 4.7,
            avatar: 'UX',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            nextClass: 'Friday, 11:00 AM',
            modules: ['Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
            assignments: [6]
        },
        {
            id: 4,
            title: 'Mobile Development',
            instructor: 'Prof. James Wilson',
            progress: 45,
            grade: 'B',
            rating: 4.3,
            avatar: 'MD',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            nextClass: 'Monday, 3:00 PM',
            modules: ['React Native Basics', 'Navigation', 'State Management', 'API Integration', 'App Deployment'],
            assignments: [7, 8]
        }
    ],
    assignments: [
        {
            id: 1,
            title: 'React Components Assignment',
            course: 'Web Development',
            courseId: 1,
            description: 'Create interactive components using React hooks and state management',
            dueDate: '2024-02-10',
            status: 'pending',
            difficulty: 'Medium',
            points: 100,
            grade: null
        },
        {
            id: 2,
            title: 'JavaScript Quiz',
            course: 'Web Development',
            courseId: 1,
            description: 'Test your knowledge of JavaScript fundamentals and ES6+ features',
            dueDate: '2024-02-08',
            status: 'graded',
            difficulty: 'Easy',
            points: 50,
            grade: 'A-'
        },
        {
            id: 3,
            title: 'API Integration Project',
            course: 'Web Development',
            courseId: 1,
            description: 'Build a full-stack application with REST API integration',
            dueDate: '2024-02-15',
            status: 'submitted',
            difficulty: 'Hard',
            points: 150,
            grade: null
        },
        {
            id: 4,
            title: 'Data Analysis Project',
            course: 'Data Science',
            courseId: 2,
            description: 'Analyze real-world datasets using Python and pandas',
            dueDate: '2024-02-12',
            status: 'pending',
            difficulty: 'Medium',
            points: 120,
            grade: null
        },
        {
            id: 5,
            title: 'Machine Learning Basics',
            course: 'Data Science',
            courseId: 2,
            description: 'Implement basic machine learning algorithms from scratch',
            dueDate: '2024-02-20',
            status: 'pending',
            difficulty: 'Hard',
            points: 200,
            grade: null
        }
    ],
    liveClasses: [
        {
            id: 1,
            title: 'React Hooks Deep Dive',
            instructor: 'Prof. Sarah Johnson',
            time: 'Now',
            status: 'live',
            participants: 45,
            topic: 'Advanced React Hooks Patterns',
            duration: '2 hours',
            reminderSet: false
        },
        {
            id: 2,
            title: 'Data Science Workshop',
            instructor: 'Dr. Michael Chen',
            time: 'Today, 2:00 PM',
            status: 'upcoming',
            participants: 0,
            topic: 'Introduction to Pandas',
            duration: '1.5 hours',
            reminderSet: false
        },
        {
            id: 3,
            title: 'UI/UX Design Critique',
            instructor: 'Prof. Emily Davis',
            time: 'Tomorrow, 11:00 AM',
            status: 'upcoming',
            participants: 0,
            topic: 'Portfolio Review Session',
            duration: '2 hours',
            reminderSet: true
        },
        {
            id: 4,
            title: 'Database Systems Lab',
            instructor: 'Prof. Lisa Anderson',
            time: 'Yesterday',
            status: 'recorded',
            participants: 32,
            topic: 'SQL Optimization Techniques',
            duration: '1 hour',
            courseId: 5,
            joinUrl: null,
            recordingUrl: 'https://recordings.connet.edu/db-lab-456'
        }
    ],
    messages: [
        {
            id: 1,
            contactName: 'Prof. Sarah Johnson',
            contactAvatar: 'SJ',
            lastMessage: 'Great work on the project!',
            time: '2m',
            status: 'Web Development • Active now',
            unread: 1,
            messages: [
                { id: 1, type: 'received', text: 'Hi Alex! I just reviewed your React assignment submission. Excellent work!', time: '10:30 AM', sender: 'Prof. Sarah Johnson' },
                { id: 2, type: 'sent', text: 'Thank you professor! I really enjoyed working on it.', time: '10:32 AM', sender: 'Alex Thompson' },
                { id: 3, type: 'received', text: 'Your attention to detail is impressive. Keep up the great work!', time: '10:33 AM', sender: 'Prof. Sarah Johnson' },
                { id: 4, type: 'received', text: 'Great work on the project!', time: '2 minutes ago', sender: 'Prof. Sarah Johnson' }
            ]
        },
        {
            id: 2,
            contactName: 'Dr. Michael Chen',
            contactAvatar: 'MC',
            lastMessage: 'Don\'t forget tomorrow\'s quiz',
            time: '1h',
            status: 'Data Science • Away',
            unread: 0,
            messages: [
                { id: 1, type: 'received', text: 'Don\'t forget about quiz tomorrow at 2 PM', time: '9:15 AM', sender: 'Dr. Michael Chen' },
                { id: 2, type: 'sent', text: 'Thank you for reminder! I\'ll be there.', time: '9:20 AM', sender: 'Alex Thompson' },
                { id: 3, type: 'received', text: 'Make sure to review chapters 5-7', time: '9:22 AM', sender: 'Dr. Michael Chen' },
                { id: 4, type: 'received', text: 'Don\'t forget tomorrow\'s quiz', time: '1 hour ago', sender: 'Dr. Michael Chen' }
            ]
        },
        {
            id: 3,
            contactName: 'Study Group',
            contactAvatar: 'SG',
            lastMessage: 'Meeting at 3 PM today',
            time: '3h',
            status: '6 members • Active',
            unread: 2,
            messages: [
                { id: 1, type: 'received', text: 'Emma: Anyone available for study session today?', time: '2:00 PM', sender: 'Emma' },
                { id: 2, type: 'sent', text: 'I can join at 3 PM', time: '2:05 PM', sender: 'Alex Thompson' },
                { id: 3, type: 'received', text: 'Michael: Great! Library at 3?', time: '2:10 PM', sender: 'Michael' },
                { id: 4, type: 'sent', text: 'Sounds good to me!', time: '2:12 PM', sender: 'Alex Thompson' },
                { id: 5, type: 'received', text: 'Emma: Meeting at 3 PM today', time: '3 hours ago', sender: 'Emma' }
            ]
        }
    ],
    achievements: [
        {
            id: 1,
            title: 'Quick Learner',
            description: 'Complete 5 assignments in one week',
            icon: '⚡',
            unlocked: true,
            progress: 100,
            category: 'Speed',
            unlockedDate: '2024-01-15',
            reward: '50 bonus points'
        },
        {
            id: 2,
            title: 'Code Master',
            description: 'Complete 25 coding assignments',
            icon: '🌟',
            unlocked: false,
            progress: 96,
            category: 'Coding',
            currentCount: 24,
            targetCount: 25,
            reward: '100 bonus points'
        },
        {
            id: 3,
            title: 'Perfect Score',
            description: 'Get 100% on 3 assignments',
            icon: '💯',
            unlocked: true,
            progress: 100,
            category: 'Excellence',
            unlockedDate: '2024-01-20',
            reward: '75 bonus points'
        },
        {
            id: 4,
            title: 'Early Bird',
            description: 'Submit assignments 24 hours before deadline',
            icon: '🐦',
            unlocked: true,
            progress: 100,
            category: 'Time Management',
            unlockedDate: '2024-01-10',
            reward: '30 bonus points'
        },
        {
            id: 5,
            title: 'Team Player',
            description: 'Participate in 10 study groups',
            icon: '🤝',
            unlocked: false,
            progress: 70,
            category: 'Collaboration',
            currentCount: 7,
            targetCount: 10,
            reward: '60 bonus points'
        },
        {
            id: 6,
            title: 'Knowledge Seeker',
            description: 'Attend 20 live classes',
            icon: '📚',
            unlocked: false,
            progress: 45,
            category: 'Participation',
            currentCount: 9,
            targetCount: 20,
            reward: '80 bonus points'
        }
    ]
};

// Navigation with full functionality
function navigateTo(event, sectionId) {
    try {
        console.log('navigateTo called with sectionId:', sectionId);
        event.preventDefault();

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
            console.log('Section found and activated:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }

        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }

        // Load section-specific data
        loadSectionData(sectionId);

        // Track navigation
        trackUserActivity('navigation', { section: sectionId });
    } catch (error) {
        console.error('Error in navigateTo:', error);
    }
}

// Enhanced section data loading with full functionality
function loadSectionData(sectionId) {
    console.log('loadSectionData called with sectionId:', sectionId);
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

// Enhanced notifications with real functionality
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');

    // Mark notifications as read when opened
    if (dropdown.classList.contains('active')) {
        markNotificationsAsRead();
        setTimeout(() => {
            document.addEventListener('click', closeNotificationsOutside);
        }, 100);
    }
}

function markNotificationsAsRead() {
    appState.notifications.forEach(notification => {
        notification.read = true;
    });
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const unreadCount = appState.notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

function closeNotificationsOutside(e) {
    const dropdown = document.getElementById('notificationDropdown');
    const bell = document.querySelector('.notification-bell');

    if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
        dropdown.classList.remove('active');
        document.removeEventListener('click', closeNotificationsOutside);
    }
}

// Enhanced toast notifications with actions
function showToast(message, type = 'info', action = null) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';

    // Create toast content
    const toastContent = document.createElement('div');
    toastContent.style.display = 'flex';
    toastContent.style.alignItems = 'center';
    toastContent.style.justifyContent = 'space-between';
    toastContent.style.gap = '12px';

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.style.flex = '1';

    toastContent.appendChild(messageSpan);

    // Add action button if provided
    if (action) {
        const actionBtn = document.createElement('button');
        actionBtn.textContent = action.text;
        actionBtn.style.padding = '4px 8px';
        actionBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        actionBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        actionBtn.style.borderRadius = '4px';
        actionBtn.style.color = '#e2e8f0';
        actionBtn.style.fontSize = '12px';
        actionBtn.style.cursor = 'pointer';
        actionBtn.onclick = action.handler;
        toastContent.appendChild(actionBtn);
    }

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#a0aec0';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => toast.remove();
    toastContent.appendChild(closeBtn);

    toast.appendChild(toastContent);

    // Add color based on type
    if (type === 'success') {
        toast.style.borderLeft = '4px solid #48bb78';
    } else if (type === 'error') {
        toast.style.borderLeft = '4px solid #f56565';
    } else if (type === 'warning') {
        toast.style.borderLeft = '4px solid #ed8936';
    } else {
        toast.style.borderLeft = '4px solid #4299e1';
    }

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 5000);
}

// User activity tracking
function trackUserActivity(action, data) {
    console.log('User Activity:', action, data);
    // In a real app, this would send to analytics
}

// Enhanced section data loading with full functionality
function loadSectionData(sectionId) {
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
        case 'grades':
            loadGrades();
            break;
        case 'achievements':
            loadAchievements();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Enhanced dashboard loading
function loadDashboard() {
    // Update stats with real calculations
    updateDashboardStats();

    // Load recent activity
    loadRecentActivity();
}

function updateDashboardStats() {
    const activeCourses = appState.courses.filter(c => c.progress > 0).length;
    const completedAssignments = appState.assignments.filter(a => a.status === 'graded').length;
    const pendingAssignments = appState.assignments.filter(a => a.status === 'pending').length;
    const avgGrade = calculateAverageGrade();

    // Update stat cards if they exist
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-value').textContent = activeCourses;
        statCards[1].querySelector('.stat-value').textContent = completedAssignments;
        statCards[2].querySelector('.stat-value').textContent = pendingAssignments;
        statCards[3].querySelector('.stat-value').textContent = avgGrade;
    }
}

function calculateAverageGrade() {
    const gradedAssignments = appState.assignments.filter(a => a.grade);
    if (gradedAssignments.length === 0) return 'N/A';

    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 };
    const totalPoints = gradedAssignments.reduce((sum, a) => sum + (gradePoints[a.grade] || 0), 0);
    const avgPoints = totalPoints / gradedAssignments.length;

    if (avgPoints >= 3.7) return 'A-';
    if (avgPoints >= 3.3) return 'B+';
    if (avgPoints >= 3.0) return 'B';
    if (avgPoints >= 2.7) return 'B-';
    if (avgPoints >= 2.3) return 'C+';
    if (avgPoints >= 2.0) return 'C';
    return 'C-';
}

function loadRecentActivity() {
    // Load recent activities from various data sources
    const activities = [
        { type: 'assignment', text: 'Submitted React Components Assignment', time: '2 hours ago', icon: '📝' },
        { type: 'grade', text: 'Database Schema graded: A', time: '5 hours ago', icon: '📊' },
        { type: 'message', text: 'New message from Prof. Sarah Johnson', time: '1 day ago', icon: '💬' },
        { type: 'achievement', text: 'Earned Quick Learner badge', time: '2 days ago', icon: '🏆' },
        { type: 'course', text: 'Enrolled in Machine Learning course', time: '3 days ago', icon: '📚' }
    ];

    // Update activity feed if it exists
    const activityFeed = document.querySelector('.activity-feed');
    if (activityFeed) {
        activityFeed.innerHTML = activities.map(activity => {
            return '<div class="activity-item">' +
                '<div class="activity-icon">' + activity.icon + '</div>' +
                '<div class="activity-content">' +
                '<div class="activity-text">' + activity.text + '</div>' +
                '<div class="activity-time">' + activity.time + '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    }
}

// Enhanced courses loading with full interactivity
function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = appState.courses.map(course => {
        return '<div class="section-card neumorphic course-card" data-course-id="' + course.id + '">' +
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
            '</div>';
    }).join('');
}

// Enhanced assignments loading with filtering
function loadAssignments(filter = 'all') {
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

        return `
            <div class="section-card neumorphic assignment-card" data-assignment-id="${assignment.id}">
                <div class="section-header">
                    <h3 class="section-title">${assignment.title}</h3>
                    <span style="padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 12px; font-size: 12px; font-weight: 500;">
                        ${statusText}
                    </span>
                </div>
                
                <p style="color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">
                    ${assignment.description}
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Course</div>
                        <div style="font-size: 14px; color: #ffffff;">${assignment.course}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Due Date</div>
                        <div style="font-size: 14px; color: #ffffff;">${formatDate(assignment.dueDate)}</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div style="display: flex; gap: 12px;">
                        <span class="difficulty">${assignment.difficulty}</span>
                        <span class="points">${assignment.points} pts</span>
                    </div>
                    ${assignment.grade ? `<span style="color: #10b981; font-weight: 600;">Grade: ${assignment.grade}</span>` : ''}
                </div>
                
                ${assignment.status === 'pending' ?
                `<button class="btn btn-primary" style="width: 100%;" onclick="startAssignment(${assignment.id})">
                        Start Assignment
                    </button>` :
                assignment.status === 'submitted' ?
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="viewSubmission(${assignment.id})">
                        View Submission
                    </button>` :
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="viewResults(${assignment.id})">
                        View Results
                    </button>`
            }
            </div>
        `;
    }).join('');
}

// Enhanced live classes with real join functionality
function loadLiveClasses() {
    const liveClassesGrid = document.getElementById('liveClassesGrid');
    if (!liveClassesGrid) return;

    liveClassesGrid.innerHTML = appState.liveClasses.map(liveClass => {
        const statusColor = liveClass.status === 'live' ? '#ef4444' :
            liveClass.status === 'upcoming' ? '#3b82f6' : '#6b7280';
        const statusText = liveClass.status === 'live' ? '🔴 LIVE NOW' :
            liveClass.status === 'upcoming' ? 'Upcoming' : 'Recorded';

        return `
            <div class="section-card neumorphic live-class-card" data-class-id="${liveClass.id}">
                <div class="section-header">
                    <h3 class="section-title">${liveClass.title}</h3>
                    <span style="padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 12px; font-size: 12px; font-weight: 500;">
                        ${statusText}
                    </span>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; color: #a0aec0; margin-bottom: 4px;">Instructor</div>
                    <div style="font-size: 16px; color: #ffffff; font-weight: 500;">${liveClass.instructor}</div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; color: #a0aec0; margin-bottom: 4px;">Topic</div>
                    <div style="font-size: 14px; color: #ffffff;">${liveClass.topic}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Time</div>
                        <div style="font-size: 14px; color: #ffffff;">${liveClass.time}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Duration</div>
                        <div style="font-size: 14px; color: #ffffff;">${liveClass.duration}</div>
                    </div>
                </div>
                
                ${liveClass.participants > 0 ?
                `<div style="margin-bottom: 16px;">
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Participants</div>
                        <div style="font-size: 14px; color: #ffffff;">👥 ${liveClass.participants} students</div>
                    </div>` : ''
            }
                
                ${liveClass.status === 'live' ?
                `<button class="btn btn-primary" style="width: 100%; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);" onclick="joinLiveClass(${liveClass.id})">
                        Join Live Session
                    </button>` :
                liveClass.status === 'upcoming' ?
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="setReminder(${liveClass.id})">
                        ${liveClass.reminderSet ? '✅ Reminder Set' : 'Set Reminder'}
                    </button>` :
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="watchRecording(${liveClass.id})">
                        Watch Recording
                    </button>`
            }
}

function openOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Tab switching for course details
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Enhanced course details function
function openCourse(courseId) {
    const course = appState.courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Populate course details overlay
    document.getElementById('courseDetailsTitle').textContent = course.title;
    document.getElementById('courseDetailsAvatar').textContent = course.avatar;
    document.getElementById('courseDetailsAvatar').style.background = course.gradient;
    document.getElementById('courseDetailsName').textContent = course.title;
    document.getElementById('courseDetailsInstructor').textContent = course.instructor;
    document.getElementById('courseDetailsProgress').textContent = course.progress + '%';
    document.getElementById('courseDetailsGrade').textContent = course.grade;
    document.getElementById('courseDetailsRating').textContent = course.rating;
    
    // Populate modules
    const modulesList = document.getElementById('courseModulesList');
    modulesList.innerHTML = course.modules.map((module, index) => {
        return '<div class="module-item" style="padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin-bottom: 8px; cursor: pointer;" onclick="openModule(\'' + module + '\')">' +
            '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<span style="color: #e2e8f0;">' + module + '</span>' +
                '<span style="color: #63b3ed; font-size: 12px;">Module ' + (index + 1) + '</span>' +
            '</div>' +
        '</div>';
    }).join('');
    
    // Populate assignments for this course
    const courseAssignments = appState.assignments.filter(a => a.courseId === courseId);
    const assignmentsList = document.getElementById('courseAssignmentsList');
    assignmentsList.innerHTML = courseAssignments.map(assignment => {
        return '<div class="assignment-item" style="padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin-bottom: 8px; cursor: pointer;" onclick="openAssignmentDetails(' + assignment.id + ')">' +
            '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<div>' +
                    '<div style="color: #e2e8f0; font-weight: 500;">' + assignment.title + '</div>' +
                    '<div style="color: #a0aec0; font-size: 12px;">Due: ' + formatDate(assignment.dueDate) + '</div>' +
                '</div>' +
                '<span style="padding: 4px 8px; background: ' + (assignment.status === 'pending' ? '#f59e0b20' : assignment.status === 'submitted' ? '#3b82f620' : '#10b98120') + '; color: ' + (assignment.status === 'pending' ? '#f59e0b' : assignment.status === 'submitted' ? '#3b82f6' : '#10b981') + '; border-radius: 4px; font-size: 12px;">' +
                    assignment.status +
                '</span>' +
            '</div>' +
        '</div>';
    }).join('');
    
    // Populate grades for this course
    const courseGrades = courseAssignments.filter(a => a.grade);
    const gradesList = document.getElementById('courseGradesList');
    gradesList.innerHTML = courseGrades.map(assignment => {
        return '<div class="grade-item" style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin-bottom: 8px;">' +
            '<div>' +
                '<div style="color: #e2e8f0; font-weight: 500;">' + assignment.title + '</div>' +
                '<div style="color: #a0aec0; font-size: 12px;">' + assignment.points + ' points</div>' +
            '</div>' +
            '<div style="text-align: right;">' +
                '<div style="color: #10b981; font-weight: 600; font-size: 18px;">' + assignment.grade + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
    
    openOverlay('courseDetailsOverlay');
    trackUserActivity('course_details_view', { courseId });
}

function openModule(moduleName) {
    showToast('Opening module: ' + moduleName, 'info');
}

// Enhanced assignment details function
function openAssignmentDetails(assignmentId) {
    const assignment = appState.assignments.find(a => a.id === assignmentId);
    if (!assignment) return;
    
    // Populate assignment details overlay
    document.getElementById('assignmentDetailsTitle').textContent = assignment.title;
    document.getElementById('assignmentCourse').textContent = assignment.course;
    document.getElementById('assignmentDifficulty').textContent = assignment.difficulty;
    document.getElementById('assignmentPoints').textContent = assignment.points + ' pts';
    document.getElementById('assignmentDueDate').textContent = formatDate(assignment.dueDate);
    document.getElementById('assignmentDescription').textContent = assignment.description;
    
    // Populate requirements
    const requirementsList = document.getElementById('assignmentRequirements');
    requirementsList.innerHTML = assignment.requirements.map(req => 
        '<li>' + req + '</li>'
    ).join('');
    
    // Update action button based on status
    const actionBtn = document.getElementById('assignmentActionButton');
    if (assignment.status === 'pending') {
        actionBtn.textContent = 'Start Assignment';
        actionBtn.onclick = () => startAssignmentFromDetails(assignmentId);
    } else if (assignment.status === 'submitted') {
        actionBtn.textContent = 'View Submission';
        actionBtn.onclick = () => viewSubmission(assignmentId);
    } else {
        actionBtn.textContent = 'View Results';
        actionBtn.onclick = () => viewResults(assignmentId);
    }
    
    openOverlay('assignmentDetailsOverlay');
    trackUserActivity('assignment_details_view', { assignmentId });
}

function startAssignmentFromDetails(assignmentId) {
    closeOverlay('assignmentDetailsOverlay');
    startAssignment(assignmentId);
}

// Enhanced live class details function
function openLiveClassDetails(classId) {
    const liveClass = appState.liveClasses.find(c => c.id === classId);
    if (!liveClass) return;
    
    // Populate live class overlay
    document.getElementById('liveClassTitle').textContent = liveClass.title;
    document.getElementById('liveClassTopic').textContent = liveClass.topic;
    document.getElementById('liveClassInstructor').textContent = liveClass.instructor;
    document.getElementById('liveClassDuration').textContent = liveClass.duration;
    document.getElementById('liveClassParticipants').textContent = liveClass.participants + ' students';
    
    // Update status and action button
    const statusElement = document.getElementById('liveClassStatus');
    const actionBtn = document.getElementById('liveClassActionButton');
    
    if (liveClass.status === 'live') {
        statusElement.textContent = '🔴 LIVE NOW';
        statusElement.style.color = '#ef4444';
        actionBtn.textContent = 'Join Live Session';
        actionBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        actionBtn.onclick = () => joinLiveClassFromOverlay(classId);
    } else if (liveClass.status === 'upcoming') {
        statusElement.textContent = '⏰ Upcoming';
        statusElement.style.color = '#3b82f6';
        actionBtn.textContent = liveClass.reminderSet ? '✅ Reminder Set' : 'Set Reminder';
        actionBtn.style.background = '';
        actionBtn.onclick = () => setReminderFromOverlay(classId);
    } else {
        statusElement.textContent = '📹 Recorded';
        statusElement.style.color = '#6b7280';
        actionBtn.textContent = 'Watch Recording';
        actionBtn.style.background = '';
        actionBtn.onclick = () => watchRecordingFromOverlay(classId);
    }
    
    openOverlay('liveClassOverlay');
    trackUserActivity('live_class_details_view', { classId });
}

function joinLiveClassFromOverlay(classId) {
    closeOverlay('liveClassOverlay');
    joinLiveClass(classId);
}

function setReminderFromOverlay(classId) {
    setReminder(classId);
    // Update button text
    const actionBtn = document.getElementById('liveClassActionButton');
    const liveClass = appState.liveClasses.find(c => c.id === classId);
    if (liveClass) {
        actionBtn.textContent = liveClass.reminderSet ? '✅ Reminder Set' : 'Set Reminder';
    }
}

function watchRecordingFromOverlay(classId) {
    closeOverlay('liveClassOverlay');
    watchRecording(classId);
}

// Enhanced achievement details function
function openAchievementDetails(achievementId) {
    const achievement = appState.achievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    // Populate achievement details overlay
    document.getElementById('achievementDetailsTitle').textContent = 'Achievement Details';
    document.getElementById('achievementDetailsIcon').textContent = achievement.icon;
    document.getElementById('achievementDetailsName').textContent = achievement.title;
    document.getElementById('achievementDetailsCategory').textContent = achievement.category;
    document.getElementById('achievementDetailsDescription').textContent = achievement.description;
    document.getElementById('achievementReward').textContent = achievement.reward;
    
    // Update progress section
    const progressSection = document.getElementById('achievementProgressSection');
    const progressBar = document.getElementById('achievementProgressBar');
    const progressText = document.getElementById('achievementProgressText');
    const actionBtn = document.getElementById('achievementActionButton');
    
    if (achievement.unlocked) {
        progressSection.style.display = 'none';
        actionBtn.textContent = 'Share Achievement';
        actionBtn.onclick = () => shareAchievementFromOverlay(achievementId);
    } else {
        progressSection.style.display = 'block';
        progressBar.style.width = achievement.progress + '%';
        progressText.textContent = (achievement.currentCount || 0) + '/' + (achievement.targetCount || 0) + ' (' + achievement.progress + '%)';
        actionBtn.textContent = 'Track Progress';
        actionBtn.onclick = () => showAchievementTips(achievementId);
    }
    
    openOverlay('achievementDetailsOverlay');
    trackUserActivity('achievement_details_view', { achievementId });
}

function shareAchievementFromOverlay(achievementId) {
    closeOverlay('achievementDetailsOverlay');
    shareAchievement(achievementId);
}

// Enhanced action functions that now open overlays
function openCourseFromCard(courseId) {
    openCourse(courseId);
}

function startAssignmentFromCard(assignmentId) {
    openAssignmentDetails(assignmentId);
}

function showAchievementDetailsFromCard(achievementId) {
    openAchievementDetails(achievementId);
}

function joinLiveClassFromCard(classId) {
    openLiveClassDetails(classId);
}

function watchRecordingFromCard(classId) {
    openLiveClassDetails(classId);
}

// Close overlay when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('overlay')) {
        const overlays = ['courseDetailsOverlay', 'assignmentDetailsOverlay', 'liveClassOverlay', 'achievementDetailsOverlay'];
        overlays.forEach(overlayId => {
            const overlay = document.getElementById(overlayId);
            if (overlay && overlay.style.display === 'flex') {
                closeOverlay(overlayId);
            }
        });
    }
});

// Close overlay with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const overlays = ['courseDetailsOverlay', 'assignmentDetailsOverlay', 'liveClassOverlay', 'achievementDetailsOverlay'];
        overlays.forEach(overlayId => {
            const overlay = document.getElementById(overlayId);
            if (overlay && overlay.style.display === 'flex') {
                closeOverlay(overlayId);
            }
        });
    }
});

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeNotificationsOutside(e) {
    const dropdown = document.getElementById('notificationDropdown');
    const bell = document.querySelector('.notification-bell');
    
    if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
        dropdown.classList.remove('active');
        document.removeEventListener('click', closeNotificationsOutside);
    }
}

// Enhanced messages functionality
function loadMessages() {
    const contactsList = document.querySelector('.contacts-list');
    if (!contactsList) return;
    
    // Update contacts list with unread counts
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
    
    // Insert after header
    const header = contactsList.querySelector('.contacts-header');
    header.insertAdjacentHTML('afterend', contactsHtml);
    
    // Load first contact by default
    if (appState.messages.length > 0) {
        switchContact(appState.messages[0].contactName);
    }
}

function switchContact(contactName) {
    // Update active contact
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.contact-item').classList.add('active');
    
    // Find contact and mark messages as read
    const contact = appState.messages.find(c => c.contactName === contactName);
    if (contact) {
        contact.unread = 0;
    }
    
    // Update chat header
    document.getElementById('currentContactName').textContent = contactName;
    document.getElementById('currentContactStatus').textContent = contact.status;
    
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

// Enhanced grades functionality
function loadGrades() {
    const gradeList = document.getElementById('gradeList');
    if (!gradeList) return;
    
    // Calculate GPA
    const gpa = calculateGPA();
    const gpaDisplay = document.querySelector('.gpa-display');
    if (gpaDisplay) {
        gpaDisplay.textContent = gpa.toFixed(1);
    }
    
    // Load course grades
    const courseGrades = appState.courses.map(course => {
        const courseAssignments = appState.assignments.filter(a => a.courseId === course.id);
        const gradedAssignments = courseAssignments.filter(a => a.status === 'graded');
        const avgScore = gradedAssignments.length > 0 ? 
            gradedAssignments.reduce((sum, a) => sum + getGradePoints(a.grade), 0) / gradedAssignments.length : 0;
        
        return {
            course: course.title,
            grade: course.grade,
            percentage: Math.round(avgScore * 25), // Convert to percentage
            credits: Math.floor(Math.random() * 3) + 2, // Random credits for demo
            progress: course.progress
        };
    });
    
    gradeList.innerHTML = courseGrades.map(grade => {
        const gradeColor = grade.percentage >= 90 ? '#10b981' : 
                          grade.percentage >= 80 ? '#3b82f6' : '#f59e0b';
        
        return '<div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 8px; margin-bottom: 8px; cursor: pointer;" onclick="showGradeDetails(\'' + grade.course + '\')">' +
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
            '</div>';
    }).join('');
}

function calculateGPA() {
    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 };
    const courseGrades = appState.courses.map(course => gradePoints[course.grade] || 0);
    const totalPoints = courseGrades.reduce((sum, points) => sum + points, 0);
    return totalPoints / courseGrades.length;
}

function getGradePoints(grade) {
    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 };
    return gradePoints[grade] || 0;
}

function showGradeDetails(courseName) {
    showToast('Grade details for ' + courseName, 'info');
}

// Enhanced achievements functionality
function loadAchievements() {
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

function showAchievementDetails(achievementId) {
    const achievement = appState.achievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    if (achievement.unlocked) {
        showToast('🎉 Achievement unlocked: ' + achievement.title + '!', 'success', {
            text: 'Share Achievement',
            handler: () => shareAchievement(achievementId)
        });
    } else {
        const progress = achievement.currentCount || 0;
        const target = achievement.targetCount || 0;
        showToast('Progress: ' + progress + '/' + target + ' (' + achievement.progress + '%)', 'info', {
        text: 'View Tips',
            handler: () => showAchievementTips(achievementId)
    });
}

trackUserActivity('achievement_view', { achievementId });
}

function shareAchievement(achievementId) {
    const achievement = appState.achievements.find(a => a.id === achievementId);
    showToast(`Sharing ${achievement.title} achievement...`, 'success');
}

function showAchievementTips(achievementId) {
    const achievement = appState.achievements.find(a => a.id === achievementId);
    const tips = {
        2: ['Complete more coding assignments', 'Focus on JavaScript and React projects', 'Submit assignments early for bonus points'],
        5: ['Join study groups for your courses', 'Collaborate on assignments', 'Help other students'],
        6: ['Attend live sessions regularly', 'Participate in Q&A', 'Watch recorded sessions if you miss live ones']
    };

    const achievementTips = tips[achievementId] || ['Keep working hard!', 'Stay consistent with your studies'];
    showToast(`Tips: ${achievementTips.join(', ')}`, 'info');
}

// Settings functionality
function loadSettings() {
    // Load user data into form
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const studentIdInput = document.getElementById('studentId');

    if (fullNameInput) fullNameInput.value = appState.currentUser.name;
    if (emailInput) emailInput.value = appState.currentUser.email;
    if (studentIdInput) studentIdInput.value = appState.currentUser.id;
}

function saveProfile() {
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;

    if (fullName && email) {
        // Update state
        appState.currentUser.name = fullName;
        appState.currentUser.email = email;

        // Update welcome message
        const welcomeTitle = document.querySelector('.header-title h2');
        if (welcomeTitle) {
            welcomeTitle.textContent = `Welcome back, ${fullName.split(' ')[0]}!`;
        }

        showToast('Profile updated successfully!', 'success');
        trackUserActivity('profile_update', { name: fullName, email });
    } else {
        showToast('Please fill in all required fields', 'error');
    }
}

function exportGrades() {
    showToast('Generating grade report...', 'info');

    // Simulate report generation
    setTimeout(() => {
        const reportData = {
            student: appState.currentUser,
            courses: appState.courses,
            assignments: appState.assignments,
            gpa: calculateGPA(),
            generatedAt: new Date().toISOString()
        };

        // Create downloadable file
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `grade-report-${Date.now()}.json`;
        link.click();

        showToast('Grade report downloaded successfully!', 'success');
        trackUserActivity('grade_export', { gpa: reportData.gpa });
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load initial data
    loadDashboard();
    updateNotificationBadge();

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

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K for quick search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showToast('Quick search coming soon!', 'info');
        }

        // Escape to close dropdowns
        if (e.key === 'Escape') {
            const dropdown = document.getElementById('notificationDropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        }
    });

    // Add CSS for additional elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            to {
                transform: translateX(120%);
                opacity: 0;
            }
        }
        .unread-badge {
            position: absolute;
            top: 4px;
            right: 4px;
            background: #ef4444;
            color: white;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 10px;
            min-width: 18px;
            text-align: center;
        }
        .contact-item.unread {
            background: rgba(99, 179, 237, 0.1);
        }
    `;
    document.head.appendChild(style);

    showToast('Welcome to your student dashboard! 🎓', 'success');
});

// Load courses data
function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const courses = [
        {
            title: 'Web Development',
            instructor: 'Prof. Sarah Johnson',
            progress: 75,
            grade: 'A',
            avatar: 'WD',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            students: 247,
            rating: 4.9,
            nextClass: 'Tomorrow, 10:00 AM'
        },
        {
            title: 'Data Science',
            instructor: 'Dr. Michael Chen',
            progress: 60,
            grade: 'B+',
            avatar: 'DS',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            students: 189,
            rating: 4.8,
            nextClass: 'Today, 2:00 PM'
        },
        {
            title: 'UI/UX Design',
            instructor: 'Prof. Emily Davis',
            progress: 85,
            grade: 'A-',
            avatar: 'UI',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            students: 156,
            rating: 4.7,
            nextClass: 'Friday, 11:00 AM'
        },
        {
            title: 'Mobile Development',
            instructor: 'Dr. James Wilson',
            progress: 45,
            grade: 'B',
            avatar: 'MD',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            students: 134,
            rating: 4.6,
            nextClass: 'Monday, 3:00 PM'
        },
        {
            title: 'Database Systems',
            instructor: 'Prof. Lisa Anderson',
            progress: 90,
            grade: 'A',
            avatar: 'DB',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            students: 98,
            rating: 4.8,
            nextClass: 'Wednesday, 9:00 AM'
        },
        {
            title: 'Machine Learning',
            instructor: 'Dr. Robert Taylor',
            progress: 30,
            grade: 'B+',
            avatar: 'ML',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            students: 76,
            rating: 4.9,
            nextClass: 'Thursday, 1:00 PM'
        }
    ];

    coursesGrid.innerHTML = courses.map(course => `
        <div class="section-card neumorphic">
            <div class="course-avatar" style="background: ${course.gradient}; width: 60px; height: 60px; margin: 0 auto 16px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 18px;">
                <span>${course.avatar}</span>
            </div>
            <h3 style="text-align: center; margin-bottom: 8px; color: #ffffff;">${course.title}</h3>
            <p style="text-align: center; color: #a0aec0; margin-bottom: 16px; font-size: 14px;">${course.instructor}</p>
            
            <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-size: 12px; color: #a0aec0;">Progress</span>
                    <span style="font-size: 12px; color: #ffffff;">${course.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%;"></div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div style="text-align: center; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    <div style="font-size: 18px; font-weight: 600; color: #ffffff;">${course.grade}</div>
                    <div style="font-size: 11px; color: #a0aec0;">Grade</div>
                </div>
                <div style="text-align: center; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    <div style="font-size: 18px; font-weight: 600; color: #ffffff;">${course.rating}</div>
                    <div style="font-size: 11px; color: #a0aec0;">Rating</div>
                </div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Next Class</div>
                <div style="font-size: 14px; color: #ffffff;">${course.nextClass}</div>
            </div>
            
            <button class="btn btn-primary" style="width: 100%;" onclick="openCourseFromCard(${appState.courses.findIndex(c => c.title === course.title) + 1})">
                View Course
            </button>
        </div>
    `).join('');
}

// Load assignments data
function loadAssignments() {
    const assignmentsContainer = document.getElementById('assignmentsContainer');
    const assignments = [
        {
            title: 'React Components Assignment',
            course: 'Web Development',
            dueDate: 'Tomorrow',
            difficulty: 'Medium',
            points: 50,
            status: 'pending',
            description: 'Build a reusable component library using React hooks and TypeScript.'
        },
        {
            title: 'Data Visualization Project',
            course: 'Data Science',
            dueDate: 'In 3 days',
            difficulty: 'Hard',
            points: 75,
            status: 'pending',
            description: 'Create interactive visualizations using D3.js and real-world datasets.'
        },
        {
            title: 'UI Prototyping',
            course: 'UI/UX Design',
            dueDate: 'In 5 days',
            difficulty: 'Easy',
            points: 30,
            status: 'pending',
            description: 'Design high-fidelity prototypes for a mobile banking app.'
        },
        {
            title: 'Database Schema Design',
            course: 'Database Systems',
            dueDate: 'Submitted',
            difficulty: 'Medium',
            points: 40,
            status: 'submitted',
            description: 'Design and implement a normalized database schema for an e-commerce platform.'
        },
        {
            title: 'ML Model Training',
            course: 'Machine Learning',
            dueDate: 'Graded',
            difficulty: 'Hard',
            points: 60,
            status: 'graded',
            grade: 'A-',
            description: 'Train and evaluate a classification model on the provided dataset.'
        }
    ];

    assignmentsContainer.innerHTML = assignments.map(assignment => {
        const statusColor = assignment.status === 'pending' ? '#f59e0b' :
            assignment.status === 'submitted' ? '#3b82f6' : '#10b981';
        const statusText = assignment.status === 'pending' ? 'Pending' :
            assignment.status === 'submitted' ? 'Submitted' : 'Graded';

        return `
            <div class="section-card neumorphic">
                <div class="section-header">
                    <h3 class="section-title">${assignment.title}</h3>
                    <span style="padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 12px; font-size: 12px; font-weight: 500;">
                        ${statusText}
                    </span>
                </div>
                
                <p style="color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">
                    ${assignment.description}
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Course</div>
                        <div style="font-size: 14px; color: #ffffff;">${assignment.course}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Due Date</div>
                        <div style="font-size: 14px; color: #ffffff;">${assignment.dueDate}</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div style="display: flex; gap: 12px;">
                        <span class="difficulty">${assignment.difficulty}</span>
                        <span class="points">${assignment.points} pts</span>
                    </div>
                    ${assignment.grade ? `<span style="color: #10b981; font-weight: 600;">Grade: ${assignment.grade}</span>` : ''}
                </div>
                
                ${assignment.status === 'pending' ?
                `<button class="btn btn-primary" style="width: 100%;" onclick="startAssignment('${assignment.title}')">
                        Start Assignment
                    </button>` :
                assignment.status === 'submitted' ?
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="showToast('Assignment submitted successfully', 'success')">
                        View Submission
                    </button>` :
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="showToast('Viewing graded assignment', 'info')">
                        View Results
                    </button>`
            }
            </div>
        `;
    }).join('');
}

// Load live classes data
function loadLiveClasses() {
    const liveClassesGrid = document.getElementById('liveClassesGrid');
    const liveClasses = [
        {
            title: 'Web Development Live Session',
            instructor: 'Prof. Sarah Johnson',
            time: 'Now',
            status: 'live',
            participants: 45,
            topic: 'React Hooks Deep Dive',
            duration: '2 hours'
        },
        {
            title: 'Data Science Workshop',
            instructor: 'Dr. Michael Chen',
            time: 'Today, 2:00 PM',
            status: 'upcoming',
            participants: 0,
            topic: 'Introduction to Pandas',
            duration: '1.5 hours'
        },
        {
            title: 'UI/UX Design Critique',
            instructor: 'Prof. Emily Davis',
            time: 'Tomorrow, 11:00 AM',
            status: 'upcoming',
            participants: 0,
            topic: 'Portfolio Review Session',
            duration: '2 hours'
        },
        {
            title: 'Database Systems Lab',
            instructor: 'Prof. Lisa Anderson',
            time: 'Yesterday',
            status: 'recorded',
            participants: 32,
            topic: 'SQL Optimization Techniques',
            duration: '1 hour'
        }
    ];

    liveClassesGrid.innerHTML = liveClasses.map(liveClass => {
        const statusColor = liveClass.status === 'live' ? '#ef4444' :
            liveClass.status === 'upcoming' ? '#3b82f6' : '#6b7280';
        const statusText = liveClass.status === 'live' ? '🔴 LIVE NOW' :
            liveClass.status === 'upcoming' ? 'Upcoming' : 'Recorded';

        return `
            <div class="section-card neumorphic">
                <div class="section-header">
                    <h3 class="section-title">${liveClass.title}</h3>
                    <span style="padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 12px; font-size: 12px; font-weight: 500;">
                        ${statusText}
                    </span>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; color: #a0aec0; margin-bottom: 4px;">Instructor</div>
                    <div style="font-size: 16px; color: #ffffff; font-weight: 500;">${liveClass.instructor}</div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; color: #a0aec0; margin-bottom: 4px;">Topic</div>
                    <div style="font-size: 14px; color: #ffffff;">${liveClass.topic}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Time</div>
                        <div style="font-size: 14px; color: #ffffff;">${liveClass.time}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Duration</div>
                        <div style="font-size: 14px; color: #ffffff;">${liveClass.duration}</div>
                    </div>
                </div>
                
                ${liveClass.participants > 0 ?
                `<div style="margin-bottom: 16px;">
                        <div style="font-size: 12px; color: #a0aec0; margin-bottom: 4px;">Participants</div>
                        <div style="font-size: 14px; color: #ffffff;">👥 ${liveClass.participants} students</div>
                    </div>` : ''
            }
                
                ${liveClass.status === 'live' ?
                `<button class="btn btn-primary" style="width: 100%; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);" onclick="joinLiveClass('${liveClass.title}')">
                        Join Live Session
                    </button>` :
                liveClass.status === 'upcoming' ?
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="setReminder('${liveClass.title}')">
                        Set Reminder
                    </button>` :
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="watchRecording('${liveClass.title}')">
                        Watch Recording
                    </button>`
            }
            </div>
        `;
    }).join('');
}

// Load grades data
function loadGrades() {
    const gradeList = document.getElementById('gradeList');
    const grades = [
        { course: 'Web Development', grade: 'A', percentage: 92, credits: 3 },
        { course: 'Data Science', grade: 'B+', percentage: 87, credits: 3 },
        { course: 'UI/UX Design', grade: 'A-', percentage: 89, credits: 2 },
        { course: 'Mobile Development', grade: 'B', percentage: 84, credits: 3 },
        { course: 'Database Systems', grade: 'A', percentage: 94, credits: 3 },
        { course: 'Machine Learning', grade: 'B+', percentage: 88, credits: 4 }
    ];

    gradeList.innerHTML = grades.map(grade => {
        const gradeColor = grade.percentage >= 90 ? '#10b981' :
            grade.percentage >= 80 ? '#3b82f6' : '#f59e0b';

        return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 8px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div style="font-size: 14px; font-weight: 500; color: #ffffff; margin-bottom: 4px;">${grade.course}</div>
                    <div style="font-size: 12px; color: #a0aec0;">${grade.credits} credits</div>
                </div>
                <div style="text-align: center; margin-right: 20px;">
                    <div style="font-size: 18px; font-weight: 600; color: ${gradeColor};">${grade.grade}</div>
                    <div style="font-size: 12px; color: #a0aec0;">${grade.percentage}%</div>
                </div>
                <div style="width: 60px;">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${grade.percentage}%; background: ${gradeColor};"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load achievements data
function loadAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    const achievements = [
        {
            title: 'Quick Learner',
            description: 'Complete 5 assignments in one week',
            icon: '⚡',
            unlocked: true,
            progress: 100,
            category: 'Speed'
        },
        {
            title: 'Code Master',
            description: 'Complete 25 coding assignments',
            icon: '🌟',
            unlocked: false,
            progress: 96,
            category: 'Coding'
        },
        {
            title: 'Perfect Score',
            description: 'Get 100% on 3 assignments',
            icon: '💯',
            unlocked: true,
            progress: 100,
            category: 'Excellence'
        },
        {
            title: 'Early Bird',
            description: 'Submit assignments 24 hours before deadline',
            icon: '🐦',
            unlocked: true,
            progress: 100,
            category: 'Time Management'
        },
        {
            title: 'Team Player',
            description: 'Participate in 10 study groups',
            icon: '🤝',
            unlocked: false,
            progress: 70,
            category: 'Collaboration'
        },
        {
            title: 'Knowledge Seeker',
            description: 'Attend 20 live classes',
            icon: '📚',
            unlocked: false,
            progress: 45,
            category: 'Participation'
        }
    ];

    achievementsGrid.innerHTML = achievements.map(achievement => `
        <div class="section-card neumorphic ${achievement.unlocked ? '' : 'locked'}" style="${!achievement.unlocked ? 'opacity: 0.7;' : ''}">
            <div style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: 48px; margin-bottom: 8px;">${achievement.icon}</div>
                <span style="padding: 4px 12px; background: ${achievement.unlocked ? '#10b98120' : '#6b728020'}; color: ${achievement.unlocked ? '#10b981' : '#6b7280'}; border-radius: 12px; font-size: 12px; font-weight: 500;">
                    ${achievement.category}
                </span>
            </div>
            
            <h3 style="text-align: center; margin-bottom: 8px; color: #ffffff;">${achievement.title}</h3>
            <p style="text-align: center; color: #a0aec0; margin-bottom: 16px; font-size: 14px; line-height: 1.5;">
                ${achievement.description}
            </p>
            
            ${!achievement.unlocked ? `
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 12px; color: #a0aec0;">Progress</span>
                        <span style="font-size: 12px; color: #ffffff;">${achievement.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${achievement.progress}%;"></div>
                    </div>
                </div>
            ` : ''}
            
            <button class="btn ${achievement.unlocked ? 'btn-secondary' : 'btn-primary'}" style="width: 100%;" onclick="showAchievementDetails('${achievement.title}', ${achievement.unlocked})">
                ${achievement.unlocked ? 'View Details' : 'Track Progress'}
            </button>
        </div>
    `).join('');
}

// Action functions
function startAssignment(title) {
    showToast(`Starting ${title}...`, 'info');
}

function joinLiveClass(title) {
    showToast(`Joining ${title}...`, 'info');
}

function setReminder(title) {
    showToast(`Reminder set for ${title}`, 'success');
}

function watchRecording(title) {
    showToast(`Loading recording for ${title}...`, 'info');
}

function showAchievementDetails(title, unlocked) {
    if (unlocked) {
        showToast(`Achievement unlocked: ${title}!`, 'success');
    } else {
        showToast(`Track your progress for: ${title}`, 'info');
    }
}

function exportGrades() {
    showToast('Generating grade report...', 'info');
    setTimeout(() => {
        showToast('Grade report downloaded successfully!', 'success');
    }, 2000);
}

function saveProfile() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    if (fullName && email) {
        showToast('Profile updated successfully!', 'success');
    } else {
        showToast('Please fill in all required fields', 'error');
    }
}

// Messages functionality
function switchContact(contactName) {
    // Update active contact
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.contact-item').classList.add('active');

    // Update chat header
    document.getElementById('currentContactName').textContent = contactName;

    // Update status based on contact
    const statuses = {
        'Prof. Sarah Johnson': 'Web Development • Online',
        'Dr. Michael Chen': 'Data Science • Away',
        'Study Group': '6 members • Active'
    };

    document.getElementById('currentContactStatus').textContent = statuses[contactName] || 'Unknown';

    // Clear and load chat messages
    loadChatMessages(contactName);
}

function loadChatMessages(contactName) {
    const messagesContainer = document.getElementById('mainChatMessages');

    const messages = {
        'Prof. Sarah Johnson': [
            { type: 'received', text: 'Hi Alex! I just reviewed your React assignment submission. Excellent work!', time: '10:30 AM' },
            { type: 'sent', text: 'Thank you professor! I really enjoyed working on it.', time: '10:32 AM' },
            { type: 'received', text: 'Your attention to detail is impressive. Keep up the great work!', time: '10:33 AM' }
        ],
        'Dr. Michael Chen': [
            { type: 'received', text: 'Don\'t forget about the quiz tomorrow at 2 PM', time: '9:15 AM' },
            { type: 'sent', text: 'Thank you for the reminder! I\'ll be there.', time: '9:20 AM' },
            { type: 'received', text: 'Make sure to review chapters 5-7', time: '9:22 AM' }
        ],
        'Study Group': [
            { type: 'received', text: 'Emma: Anyone available for study session today?', time: '2:00 PM' },
            { type: 'sent', text: 'I can join at 3 PM', time: '2:05 PM' },
            { type: 'received', text: 'Michael: Great! Library at 3?', time: '2:10 PM' },
            { type: 'sent', text: 'Sounds good to me!', time: '2:12 PM' }
        ]
    };

    const contactMessages = messages[contactName] || [];

    messagesContainer.innerHTML = contactMessages.map(msg => `
        <div class="message ${msg.type}">
            <p>${msg.text}</p>
            <span class="msg-time">${msg.time}</span>
        </div>
    `).join('');

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage(inputId, messagesId) {
    const input = document.getElementById(inputId);
    const messagesContainer = document.getElementById(messagesId);

    if (input.value.trim()) {
        // Add sent message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.innerHTML = `
            <p>${input.value}</p>
            <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        `;
        messagesContainer.appendChild(messageDiv);

        // Clear input
        input.value = '';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate response
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message received';
            responseDiv.innerHTML = `
                <p>Thanks for your message! I'll get back to you soon.</p>
                <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
            messagesContainer.appendChild(responseDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
}

function handleEnter(event, inputId, messagesId) {
    if (event.key === 'Enter') {
        sendMessage(inputId, messagesId);
    }
}

// Navigation function
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

    // Find and activate the corresponding nav link
    const activeLink = document.querySelector(`.nav-link[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Load section-specific data
    switch (sectionId) {
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
        case 'dashboard':
            loadDashboard();
            break;
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Filter assignments
function filterAssignments() {
    const filter = document.getElementById('assignmentFilter').value;
    loadAssignments(); // Reload with filter applied
    showToast(`Showing ${filter} assignments`, 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load initial data
    loadCourses();

    // Close mobile sidebar when clicking overlay
    document.querySelector('.sidebar-overlay').addEventListener('click', toggleSidebar);

    // Close notifications when clicking outside
    document.addEventListener('click', function (e) {
        const dropdown = document.getElementById('notificationDropdown');
        const bell = document.querySelector('.notification-bell');

        if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            document.querySelector('.sidebar').classList.remove('active');
            document.querySelector('.sidebar-overlay').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});

// Add CSS animation for slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(120%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
