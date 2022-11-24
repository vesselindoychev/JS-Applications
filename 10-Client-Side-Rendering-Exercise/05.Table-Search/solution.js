import {html, render} from './node_modules/lit-html/lit-html.js';
const tbodyRoot = document.querySelector('tbody');

solve();

async function getData() {
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const response = await fetch(url);
   const data = await response.json();
   renderData(data);
}

function renderData(data) {
   const template = html`
      ${Object.values(data).map(x => html`<tr>
         <td>${x.firstName} ${x.lastName}</td>
         <td>${x.email}</td>
         <td>${x.course}</td>
      </tr>`)}
   `

   render(template, tbodyRoot);
}

function solve() {
   const textInput = document.getElementById('searchField');
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   getData();

   function onClick() {

   }
}