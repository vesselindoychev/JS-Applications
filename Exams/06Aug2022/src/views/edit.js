import { getOfferDetails, updateOffer } from '../api/data.js';
import { html } from '../lib.js';

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const offer = await getOfferDetails(ctx.params.id);
    ctx.render(editTemplate(onEdit, offer));
}

async function onEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {title, imageUrl, category, description, requirements,salary} = Object.fromEntries(formData);

    if (!title || !imageUrl || !category || !description || !requirements || !salary) {
        return alert('All fields must be filled in');
    }

    await updateOffer(context.params.id, title, imageUrl, category, description, requirements, salary);
    context.page.redirect(`/details/${context.params.id}`);
}

function editTemplate(handler,offer) {
    return html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${handler} class="edit-form">
                <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title}>
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl}>
                <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category}>
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${offer.description}</textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                    cols="50">${offer.requirements}</textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary}>
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}