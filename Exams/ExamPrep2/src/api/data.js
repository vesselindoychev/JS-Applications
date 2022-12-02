import * as api from '../api/api.js';

const endpoints = {
    'getAllCars': 'data/cars',
    'getCurrentCar': 'data/cars/'
}

export async function getAllCars() {
    const url = '?sortBy=_createdOn%20desc';
    const res = await api.get(endpoints.getAllCars + url);
    return res;
}

export async function createCar(brand, model, description, year, imageUrl, price) {
    const res = await api.post(endpoints.getAllCars, {brand, model, description, year, imageUrl, price});
    return res;
}

export async function updateCar(id, brand, model, description, year, imageUrl, price) {
    const res = await api.put(endpoints.getCurrentCar + id, {brand, model, description, year, imageUrl, price});
    return res;
}

export async function getCurrentCar(id) {
    const res = await api.get(endpoints.getCurrentCar + id);
    return res;
}

export async function deleteCar(id) {
    const res = await api.delete(endpoints.getCurrentCar + id);
    return res;
}

export async function getMyCars(userId) {
    const url = `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    const res = await api.get(endpoints.getAllCars + url);
    return res;
}

export async function getByYear(query) {
    const url = `?where=year%3D${query}`;
    const res = await api.get(endpoints.getAllCars + url);
    return res;
}