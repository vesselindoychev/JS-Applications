
import { createApplication, deleteOffer, getApplicationCount, getOfferDetails, getUserApplicationCount } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const user = getUserData();

    const id = ctx.params.id;
    const offer = await getOfferDetails(id)

    const isOwner = user && user._id == offer._ownerId;
    const isUser = user && user._id !== offer._ownerId;

    let countApplications = await getApplicationCount(id);
    let userApplications;

    if (user) {
        userApplications = await getUserApplicationCount(id, user._id);
    }

    async function onApply(event) {
        event.preventDefault();
        debugger;
        const offerId = context.params.id;
        await createApplication(offerId);
        let countApplications = await getApplicationCount(offerId);
        // context.page.redirect(`/details/${offerId}`);

        ctx.render(detailsTemplate(offer, isOwner, isUser, onDelete, onApply, countApplications))
    }

    ctx.render(detailsTemplate(offer, isOwner, isUser, onDelete, onApply, countApplications, userApplications));
}

async function onDelete() {
    await deleteOffer(context.params.id);
    context.page.redirect('/dashboard');
}



function detailsTemplate(offer, isOwner, isUser, onDelete, onApply, countApplications, userApplications) {
    return html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${countApplications}</strong></p>

            <div id="action-buttons">
                ${isOwner ? html`
                <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` 
                : nothing}

                ${userApplications == 0 && isUser ? html`<a @click=${onApply} href="" id="apply-btn">Apply</a>` : nothing}
            </div>
        </div>
    </section>`
}