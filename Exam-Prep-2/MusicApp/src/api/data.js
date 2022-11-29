import * as api from '../api/api.js';

const endpoints = {
    'getAllAlbums': 'data/albums',
    'getAlbumDetails': 'data/albums/'
}

export async function getAllAlbums() {
    const url = '?sortBy=_createdOn%20desc&distinct=name'
    return await api.get(endpoints.getAllAlbums + url);
}

export async function createAlbum(name, imgUrl, price, releaseDate, artist, genre, description) {
    return await api.post(endpoints.getAllAlbums, {name, imgUrl, price, releaseDate, artist, genre, description});
}

export async function getDetails(id) {
    return await api.get(endpoints.getAlbumDetails + id);
}

export async function deleteAlbum(id) {
    return await api.delete(endpoints.getAlbumDetails + id);
}

export async function updateAlbum(id, name, imgUrl, price, releaseDate, artist, genre, description) {
    return await api.put(endpoints.getAlbumDetails + id, {name, imgUrl, price, releaseDate, artist, genre, description});
}

export async function searchAlbum(query) {
    const url = `?where=name%20LIKE%20%22${query}%22`;
    return await api.get(endpoints.getAllAlbums + url)
}
