// School Admin Dashboard - Complete Functionality
console.log('School Admin Dashboard loaded successfully!');

// Global State with Extensive Dummy Data
const schoolState = {
    currentUser: { name: 'Admin User', role: 'Super Admin', avatar: 'AD' },

    students: generateStudents(100),
    teachers: generateTeachers(50),
    parents: generateParents(80),
    staff: generateStaff(20),
    classes: generateClasses(42),
    subjects: generateSubjects(25),
    assignments: generateAssignments(50),
    enrollments: generateEnrollments(100),
    attendance: generateAttendance(100),
    exams: generateExams(30),
    results: generateResults(200),
    announcements: generateAnnouncements(15),
    events: generateEvents(30),
    fees: generateFees(100),
    roles: generateRoles(),
    backups: generateBackups(10),
    logs: generateLogs(50)
};

// Data Generation Functions
function generateStudents(count) {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const classes = ['Grade 1-A', 'Grade 1-B', 'Grade 2-A', 'Grade 2-B', 'Grade 3-A', 'Grade 3-B', 'Grade 4-A', 'Grade 4-B', 'Grade 5-A', 'Grade 5-B'];
    const statuses = ['Active', 'Active', 'Active', 'Active', 'Inactive'];

    return Array.from({ length: count }, (_, i) => ({
        id: `STU${String(i + 1).padStart(4, '0')}`,
        name: `${firstNames[i % firstNames.length]} ${lastNames[Math.floor(i / firstNames.length) % lastNames.length]}`,
        class: classes[i % classes.length],
        email: `student${i + 1}@connet.edu`,
        status: statuses[i % statuses.length],
        joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    }));
}

function generateTeachers(count) {
    const names = ['Dr. Sarah Williams', 'Prof. Michael Chen', 'Ms. Emily Davis', 'Mr. Robert Taylor', 'Dr. Lisa Anderson', 'Prof. David Brown', 'Ms. Jennifer Wilson', 'Mr. James Moore'];
    const departments = ['Science', 'Mathematics', 'English', 'History', 'Arts', 'Physical Education'];
    const subjects = ['Physics', 'Chemistry', 'Biology', 'Algebra', 'Geometry', 'Literature', 'Grammar', 'World History', 'Music', 'PE'];

    return Array.from({ length: count }, (_, i) => ({
        id: `TCH${String(i + 1).padStart(3, '0')}`,
        name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
        department: departments[i % departments.length],
        subjects: [subjects[i % subjects.length], subjects[(i + 1) % subjects.length]].join(', '),
        email: `teacher${i + 1}@connet.edu`,
        experience: Math.floor(Math.random() * 15) + 1
    }));
}

