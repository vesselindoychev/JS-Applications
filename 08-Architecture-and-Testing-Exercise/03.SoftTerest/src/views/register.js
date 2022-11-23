import { register } from "../api/user.js";

const section = document.getElementById('register-view');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegister(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const {email, repeatPassword, password} = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 || repeatPassword !== password) {
        alert('Invalid data!') 
    } else {
        await register(email, password);
        ctx.goto('/');
        ctx.showCorrectNav();
    }

}