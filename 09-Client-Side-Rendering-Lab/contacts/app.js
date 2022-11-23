// FIRST Variant

// import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
// import { contacts as data} from './contacts.js';

// const contacts = data.map(c => Object.assign({}, c, {active: false}));
// const root = document.getElementById('contacts');
 
// const contactCard = (contact) => html`
// <div class="contact card">
//     <div>
//         <i class="far fa-user-circle gravatar"></i>
//     </div>
//     <div class="info">
//         <h2>Name: ${contact.name}</h2>
//         <button id=${contact.id} class="detailsBtn">Details</button>
//         ${contact.active
//         ? html`<div class="details" id=${contact.id}>
//         <p>Phone number: ${contact.phoneNumber}</p>
//         <p>Email: ${contact.email}</p>
//     </div>`
//     : nothing}
        
//     </div>
// </div>`;

// root.addEventListener('click', toggleDetails);

// render(contacts.map(contactCard), root);


// function toggleDetails(event) {
//     if (event.target.classList.contains('detailsBtn')) {
//         const id = event.target.id;
//         const contact = contacts.find(c => c.id == id);
//         contact.active = !contact.active;

//         render(contacts.map(contactCard), root);
//     }
// }

// SECOND Variant

// import { html, render } from './node_modules/lit-html/lit-html.js'
// import { contacts } from './contacts.js'
// const root = document.getElementById('contacts');
// const contactCard = (contact) => html`
//         <div class="contact card">
//             <div>
//                 <i class="far fa-user-circle gravatar"></i>
//             </div>
//             <div class="info">
//                 <h2>Name: ${contact.name}</h2>
//                 <button class="detailsBtn">Details</button>
//                 <div class="details" id=${contact.id}>
//                     <p>Phone number: ${contact.phoneNumber}</p>
//                     <p>Email: ${contact.email}</p>
//                 </div>
//             </div>
//         </div>`;

// root.addEventListener('click', onToggle);
// render(contacts.map(contactCard), root);

// function onToggle(event) {
//     if (event.target.classList.contains('detailsBtn')) {
//         const parent = event.target.parentElement;
//         const details = parent.querySelector('div');

//         if (details.style.display == 'none') {
//             details.style.display = 'block'
//         } else {
//             details.style.display = 'none';
//         }
//     }
// }

// THIRD Variant

import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
import {  contacts as data } from './contacts.js'

const contacts = data.map(c => Object.assign({}, c, {active: false}));

const root = document.getElementById('contacts');

const contactCard = (contact, onToggle) => html`
        <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button class="detailsBtn" @click=${onToggle.bind(null, contact)}>Details</button>
                
                ${contact.active
                ?html`<div class="details">
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>`
                : nothing}
               
            </div>
        </div>` ;

function update() {
    render(contacts.map(c => contactCard(c, onToggle)), root)
}

function onToggle(contact) {
    contact.active = !contact.active;
    update();
}