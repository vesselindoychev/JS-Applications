import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let context = null;
export async function loginView(ctx) {
    context = ctx;
    ctx.render(createLoginTemplate(onSubmit));
}   

async function onSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {email, password} = Object.fromEntries(formData);
    if (!email || !password) {
        return context.render(createLoginTemplate(onSubmit, 'Invalid data'))
    }
    await login(email, password);
    
    context.page.redirect('/');
    context.updateNav();
    
}

function createLoginTemplate(handler, error) {
    return html`
            <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${handler} id="login-form" class="main-form pad-large">
                        ${error ? html`<div class="error">${error}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
    `
}