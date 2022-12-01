export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}

export function setUserData(obj) {
    const data = sessionStorage.setItem('userData', JSON.stringify(obj));
    return data;
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

