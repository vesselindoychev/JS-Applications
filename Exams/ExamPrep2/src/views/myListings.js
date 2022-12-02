import { getMyCars } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function showMyListingsView(ctx) {
    const user = getUserData()
    
    const cars = await getMyCars(user._id);
    ctx.render(myListingsTemplate(cars))
}

function myListingsTemplate(cars) {
    return html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            <!-- Display all records -->
            ${cars.length > 0 ? html`${cars.map(car => createCar(car))}`
            : html` <p class="no-cars"> You haven't listed any cars yet.</p>`}
    
    
    
        </div>
    </section>`
}

function createCar(car) {
    return html`
    <div class="listing">
        <div class="preview">
            <img src="${car.imageUrl}">
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`
}