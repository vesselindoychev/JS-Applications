import { getDetails, updateAlbum } from '../api/data.js';
import {html} from '../lib.js';

let context = null;

export async function showEditView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const album = await getDetails(id);

    ctx.render(createDetailsTemplate(album, onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {name, imgUrl, price, releaseDate, artist, genre, description} = Object.fromEntries(formData);
    await updateAlbum(context.params.id, name, imgUrl, price, releaseDate, artist, genre, description);
    context.page.redirect(`/details/${context.params.id}`);
}

function createDetailsTemplate(album, handler) {
    return html`
        <section class="editPage">
            <form @submit=${handler}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" .value="${album.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${album.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value="${album.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${album.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value="${album.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value="${album.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${album.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`
}

