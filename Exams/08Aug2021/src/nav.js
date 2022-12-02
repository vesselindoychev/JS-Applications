import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import {page} from '../src/lib.js';

document.getElementById('user').children[3].addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    page.redirect('/dashboard');
    updateNav();
}

export function updateNav() {
    const hasUser = getUserData()
    const userSection = document.getElementById('user');
    const guestSection = document.getElementById('guest');

    if (hasUser) {
        userSection.querySelector('span').textContent = `Welcome, ${hasUser.email}`
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}