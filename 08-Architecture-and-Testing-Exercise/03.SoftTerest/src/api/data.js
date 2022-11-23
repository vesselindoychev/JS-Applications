import * as api from './api.js'

const endpoints = {
    'getAllIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'getDetails': 'data/ideas/',
    'createIdea': 'data/ideas',
    'deleteIdea': 'data/ideas/'
}

export async function getAllIdeas() {
    return await api.get(endpoints.getAllIdeas);
}

export async function getDetails(id) {
    return await api.get(endpoints.getDetails + id);
}

export async function createIdea(data) {
    return await api.post(endpoints.createIdea, data);
}

export async function deleteIdea(id) {
    return await api.delete(endpoints.deleteIdea + id);
}