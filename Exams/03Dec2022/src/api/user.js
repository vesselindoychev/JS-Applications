import * as api from '../api/api.js';
import { clearUserData, setUserData } from '../util.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout'
}

export async function login(email, password) {
    const res = await api.post(endpoints.login, {email, password});
    setUserData(res);
}

export async function register(email, password) {
    const res = await api.post(endpoints.register, {email, password});
    setUserData(res);
    
}

export async function logout() {
    await api.get(endpoints.logout);
    clearUserData()
}
