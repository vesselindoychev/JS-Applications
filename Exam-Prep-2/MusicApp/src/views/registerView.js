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
    const {email, password, confPass} = Object.fromEntries(formData);

    if (!email || !password || !confPass) {
        return alert('All fields are required')
    }

    if (password !== confPass) {
        return alert('Passwords do not match')
    }

    await register(email, password);
    context.page.redirect('/');
    context.updateNav();
}

function createRegisterTemplate(handler) {
    return html`
        <section id="registerPage">
            <form @submit=${handler}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="confPass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
    `
}