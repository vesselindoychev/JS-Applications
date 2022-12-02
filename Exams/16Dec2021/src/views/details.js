import { deleteEvent, getCurrentEvent } from '../api/data.js';
import { createLike, getTotalLikes, getUserLikes } from '../api/likes.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

export async function showDetailsView(ctx) {
    const event = await getCurrentEvent(ctx.params.id);
    const user = getUserData();
    const isCreator = user && user._id == event._ownerId;
    
    const eventLikes = await getTotalLikes(event._id);
    let userLikes;

    if (user) {
        userLikes = await getUserLikes(event._id, user._id);
    }

    async function onDelete() {
        await deleteEvent(event._id);
        ctx.page.redirect('/profile');
    }

    async function onLike() {
        await createLike(event._id);
        const totalEventLikes = await getTotalLikes(event._id);
        const userLikes = await getUserLikes(event._id, user._id)
        ctx.render(detailsTemplate(event, isCreator, onDelete, onLike, totalEventLikes, userLikes))
    }

    ctx.render(detailsTemplate(event, isCreator, onDelete, onLike, eventLikes, userLikes, user));
}

function detailsTemplate(event, isCreator, onDelete, onLike, eventLikes, userLikes, user) {
    return html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${event.title}</h1>
                <div>
                    <img src="${event.imageUrl}" />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${event.description}</p>
                <h4>Date: ${event.date}</h4>
                <h4>Author: ${event.author}</h4>
    
                ${isCreator ? html`
                <div class="buttons">
                    <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                    <a class="btn-edit" href="/edit/${event._id}">Edit</a>
                </div>` : nothing}

                ${user && user._id !== event._ownerId && userLikes == 0 ? html`
                <a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`
                : nothing}

                <p class="likes">Likes: ${eventLikes}</p>
            </div>
        </div>
    </section>`
}