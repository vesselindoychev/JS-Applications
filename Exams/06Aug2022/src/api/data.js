import * as api from './api.js';

const endpoints = {
    'getAllOffers': 'data/offers',
    'getOfferDetails': 'data/offers/',
    'createApplication': 'data/applications'
    
}

export async function getAllOffers() {
    const url = '?sortBy=_createdOn%20desc'
    const res = await api.get(endpoints.getAllOffers + url);
    return res;
}

export async function createOffer( title, imageUrl, category, description, requirements, salary) {
    const res = await api.post(endpoints.getAllOffers, {title, imageUrl, category, description, requirements, salary});
    return res;
}

export async function getOfferDetails(id) {
    const res = await api.get(endpoints.getOfferDetails + id);
    return res;
}

export async function deleteOffer(id) {
    const res = await api.delete(endpoints.getOfferDetails + id);
    return res;
}

export async function updateOffer(id, title, imageUrl, category, description, requirements, salary) {
    const res = await api.put(endpoints.getOfferDetails + id, {title, imageUrl, category, description, requirements, salary});
    return res;
}

export async function createApplication(offerId) {
    const res = await api.post(endpoints.createApplication, {offerId});
    return res;
}

export async function getApplicationCount(offerId) {
    const url = `?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`
    const res = await api.get(endpoints.createApplication + url);
    return res;
}

export async function getUserApplicationCount(offerId, userId) {
    const url = `?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    const res = await api.get(endpoints.createApplication + url);
    return res;
}

