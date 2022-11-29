import { getAllItems } from '../api/data.js';
import {html} from '../lib.js';

export async function showDashboardView(ctx) {
    const items = await getAllItems();
    ctx.render(createDashboardTemplate(items));
}

function createDashboardTemplate(items) {
    return html`
    <section id="dashboard">
        <h2>Collectibles</h2>
        ${items.length > 0 ? html`
        <ul class="card-wrapper">
            ${items.map(item => createCard(item))} 
        </ul>
        ` : html`<h2>There are no items added yet.</h2>`}
    </section>`
}

function createCard(item) {
    return html`
        <li class="card">
            <img src="${item.imageUrl}" alt="eminem" />
            <p>
              <strong>Brand: </strong><span class="brand">${item.brand}</span>
            </p>
            <p>
              <strong>Model: </strong><span class="model">${item.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>`
}