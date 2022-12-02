import * as api from './api.js';

const endpoints = {
    'createLike': 'data/likes'
}

export async function createLike(theaterId) {
    const res = await api.post(endpoints.createLike, {theaterId})
    return res;
}

export async function getTotalLikes(theaterId) {
    const url = `?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`;
    const res = await api.get(endpoints.createLike + url);
    return res;
}

export async function getUserLikes(theaterId, userId) {
    const url = `?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    const res = await api.get(endpoints.createLike + url);
    return res;
}
