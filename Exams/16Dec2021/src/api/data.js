import * as api from './api.js';

const endpoints = {
    'getAllEvents': 'data/theaters',
    'getCurrentEvent': 'data/theaters/'
}

export async function getAllEvents() {
    const url = `?sortBy=_createdOn%20desc&distinct=title`;
    const res = await api.get(endpoints.getAllEvents + url);
    return res;
}

export async function createEvent(title, date, author, imageUrl, description) {
    const res = await api.post(endpoints.getAllEvents, {title, date, author, imageUrl, description});
    return res;
}

export async function getCurrentEvent(id) {
    const res = await api.get(endpoints.getCurrentEvent + id);
    return res;
}

export async function deleteEvent(id) {
    const res = await api.delete(endpoints.getCurrentEvent + id);
    return res;
}

export async function getOwnerEvents(userId) {
    const url = `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    const res = await api.get(endpoints.getAllEvents + url);
    return res;
}

export async function updateEvent(id, title, date, author, description, imageUrl) {
    const res = await api.put(endpoints.getCurrentEvent + id, {title, date, author, description, imageUrl});
    return res;
}




