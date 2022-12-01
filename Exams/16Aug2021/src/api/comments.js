import * as api from './api.js';

const endpoints = {
    'getAllComments': 'data/comments'
}

export async function getAllComments(gameId) {
    const url = `?where=gameId%3D%22${gameId}%22`;
    const res = await api.get(endpoints.getAllComments + url);
    return res;
}

export async function createComment(gameId, comment) {
    const res = await api.post(endpoints.getAllComments, {gameId, comment});
    return res;
}