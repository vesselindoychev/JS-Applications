import { getAllMemes } from '../api/data.js';
import { html } from '../lib.js';

export async function showDashboardView(ctx) {
    const memes = await getAllMemes();
    ctx.render(dashboardTemplate(memes));
}

function dashboardTemplate(memes) {
    return html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memes.length > 0 ? html`${memes.map(meme => createMeme(meme))}`
            : html`<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>`
}

function createMeme(meme) {
    return html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>`
}