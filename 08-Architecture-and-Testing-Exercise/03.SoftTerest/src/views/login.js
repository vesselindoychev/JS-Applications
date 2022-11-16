import { login } from "../api/user.js";

const section = document.getElementById('login-view');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);

let ctx = null;
export function showLoginView(context) {
    ctx = context;
    context.showSection(section);
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData);
    await login(email, password);
    ctx.updateNavigation();
    ctx.goto('/catalog');
} 