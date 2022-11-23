import { deleteIdea, getDetails } from "../api/data.js";


const section = document.getElementById('details-view');
section.addEventListener('click', onDelete);

let ctx = null;

export async function showDetails(context, id) {
    ctx = context;
    const idea = await getDetails(id);

    const user = JSON.parse(sessionStorage.getItem('userData'));
    const isOwner = user && user._id == idea._ownerId;

    context.showSection(section);
    
    section.innerHTML = createIdea(idea, isOwner);
}

function createIdea(idea, isOwner) {
    let html = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`;

    if (isOwner) {
        html += `
        <div class="text-center">
            <a data-id=${idea._id} class="btn detb" href="">Delete</a>
        </div>`;
    }
    return html;
}

async function onDelete(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.dataset.id;
        await deleteIdea(id);
        ctx.goto('/dashboard');

    }
}