import { createIdea } from "../api/data.js";

const section = document.getElementById('create-view');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);

let ctx = null;

export function showCreateView(context) {
    ctx = context;
    context.showSection(section);
}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {title, description, imageURL} = Object.fromEntries(formData);
    createIdea({title, description, img: imageURL});
    form.reset();
    ctx.goto('/catalog')
    
}