import { register } from '../api/user.js';
import { html } from '../lib.js';
import { notification } from './notifications.js';

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    ctx.render(registerTemplate(onRegister));
}

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {username, email, password, repeatPass, gender} = Object.fromEntries(formData);

    if (!username || !email || !password || !repeatPass || !gender) {
        return notification('All fields are required');
    }

    if (password !== repeatPass) {
        return notification('Passwords do not match. Try again')
    }

    await register(username, email, password, gender);
    context.page.redirect('/dashboard');
    context.updateNav();
}

function registerTemplate(handler) {
    return html`
    <section id="register">
        <form @submit=${handler} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}