import { html } from '../lib.js';

export async function showHomeView(ctx) {
    ctx.render(homeTemplate());
}

function homeTemplate() {
    return html`
    <section id="main">
        <div id="welcome-container">
            <h1>Welcome To Car Tube</h1>
            <img class="hero" src="/images/car-png.webp" alt="carIntro">
            <h2>To see all the listings click the link below:</h2>
            <div>
                <a href="/all-listings" class="button">Listings</a>
            </div>
        </div>
    </section>`
}