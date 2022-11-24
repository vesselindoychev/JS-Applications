import {html, render} from './node_modules/lit-html/lit-html.js';

const selectRoot = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
const textInput = document.getElementById('itemText');

updateOptions();

async function updateOptions() {
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
    const response = await fetch(url, {
        method: 'get'
    });
    const options = await response.json();
    renderOptions(options);
}

function renderOptions(options) {
    const optionsTemplate = html`
        ${Object.values(options).map(option => html`<option value="${option._id}">${option.text}</option>`)}
    `

    render(optionsTemplate, selectRoot);
}

function onSubmit(event) {
    event.preventDefault();
    const text = textInput.value;
    if (!text) {
        return event.preventDefault();
    }
    addItem(text);
    updateOptions();
    textInput.value = '';

}

async function addItem(data) {
    
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: data})
    })
}