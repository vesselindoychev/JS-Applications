import { searchAlbum } from '../api/data.js';
import {html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showSearchView(ctx) {
    context = ctx;
    ctx.render(createSearchTemplate(false, onSearch));
}

async function onSearch(event) {
    event.preventDefault();
    const hasUser = getUserData();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;
    if (!query) {
        return alert('Please enter required text.')
    }
    const albums = await searchAlbum(query);
    context.render(createSearchTemplate(true, onSearch, albums, hasUser))


    
}

function createSearchTemplate(isClicked, handler, albums, hasUser) {
    return html`
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${handler} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            
            ${isClicked ? 
                
                albums.length > 0 ? html`
                <div class="search-result">

                ${albums.map(album => createCard(album, hasUser))}

                
                
                
                </div>`
                : html`
                <div class="search-result">
                    <p class="no-result">No result.</p>
                </div>`
                :nothing}
            
        </section>`
}

function createCard(album, hasUser) {
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
            </div>` : nothing}
            
        </div>
    </div>`
}