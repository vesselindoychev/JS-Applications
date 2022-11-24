import { html , render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
const root = document.getElementById('root');

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {towns} = Object.fromEntries(formData);
    const townsArr = towns.split(', ');
    renderResult(townsArr);
    form.reset();
}

function renderResult(data) {
    const result = createUl(data);
    render(result, root);
}

function createUl(data) {
    const liResult = createLi(data); 
    const ul = html`
    <ul>
        ${html`${liResult}`}
    </ul>
    `;
    return ul;
}

function createLi(data) {
    const result = data.map(el => html`<li>${el}</li>`);
    return result;
}