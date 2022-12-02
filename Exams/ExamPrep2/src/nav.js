import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import {page} from '../src/lib.js';

document.getElementById('profile').children[3].addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    page.redirect('/');
    updateNav();
}

export function updateNav() {
    const hasUser = getUserData()
    
    const userSection = document.getElementById('profile');
    const guestSection = document.getElementById('guest');

    if (hasUser) {
        document.getElementById('profile').children[0].textContent = `Welcome ${hasUser.username}`
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}