import { register } from '../api/user.js';
import { html } from '../lib.js';

export async function showRegisterView(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const rePass = event.target['confirm-pass'].value;
    
        if (!email || !password || !rePass) {
            return alert('All fields are required');
        }

        if (password !== rePass) {
            return alert('Passwords do not match. Try again')
        }
    
        await register(email, password);
        ctx.page.redirect('/dashboard');
        ctx.updateNav();
    }
}

function registerTemplate(handler) {
    return html`
    <section id="register-page" class="register">
        <form @submit=${handler} id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>`
}