import * as api from '../api/api.js';

const endpoints = {
    'getAllAlbums': 'data/albums',
    'getCurrentAlbum': 'data/albums/'
}

export async function getAllAlbums() {
    const url = '?sortBy=_createdOn%20desc';
    const res = await api.get(endpoints.getAllAlbums + url);
    return res;
}

export async function createAlbum(singer, album, imageUrl, release, label, sales) {
    const res = await api.post(endpoints.getAllAlbums, {singer, album, imageUrl, release, label, sales});
    return res;
}

export async function getCurrentAlbum(id) {
    const res = await api.get(endpoints.getCurrentAlbum + id);
    return res;
}

export async function deleteAlbum(id) {
    const res = await api.delete(endpoints.getCurrentAlbum + id);
    return res;
}

export async function updateAlbum(id, singer, album, imageUrl, release, label, sales) {
    const res = await api.put(endpoints.getCurrentAlbum + id, {singer, album, imageUrl, release, label, sales});
    return res;
}