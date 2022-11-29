import { login } from '../api/user.js';
import {html} from '../lib.js';

let context = null;

export async function showLoginView(ctx) {
    context = ctx;
    ctx.render(createLoginView(onSubmit));

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, password} = Object.fromEntries(formData);

    if (!email || !password) {
        return alert('all fields are required')
    }
    await login(email, password);
    context.page.redirect('/');
    context.updateNav();
}

function createLoginView(handler) {
    return  html`
        <section id="loginPage">
            <form @submit=${handler}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
    
    `;
}