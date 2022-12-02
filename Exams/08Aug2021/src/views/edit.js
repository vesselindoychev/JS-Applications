import { getCurrentBook, updateBook } from '../api/data.js';
import { html } from '../lib.js';

export async function showEditView(ctx) {
    const book = await getCurrentBook(ctx.params.id);
    ctx.render(editTemplate(onEdit, book));

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {title, description, imageUrl, type} = Object.fromEntries(formData);
        
        if (!title || !description || !imageUrl || !type) {
            return alert('All fields are required');
        }

        await updateBook(ctx.params.id, title, description, imageUrl, type);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}



function editTemplate(handler, book) {
    return html`
    <section id="edit-page" class="edit">
        <form @submit=${handler} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" .value="${book.title}">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description">${book.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" .value="${book.imageUrl}">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" .value="${book.type}">
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`
}