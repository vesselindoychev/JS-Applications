import * as api from './api.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'getAllPets': 'data/pets?sortBy=_createdOn%20desc&distinct=name',
    'createPet': 'data/pets',
    'getPetInfo': 'data/pets/'
}

export async function login(email, password) {
    const res = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}

export async function register(email, password) {
    const res = await api.post(endpoints.register, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}
export async function logout() {
    await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
}

export async function getAllPets() {
    const res = await api.get(endpoints.getAllPets);
    return res;
}

export async function createPet(name, breed, age, weight, image) {
    const res = await api.post(endpoints.createPet, {name, breed, age, weight, image});
    return res;
}

export async function getPetInfo(petId) {
    const res = await api.get(endpoints.getPetInfo + petId);
    return res;
}

export async function editPetInfo(petId, name, breed, age, weight, image) {
    const res = await api.put(endpoints.getPetInfo + petId, {name, breed, age, weight, image});
    return res;
}

export async function deletePetInfo(petId) {
    const res = await api.delete(endpoints.getPetInfo + petId);
    return res;
}
