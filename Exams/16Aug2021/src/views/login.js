import {login} from '../api/user.js'
import { html } from '../lib.js';

export async function showLoginView(ctx) {
    
    async function onLogin(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const {email, password} = Object.fromEntries(formData);
    
        if (!email || !password) {
            return alert('All fields are required');
        }
    
        await login(email, password);
        ctx.page.redirect('/');
        ctx.updateNav();
    }
    ctx.render(loginTemplate(onLogin));

}


function loginTemplate(handler) {
    return html`
    <section id="login-page" class="auth">
        <form @submit=${handler} id="login">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />
    
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password" />
                <input type="submit" class="btn submit" value="Login" />
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`
}