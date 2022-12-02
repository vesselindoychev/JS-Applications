import { getCurrentCar, updateCar } from '../api/data.js';
import { html } from '../lib.js';

export async function showEditView(ctx) {
    const car = await getCurrentCar(ctx.params.id);
    ctx.render(editTemplate(onEdit, car));

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {brand, model, description, year, imageUrl, price} = Object.fromEntries(formData);

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert('All fields are required');
        }

        await updateCar(ctx.params.id, brand, model, description, year, imageUrl, price);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}

function editTemplate(onEdit, car) {
    return html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value="${car.price}">
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`
}