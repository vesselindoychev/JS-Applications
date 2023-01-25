import {html} from '../../node_modules/lit-html/lit-html.js';
import { createRoom } from '../data/room.js';
import { submitHandler } from '../util.js';

export async function showCreateView(ctx) {
    ctx.render(createTemplate(submitHandler(onCreate)))

    async function onCreate({name, location, beds}) {
        beds = parseInt(beds);

        if (name == '' || location == '' || Number.isNaN(beds)) {
            return alert('All fields are required!')
        }
        
        const userId = ctx.user?.objectId;
        const res = await createRoom({name, location, beds}, userId);
        ctx.page.redirect('/rooms');
    }
}

function createTemplate(onCreate) {
    return html`
    <h2>Host Room</h2>
    <form @submit=${onCreate} class="create-room-form">
        <label>Name: <input type="text" name="name"></label>
        <label>Location: <input type="text" name="location"></label>
        <label>Beds: <input type="number" name="beds"></label>
        <button type="submit" class="create-room-btn">Create Room</button>
    </form>`
}