import { getCurrentEvent, updateEvent } from '../api/data.js';
import { html } from '../lib.js';

export async function showEditView(ctx) {
    const event = await getCurrentEvent(ctx.params.id);
    ctx.render(editTemplate(onEdit, event));

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { title, date, author, description, imageUrl} = Object.fromEntries(formData);

        if (!title || !date || !author || !imageUrl || !description) {
            return alert('All fields are required');
        }

        await updateEvent(ctx.params.id, title, date, author, description, imageUrl);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}

function editTemplate(onEdit, event) {
    return html`
    <section id="editPage">
        <form @submit=${onEdit} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value="${event.title}">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value="${event.date}">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" .value="${event.author}">
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description"
                    placeholder="Description">${event.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value="${event.imageUrl}">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`
}