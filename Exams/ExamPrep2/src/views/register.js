import { register } from '../api/user.js';
import { html } from '../lib.js';

export async function showRegisterView(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {username, password, repeatPass} = Object.fromEntries(formData);

        if (!username || !password || !repeatPass) {
            return alert('All fields are required');
        }

        if (password !== repeatPass) {
            return alert('Passwords do not match!')
        }

        await register(username, password);
        ctx.page.redirect('/all-listings');
        ctx.updateNav();
    }
}

function registerTemplate(onRegister) {
    return html`
    <section id="register">
        <div class="container">
            <form @submit=${onRegister} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
    
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
    
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
    
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`
}