function generateParents(count) {
    const names = ['John Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'Michael Jones', 'Linda Garcia', 'William Miller', 'Elizabeth Davis'];

    return Array.from({ length: count }, (_, i) => ({
        id: `PAR${String(i + 1).padStart(3, '0')}`,
        name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
        students: [`STU${String(i + 1).padStart(4, '0')}`],
        phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `parent${i + 1}@email.com`
    }));
}

function generateStaff(count) {
    const names = ['Alice Cooper', 'Bob Martin', 'Carol White', 'Dan Lee', 'Eve Harris', 'Frank Clark', 'Grace Lewis', 'Henry Walker'];
    const roles = ['Librarian', 'Lab Assistant', 'Counselor', 'Admin Staff', 'IT Support', 'Nurse'];
    const departments = ['Library', 'Science Lab', 'Counseling', 'Administration', 'IT', 'Health'];

    return Array.from({ length: count }, (_, i) => ({
        id: `STF${String(i + 1).padStart(3, '0')}`,
        name: names[i % names.length],
        role: roles[i % roles.length],
        department: departments[i % departments.length],
        email: `staff${i + 1}@connet.edu`
    }));
}

function generateClasses(count) {
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
    const sections = ['A', 'B', 'C', 'D'];

    return Array.from({ length: count }, (_, i) => ({
        id: `CLS${String(i + 1).padStart(3, '0')}`,
        name: `${grades[Math.floor(i / sections.length)]} - ${sections[i % sections.length]}`,
        teacher: `TCH${String((i % 20) + 1).padStart(3, '0')}`,
        students: Math.floor(Math.random() * 15) + 20,
        capacity: 35
    }));
}

function generateSubjects(count) {
    const subjects = [
        { code: 'MAT101', name: 'Mathematics I', dept: 'Mathematics', credits: 4 },
        { code: 'ENG101', name: 'English Literature', dept: 'English', credits: 3 },
        { code: 'SCI101', name: 'General Science', dept: 'Science', credits: 4 },
        { code: 'HIS101', name: 'World History', dept: 'History', credits: 3 },
        { code: 'ART101', name: 'Visual Arts', dept: 'Arts', credits: 2 },
        { code: 'PE101', name: 'Physical Education', dept: 'PE', credits: 2 },
        { code: 'MAT201', name: 'Algebra', dept: 'Mathematics', credits: 4 },
        { code: 'PHY101', name: 'Physics', dept: 'Science', credits: 4 },
        { code: 'CHE101', name: 'Chemistry', dept: 'Science', credits: 4 },
        { code: 'BIO101', name: 'Biology', dept: 'Science', credits: 4 }
    ];

    return subjects.slice(0, count);
}

function generateAssignments(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: `ASN${String(i + 1).padStart(3, '0')}`,
        teacher: `TCH${String((i % 20) + 1).padStart(3, '0')}`,
        subject: `MAT${(i % 3) + 1}01`,
        class: `CLS${String((i % 42) + 1).padStart(3, '0')}`,
        schedule: ['Mon/Wed 9:00 AM', 'Tue/Thu 10:00 AM', 'Mon/Wed/Fri 11:00 AM'][i % 3]
    }));
}

function generateEnrollments(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: `ENR${String(i + 1).padStart(4, '0')}`,
        student: `STU${String(i + 1).padStart(4, '0')}`,
        class: `CLS${String((i % 42) + 1).padStart(3, '0')}`,
        subjects: ['MAT101', 'ENG101', 'SCI101'].join(', '),
        enrollDate: `2023-09-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    }));
}

function generateAttendance(count) {
    const statuses = ['Present', 'Present', 'Present', 'Present', 'Absent', 'Late'];
    const today = new Date().toISOString().split('T')[0];

    return Array.from({ length: count }, (_, i) => ({
        id: `ATT${String(i + 1).padStart(4, '0')}`,
        student: `STU${String(i + 1).padStart(4, '0')}`,
        class: `CLS${String((i % 42) + 1).padStart(3, '0')}`,
        status: statuses[i % statuses.length],
        time: `${Math.floor(Math.random() * 3) + 7}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`,
        date: today
    }));
}

function generateExams(count) {
    const subjects = ['Mathematics', 'English', 'Science', 'History', 'Physics', 'Chemistry'];

    return Array.from({ length: count }, (_, i) => ({
        id: `EXM${String(i + 1).padStart(3, '0')}`,
        name: `${['Mid-term', 'Final', 'Quiz', 'Unit Test'][i % 4]} - ${subjects[i % subjects.length]}`,
        subject: subjects[i % subjects.length],
        class: `CLS${String((i % 42) + 1).padStart(3, '0')}`,
        date: `2024-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        duration: `${[60, 90, 120, 180][i % 4]} min`
    }));
}

function generateResults(count) {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

    return Array.from({ length: count }, (_, i) => ({
        id: `RES${String(i + 1).padStart(4, '0')}`,
        student: `STU${String((i % 100) + 1).padStart(4, '0')}`,
        exam: `EXM${String((i % 30) + 1).padStart(3, '0')}`,
        subject: ['Mathematics', 'English', 'Science'][i % 3],
        marks: Math.floor(Math.random() * 40) + 60,
        grade: grades[Math.floor(Math.random() * grades.length)]
    }));
}

