import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllPets } from '../api/data.js';


export async function showDashboardView(ctx) {
    const pets = await getAllPets();
    // const pets = undefined;
    
    ctx.render(createDashboardTemplate(pets));
    ctx.onNavigate();
    
}

function createPetCard(pet) {
    return html`
                <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="${pet.image}">
                    </article>
                    <h2 class="name">${pet.name}</h2>
                    <h3 class="breed">${pet.breed}</h3>
                    <div class="action">
                        <a class="btn" href="/details/${pet._id}">Details</a>
                    </div>
                </div>
    `
}

function createDashboardTemplate(pets) {
    return html`
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
        
            <div class="animals-dashboard">

                ${pets ? Object.values(pets).map(pet => createPetCard(pet)) :
                html`
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>
                `}
            </div>
        </section>
    `
}