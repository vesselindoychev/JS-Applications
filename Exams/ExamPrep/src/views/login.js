import { login } from '../api/user.js';
import { html } from '../lib.js';
import { notification } from './notifications.js';

let context = null;

export async function showLoginView(ctx) {
    context = ctx;
    ctx.render(loginTemplate(onLogin));
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);



    if (!email || !password) {
        return notification('All fields are required')
        
    }

    await login(email, password);
    context.page.redirect('/dashboard');
    context.updateNav();
}

function loginTemplate(handler) {
    return html`
    <section id="login">
        <form @submit=${handler} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}