import { getPostInfo, updatePost } from '../api/data.js';
import { html } from '../lib.js';

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const post = await getPostInfo(ctx.params.id);
    ctx.render(editTemplate(onUpdate, post));
}

async function onUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {title, description, imageUrl, address, phone} = Object.fromEntries(formData);

    if (!title || !description || !imageUrl || !address || !phone) {
        return alert('All fields are required');
    }

    await updatePost(context.params.id, title, description, imageUrl, address, phone);
    context.page.redirect(`/details/${context.params.id}`);
}

function editTemplate(handler, post) {
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${handler} id="edit">
            <h1 class="title">Edit Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" .value="${post.title}">
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" .value="${post.description}">
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" .value="${post.imageUrl}">
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" .value="${post.address}">
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" .value="${post.phone}">
            </article>
    
            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>`
}