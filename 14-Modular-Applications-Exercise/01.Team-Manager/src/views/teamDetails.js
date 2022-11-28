import {html} from '../../node_modules/lit-html/lit-html.js';
import { getTeamInfo } from '../api/data.js';

export async function teamDetailsView(ctx) {
    debugger;
    const id = ctx.params.id
    const team = await getTeamInfo(id);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData._id;
    const ownerId = team._ownerId;
    const isOwner = userId == ownerId;

    

    ctx.render(createDetailsTemplate(team, isOwner));
}

function createDetailsTemplate(team, isOwner) {
    return html`
        
            <section id="team-home">
                <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">3 Members</span>
                        <div>
                            ${isOwner ? html`
                            <a href="/edit/${team._id}" class="action">Edit team</a>
                            ` : ''}
                            
                            <a href="#" class="action">Join team</a>
                            <a href="#" class="action invert">Leave team</a>
                            Membership pending. <a href="#">Cancel request</a>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            ${isOwner ? html`<li>My Username</li>` : ''}
                            <li>James${isOwner ? html`<a href="#" class="tm-control action">Remove from team</a>` : ''}</li>
                            <li>Meowth${isOwner ? html`<a href="#" class="tm-control action">Remove from team</a>`: ''}</li>
                        </ul>
                    </div>

                    ${isOwner ? html`
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                            <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                        </ul>
                    </div>`
                    : ''}
                    
                </article>
            </section>
    `
}