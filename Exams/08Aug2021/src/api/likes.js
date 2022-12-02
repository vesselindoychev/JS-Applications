import * as api from '../api/api.js';

const endpoints = {
    'createLike': 'data/likes'
}

export async function createLike(bookId) {
    const res = await api.post(endpoints.createLike, {bookId});
    return res;
}

export async function getLikesCount(bookId) {
    const url = `?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`;
    const res = await api.get(endpoints.createLike + url);
    return res;
}

export async function getUserLikes(bookId, userId) {
    const url = `?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    const res = await api.get(endpoints.createLike + url);
    return res;
}