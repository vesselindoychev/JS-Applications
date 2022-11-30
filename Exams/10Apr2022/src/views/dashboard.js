import { getAllPosts } from '../api/data.js';
import { html } from '../lib.js';

export async function showDashboardView(ctx) {
    const posts = await getAllPosts();
    ctx.render(dashboardTemplate(posts));
}

function dashboardTemplate(posts) {
    return html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        ${posts.length > 0 ? html`
        <div class="all-posts">
            ${posts.map(post => createPostCard(post))}
        </div>`
        : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
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