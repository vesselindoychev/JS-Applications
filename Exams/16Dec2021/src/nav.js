import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import {page} from '../src/lib.js';

document.querySelectorAll('.user')[2].addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    page.redirect('/');
    updateNav();
}

export function updateNav() {
    const hasUser = getUserData()
    const userSection = document.querySelectorAll('.user');
    const guestSection = document.querySelectorAll('.guest');

    if (hasUser) {
        userSection.forEach(x => x.style.display = 'inline-block');
        guestSection.forEach(x => x.style.display = 'none');
    } else {
        userSection.forEach(x => x.style.display = 'none');
        guestSection.forEach(x => x.style.display = 'inline-block');
    }
}