import {html, render} from './node_modules/lit-html/lit-html.js'
import {cats} from './catSeeder.js'

const root = document.getElementById('allCats');

const catTamplate = html`
    <ul>
        ${html`${createCatLi(cats)}`}
    </ul>
`

render(catTamplate, root);

function createCatLi(cats) {
    const res = cats.map(cat => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${showContent} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>
    `);

    return res;
}

function showContent(event) {
    event.preventDefault();

    const parent = event.target.parentElement;
    const hiddenDiv = parent.querySelector('.status');

    if (hiddenDiv.style.display == 'none') {
        hiddenDiv.style.display = 'block';
        event.target.textContent = 'Hide status code';
    } else {
        hiddenDiv.style.display = 'none';
        event.target.textContent = 'Show status code';
    }
    
}