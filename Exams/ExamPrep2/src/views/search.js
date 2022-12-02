import { getByYear } from '../api/data.js';
import {html, nothing} from '../lib.js'

export function showSeacrhView(ctx) {
    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const searchedWord = document.getElementById('search-input').value;
        
        if (!searchedWord) {
            return alert('Gap must be filled')
        }

        const results = await getByYear(searchedWord);
        ctx.render(searchTemplate(true, onSearch, results));
    }

}


function searchTemplate(isClicked, onSearch, results) {
    return html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
        <div class="listings">
    
            <!-- Display all records -->
            ${isClicked ? 
                results.length > 0 ? html`${results.map(result => createCar(result))}`
                : html`<p class="no-cars"> No results.</p>`
            : nothing}
        </div>
    </section>
`
}

function createCar(result) {
    return html`
    <div class="listing">
        <div class="preview">
            <img src="${result.imageUrl}">
        </div>
        <h2>${result.brand} ${result.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${result.year}</h3>
                <h3>Price: ${result.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${result._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`
}