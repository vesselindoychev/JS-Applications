import { register } from '../api/user.js';
import { html } from '../lib.js';

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    ctx.render(registerTemplate(onRegister));
}

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if (!email || !password || !repeatPassword) {
        return alert('All fields are required');
    }

    if (password !== repeatPassword) {
        return alert('Passwords do not match')
    }

    await register(email, password);
    context.page.redirect('/');
    context.updateNav();
}

function registerTemplate(handler) {
    return html`
    <section id="register-page" class="auth">
        <form @submit=${handler} id="register">
            <h1 class="title">Register</h1>
    
            <article class="input-group">
                <label for="register-email">Email: </label>
                <input type="email" id="register-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="register-password">Password: </label>
                <input type="password" id="register-password" name="password">
            </article>
    
            <article class="input-group">
                <label for="repeat-password">Repeat Password: </label>
                <input type="password" id="repeat-password" name="repeatPassword">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Register">
        </form>
    </section>`
}