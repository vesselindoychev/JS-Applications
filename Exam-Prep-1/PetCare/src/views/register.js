import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let context = null;

export async function showRegisterView(ctx) {
    context = ctx;
    ctx.render(createRegisterTemplate(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    await register(email, password);
    context.page.redirect('/');
    context.onNavigate();
}

function createRegisterTemplate(handler) {
    return html`
        <section id="registerPage">
            <form @submit=${handler} class="registerForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
    `
}