import * as api from '../api/api.js'

const endpoints = {
    'createDonation': 'data/donation',
    
}

export async function donate(petId) {
    return await api.post(endpoints.createDonation, {petId});
}

export async function getDonations(petId) {
    const url = `?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
    return await api.get(endpoints.createDonation + url);
}

export async function getOwnDonation(petId, userId) {
    const url = `?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    return await api.get(endpoints.createDonation + url);
}