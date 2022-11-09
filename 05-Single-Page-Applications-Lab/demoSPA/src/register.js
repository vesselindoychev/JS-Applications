import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";

document.getElementById('register-link').addEventListener('click', showRegisterView);
document.getElementById('register-form').addEventListener('submit', onRegister);
let notification = document.getElementById('notification');

export function showRegisterView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('register-view').style.display = 'block';
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, username, password, repass} = Object.fromEntries(formData);

    if (password != repass || !email || !username) {
        notification.textContent = 'Error';
        setTimeout(() => {
            notification.textContent = '';
        }, 1000)
    } else {
        await register(email, username, password);
        document.getElementById('welcome-msg').textContent = `Welcome, ${username}`
        checkUserNav();
        showCatalogView();
    }
}

async function register(email, username, password) {
    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, username, password})
        })

        const data = await response.json();
        if (data.code && data.code != 200) {
            throw new Error(data.message)
        }
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('id', data._id);
        return data;

    } catch(error) {
        notification.textContent = error;
        setTimeout(() => {
            notification.textContent = '';
        }, 1000)
    }
}