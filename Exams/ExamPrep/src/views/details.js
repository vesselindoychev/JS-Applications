import { deleteMeme, getCurrentMeme } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const meme = await getCurrentMeme(ctx.params.id)
    const user = getUserData();
    const isCreator = user && user._id == meme._ownerId;
    ctx.render(detailsTemplate(meme, isCreator, onDelete));
}

async function onDelete(event) {
    event.preventDefault();
    const res = confirm('Are you sure that you want to delete this meme?');

    if (res) {
        await deleteMeme(context.params.id);
        context.page.redirect('/dashboard');
    }

}

function detailsTemplate(meme, isCreator, onDelete) {
    return html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
    
                ${isCreator ? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${onDelete} class="button danger">Delete</button>`
                : nothing}
                
    
            </div>
        </div>
    </section>`
}