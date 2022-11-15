export function setUserData(data) {
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('id', data._id);
}

export function clearUserData() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');    
}

export function createSubmitHandler(formId, callback) {
    document.getElementById(formId).addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data, event);
    }
}