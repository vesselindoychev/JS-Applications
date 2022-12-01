import { getAllComments, createComment } from '../api/comments.js';
import { deleteGame, getCurrentGame } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

export async function showDetailsView(ctx) {
    const game = await getCurrentGame(ctx.params.id);
    const user = getUserData();
    const isCreator = user && user._id == game._ownerId;
    const isUser = user && user._id !== game._ownerId;
    const comments = await getAllComments(game._id);

    async function onDelete() {
        const res = confirm('Are you sure that you want to delete tha game?');
        if (res) {
            await deleteGame(game._id);
            ctx.page.redirect('/');
        }

    }

    async function onComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {comment} = Object.fromEntries(formData);

        if (!comment) {
            return alert('Comment section must be filled before send the comment');
        }

        await createComment(game._id, comment);
        event.target.reset()
        ctx.page.redirect(`/details/${game._id}`);
    }

    ctx.render(detailsTemplate(game, isCreator, onDelete, comments, isUser, onComment));
}

function detailsTemplate(game, isCreator, onDelete, comments, isUser, onComment) {
    return html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
    
            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
    
                ${comments.length > 0 ? html`
                <ul>
                    ${comments.map(comment => createCommentCard(comment))}
                </ul>
                ` : html` <p class="no-comment">No comments.</p>`}
            </div>
    
            ${isCreator ? html`
            <div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>`
            : nothing}
    
        </div>
    
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        
        ${isUser ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onComment} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>` : nothing}
        
    </section>`
}

function createCommentCard(comment) {
    return html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>`
}