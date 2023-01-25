import { getAll } from '../data/room.js';
import {html, repeat} from '../lib.js';
import { classMap } from '../lib.js';

export async function showCatalogView(ctx) {
    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`));
    
    const {results: rooms} = await getAll();

    if (ctx.user) {
        rooms.forEach(r => r.isOwner = r.owner.objectId == ctx.user.objectId)
    }

    ctx.render(catalogTemplate(listTemplate(rooms)))
}

function catalogTemplate(list) {
    return html`
    <h1>Available Rooms</h1>
    ${list}
    `
}

function listTemplate(rooms) {
    return html`
    <section>
        <!-- ${repeat(rooms, r => r.objectId, createRoomCard)} -->
        ${rooms.length == 0 ? html`<p>There are no available rooms</p>` : rooms.map(room => createRoomCard(room))}
    </section>
    `
}

function createRoomCard(room) {
    return html`
    <article class=${classMap({"room-card": true, 'own-room': room.isOwner})}>
        <h3>${room.name}</h3>
        <p>Location: ${room.location}</p>
        <p>Beds: ${room.beds}</p>
        <p><a class="action" href="/rooms/${room.objectId}">View Details</a></p>
        <p>Hosted by ${room.owner.username}</p>
    </article>`;
}