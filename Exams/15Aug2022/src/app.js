import {render, page} from '../src/lib.js';
import { updateNav } from './nav.js';
import { showAddView } from './views/add.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showSearchView } from './views/search.js';

const root = document.querySelector('main');

updateNav();

page('/', renderMiddleware, showHomeView);
page('/localhost:3030', renderMiddleware, showHomeView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);
page('/add', renderMiddleware, showAddView);
page('/dashboard', renderMiddleware, showDashboardView);
page('/edit/:id', renderMiddleware, showEditView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/search', renderMiddleware, showSearchView);
page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}