import { createMeme } from '../api/data.js';
import { html } from '../lib.js';
import { notification } from './notifications.js';

let context = null;

export async function showCreateView(ctx) {
    context = ctx;
    ctx.render(createTemplate(onCreate));
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {title, description, imageUrl} = Object.fromEntries(formData);

    if (!title || !description || !imageUrl) {
        return notification('All fields are required');
    }

    await createMeme(title, description, imageUrl);
    context.page.redirect('/dashboard');
}

function createTemplate(handler) {
    return html`
    <section id="create-meme">
        <form @submit=${handler} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`
}