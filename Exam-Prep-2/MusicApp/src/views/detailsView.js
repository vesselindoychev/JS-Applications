import { deleteAlbum, getDetails } from '../api/data.js';
import {html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    
    const id = ctx.params.id;
    const album = await getDetails(id);

    const userId = getUserData()._id;
    const isOwner = userId && userId == album._ownerId;
     
    ctx.render(createDetailsTemplate(album, isOwner, onDelete));
}

async function onDelete() {
    await deleteAlbum(context.params.id);
    context.page.redirect('/catalog');
}

function createDetailsTemplate(album, isOwner, onDelete) {
    return html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${isOwner ? html`
                    <div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`
                    : nothing}
                    
                </div>
            </div>
        </section>`
}