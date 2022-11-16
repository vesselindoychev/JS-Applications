import { showCatalogView } from "./src/views/catalog.js";
import { showCreateView } from "./src/views/create.js";
import { showDetailsView } from "./src/views/details.js";
import { showHomeView } from "./src/views/home.js";
import { showLoginView } from "./src/views/login.js";
import { showRegisterView } from "./src/views/register.js";
import {initialize} from './src/router.js'
import { logout } from "./src/api/user.js";



// const registerView = document.getElementById('register-view');
// const loginView = document.getElementById('login-view');
// const detailsView = document.getElementById('details-view');
// const createView = document.getElementById('create-view');
// const dashboard = document.getElementById('dashboard-holder');
document.getElementById('default-section').remove();


const links = {
    '/': showHomeView,
    '/register': showRegisterView,
    '/login': showLoginView,
    '/details': showDetailsView,
    '/create': showCreateView,
    '/catalog': showCatalogView,
    '/logout': async function () {
        await logout();
        router.goto('/');
        router.updateNavigation();
    }
}

const router = initialize(links);
router.updateNavigation();
router.goto('/');