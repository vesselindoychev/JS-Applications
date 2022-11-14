import { checkUserNav } from "./auth.js";
import { showHomeView } from "./homeView.js";


document.getElementById('register-link').addEventListener('click', showRegisterView);
document.getElementById('register-form').addEventListener('submit', onRegister);

function showRegisterView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('form-sign-up').style.display = 'block'
}

async function onRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if (!email || repeatPassword != password || !password || !repeatPassword || password.length < 6) {
        alert('Error! Invalid email or password');
    } else {
        await register(email, password);
        checkUserNav();
        showHomeView();
    }

}

async function register(email, password) {
        try {
        const url = 'http://localhost:3030/users/register';
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if (data.code && data.code != 200) {
            throw new Error(data.message);
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('userId', data._id);
        return data;
    
    } catch(error) {
        alert(error.message)
    }
}