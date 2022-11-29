import {page, render} from './lib.js';
import { updateNav } from './nav.js';
import { showCatalogView } from './views/catalogView.js';
import { showCreateView } from './views/createView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showHomeView } from './views/homeView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showSearchView } from './views/searchView.js';

const root = document.getElementById('main-content');
updateNav()

page('/', renderMiddlerware, showHomeView);
page('/localhost:3030', renderMiddlerware, showHomeView);
page('/catalog', renderMiddlerware, showCatalogView);
page('/create', renderMiddlerware, showCreateView);
page('/details/:id', renderMiddlerware, showDetailsView);
page('/edit/:id', renderMiddlerware, showEditView);
page('/login', renderMiddlerware, showLoginView);
page('/register', renderMiddlerware, showRegisterView);
page('/search', renderMiddlerware, showSearchView);
page.start();


function renderMiddlerware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
    
}
