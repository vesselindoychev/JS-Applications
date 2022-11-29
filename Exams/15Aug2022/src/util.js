export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}

export function clearUserData() {
    const data = sessionStorage.removeItem('userData');
    return data;
}