import { searchItem } from '../api/data.js';
import {html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export function showSearchView(ctx) {
    context = ctx;
    ctx.render(createSearchTemplate(false, onSearch))
} 

async function onSearch(event) {
    event.preventDefault();
    const hasUser = getUserData();
    const formData = new FormData(event.target);
    const {search} = Object.fromEntries(formData);

    if (!search) {
        return alert('Please fill in the gap');
    }

    const items = await searchItem(search); 
    context.render(createSearchTemplate(true, onSearch, items, hasUser))
}
 
function createSearchTemplate(isClicked, handler, items, hasUser) {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>

        <form @submit=${handler} class="search-wrapper cf">
          <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
          <button type="submit">Search</button>
        </form>

        <h3>Results:</h3>
        ${isClicked ? 
            items.length > 0 ? html`
            <div id="search-container">
                <ul class="card-wrapper">
                    ${items.map(item => createItem(item, hasUser))}
                </ul>
            </div>` 
            : html`
            <div id="search-container">
                <h2>There are no results found.</h2>
            </div>`
        : nothing};
        
    </section>`
}

function createItem(item, hasUser) {
    return html`
                <li class="card">
                    <img src="${item.imageUrl}" alt="travis" />
                    <p>
                        <strong>Brand: </strong><span class="brand">${item.brand}</span>
                    </p>
                    <p>
                        <strong>Model: </strong><span class="model">${item.model}</span>
                    </p>
                    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
                    ${hasUser ? html`
                    <a class="details-btn" href="/details/${item._id}">Details</a>
                    ` : nothing}
                    
                </li>`
}