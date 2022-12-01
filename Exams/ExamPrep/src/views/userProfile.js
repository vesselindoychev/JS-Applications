import { getUserMemes } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function showProfileView(ctx) {
    const user = getUserData();
    const memes = await getUserMemes(user._id);
    ctx.render(profileTemplate(memes, user));
}

function profileTemplate(memes, user) {
    return html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes.length > 0 ? html`${memes.map(meme => createMeme(meme))}`
            : html`<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>`
}

function createMeme(meme) {
    return html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>`
}