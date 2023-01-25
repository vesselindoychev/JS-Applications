import { deleteRoom} from "../data/room.js";
import {html, nothing, repeat} from '../lib.js';
import * as reservationService from '../data/reservation.js';
import { submitHandler } from "../util.js";

export async function showDetailsView(ctx) {
    const roomId = ctx.params.id; 
    const room = ctx.data;

    room.isOwner = room.owner.objectId == ctx.user?.objectId;
    room.reservations = [];
    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        const result = await reservationService.getByRoomId (roomId);
        room.reservations = result.results;
    }

    ctx.render(detailsTemplate(ctx.data, onDelete, hasUser, submitHandler(onBook)));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this room?');
        if (confirmation) {
            await deleteRoom(roomId);
            ctx.page.redirect('/rooms')
        }
    }

    async function onBook({startDate, endDate}) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (Number.isNaN(startDate.getDate())) {
            return alert('Invalid starting date!')
        }

        if (Number.isNaN(endDate.getDate())) {
            return alert('Invalid ending date!')
        }  

        if (endDate <= startDate) {
            return alert('Ending date must be after starting date!')
        }

        const reservationData = {
            startDate, 
            endDate,
            room: roomId,
            host: ctx.data.owner.objectId
        };

        const result = await reservationService.createReservation(reservationData, ctx.user.objectId);
        ctx.page.redirect(`/rooms/${roomId}`)
    }

}

function reservationForm(onBook) {
    return html`
    <form @submit=${onBook}>
        <label>From:<input type="date" name="startDate"></label>
        <label>To:<input type="date" name="endDate"></label>
        <button type="submit">Request reservation</button>
    </form>`
}

function detailsTemplate(room, onDelete, hasUser, onBook) {
    return html`
    <article class="details-room">
        <h3>${room.name}</h3>
        <p>Location: ${room.location}</p>
        <p>Beds: ${room.beds}</p>
        ${hasUser && !room.isOwner ? reservationForm(onBook) : nothing}
        ${room.isOwner ? html`
        <a href="/edit/${room.objectId}">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)">Delete</a>
        ` : nothing}
        <ul>
            ${repeat(room.reservations, r => r.objectId, reservationCard)}
        </ul>
    </article>`
}

function reservationCard(res) {
    return html`
    <li>From: ${res.startDate.toISOString().slice(0, 10)} To: ${res.endDate.toISOString().slice(0, 10)} By: ${res.owner.username}</li>`
}