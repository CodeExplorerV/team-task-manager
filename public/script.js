let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let isLogin = true;

// DOM Elements
const authSection = document.getElementById('auth-section');
const mainSection = document.getElementById('main-section');
const authForm = document.getElementById('auth-form');
const toggleAuth = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');
const authBtn = document.getElementById('auth-btn');
const nameGroup = document.getElementById('name-group');
const roleGroup = document.getElementById('role-group');
const userNameDisplay = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

const projectsList = document.getElementById('projects-list');
const tasksList = document.getElementById('tasks-list');
const projectModal = document.getElementById('project-modal');
const taskModal = document.getElementById('task-modal');
const addProjectBtn = document.getElementById('add-project-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const closeModals = document.querySelectorAll('.close-modal');

// Initialization
if (currentUser) {
    showMain();
}

// Auth Toggle
toggleAuth.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Login' : 'Signup';
    authBtn.innerText = isLogin ? 'Login' : 'Signup';
    nameGroup.style.display = isLogin ? 'none' : 'block';
    roleGroup.style.display = isLogin ? 'none' : 'block';
    toggleAuth.innerHTML = isLogin ? "Don't have an account? <span>Signup</span>" : "Already have an account? <span>Login</span>";
});

// Auth Form Submit
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { name, email, password, role };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (res.ok) {
            currentUser = data;
            localStorage.setItem('user', JSON.stringify(data));
            showMain();
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    currentUser = null;
    authSection.style.display = 'flex';
    mainSection.style.display = 'none';
});

// Show Main Dashboard
function showMain() {
    authSection.style.display = 'none';
    mainSection.style.display = 'block';
    userNameDisplay.innerText = `Hello, ${currentUser.name} (${currentUser.role})`;
    
    // Show/Hide Admin elements
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(el => el.style.display = currentUser.role === 'Admin' ? 'block' : 'none');

    fetchDashboardData();
}

async function fetchDashboardData() {
    fetchStats();
    fetchProjects();
}

async function fetchStats() {
    try {
        const res = await fetch('/api/tasks/stats', {
            headers: { 'Authorization': `Bearer ${currentUser.token}` }
        });
        const stats = await res.json();
        document.getElementById('total-tasks').innerText = stats.total;
        document.getElementById('todo-tasks').innerText = stats.todo;
        document.getElementById('progress-tasks').innerText = stats.inProgress;
        document.getElementById('completed-tasks').innerText = stats.completed;
        document.getElementById('overdue-tasks').innerText = stats.overdue;
    } catch (err) {
        console.error(err);
    }
}

async function fetchProjects() {
    try {
        const res = await fetch('/api/projects', {
            headers: { 'Authorization': `Bearer ${currentUser.token}` }
        });
        const projects = await res.json();
        projectsList.innerHTML = projects.map(p => `
            <div class="project-item" onclick="fetchTasks('${p._id}')">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <small>Admin: ${p.admin.name}</small>
            </div>
        `).join('');

        // Populate project select in task modal
        const projectSelect = document.getElementById('t-project');
        projectSelect.innerHTML = projects.map(p => `<option value="${p._id}">${p.name}</option>`).join('');
    } catch (err) {
        console.error(err);
    }
}

async function fetchTasks(projectId) {
    try {
        const res = await fetch(`/api/tasks/project/${projectId}`, {
            headers: { 'Authorization': `Bearer ${currentUser.token}` }
        });
        const tasks = await res.json();
        tasksList.innerHTML = tasks.map(t => `
            <div class="task-item ${t.status.toLowerCase().replace(' ', '-')}">
                <h4>${t.title}</h4>
                <p>${t.description}</p>
                <p>Status: 
                    <select onchange="updateTaskStatus('${t._id}', this.value)">
                        <option value="To Do" ${t.status === 'To Do' ? 'selected' : ''}>To Do</option>
                        <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${t.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </p>
                <small>Due: ${t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No date'}</small>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

async function updateTaskStatus(taskId, status) {
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}` 
            },
            body: JSON.stringify({ status })
        });
        fetchStats();
    } catch (err) {
        console.error(err);
    }
}

// Modal Controls
addProjectBtn.addEventListener('click', () => projectModal.style.display = 'block');
addTaskBtn.addEventListener('click', () => taskModal.style.display = 'block');
closeModals.forEach(btn => btn.addEventListener('click', () => {
    projectModal.style.display = 'none';
    taskModal.style.display = 'none';
}));

// Create Project
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('p-name').value;
    const description = document.getElementById('p-desc').value;

    try {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}` 
            },
            body: JSON.stringify({ name, description })
        });
        if (res.ok) {
            projectModal.style.display = 'none';
            fetchProjects();
        }
    } catch (err) {
        console.error(err);
    }
});

// Create Task
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('t-title').value;
    const description = document.getElementById('t-desc').value;
    const project = document.getElementById('t-project').value;
    const dueDate = document.getElementById('t-date').value;

    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}` 
            },
            body: JSON.stringify({ title, description, project, dueDate, assignedTo: currentUser._id })
        });
        if (res.ok) {
            taskModal.style.display = 'none';
            fetchTasks(project);
            fetchStats();
        }
    } catch (err) {
        console.error(err);
    }
});
