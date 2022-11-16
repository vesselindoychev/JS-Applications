import { register } from "../api/user.js";

const section = document.getElementById('register-view');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

let ctx = null;

export function showRegisterView(context) {
    ctx = context;
    context.showSection(section);
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if (password != repeatPassword) {
        alert('Password doesn\'t match!')
    } else {
        await register(email, password);
        ctx.updateNavigation();
        ctx.goto('/catalog');
    }

}