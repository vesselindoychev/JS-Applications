import * as api from '../api/api.js';

const endpoints = {
    'createBook': 'data/books',
    'getCurrentBook': 'data/books/'
}

export async function createBook(title, description, imageUrl, type) {
    const res = await api.post(endpoints.createBook,
    {
        title,
        description,
        imageUrl,
        type
    }
    )
    return res;
}

export async function getAllBooks() {
    const url = `?sortBy=_createdOn%20desc`
    const res = await api.get(endpoints.createBook + url);
    return res;
}

export async function getCurrentBook(id) {
    const res = await api.get(endpoints.getCurrentBook + id);
    return res;
}

export async function deleteBook(id) {
    const res = await api.delete(endpoints.getCurrentBook + id);
    return res;
}

export async function updateBook(id, title, description, imageUrl, type) {
    const res = await api.put(endpoints.getCurrentBook + id, 
        {
            title,
            description,
            imageUrl,
            type

        });
    return res;
}

export async function getMyBooks(userId) {
    const url = `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    const res = await api.get(endpoints.createBook + url);
    return res;
}