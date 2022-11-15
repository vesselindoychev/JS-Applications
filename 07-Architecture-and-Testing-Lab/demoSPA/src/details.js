import { get } from "./api.js";

const section = document.getElementById('details-view');
section.remove();

export async function showDetailsView(ctx, id) {
    ctx.render(section);
    displayRecipe({
        name: 'Loading...',
        ingredients: [],
        steps: []
    });
    const recipe = await get(`data/recipes/${id}`);


    displayRecipe(recipe);
}

function displayRecipe(recipe) {
    document.getElementById('recipe-name').textContent = recipe.name;

    const ingredientsFragment = document.createDocumentFragment();

    for (let item of recipe.ingredients) {
        const element = document.createElement('li');
        element.textContent = item;
        ingredientsFragment.appendChild(element);
    }
    document.getElementById('recipe-ingredients').replaceChildren(ingredientsFragment);

    const prepStepsFragment = document.createDocumentFragment();

    for (let step of recipe.steps) {
        const element = document.createElement('li');
        element.textContent = step;
        prepStepsFragment.appendChild(element);
    }
    document.getElementById('recipe-steps').replaceChildren(prepStepsFragment);
}