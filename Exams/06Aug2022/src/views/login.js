import { login } from '../api/user.js';
import { html } from '../lib.js';

let context = null;

export async function showLoginView(ctx) {
  context = ctx;
  ctx.render(loginTemplate(onLogin))
}

async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password) {
    return alert('All fields are required!');
  }

  await login(email, password);
  context.page.redirect('/dashboard');
  context.updateNav();
}

function loginTemplate(handler) {
  return html`
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form @submit=${handler} class="login-form">
          <input type="text" name="email" id="email" placeholder="email" />
          <input type="password" name="password" id="password" placeholder="password" />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </section>`
}