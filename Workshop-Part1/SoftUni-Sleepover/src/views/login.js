import { submitHandler } from "../util.js";
import {html} from '../lib.js';
import { login } from "../data/user.js";

export async function showLoginView(ctx) {
    ctx.render(loginTemplate(submitHandler(onLogin)));

    async function onLogin({email, password}) {
        if (!email || !password) {
            return alert('All fields are required!')
        }

        await login(email, password);
        ctx.page.redirect('/rooms');
    }
}

function loginTemplate(onLogin) {
    return html`
    <h2 class="login-heading">Login</h2>
    <form class="login-form" @submit=${onLogin}>
        <label>Email: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <button class="login-btn" type="submit">Login</button>
    </form>
    <p class="login-p">Don't have an account? <a href="/register">Register here</a></p>
    `
} 