import { getAllGames } from '../api/data.js';
import { html } from '../lib.js';

export async function showCatalogView(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games))
}

function catalogTemplate(games) {
    return html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${games.length > 0 ? html`${games.map(game => createGame(game))}`
        : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>`
}

function createGame(game) {
    return html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}" />
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>`
}