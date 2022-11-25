import * as api from './api.js';

const endpoints = {
    'recipes': 'data/recipes',
    'getById': 'data/recipes/'
}

export async function getAll() {
    return api.get(endpoints.recipes);
}

export async function getById(id) {
    return api.get(endpoints.getById + id);
}
