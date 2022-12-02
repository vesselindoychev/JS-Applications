import { register } from '../api/user.js';
import { html } from '../lib.js';

export async function showRegisterView(ctx) {
    console.log('register')

    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { email, password, repeatPassword } = Object.fromEntries(formData);

        if (!email || !password || !repeatPassword) {
            return alert('All fields are required');
        }

        if (password !== repeatPassword) {
            return alert('Passwords do not match');
        }

        await register(email, password);
        ctx.page.redirect('/');
        ctx.updateNav();
    }

}


function registerTemplate(onRegister) {
    return html`
    <section id="registerPage">
        <form @submit=${onRegister} class="registerForm">
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
                <span>If you have profile click <a href="#">here</a></span>
            </p>
        </form>
    </section>`
}