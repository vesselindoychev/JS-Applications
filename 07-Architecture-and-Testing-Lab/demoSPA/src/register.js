import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";

createSubmitHandler('register-form', onRegister)

const section = document.getElementById('register-view');
section.remove();

let ctx = null;

export function showRegisterView(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onRegister({ email, username, password, repass }) {

    if (password != repass || !email || !username) {
        return alert('Invalid data!');
    }
    const userData = await post('users/register', { email, username, password });

    setUserData(userData);

    document.getElementById('welcome-msg').textContent = `Welcome, ${username}`
    ctx.checkUserNav();
    ctx.goto('catalog-link')

}