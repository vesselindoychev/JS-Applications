import * as api from './api.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'createFurniture': 'data/catalog',
    'getAllFurniture': 'data/catalog',
    'getFurnitureById': 'data/catalog/',
    'myFurniture': 'data/catalog?where=_ownerId%3D%22'
}

export async function login(email, password) {
    const user = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
}
export async function register(email, password) {
    const user = await api.post(endpoints.register, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
}

export async function logout() {
    await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
}

export async function createFurniture(data) {
    const res = await api.post(endpoints.createFurniture, data);
    return res;
}

export async function getAllFurniture() {
    const res = await api.get(endpoints.getAllFurniture);
    return res;
}

export async function getFurnitureById(id) {
    const res = await api.get(endpoints.getFurnitureById + id);
    return res;
}

export async function updateFurnitureById(id, data) {
    const res = await api.put(endpoints.getFurnitureById + id, data);
    return res;
}

export async function deleteFurnitureById(id) {
    const res = await api.delete(endpoints.getFurnitureById + id);
    return res;
}

export async function getMyFurniture() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData && userData._id
    let id = `${userId}%22`;

    const res = await api.get(endpoints.myFurniture + id);
    return res;
}

