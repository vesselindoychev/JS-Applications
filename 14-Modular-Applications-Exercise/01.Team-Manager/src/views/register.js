import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let context = null;
export async function registerView(ctx) {
    context = ctx;
    ctx.render(createRegisterTemplate(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, username, password, repass} = Object.fromEntries(formData);
    
    if (!email || !username || username.length < 3 || !password || password.length < 3 || repass !== password) {
        return context.render(createRegisterTemplate(onSubmit, 'Invalid data'))
    }

    await register(email, username, password);
    context.page.redirect('/');
    context.updateNav();
}

function createRegisterTemplate(handler, err) {
    return html`
            <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form @submit=${handler} id="register-form" class="main-form pad-large">
                        ${err ? html`<div class="error">${err}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>    
    `
}