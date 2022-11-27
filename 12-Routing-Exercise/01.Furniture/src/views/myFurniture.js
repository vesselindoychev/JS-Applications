import {html} from '../../node_modules/lit-html/lit-html.js';
import { getMyFurniture } from '../api/data.js';

let context = null;
export async function showMyFurnitureView(ctx) {
    context = ctx;
    const items = await getMyFurniture()
    ctx.render(createTemplate(items));
}

function createTemplate(items) {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(item => createItemCard(item))}
        </div>
    `
}

function createItemCard(item) {
    return html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="./images/${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
    `
}