function generateAnnouncements(count) {
    const titles = ['School Holiday Notice', 'Parent-Teacher Meeting', 'Sports Day Event', 'Exam Schedule Released', 'New Library Books', 'Science Fair Registration'];
    const contents = [
        'School will be closed for winter break from Dec 20 to Jan 5.',
        'Parent-teacher meetings scheduled for next week. Please check your email for appointment times.',
        'Annual sports day will be held on March 15. All students are encouraged to participate.',
        'Mid-term exam schedule has been released. Please check the school portal.',
        'New collection of books added to the library. Visit during lunch hours.',
        'Science fair registration is now open. Submit your project proposals by Feb 28.'
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: `ANN${String(i + 1).padStart(3, '0')}`,
        title: titles[i % titles.length],
        content: contents[i % contents.length],
        date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        author: 'Admin'
    }));
}

function generateEvents(count) {
    const events = ['School Assembly', 'Sports Practice', 'Club Meeting', 'Parent Meeting', 'Exam', 'Holiday', 'Workshop', 'Field Trip'];

    return Array.from({ length: count }, (_, i) => ({
        id: `EVT${String(i + 1).padStart(3, '0')}`,
        title: events[i % events.length],
        date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        type: ['academic', 'sports', 'cultural', 'holiday'][i % 4]
    }));
}

function generateFees(count) {
    const statuses = ['Paid', 'Paid', 'Paid', 'Pending', 'Overdue'];

    return Array.from({ length: count }, (_, i) => ({
        id: `FEE${String(i + 1).padStart(4, '0')}`,
        student: `STU${String(i + 1).padStart(4, '0')}`,
        class: `CLS${String((i % 42) + 1).padStart(3, '0')}`,
        totalFee: 5000,
        paid: statuses[i % statuses.length] === 'Paid' ? 5000 : (statuses[i % statuses.length] === 'Pending' ? Math.floor(Math.random() * 3000) : 0),
        pending: statuses[i % statuses.length] === 'Paid' ? 0 : (statuses[i % statuses.length] === 'Pending' ? 5000 - Math.floor(Math.random() * 3000) : 5000),
        status: statuses[i % statuses.length]
    }));
}

function generateRoles() {
    return [
        { id: 'ROL001', name: 'Super Admin', permissions: 'All' },
        { id: 'ROL002', name: 'Principal', permissions: 'View All, Manage Staff, Manage Students' },
        { id: 'ROL003', name: 'Teacher', permissions: 'View Students, Manage Grades, Mark Attendance' },
        { id: 'ROL004', name: 'Accountant', permissions: 'Manage Fees, View Reports' },
        { id: 'ROL005', name: 'Librarian', permissions: 'Manage Library' }
    ];
}

function generateBackups(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: `BCK${String(i + 1).padStart(3, '0')}`,
        name: `Backup_${new Date(Date.now() - i * 86400000).toISOString().split('T')[0]}`,
        date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        size: `${Math.floor(Math.random() * 500) + 100} MB`
    }));
}

function generateLogs(count) {
    const actions = ['User Login', 'Student Added', 'Grade Updated', 'Attendance Marked', 'Fee Payment Received', 'Announcement Posted'];

    return Array.from({ length: count }, (_, i) => ({
        id: `LOG${String(i + 1).padStart(4, '0')}`,
        action: actions[i % actions.length],
        user: 'Admin User',
        time: new Date(Date.now() - i * 3600000).toLocaleString(),
        details: 'Action completed successfully'
    }));
}

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
        case 'students': loadStudents(); break;
        case 'teachers': loadTeachers(); break;
        case 'parents': loadParents(); break;
        case 'staff': loadStaff(); break;
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
function loadDashboard() {
    const feed = document.getElementById('activityFeed');
    if (feed) {
        feed.innerHTML = schoolState.logs.slice(0, 6).map(log => `
            <div class="activity-item">
                <div class="activity-icon">📝</div>
                <div class="activity-content">
                    <div class="activity-text">${log.action}</div>
                    <div class="activity-time">${log.time}</div>
                </div>
            </div>
        `).join('');
    }

    const events = document.getElementById('upcomingEvents');
    if (events) {
        events.innerHTML = schoolState.events.slice(0, 5).map(event => `
            <div class="event-item">
                <div class="event-title">${event.title}</div>
                <div class="event-date">${event.date}</div>
            </div>
        `).join('');
    }
}

