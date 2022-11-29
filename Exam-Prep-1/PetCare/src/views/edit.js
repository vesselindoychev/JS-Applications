import {html} from '../../node_modules/lit-html/lit-html.js';
import { editPetInfo, getPetInfo } from '../api/data.js';

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const petId = ctx.params.id;
    const pet = await getPetInfo(petId);
    ctx.render(createEditTemplate(pet, onSubmit));
    debugger;
}

async function onSubmit(event) {
    event.preventDefault();
    const petId = context.params.id;
    const formData = new FormData(event.target);
    const {name, breed, age, weight, image} = Object.fromEntries(formData);

    await editPetInfo(petId, name, breed, age, weight, image);
    context.page.redirect(`/details/${petId}`);


}

function createEditTemplate(pet, handler) {
    return html`
        <section id="editPage">
            <form @submit=${handler} class="editForm">
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${pet.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value="${pet.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
    `
}