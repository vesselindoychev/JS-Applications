import {render, page} from './lib.js';
import {updateNav} from './nav.js';
import { showCatalogView } from './views/catalog.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showHomeView } from './views/home.js';
import {showLoginView} from './views/login.js'
import { showRegisterView } from './views/register.js';

const root = document.querySelector('main');


page('/', renderMiddleware, showHomeView);
page('/localhost:3030', renderMiddleware, showHomeView);
page('/login', renderMiddleware, showLoginView);
page('/register', renderMiddleware, showRegisterView);
page('/catalog', renderMiddleware, showCatalogView);
page('/create', renderMiddleware, showCreateView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);

page.start();

updateNav();
function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}