import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFurniture } from '../api/data.js';

let context = null;
export async function showCreateView(ctx) {
    context = ctx;
    ctx.render(createViewTemplate(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {make, model, year, description, price, img, material} = Object.fromEntries(formData);
    
    //validation
    let hasError = false;
    const isValidForm = {
        hasMake: 'is-valid',
        hasModel: 'is-valid',
        hasYear: 'is-valid',
        hasDesc: 'is-valid',
        hasPrice: 'is-valid',
        hasImg: 'is-valid'
    }


    if (!make || make.length < 4) {
        isValidForm.hasMake = 'is-invalid';
        hasError = true;
    }

    if (!model || model.length < 4) {
        isValidForm.hasModel = 'is-invalid';
        hasError = true;
    }

    if (!year || Number(year) < 1950 || Number(year) > 2050) {
        isValidForm.hasYear = 'is-invalid';
        hasError = true;
    }

    if (!description || description.length < 10) {
        isValidForm.hasDesc = 'is-invalid';
        hasError = true;
    }

    if (!price || price < 0) {
        isValidForm.hasPrice = 'is-invalid';
        hasError = true;
    }

    if (!img) {
        isValidForm.hasImg = 'is-invalid';
        hasError = true;
    }

    if (hasError) {
        return context.render(createViewTemplate(onSubmit, isValidForm));
    }
    await createFurniture({make, model, year, description, price, img, material});
    context.page.redirect('/');
}

function createViewTemplate(handler, stateForm = {}) {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${handler}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${stateForm.hasMake}" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${stateForm.hasModel}" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${stateForm.hasYear}" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${stateForm.hasDesc}" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${stateForm.hasPrice}" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${stateForm.hasImg}" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    `
}