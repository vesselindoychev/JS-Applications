import {render, page} from './lib.js';
import { updateNav } from './nav.js';
import { showAllListingsView } from './views/allListings.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { showMyListingsView } from './views/myListings.js';
import { showRegisterView } from './views/register.js';
import { showSeacrhView } from './views/search.js';

const root = document.querySelector('main');
updateNav();

page('/', renderMiddleware, showHomeView);
page('/localhost:3030', renderMiddleware, showHomeView);
page('/all-listings', renderMiddleware, showAllListingsView);
page('/create', renderMiddleware, showCreateView);
page('/details/:id', renderMiddleware, showDetailsView);
page('/edit/:id', renderMiddleware, showEditView);
page('/login', renderMiddleware, showLoginView);
page('/my-listings', renderMiddleware, showMyListingsView);
page('/register', renderMiddleware, showRegisterView);
page('/by-year', renderMiddleware, showSeacrhView);
page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}