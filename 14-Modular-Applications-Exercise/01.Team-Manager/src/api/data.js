import * as api from './api.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'getAllTeams': 'data/teams',
    'getAllMembers': 'data/members?where=status%3D%22member%22',
    'getTeamInfo': 'data/teams/',
    'memberRequest': 'data/members'
    // '': 'data/members/'
    
}

export async function login(email, password) {
    const user = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
}

export async function register(email, username, password) {
    const user = await api.post(endpoints.register, {email, username, password});
    sessionStorage.setItem('userData', JSON.stringify(user));
}

export async function logout() {
    await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
}

export async function getAllTeams() {
    const res = await api.get(endpoints.getAllTeams);
    return res;
}

export async function getAllMembers() {
    const res = await api.get(endpoints.getAllMembers);
    return res;
}

export async function createTeam(name, imageUrl, description) {
    const res = await api.post(endpoints.getAllTeams, {name, imageUrl, description});
    return res;
}

export async function getTeamInfo(id) {
    const res = await api.get(endpoints.getTeamInfo + id);
    return res;
}

export async function editTeamInfo(id, name, imageUrl, description) {
    const res = await api.put(endpoints.getTeamInfo + id, {name, imageUrl, description});
    return res
}

export async function requestMemeber(teamId) {
    const res = await api.post(endpoints.memberRequest, {teamId});
    return res
}

export async function getOwnerTeamInfo(teamId) {
    const url = endpoints.memberRequest + `?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
    const res = await api.get(url);
    return res
}



