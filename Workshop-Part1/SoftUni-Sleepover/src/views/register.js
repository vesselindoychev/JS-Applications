import { submitHandler } from "../util.js";
import {html} from '../lib.js';
import { register } from "../data/user.js";

export async function showRegisterView(ctx) {
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({email, username, password, rePassword}) {
        if (!username || !email || !password || !rePassword) {
            return alert('All fields are required')
        }

        if (password !== rePassword) {
            return alert('Passwords do not match!')
        }

        await register(email, username, password);
        ctx.page.redirect('/rooms');
    }
}

function registerTemplate(onRegister) {
    return html`
        <h2>Register</h2>
        <form @submit=${onRegister} class="register-form">
            <label>Username: <input type="text" name="username"></label>
            <label>Email: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat-Password: <input type="password" name="rePassword"></label>
            <button type="submit">Register</button>
        </form>
        <p class="register-p">Already have an account? <a href="/login">Login here</a></p>
    `
}