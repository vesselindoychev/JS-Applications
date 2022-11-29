import { createItem } from '../api/data.js';
import {html} from '../lib.js';

let context = null;

export async function showAddView(ctx) {
    context = ctx;
    ctx.render(createAddView(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {brand, model, release, imageUrl, value, designer} = Object.fromEntries(formData);

    if (!model || !brand || !release || !imageUrl || !value || !designer) {
        return alert('All fields are required');
    }

    await createItem(brand, model, imageUrl, release, designer, value);
    context.page.redirect('/dashboard');
}

function createAddView(handler) {
    return html`
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form @submit=${handler} class="create-form">
                <input type="text" name="model" id="shoe-model" placeholder="Model" />
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
                <input type="text" name="value" id="shoe-value" placeholder="Value" />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}