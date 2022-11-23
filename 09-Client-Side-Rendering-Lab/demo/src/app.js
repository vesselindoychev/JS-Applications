import { render } from "./template.js";

const username = 'Peter';
const items = [
    'Product1',
    'Product2',
    'Product3'
]

const ctx = {
    username, 
    items
}

const views = {
    'home-link': 'home',
    'catalog-link': 'catalog',
    'about-link': 'about',
    
}

document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.tagName == 'A') {
        const view = views[event.target.id];

        if (view !== undefined) {
            render(view, ctx);
        }
    }
})

