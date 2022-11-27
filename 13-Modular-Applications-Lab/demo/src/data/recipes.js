import * as api from './api.js';

const pageSize = 2

const endpoints = {
    'recipes': `data/recipes?pageSize=${pageSize}&offset=`,
    'getById': 'data/recipes/',
    'search': (query) => `/data/recipes?where=${encodeURIComponent(`name LIKE "${query}"`)}`
}

export async function getAll(page) {
    return api.get(endpoints.recipes + (page - 1) * pageSize);
}

export async function getById(id) {
    return api.get(endpoints.getById + id);
}
