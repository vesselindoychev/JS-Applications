import { html } from '../lib.js';

export function showNavView(hasUser) {
    return html`
        <nav>
            <a href="/">Home</a>
            <a href="/rooms">Catalog</a>
            ${hasUser ? html`
            <a href="/create">Add Room</a>
            <a href="/logout">Logout</a>` :
            html`
            <a href="/login">Login</a>
            <a href="/register">Register</a>`}
        </nav>
    `
}