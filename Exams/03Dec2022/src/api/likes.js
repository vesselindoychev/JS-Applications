import * as api from './api.js';

const endpoints = {
    'getLikes': 'data/likes'
}

export async function createLike(albumId) {
    const res = await api.post(endpoints.getLikes, {albumId});
    return res;
}

export async function getAllLike(albumId) {
    const url = `?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
    const res = await api.get(endpoints.getLikes + url);
    return res;
}
export async function getUserLikes(albumId, userId) {
    const url = `?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    const res = await api.get(endpoints.getLikes + url);
    return res;
}