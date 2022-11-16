import { deleteById, getIdeaById } from "../api/data.js";

const section = document.getElementById('details-view');

export async function showDetailsView(context, id) {
    const idea = await getIdeaById(id);
    context.showSection(section);

    const userData = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = userData && userData._id  === idea._ownerId;

    section.innerHTML = createIdea(idea, isOwner);
    
    if (isOwner) {
        section.querySelector('a').addEventListener('click', async (event) => {
            event.preventDefault();
            deleteById(id);
            context.goto('/catalog')
        })
    }
}

function createIdea(idea, isOwner) {
    let html = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`

    if (isOwner) {
        html += `
        <div class="text-center">
            <a class="btn detb" href="">Delete</a>
        </div>`
    }

    return html;
}