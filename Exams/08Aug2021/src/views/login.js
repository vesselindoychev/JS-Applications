import { login } from '../api/user.js';
import { html } from '../lib.js';

export async function showLoginView(ctx) {
    ctx.render(loginView(onLogin));

    async function onLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {email, password} = Object.fromEntries(formData);
    
        if (!email || !password) {
            return alert('All fields are required');
        }
    
        await login(email, password);
        ctx.page.redirect('/dashboard');
        ctx.updateNav();
    }
}



function loginView(handler) {
    return html`
    <section id="login-page" class="login">
        <form @submit=${handler} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>`
}