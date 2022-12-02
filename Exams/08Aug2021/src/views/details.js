
import { deleteBook, getCurrentBook } from '../api/data.js';
import { createLike, getLikesCount, getUserLikes } from '../api/likes.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

export async function showDetailsView(ctx) {
    const book = await getCurrentBook(ctx.params.id);
    const user = getUserData();
    const isCreator = user && user._id == book._ownerId;
    let userLikes;
    const bookLikesCount = await getLikesCount(book._id);

    if (user) {
        userLikes = await getUserLikes(book._id, user._id)
    }

    async function onDelete() {
        await deleteBook(book._id);
        ctx.page.redirect('/dashboard');
    }
    

    async function onLike() {
        await createLike(book._id);
        const bookLikesCount = await getLikesCount(book._id);
        ctx.render(detailsTemplate(book, isCreator, user, onDelete, onLike, bookLikesCount))
    }

    ctx.render(detailsTemplate(book, isCreator, user, onDelete, onLike, bookLikesCount, userLikes));
}   

function detailsTemplate(book, isCreator, user, onDelete, onLike, bookLikes, userLikes) {
    return html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">
                
                ${isCreator ? html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                `: nothing}
                
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${user && user._id !== book._ownerId & userLikes == 0 ? html`
                <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
                : nothing}
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${bookLikes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`
}