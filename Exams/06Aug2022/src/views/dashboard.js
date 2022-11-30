import { getAllOffers } from '../api/data.js';
import { html, nothing } from '../lib.js';

export async function showDashboardView(ctx) {
    const offers = await getAllOffers();
    ctx.render(dashboardTemplate(offers));

}

function dashboardTemplate(offers) {
    return html`
    <section id="dashboard">
        <h2>Job Offers</h2>
    
        ${offers.length > 0 ? html`${offers.map(offer => createOffer(offer))}`
         : html`<h2>No offers yet.</h2>`}
    </section>`
}

function createOffer(offer) {
    return html`
    <div class="offer">
        <img src="${offer.imageUrl}" alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/details/${offer._id}">Details</a>
    </div>`
}