import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import {page} from '../src/lib.js';

document.querySelector('.user').children[1].addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    page.redirect('/dashboard');
    updateNav();
}

export function updateNav() {
    const hasUser = getUserData()
    const userSection = document.querySelector('.user');
    const guestSection = document.querySelector('.guest');

    if (hasUser) {
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}