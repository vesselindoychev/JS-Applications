import  { html, render } from 'https://unpkg.com/lit-html?module';

import { table } from "./table.js";

table
const data = [
    {
        name: 'Peter',
        id: 'asd1',
        canEdit: false,
        style: {
            color: 'red',
            border: '1px solid black'
        }
    },
    {
        name: 'Mary',
        id: 'asd2',
        canEdit: true,
        highlight: {
            active: true,
            content: false
        }
    },
    {
        name: 'John',
        id: 'asd3',
        canEdit: false
    }
]



const root = document.querySelector('main');
update();
function onClick(id) {
    const index = data.findIndex(i => i.id == id);
    data.splice(index, i);
    update();
}

function update() {
    render(table(data, onClick), root);
}