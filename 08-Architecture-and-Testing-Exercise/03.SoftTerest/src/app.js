import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showLogin } from "./views/login.js";
import { initialize } from "./router.js";
import { onLogout } from "./views/logout.js";
import { showDetails } from "./views/details.js";

const links = {
    '/': showHome,
    '/dashboard': showDashboard,
    '/register': showRegister,
    '/login': showLogin,
    '/logout': onLogout,
    '/create': showCreate,
    '/details': showDetails,
    // 'deleteIdea': 
}

document.getElementById('default-section').remove();

const router = initialize(links);
router.goto('/');
router.showCorrectNav();