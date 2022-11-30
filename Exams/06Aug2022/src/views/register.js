import { register } from '../api/user.js';
import {html} from '../lib.js';

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    ctx.render(registerTemplate(onRegister));
}

async function onRegister(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const rePass = event.target.children['re-password'].value;
    // const formData = new FormData(event.target);
    // const {email, password} = Object.fromEntries(formData);
    if (!email || !password || !rePass) {
        return alert('All fields are required!')
    }

    if (password !== rePass) {
        return alert('Passwords do not match!')
    }

    await register(email, password);
    context.page.redirect('/dashboard');
    context.updateNav();
}

function registerTemplate(handler) {
    return html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${handler} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
    </section>`
}