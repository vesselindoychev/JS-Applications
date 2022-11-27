import {html} from '../../node_modules/lit-html/lit-html.js';
import { getFurnitureById, deleteFurnitureById } from '../api/data.js';


let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const itemId = ctx.params["id"];
    const item = await getFurnitureById(itemId);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        ctx.render(createDetailsTemplate(item, userData._id === item._ownerId));
    } else {
        ctx.render(createDetailsTemplate(item, undefined))
    }
    debugger;
}

function createDetailsTemplate(item, isOwner) {
    const itemImgArr = item.img.split('/');
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="/images/${itemImgArr[itemImgArr.length - 1]}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price} $</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isOwner ? html`
                <div>
                    <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                    <a @click=${async (event) => {
                        event.preventDefault();
                        await deleteFurnitureById(item._id);
                        context.page.redirect('/');

                    }} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>
                ` : ''}
                
            </div>
        </div>
    `
}
