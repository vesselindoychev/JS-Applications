import { login, register } from '../api/user.js'
import { html } from '../lib.js';

export async function showRegisterView(ctx) {

    async function onRegister(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const confPassword = event.target['confirm-password'].value;
        debugger;

        if (!email || !password || !confPassword) {
            return alert('All fields are required');
        }

        if (password !== confPassword) {
            return alert('Passwords do not match');
        }

        await register(email, password);
        ctx.page.redirect('/');
        ctx.updateNav();
    }
    ctx.render(registerTemplate(onRegister));
}

function registerTemplate(handler) {
    return html`
    <section id="register-page" class="content auth">
        <form @submit=${handler} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com" />
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password" />
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password" />
    
                <input class="btn submit" type="submit" value="Register" />
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`
}
