import * as api from './api.js';
const endpoints = {
    'getMemes': 'data/memes',
    'getCurrentMeme': 'data/memes/'
}

export async function getAllMemes() {
    const url = `?sortBy=_createdOn%20desc`;
    const res = await api.get(endpoints.getMemes + url);
    return res;
}

export async function createMeme(title, description, imageUrl) {
    const res = await api.post(endpoints.getMemes, {title, description, imageUrl});
    return res;
}

export async function getCurrentMeme(id) {
    const res = await api.get(endpoints.getCurrentMeme + id);
    return res;
}

export async function updateMeme(id, title, description, imageUrl) {
    const res = await api.put(endpoints.getCurrentMeme + id, {title, description, imageUrl});
    return res;
}

export async function deleteMeme(id) {
    const res = await api.delete(endpoints.getCurrentMeme + id);
    return res;
}

export async function getUserMemes(userId) {
    const url = `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    const res = await api.get(endpoints.getMemes + url);
    return res;
}

