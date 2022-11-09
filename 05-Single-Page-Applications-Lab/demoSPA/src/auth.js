import { showCatalogView } from "./catalog.js";

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

document.getElementById('logout-link').addEventListener('click', onLogout);

async function onLogout(event) {
    event.preventDefault();
    const token = sessionStorage.getItem('accessToken');

    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': token
            }
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch(error) {
        alert(error.message)
    } finally {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
        checkUserNav();
        showCatalogView();
    }
} 