import { get } from "./api.js";
 

document.getElementById('recipe-list').addEventListener('click', openRecipe);
const section = document.getElementById('catalog-view');
section.remove();

let ctx = null;

export async function showCatalogView(inCtx) {
    ctx = inCtx;
    ctx.render(section);
    displayRecipes([])
    const recipes = await getAllRecipes();
    displayRecipes(recipes);
}

async function getAllRecipes() {
    const recipes = await get('data/recipes?select=' + encodeURIComponent('_id,name'));
    return recipes;
}

function displayRecipes(recipes) {
    const cards = recipes.map(createRecipe);
    
    const fragment = document.createDocumentFragment();
    for (let item of cards) {
        fragment.appendChild(item);
    }

    const ulList = document.getElementById('recipe-list');
    ulList.replaceChildren(fragment);
}


function createRecipe(recipe) {
    let element = document.createElement('li');
    element.textContent = recipe.name;

    let link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.textContent = '[Details]';
    link.id = recipe._id;

    element.appendChild(link);

    return element;
}

function openRecipe(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.id;
        ctx.goto('details-link', id);
    }

}