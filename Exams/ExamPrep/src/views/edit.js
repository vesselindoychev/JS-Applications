import { getCurrentMeme, updateMeme } from '../api/data.js';
import { html } from '../lib.js';
import { notification } from './notifications.js';

export async function showEditView(ctx) {
    const meme = await getCurrentMeme(ctx.params.id);
    ctx.render(editTemplate(onEdit, meme));

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {title, description, imageUrl} = Object.fromEntries(formData);
    
        if (!title || !description || !imageUrl) {
            return notification('All fields must be filled');
        }
    
        await updateMeme(ctx.params.id, title, description, imageUrl);
        ctx.page.redirect(`/details/${ctx.params.id}`)
}


}

function editTemplate(handler, meme) {
    return html`
    <section id="edit-meme">
        <form @submit=${handler} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                                Programming is often touted as a smart and lucrative career path.
                                It's a job that (sometimes) offers flexibility and great benefits.
                                But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                                The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                                These memes cover most of the frustration (and funny moments) of programming.
                                At least we can laugh through the pain. 
                            </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`
}