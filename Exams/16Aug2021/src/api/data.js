import  * as api from './api.js';

const endpoints = {
    'getAllGames': 'data/games',
    'getCurrentGame': 'data/games/'
}

export async function getAllGames() {
    const url = '?sortBy=_createdOn%20desc';
    const res = await api.get(endpoints.getAllGames + url);
    return res;
}

export async function getHomeViewGames() {
    const url = '?sortBy=_createdOn%20desc&distinct=category';
    const res = await api.get(endpoints.getAllGames + url);
    return res;
}

export async function createGame(title, category, maxLevel, imageUrl, summary) {
    const res = await api.post(endpoints.getAllGames, {title, category, maxLevel, imageUrl, summary});
    return res;
}

export async function getCurrentGame(id) {
    const res = await api.get(endpoints.getCurrentGame + id);
    return res;
}

export async function updateGame(id, title, category, maxLevel, imageUrl, summary) {
    const res = await api.put(endpoints.getCurrentGame + id, {title, category, maxLevel, imageUrl, summary});
    return res;
}

export async function deleteGame(id) {
    const res = await api.delete(endpoints.getCurrentGame + id);
    return res;
}