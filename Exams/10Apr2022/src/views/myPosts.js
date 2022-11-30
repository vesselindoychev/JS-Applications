import { getUserPost } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


export async function showMyPostsView(ctx) {
    const user = getUserData();
    const myPosts = await getUserPost(user._id);
    ctx.render(myPostsTemplate(myPosts));
}

function myPostsTemplate(myPosts) {
    return html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        ${myPosts.length > 0 ? html`
        <div class="my-posts">
            ${myPosts.map(post => createPostCard(post))}
        </div>` : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    </section>`
}

function createPostCard(post) {
    return html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`
}