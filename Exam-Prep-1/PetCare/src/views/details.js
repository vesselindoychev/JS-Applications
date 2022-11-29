import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deletePetInfo, getPetInfo } from '../api/data.js';
import { donate, getDonations, getOwnDonation } from '../api/donations.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const petId = ctx.params.id;
    const pet = await getPetInfo(petId);
    const user = JSON.parse(sessionStorage.getItem('userData'));

    const userId = user ? user._id : undefined;
    const ownerId = pet._ownerId;
    const isOwner = user && userId == ownerId;

    const request = [
        getPetInfo(petId),
        getDonations(petId)
    ]

    if (user) {
        request.push(getOwnDonation(petId, userId))
    }

    const [animal, donations, hasDonation] = await Promise.all(request);

    const canDonate = !isOwner && hasDonation == 0;
    ctx.render(createDetailsTemplate(pet, donations * 100, isOwner, user, canDonate));
}

async function deletePet(event) {
    event.preventDefault();
    const petId = context.params.id;
    await deletePetInfo(petId);
    context.page.redirect('/')
}

async function onDonate(event) {
    event.preventDefault();
    const petId = context.params.id;
    await donate(petId);
    context.page.redirect(`/details/${petId}`);
    
}
function petControls(pet, isOwner, user, canDonate) {
    if (!user) {
        return nothing;
    }
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${deletePet} href="javascript:void(0)" class="remove">Delete</a>                  
        </div>`;
    }
    
    if (canDonate) {
        return html`
            <div class="actionBtn">
                <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
            </div>
        `;
    }
    
}

function createDetailsTemplate(pet, donations, isOwner, user, canDonate) {
    return html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed:  ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations}$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    ${petControls(pet, isOwner, user, canDonate)}
                    
                </div>
            </div>
        </section>
    `
}