import { getCertainItem, updateItem } from '../api/data.js';
import {html} from '../lib.js';

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const item = await getCertainItem(id);

    ctx.render(createEditTemplate(onSubmit, item));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {brand, model, imageUrl, release, designer, value} = Object.fromEntries(formData);

    if (!brand || !model || !imageUrl || !release || !designer || !value) {
        return alert('All fields are required');
    }

    await updateItem(context.params.id, brand, model, imageUrl, release, designer, value);
    context.page.redirect(`/details/${context.params.id}`);
}

function createEditTemplate(handler, item) {
    return html`
    <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form @submit=${handler} class="edit-form">
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${item.brand}>
                <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${item.model}>
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${item.imageUrl}>
                <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${item.release}>
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${item.designer}>
                <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${item.value}>

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}