import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { showHomeView } from './views/home.js';
import { showCreateView } from './views/create.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { logout } from './api/data.js';

const root = document.getElementById('content');

document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    page.redirect('/');
    onNavigate();
})

page('/', renderMiddleware, showHomeView);
page('/localhost:3000', renderMiddleware, showHomeView);
page('/create', renderMiddleware, showCreateView);
page('/dashboard', renderMiddleware, showDashboardView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);

page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.onNavigate = onNavigate;
    next();
}

function onNavigate() {
    const userSection = document.querySelectorAll('.user');
    const guestSection = document.querySelectorAll('.guest');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        Array.from(userSection).forEach(x => x.style.display = 'list-item');
        Array.from(guestSection).forEach(x => x.style.display = 'none');
    } else {
        Array.from(userSection).forEach(x => x.style.display = 'none');
        Array.from(guestSection).forEach(x => x.style.display = 'list-item');
    }
}