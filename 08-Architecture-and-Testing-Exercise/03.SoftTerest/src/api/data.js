import * as api from './api.js';

const endpoints = {
    'getAllIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea': 'data/ideas',
    'getIdeaById': 'data/ideas/'
}

export async function getAllIdeas() {
    return api.get(endpoints.getAllIdeas);
}

export async function createIdea(data) {
    return api.post(endpoints.createIdea, data)
}

export async function getIdeaById(id) {
    return api.get(endpoints.getIdeaById + id);
}

export async function deleteById(id) {
    return api.delete(endpoints.getIdeaById + id);
}