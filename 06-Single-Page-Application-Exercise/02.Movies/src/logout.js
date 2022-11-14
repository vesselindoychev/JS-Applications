import { checkUserNav } from "./auth.js";
import { showHomeView } from "./homeView.js";

document.getElementById('logout-link').addEventListener('click', onLogout);

async function onLogout(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('accessToken');

    try {
        const url = 'http://localhost:3030/users/logout'
        const response = await fetch(url, {
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
        alert(error.message);
    } finally {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('accessToken');
        checkUserNav();
        showHomeView();
    }
}