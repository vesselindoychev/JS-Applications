import { getOwnerEvents } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function showProfileView(ctx) {
    const user = getUserData();
    const events = await getOwnerEvents(user._id);
    ctx.render(profileTemplate(user, events))
}

function profileTemplate(user, events) {
    return html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">
            <!--If there are event-->
            ${events.length > 0 ? html`${events.map(event => createEvent(event))}`
            : html`
            <div class="no-events">
                <p>This user has no events yet!</p>
            </div>`}
        </div>
    </section>`
}

function createEvent(event) {
    return html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="${event.imageUrl}">
            <h2>${event.title}</h2>
            <h6>${event.data}</h6>
            <a href="/details/${event._id}" class="details-button">Details</a>
        </div>
    </div>`
}