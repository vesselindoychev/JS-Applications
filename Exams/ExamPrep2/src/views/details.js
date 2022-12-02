import { deleteCar, getCurrentCar } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

export async function showDetailsView(ctx) {
    const car = await getCurrentCar(ctx.params.id);
    const user = getUserData();
    const isCreator = user && user._id == car._ownerId;
    ctx.render(detailsTemplate(car, isCreator, onDelete));

    async function onDelete() {
        await deleteCar(car._id);
        ctx.page.redirect('/all-listings');
    }
}

function detailsTemplate(car, isCreator, onDelete) {
    return html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${car.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>
    
            <p class="description-para">${car.description}</p>
    
            ${isCreator ? html`
            <div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
            </div>` : nothing}
    
        </div>
    </section>`
}