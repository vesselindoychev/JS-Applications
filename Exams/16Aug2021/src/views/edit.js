import { getCurrentGame, updateGame } from '../api/data.js';
import { html } from '../lib.js';

export async function showEditView(ctx) {
    const game = await getCurrentGame(ctx.params.id);

    async function onEdit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const {title, category, maxLevel, imageUrl, summary} = Object.fromEntries(formData);
    
        if (!title || !category || !maxLevel || !imageUrl || !summary) {
            return alert('All fields are required');
        }
    
        await updateGame(game._id, title, category, maxLevel, imageUrl, summary);
        ctx.page.redirect(`/details/${ctx.params.id}`);

    }
    ctx.render(editTemplate(game, onEdit));
}


function editTemplate(game, handler) {
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${handler} id="edit">
            <div class="container">
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value="${game.title}" />
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value="${game.category}" />
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${game.maxLevel}" />
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value="${game.imageUrl}" />
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game" />
            </div>
        </form>
    </section>`
}