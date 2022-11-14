import { checkUserNav } from "./auth.js";
import { showHomeView } from "./homeView.js";


document.getElementById('login-link').addEventListener('click', showLoginView);
document.getElementById('login-form').addEventListener('submit', onLogin);

export function showLoginView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('form-login').style.display = 'block';
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, password} = Object.fromEntries(formData);

    try {
        await login(email, password);
        checkUserNav();
        showHomeView();
    } catch(error) {
        alert(error.message);
    }
}

async function login(email, password) {
    const url = `http://localhost:3030/users/login`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if (response.ok != true) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('accessToken', data.accessToken);
}