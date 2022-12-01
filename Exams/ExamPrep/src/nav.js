import { logout } from './api/user.js';
import { html, render, page } from './lib.js';
import { getUserData } from "./util.js";

export function updateNav() {
    const user = getUserData();
    const userSection = document.querySelector('.user');
    const guestSection = document.querySelector('.guest');

    if (user) {
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
        let div = html`
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${user.email}</span>
            <a href="/my-profile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`
        render(div, userSection);
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    page.redirect('/');
}