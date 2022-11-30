import * as api from './api.js';

const endpoints = {
    'getAllPosts': 'data/posts',
    'getPostInfo': 'data/posts/'
}

export async function getAllPosts() {
    const url = '?sortBy=_createdOn%20desc';
    const res = await api.get(endpoints.getAllPosts + url);
    return res;
}

export async function createPost(title, description, imageUrl, address, phone) {
    const res = await api.post(endpoints.getAllPosts, {title, description, imageUrl, address, phone});
    return res;
}

export async function getPostInfo(id) {
    const res = await api.get(endpoints.getPostInfo + id);
    return res;
}

export async function deletePost(id) {
    const res = await api.delete(endpoints.getPostInfo + id);
    return res;
}

export async function updatePost(id, title, description, imageUrl, address, phone) {
    const res = await api.put(endpoints.getPostInfo + id, {title, description, imageUrl, address, phone});
    return res;
}

export async function getUserPost(userId) {
    const url = `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    const res = await api.get(endpoints.getAllPosts + url);
    return res;
}




