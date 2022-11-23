import { login } from "../api/user.js";

const section = document.getElementById('login-view');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData);

    await login(email, password);
    ctx.goto('/');
    ctx.showCorrectNav();

}