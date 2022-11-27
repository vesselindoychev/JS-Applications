import {html, render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';

import { showCatalogView } from './views/catalog.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { showLoginView } from './views/login.js';
import { showMyFurnitureView } from './views/myFurniture.js';
import { showRegisterView } from './views/register.js';

const root = document.querySelector('.container');

page('/', renderMiddleware, showCatalogView)
page('/catalog', renderMiddleware, showCatalogView)
page('/create', renderMiddleware, showCreateView)
page('/details/:id', renderMiddleware, showDetailsView)
page('/edit/:id', renderMiddleware, showEditView)
page('/login', renderMiddleware, showLoginView)
page('/register', renderMiddleware, showRegisterView)
page('/my-furniture', renderMiddleware, showMyFurnitureView)
page('*', showCatalogView);
page.start();

updateNav();


document.getElementById('logoutBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    await logout();
    page.redirect('/');
    updateNav();
})

function updateNav() {
    const userSection = document.getElementById('user');
    const guestSection = document.getElementById('guest');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData) {
        userSection.style.display = 'inline-block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'inline-block';
    }
}

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

