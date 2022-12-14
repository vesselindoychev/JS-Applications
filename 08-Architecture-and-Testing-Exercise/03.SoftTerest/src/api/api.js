const host = 'http://localhost:3030/';

async function request(method, url, data) {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            const err = await response.json();
            throw new Error(err.message);
        }
        
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch(error) {
        alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del as delete
}