

import { deletePost, getPostInfo } from '../api/data.js';
import { createDonation, getDonationsCount, getUserDonationsCount } from '../api/donations.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const post = await getPostInfo(ctx.params.id);
    const user = getUserData();
    const isUser = user && user._id !== post._ownerId
    const isCreator = user && user._id == post._ownerId;

    let donationsCount = await getDonationsCount(post._id);
    let userDonationsCount;

    if (user) {
        userDonationsCount = await getUserDonationsCount(post._id, user._id);
    }

    async function onDonate() {
        await createDonation(ctx.params.id);
        let donationsCount = await getDonationsCount(ctx.params.id);
        ctx.render(detailsTemplate(post, isUser, isCreator, onDelete, onDonate, donationsCount))
    }

    ctx.render(detailsTemplate(post, isUser, isCreator, onDelete, onDonate, donationsCount, userDonationsCount));
}


async function onDelete() {
    const res = confirm('Are you sure that you would like to delete this post?')
    if (res) {
        await deletePost(context.params.id);
    }
    context.page.redirect('/');
} 

function detailsTemplate(post, user, isCreator, onDelete, onDonate, donationsCount, userDonationsCount) {
    return html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donationsCount}</p>
    
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        ${isCreator ? html`
                        <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                        ` : nothing}
                        
                        ${userDonationsCount == 0 && user ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>` : nothing}
                        <!--Bonus - Only for logged-in users ( not authors )-->
                        
                    </div>
    
                </div>
            </div>
        </div>
    </section>`
}