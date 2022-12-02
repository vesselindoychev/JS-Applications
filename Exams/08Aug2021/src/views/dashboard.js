import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';

export async function showDashboardView(ctx) {
    const books = await getAllBooks();
    ctx.render(dashboardTemplate(books));
}

function dashboardTemplate(books) {
    return html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <!-- Display ul: with list-items for All books (If any) -->
        ${books.length > 0 ? html`
        <ul class="other-books-list">
            ${books.map(book => createBookCard(book))}
        </ul>` : html`<p class="no-books">No books in database!</p>`}
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