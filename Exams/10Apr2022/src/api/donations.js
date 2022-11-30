import * as api from './api.js';

const endpoints = {
    'createDonation': 'data/donations'
}

export async function createDonation(postId) {
    const res = api.post(endpoints.createDonation, {postId});
    return res;
}

export async function getDonationsCount(postId) {
    const url = `?where=postId%3D%22${postId}%22&distinct=_ownerId&count`
    const res = api.get(endpoints.createDonation + url);
    return res;
}

export async function getUserDonationsCount(postId, userId) {
    const url = `?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    const res = api.get(endpoints.createDonation + url);
    return res;
}


