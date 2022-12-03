import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js';

export async function showDashboardView(ctx) {
    const albums = await getAllAlbums();
    ctx.render(dashboardTemplate(albums))
}

function dashboardTemplate(albums) {
    return html`
    <section id="dashboard">
        <h2>Albums</h2>
        ${albums.length > 0 ? html`
        <ul class="card-wrapper">
            ${albums.map(album => createAlbum(album))}
        </ul>`
        : html`<h2>There are no albums added yet.</h2>`}
    </section>`
}

function createAlbum(album) {
    return html`
    <li class="card">
        <img src="${album.imageUrl}" alt="travis" />
        <p>
            <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
        </p>
        <p>
            <strong>Album name: </strong><span class="album">${album.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
        <a class="details-btn" href="/details/${album._id}">Details</a>
    </li>`
}