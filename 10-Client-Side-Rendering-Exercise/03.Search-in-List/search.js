// import {html, render} from './node_modules/lit-html/lit-html.js';
// import {towns} from './towns.js'
// const townsRoot = document.getElementById('towns');
// const resultRoot = document.getElementById('result');
// const searchTextInput = document.getElementById('searchText');
// document.querySelector('button').addEventListener('click', search);

// update();
// // updateCountOfSeacrhedTowns();

// function searchTemplate(towns, match) {
//    const ul = html`
//        <ul>
//          ${towns.map(town => createLi(town, match))}
//       </ul>
//    `
//    return ul;
// }

// function createLi(town, match) {
//    return html `
//       <li class="${town.toLowerCase().includes(match) ? "active" : ""}">${town}</li>
//    `
// }

// function update(text) {
//    const ul = searchTemplate(towns, text);
//    render(ul, townsRoot);
// }

// function search(event) {
//    event.preventDefault();
//    let text = searchTextInput.value.toLowerCase();
//    if (text.length == 0) {
//       text = undefined
//    }
//    searchTextInput.value = '';
//    update(text);
//    updateCountOfSeacrhedTowns();

// }

// function updateCountOfSeacrhedTowns() {
//    const matches = document.querySelectorAll('.active').length;
//    const matchesCount = matches ? html`<p>${matches} matches found</p>` : '';
//    render(matchesCount, resultRoot);
// }

import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';

const townsRoot = document.getElementById('towns');
const resultRoot = document.getElementById('result');
const textInput = document.getElementById('searchText');
document.querySelector('button').addEventListener('click', search);

update();

function searchTemplate(text) {
   const ul = html`
      <ul>
         ${towns.map(town => createLiTown(town, text))}
      </ul>
   `
   return ul;
}

function createLiTown(town, text) {
   return html`
      <li class="${town.includes(text)? "active" : ""}">${town}</li>
   `
}

function update(text) {
   const townTemplate = searchTemplate(text);
   render(townTemplate, townsRoot);
}

function search() {
   let text = textInput.value;
   text.length == 0 ? text = undefined : text;
   update(text);
   updateCountOfTowns();
   textInput.value = '';
}

function updateCountOfTowns() {
   const matches = document.querySelectorAll('.active').length;
   const matchesCount = html`<p>${matches} matches found</p>`;
   render(matchesCount, resultRoot);
}