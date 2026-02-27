// This script adds the missing content sections to the dashboard
const fs = require('fs');

const sectionsHTML = `
        </div>

        <!-- Courses Section -->
        <div id="courses" class="content-section">
            <header class="header">
                <div class="header-title">
                    <h2>Course Management</h2>
                    <p class="header-subtitle">Manage your courses and curriculum</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-primary">➕ Add Course</button>
                </div>
            </header>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Courses</div>
                    <div class="stat-value">12</div>
                    <div class="stat-change">↑ 2 new this month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Active Enrollments</div>
                    <div class="stat-value">189</div>
                    <div class="stat-change">↑ 15% from last month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Completion Rate</div>
                    <div class="stat-value">87%</div>
                    <div class="stat-change">↑ 4% from last month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Average Rating</div>
                    <div class="stat-value">4.6</div>
                    <div class="stat-change">↑ 0.2 from last month</div>
                </div>
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
                    <button class="btn btn-primary">➕ Create Assignment</button>
                </div>
            </header>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Assignments</div>
                    <div class="stat-value">68</div>
                    <div class="stat-change">↑ 5 this week</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pending Review</div>
                    <div class="stat-value">34</div>
                    <div class="stat-change">↓ 8 from yesterday</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Submission Rate</div>
                    <div class="stat-value">94%</div>
                    <div class="stat-change">↑ 3% from last week</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Average Score</div>
                    <div class="stat-value">86.2</div>
                    <div class="stat-change">↑ 2.1 from last week</div>
                </div>
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
                    <button class="btn btn-secondary">📊 Generate Report</button>
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
        </div>

        <!-- Settings Section -->
        <div id="settings" class="content-section">
            <header class="header">
                <div class="header-title">
                    <h2>Settings</h2>
                    <div class="header-subtitle">Manage your account and preferences</p>
                </div>
            </header>
            <div class="table-container">
                <div class="table-header">
                    <h3>Account Settings</h3>
                </div>
                <div style="padding: 40px 24px; color: #9ca3af; text-align: center;">
                    <p style="font-size: 16px; margin-bottom: 12px;">⚙️ Settings Panel</p>
                    <p style="font-size: 14px;">Account preferences, notifications, and system configuration options will appear here.</p>
                </div>
            </div>
        </div>
`;

const navigationJS = `
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
            event.preventDefault();
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        }

`;

// Read the file
let content = fs.readFileSync('dashboard.html', 'utf8');

// Insert sections before </main>
content = content.replace('    </main>', sectionsHTML + '    </main>');

// Insert navigation JS before // Mock student data
content = content.replace('        // Mock student data', navigationJS + '        // Mock student data');

// Write the file
fs.writeFileSync('dashboard.html', content, 'utf8');

console.log('Sections and navigation added successfully!');
