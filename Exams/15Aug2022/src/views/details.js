import { deleteItem, getCertainItem } from '../api/data.js';
import {html, nothing} from '../lib.js';
import { getUserData } from '../util.js';

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const item = await getCertainItem(id);
    const user = getUserData();
    const isCreator = user && user._id == item._ownerId;
    ctx.render(createDetailsTemplate(item, isCreator, onDelete));
}

async function onDelete() {
    const msg = confirm('Are you sure that you want to delete this item?')
    if (msg) {
        await deleteItem(context.params.id);
        context.page.redirect('/dashboard');
    }
}

function createDetailsTemplate(item, isCreator, handler) {
    return html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="${item.imageUrl}" .alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${item.brand}</span></p>
                <p>
                    Model: <span id="details-model">${item.model}</span>
                </p>
                <p>Release date: <span id="details-release">${item.release}</span></p>
                <p>Designer: <span id="details-designer">${item.designer}</span></p>
                <p>Value: <span id="details-value">${item.value}</span></p>
            </div>

          ${isCreator ? html`
          <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${handler} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`
          : nothing}
          
        </div>
    </section>`
}