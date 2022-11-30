import {page, render} from '../src/lib.js';
import { updateNav } from './nav.js';
import { showCreateView } from './views/create.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';

const root = document.querySelector('main');

updateNav();

page('/', renderMiddleware, showHomeView);
page('/localhost:3030', renderMiddleware, showHomeView);
page('/create', renderMiddleware, showCreateView);
page('/dashboard', renderMiddleware, showDashboardView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);
page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}