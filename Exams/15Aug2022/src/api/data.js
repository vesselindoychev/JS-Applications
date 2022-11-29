import * as api from '../api/api.js';

const endpoints = {
    'getAllItems': 'data/shoes',
    'getCertainItem': 'data/shoes/'
}

export async function getAllItems() {
    const url = `?sortBy=_createdOn%20desc`
    const res = await api.get(endpoints.getAllItems + url);
    return res;
}

export async function createItem(brand, model, imageUrl, release, designer, value) {
    const res = await api.post(endpoints.getAllItems, {brand, model, imageUrl, release, designer, value});
    return res;
}

export async function getCertainItem(id) {
    const res = await api.get(endpoints.getCertainItem + id);
    return res;
}

export async function deleteItem(id) {
    const res = await api.delete(endpoints.getCertainItem + id);
    return res;
}

export async function updateItem(id, brand, model, imageUrl, release, designer, value) {
    const res = await api.put(endpoints.getCertainItem + id, {brand, model, imageUrl, release, designer, value});
    return res;
}

export async function searchItem(query) {
    const url = `?where=brand%20LIKE%20%22${query}%22`
    const res = await api.get(endpoints.getAllItems + url);
    return res;
}





