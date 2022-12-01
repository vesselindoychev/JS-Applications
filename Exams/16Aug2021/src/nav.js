import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import {page} from './lib.js';

document.getElementById('user').children[1].addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    page.redirect('/');
    updateNav();
}

export function updateNav() {
    const user = getUserData();
    const userSection = document.getElementById('user');
    const guestSection = document.getElementById('guest');

    if (user) {
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}