import * as api from './api.js';

const endpoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout'
}

export async function register(email, password) {
    const user = await api.post(endpoints.register, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
} 
export async function login(email, password) {
    const user = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
} 
export async function logout() {
    await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
} 
