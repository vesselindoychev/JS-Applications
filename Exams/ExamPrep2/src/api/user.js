import * as api from '../api/api.js';
import { clearUserData, setUserData } from '../util.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout'
}

export async function login(username, password) {
    const res = await api.post(endpoints.login, {username, password});
    setUserData(res);
}

export async function register(username, password) {
    const res = await api.post(endpoints.register, {username, password});
    setUserData(res);
    
}

export async function logout() {
    await api.get(endpoints.logout);
    clearUserData()
}
