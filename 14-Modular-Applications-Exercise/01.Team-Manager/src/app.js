import page from '../node_modules/page/page.mjs';
import {html, render} from '../node_modules/lit-html/lit-html.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { browseView } from './views/browse.js';
import { myTeamsView } from './views/myTeams.js';
import { teamDetailsView } from './views/teamDetails.js';
import { logoutView } from './views/logout.js';

const root = document.querySelector('main');


page('/', renderMiddleware, homeView);
page('/index.html', renderMiddleware, homeView);
page('/login', renderMiddleware, loginView);
page('/register', renderMiddleware, registerView);
page('/logout', renderMiddleware, logoutView);
page('/create', renderMiddleware, createView);
page('/edit/:id', renderMiddleware, editView);
page('/browse', renderMiddleware, browseView);
page('/my-team', renderMiddleware, myTeamsView);
page('/team-details/:id', renderMiddleware, teamDetailsView);


page.start();

updateNav();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root); 
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userSection = document.querySelectorAll('.user');
    const guestSection = document.querySelectorAll('.guest');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        Array.from(userSection).map(x => x.style.display = 'inline-block');
        Array.from(guestSection).map(x => x.style.display = 'none');
        // guestSection.map(x => x.style.display = 'none');
    } else {
        Array.from(userSection).map(x => x.style.display = 'none');
        Array.from(guestSection).map(x => x.style.display = 'inline-block');
    }
}