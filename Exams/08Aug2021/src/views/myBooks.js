import { getMyBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function showMyBooksView(ctx) {
    const user = getUserData();
    const books = await getMyBooks(user._id);
    ctx.render(myBooksTemplate(books));
}

function myBooksTemplate(books) {
    return html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        ${books.length > 0 ? html`
        <ul class="my-books-list">
            ${books.map(book => createBookCard(book))}
            
        </ul>
        ` : html`<p class="no-books">No books in database!</p>`}
    </section>`
}

function createBookCard(book) {
    return html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>`
}