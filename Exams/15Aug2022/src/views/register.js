import { register } from '../api/user.js';
import {html} from '../lib.js';

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    ctx.render(createRegisterTemplate(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, password, rePassword} = Object.fromEntries(formData);

    if (!email || !password || !rePassword) {
        return alert('All fields are required');
    }

    if (password !== rePassword) {
        return alert('Passwords do not match');
    }

    await register(email, password);
    context.page.redirect('/dashboard');
    context.updateNav();
}

function createRegisterTemplate(handler) {
    return html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${handler} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />  
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="rePassword" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
    </section>`
}