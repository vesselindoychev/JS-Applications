import {page, render} from './lib.js';
import { hasUser, isOwner } from './middlewares/guards.js';
import { preload } from './middlewares/preloader.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addUserNav } from './middlewares/userNav.js';
import { getUserData } from './util.js';
import { showCatalogView } from './views/catalog.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { onLogout } from './views/logout.js';
import { showNavView } from './views/nav.js';
import { showNotOwnerPage, showNotRegisteredPage } from './views/notRegistered.js';
import { showRegisterView } from './views/register.js';

page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData))
page(addUserNav(showNavView));

page('/', showHomeView);
page('/rooms', showCatalogView);
// page('/rooms/:id', ({params: {id}}) => console.log('details', id));
page('/rooms/:id', preload('id', 'rooms'), showDetailsView);
page('/create', hasUser(), showCreateView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', onLogout);
page('/edit/:id', preload('id', 'rooms'), isOwner(), showEditView);
page('/not-registered', showNotRegisteredPage);
page('/not-owner', showNotOwnerPage);
page.start();

