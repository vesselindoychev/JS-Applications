import {html} from '../../node_modules/lit-html/lit-html.js';
import { createTeam, requestMemeber } from '../api/data.js';

let context = null;
export async function createView(ctx) {
    context = ctx;
    ctx.render(createTeamplate(onSubmit));
}


async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {name, logoUrl, description} = Object.fromEntries(formData);

    if (!name || name.length < 4 || !logoUrl || !description || description.length < 10) {
        return context.render(createTeamplate(onSubmit, 'Invalid data'));
    }

    const response = await createTeam(name, logoUrl, description);
    const addMember = await requestMemeber(response._id);
    
    context.page.redirect(`/team-details/${response._id}`);
}

function createTeamplate(handler, error) {
    return html`
            <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form @submit=${handler} id="create-form" class="main-form pad-large">
                        ${error ? html`<div class="error">${error}</div>` : ''}
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>
    `
}