import { get } from "./api.js";
import { clearUserData } from "./util.js";

export function checkUserNav() {
    const username = sessionStorage.getItem('username');
    let welcomeMsg = document.getElementById('welcome-msg');
    if (username) {
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'inline');
        welcomeMsg.textContent = `Welcome, ${username}`
    } else {
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'inline');
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        welcomeMsg.textContent = `Welcome, guest`
    }
}


export async function onLogout(ctx) {
    get('users/logout');
    clearUserData();
    ctx.checkUserNav();
    ctx.goto('catalog-link');
} 