import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllTeams } from '../api/data.js';

export async function browseView(ctx) {
    const teams = await getAllTeams();
    const user = JSON.parse(sessionStorage.getItem('userData')); 
    ctx.render(createBrowseTemplate(teams, user));
}

function createTeamCard(team) {
    return html`
                <article class="layout">
                    <img src=".${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">5000 Members</span>
                        <div><a href="/team-details/${team._id}" class="action">See details</a></div>
                    </div>
                </article>
    `
}

function createBrowseTemplate(teams, user) {
   

    return html`
            <section id="browse">
               
                <article class="pad-med">
                    <h1>Team Browser</h1>
                </article>
                
                
                ${user ? html`
                <article class="layout narrow">
                    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                </article>`
                : ''}
                

                ${Object.values(teams).map(team => createTeamCard(team))};
                

                

            </section>
    `;
}