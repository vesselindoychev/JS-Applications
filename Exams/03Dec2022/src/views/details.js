import { deleteAlbum, getCurrentAlbum } from '../api/data.js';
import { createLike, getAllLike, getUserLikes } from '../api/likes.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

export async function showDetailsView(ctx) {
    const album = await getCurrentAlbum(ctx.params.id);
    const user = getUserData();
    const isCreator = user && user._id == album._ownerId;
    const isUser = user && user._id !== album._ownerId;

    let userLikes;

    if (user) {
        userLikes = await getUserLikes(album._id, user._id);
    }

    const totalLikes = await getAllLike(album._id);
    ctx.render(detailsTemplate(album, isCreator, onDelete, isUser, onLike, totalLikes, userLikes));

    async function onDelete() {
        await deleteAlbum(album._id);
        ctx.page.redirect('/dashboard');
    }

    async function onLike() {
        await createLike(album._id);
        const likesCount = await getAllLike(album._id);
        ctx.render(detailsTemplate(album, isCreator, onDelete, isUser, onLike, likesCount));
    }
}

function detailsTemplate(album, isCreator, onDelete, isUser, onLike, likesCount, userLikes) {
    return html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${album.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>
    
            <!--Edit and Delete are only for creator-->
            ${isCreator ? html`
            <div id="action-buttons">
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : nothing}

            ${isUser && userLikes == 0 ? html`
            <div id="action-buttons">
                <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
            </div>`
            : nothing}

            
    
        </div>
    </section>`
}