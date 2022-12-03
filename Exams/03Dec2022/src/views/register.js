import { register } from '../api/user.js';
import { html } from '../lib.js';

export async function showRegisterView(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const repeatPass = event.target['re-password'].value;

        if (!email || !password || !repeatPass) {
            return alert('All fields are required');
        }

        if (password !== repeatPass) {
            return alert('Passwords do not match');
        }

        await register(email, password);
        ctx.page.redirect('/dashboard');
        ctx.updateNav();
    }
}

function registerTemplate(onRegister) {
    return html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="login-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`
}