import { getAllAlbums } from '../api/data.js';
import {html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

export async function showCatalogView(ctx) {
    const hasUser = getUserData();
    const albums = await getAllAlbums();
    ctx.render(createCatalogTemplate(hasUser, albums));
}

function createCatalogTemplate(hasUser, albums) {
    return html`
        <section id="catalogPage">
            <h1>All Albums</h1>

            ${albums ? albums.map(album => createAlbum(album, hasUser)) 
                : html`<p>No Albums in Catalog!</p>`}
        </section>`
}

function createAlbum(album, hasUser) {
    return html`
            <div class="card-box">
                <img src="${album.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${hasUser ? html`
                    <div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>`
                    : nothing}
                </div>
            </div>
    `
}