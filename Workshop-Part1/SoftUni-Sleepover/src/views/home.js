import {html} from '../lib.js'

export function showHomeView(ctx) {
    // user
    // if user: forward to /create link
    // else: forward to another page and announce the user to make a registration or to login in his profile
    const user = ctx.user;
    ctx.render(homeTemplate(user))
}

function homeTemplate(user) {
    return html`
    <h1 class="home-heading">Welcome to SoftUni SleepOver</h1>
    <p>Find accomodation in many locations across the country.<a href="/rooms">Browse catalog</a></p>
    ${user ? html`<p>Have a room to offer?<a href="/create">Place an ad right now</a></p>`
    : html`<p>Have a room to offer?<a href="/not-registered">Place an ad right now.</a></p>`}
    
    <p class="home-p"><img src="/static/img/rent.jpeg" alt=""></p>`
}