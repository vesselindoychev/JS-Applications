import {html} from '../lib.js';

export function showNotRegisteredPage(ctx) {
    ctx.render(notRegisteredTemplate());
} 

function notRegisteredTemplate() {
    return html`
    <h3>You are not registered!</h3>
    <p>Don't have an account?<a href="/register">Sign up here</a></p>
    <p>Already have an account but you are not logged-in?<a href="/login">Login here</a></p>
    `
}

export function showNotOwnerPage(ctx) {
    ctx.render(notOwnerTemplate());
}

function notOwnerTemplate() {
    return html`
    <h3>You are not the owner of this room</h3>
    <p>You are not able to see theese details.</p>
    <p>Try to view your own rooms.</p>
    <a href="/rooms">Catalog</a>`
}
