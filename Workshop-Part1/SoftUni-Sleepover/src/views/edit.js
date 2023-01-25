import { getById, updateRoom } from '../data/room.js';
import {html, nothing} from '../lib.js';
import { submitHandler } from '../util.js';

export async function showEditView(ctx) {
    const roomId = ctx.params.id;
    const userId = ctx.user?.objectId;

    ctx.render(editTemplate(ctx.data, submitHandler(onEdit)));
   
    async function onEdit({name, location, beds, openForBooking}) {
        beds = parseInt(beds);
        openForBooking = Boolean(openForBooking);

        if (!name || !location || !beds) {
            return alert('All fields are required!');
        }

        
        await updateRoom(roomId, {name, location, beds, openForBooking}, userId);
        ctx.page.redirect(`/rooms/${roomId}`);
    }
}

function editTemplate(room, onEdit) {
    return html`
    <h3>Edit room</h3>
    <form @submit=${onEdit} class="edit-form">
        <label>Hotel Name:</label>
        <input type="text" name="name" .value="${room.name}">
        <label>Location:</label>
        <input type="text" name="location" .value="${room.location}">
        <label>Number of beds:</label>
        <input type="number" name="beds" .value="${room.beds}">
        <label>Open for Booking:</label>
        <input type="checkbox" name="openForBooking" .checked="${room.openForBooking}">
        <button type="submit">Save changes</button>
    </form>`
}