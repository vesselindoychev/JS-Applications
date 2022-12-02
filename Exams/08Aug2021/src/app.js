import {render, page} from './lib.js'
import { updateNav } from './nav.js';
import { showCreateView } from './views/create.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showLoginView } from './views/login.js';
import { showMyBooksView } from './views/myBooks.js';
import { showRegisterView } from './views/register.js';

const root = document.querySelector('main');
updateNav();

page('/dashboard', renderMiddleware, showDashboardView);
page('/localhost:3030', renderMiddleware, showDashboardView);
page('/create', renderMiddleware, showCreateView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);
page('/my-books', renderMiddleware, showMyBooksView);
page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}
