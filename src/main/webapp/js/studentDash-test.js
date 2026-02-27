// Simple test version to verify navigation works
console.log('Student Dashboard JavaScript loaded successfully!');

// Global state management
const appState = {
    currentUser: {
        name: 'Alex Thompson',
        email: 'alex.thompson@university.edu',
        id: 'ST2024001',
        avatar: 'AT'
    }
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
    switch(sectionId) {
        case 'dashboard':
            console.log('Loading dashboard...');
            break;
        case 'my-courses':
            console.log('Loading courses...');
            break;
        case 'assignments':
            console.log('Loading assignments...');
            break;
        case 'live-class':
            console.log('Loading live classes...');
            break;
        case 'messages':
            console.log('Loading messages...');
            break;
        case 'grades':
            console.log('Loading grades...');
            break;
        case 'achievements':
            console.log('Loading achievements...');
            break;
        case 'settings':
            console.log('Loading settings...');
            break;
    }
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// User activity tracking
function trackUserActivity(action, data) {
    console.log('User activity:', action, data);
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing dashboard...');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-input').focus();
        }
        if (e.key === 'Escape') {
            closeNotifications();
        }
    });
    
    console.log('Dashboard initialized successfully!');
});