function loadStudents() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.students.slice(0, 50).map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td><span class="badge badge-${student.status.toLowerCase()}">${student.status}</span></td>
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

    tbody.innerHTML = schoolState.teachers.slice(0, 50).map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.department}</td>
            <td>${teacher.subjects}</td>
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

function loadParents() {
    const tbody = document.getElementById('parentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.parents.slice(0, 50).map(parent => `
        <tr>
            <td>${parent.name}</td>
            <td>${parent.students.join(', ')}</td>
            <td>${parent.phone}</td>
            <td>${parent.email}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('parent', '${parent.id}')">View</button>
                    <button class="action-btn" onclick="editItem('parent', '${parent.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadStaff() {
    const tbody = document.getElementById('staffTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.staff.map(staff => `
        <tr>
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.department}</td>
            <td>${staff.email}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="viewItem('staff', '${staff.id}')">View</button>
                    <button class="action-btn" onclick="editItem('staff', '${staff.id}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadClasses() {
    const grid = document.getElementById('classesGrid');
    if (!grid) return;

    grid.innerHTML = schoolState.classes.map(cls => `
        <div class="class-card">
            <div class="class-title">${cls.name}</div>
            <div class="class-info">Teacher: ${cls.teacher}</div>
            <div class="class-info">Students: ${cls.students}/${cls.capacity}</div>
        </div>
    `).join('');
}

function loadSubjects() {
    const tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.subjects.map(subject => `
        <tr>
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.dept}</td>
            <td>${subject.credits}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editItem('subject', '${subject.code}')">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadAssignmentsTable() {
    const tbody = document.getElementById('assignmentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.assignments.slice(0, 30).map(asn => `
        <tr>
            <td>${asn.teacher}</td>
            <td>${asn.subject}</td>
            <td>${asn.class}</td>
            <td>${asn.schedule}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editItem('assignment', '${asn.id}')">Edit</button>
                    <button class="action-btn" onclick="deleteItem('assignment', '${asn.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadEnrollment() {
    const tbody = document.getElementById('enrollmentTableBody');
    if (!tbody) return;

    tbody.innerHTML = schoolState.enrollments.slice(0, 30).map(enr => `
        <tr>
            <td>${enr.student}</td>
            <td>${enr.class}</td>
            <td>${enr.subjects}</td>
            <td>${enr.enrollDate}</td>
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

    grid.innerHTML = schoolState.announcements.map(ann => `
        <div class="announcement-card">
            <div class="announcement-header">
                <div class="announcement-title">${ann.title}</div>
                <div class="announcement-date">${ann.date}</div>
            </div>
            <div class="announcement-content">${ann.content}</div>
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
    // Add Item Functions
    function showAddModal(type) {
        let title = '';
        let content = '';

        switch (type) {
            case 'student':
                title = 'Add New Student';
                content = `
                <form class="modal-form" id="addStudentForm">
                    <div class="form-group">
                        <label>First Name *</label>
                        <input type="text" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name *</label>
                        <input type="text" name="lastName" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone">
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select name="class" required>
                            <option value="">Select Class</option>
                            <option value="Grade 1-A">Grade 1-A</option>
                            <option value="Grade 2-A">Grade 2-A</option>
                            <option value="Grade 3-A">Grade 3-A</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" required>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Address</label>
                        <textarea name="address" rows="3"></textarea>
                    </div>
                </form>
            `;
                break;
            case 'teacher':
                title = 'Add New Teacher';
                content = `
                <form class="modal-form" id="addTeacherForm">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <select name="department" required>
                            <option value="">Select Department</option>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Experience (years)</label>
                        <input type="number" name="experience" min="0">
                    </div>
                    <div class="form-group full-width">
                        <label>Subjects</label>
                        <input type="text" name="subjects" placeholder="e.g., Physics, Chemistry">
                    </div>
                    <div class="form-group full-width">
                        <label>Qualifications</label>
                        <textarea name="qualifications" rows="3"></textarea>
                    </div>
                </form>
            `;
                break;
            case 'parent':
                title = 'Add New Parent';
                content = `
                <form class="modal-form" id="addParentForm">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone *</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Relationship</label>
                        <select name="relationship">
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Guardian">Guardian</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Student ID(s)</label>
                        <input type="text" name="students" placeholder="e.g., STU0001, STU0002">
                    </div>
                </form>
            `;
                break;
            case 'staff':
                title = 'Add New Staff Member';
                content = `
                <form class="modal-form" id="addStaffForm">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Role *</label>
                        <select name="role" required>
                            <option value="">Select Role</option>
                            <option value="Librarian">Librarian</option>
                            <option value="Lab Assistant">Lab Assistant</option>
                            <option value="Counselor">Counselor</option>
                            <option value="IT Support">IT Support</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <input type="text" name="department" required>
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
            'parent': 'parents',
            'staff': 'staff',
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

        // Extract form data
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Generate new item based on type
        let newItem = null;

        switch (type) {
            case 'student':
                const studentId = `STU${String(schoolState.students.length + 1).padStart(4, '0')}`;
                newItem = {
                    id: studentId,
                    name: `${data.firstName} ${data.lastName}`,
                    class: data.class,
                    email: data.email,
                    status: data.status,
                    joinDate: new Date().toISOString().split('T')[0]
                };
                schoolState.students.push(newItem);
                break;

            case 'teacher':
                const teacherId = `TCH${String(schoolState.teachers.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: teacherId,
                    name: data.name,
                    department: data.department,
                    subjects: data.subjects || '',
                    email: data.email,
                    experience: parseInt(data.experience) || 0
                };
                schoolState.teachers.push(newItem);
                break;

            case 'parent':
                const parentId = `PAR${String(schoolState.parents.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: parentId,
                    name: data.name,
                    students: data.students ? data.students.split(',').map(s => s.trim()) : [],
                    phone: data.phone,
                    email: data.email
                };
                schoolState.parents.push(newItem);
                break;

            case 'staff':
                const staffId = `STF${String(schoolState.staff.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: staffId,
                    name: data.name,
                    role: data.role,
                    department: data.department,
                    email: data.email
                };
                schoolState.staff.push(newItem);
                break;

            case 'exam':
                const examId = `EXM${String(schoolState.exams.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: examId,
                    name: data.name,
                    subject: data.subject,
                    class: data.class,
                    date: data.date,
                    duration: `${data.duration} min`
                };
                schoolState.exams.push(newItem);
                break;

            case 'announcement':
                const annId = `ANN${String(schoolState.announcements.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: annId,
                    title: data.title,
                    content: data.content,
                    date: new Date().toISOString().split('T')[0],
                    author: 'Admin'
                };
                schoolState.announcements.push(newItem);
                break;

            case 'event':
                const eventId = `EVT${String(schoolState.events.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: eventId,
                    title: data.title,
                    date: data.date,
                    type: data.type
                };
                schoolState.events.push(newItem);
                break;

            case 'class':
                const classId = `CLS${String(schoolState.classes.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: classId,
                    name: data.name,
                    teacher: data.teacher,
                    capacity: parseInt(data.capacity) || 30,
                    room: data.room,
                    students: 0
                };
                schoolState.classes.push(newItem);
                break;

            case 'subject':
                newItem = {
                    code: data.code,
                    name: data.name,
                    dept: data.dept,
                    credits: parseInt(data.credits) || 3
                };
                schoolState.subjects.push(newItem);
                break;

            case 'assignment':
                const assignId = `ASG${String(schoolState.assignments.length + 1).padStart(3, '0')}`;
                newItem = {
                    id: assignId,
                    title: data.title,
                    subject: data.subject,
                    class: data.class,
                    dueDate: data.dueDate,
                    status: 'Pending'
                };
                schoolState.assignments.push(newItem);
                break;
        }

        closeModal();
        showToast(`${type} added successfully!`, 'success');

        // Reload the current section to show new data
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            loadSectionData(activeSection.id);
        }
    }

    function submitEdit(type, id) {
        const form = document.querySelector('.modal-form');
        if (!form) return closeModal();

        // Extract form data
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Find and update the item
        const dataMap = {
            'student': 'students',
            'teacher': 'teachers',
            'parent': 'parents',
            'staff': 'staff',
            'exam': 'exams',
            'result': 'results',
            'attendance': 'attendance',
            'subject': 'subjects',
            'class': 'classes',
            'assignment': 'assignments'
        };

        const dataKey = dataMap[type];
        if (!dataKey || !schoolState[dataKey]) {
            closeModal();
            return showToast('Error updating item', 'error');
        }

        const itemIndex = schoolState[dataKey].findIndex(item => item.id === id || item.code === id);
        if (itemIndex === -1) {
            closeModal();
            const errorMsg = type === 'subject' ? `Subject with code ${id} not found` : 'Item not found';
            return showToast(errorMsg, 'error');
        }

        // Update item based on type
        switch (type) {
            case 'student':
                schoolState.students[itemIndex] = {
                    ...schoolState.students[itemIndex],
                    name: data.name,
                    email: data.email,
                    class: data.class,
                    status: data.status,
                    joinDate: data.joinDate
                };
                break;

            case 'teacher':
                schoolState.teachers[itemIndex] = {
                    ...schoolState.teachers[itemIndex],
                    name: data.name,
                    email: data.email,
                    department: data.department,
                    subjects: data.subjects
                };
                break;

            case 'parent':
                schoolState.parents[itemIndex] = {
                    ...schoolState.parents[itemIndex],
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                };
                break;

            case 'staff':
                schoolState.staff[itemIndex] = {
                    ...schoolState.staff[itemIndex],
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    department: data.department
                };
                break;

            case 'exam':
                schoolState.exams[itemIndex] = {
                    ...schoolState.exams[itemIndex],
                    name: data.name,
                    subject: data.subject,
                    class: data.class,
                    date: data.date,
                    duration: data.duration
                };
                break;

            case 'attendance':
                schoolState.attendance[itemIndex] = {
                    ...schoolState.attendance[itemIndex],
                    status: data.status
                };
                break;

            case 'result':
                schoolState.results[itemIndex] = {
                    ...schoolState.results[itemIndex],
                    marks: parseInt(data.marks),
                    grade: data.grade
                };
                break;

            case 'subject':
                schoolState.subjects[itemIndex] = {
                    ...schoolState.subjects[itemIndex],
                    name: data.name,
                    dept: data.dept,
                    credits: parseInt(data.credits)
                };
                break;

            case 'class':
                schoolState.classes[itemIndex] = {
                    ...schoolState.classes[itemIndex],
                    name: data.name,
                    teacher: data.teacher,
                    capacity: parseInt(data.capacity)
                };
                break;

            case 'assignment':
                schoolState.assignments[itemIndex] = {
                    ...schoolState.assignments[itemIndex],
                    title: data.title,
                    dueDate: data.dueDate,
                    status: data.status
                };
                break;
        }

        closeModal();
        showToast(`${type} updated successfully!`, 'success');

        // Reload the current section
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            loadSectionData(activeSection.id);
        }
    }
}

function confirmDelete(type, id) {
    // Find and remove the item
    const dataMap = {
        'student': 'students',
        'teacher': 'teachers',
        'parent': 'parents',
        'staff': 'staff',
        'exam': 'exams',
        'assignment': 'assignments',
        'result': 'results',
        'class': 'classes',
        'subject': 'subjects',
        'fee': 'fees',
        'enrollment': 'enrollments',
        'attendance': 'attendance',
        'event': 'events',
        'announcement': 'announcements'
    };

    const dataKey = dataMap[type];
    if (!dataKey || !schoolState[dataKey]) {
        closeModal();
        return showToast('Error deleting item', 'error');
    }

    const itemIndex = schoolState[dataKey].findIndex(item => item.id === id || item.code === id);
    if (itemIndex === -1) {
        closeModal();
        const errorMsg = type === 'subject' ? `Subject with code ${id} not found` : 'Item not found';
        return showToast(errorMsg, 'error');
    }

    // Remove the item from state
    schoolState[dataKey].splice(itemIndex, 1);

    closeModal();
    showToast(`${type} deleted successfully!`, 'success');

    // Reload the current section
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        loadSectionData(activeSection.id);
    }
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
window.viewDetails = viewDetails;
window.loadDashboard = loadDashboard;
window.showToast = showToast;
