const host = 'http://localhost:3030/';

async function request(method, url, data) {
    
    const option = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);
        if (response.status == 204) {
            return response
        }
        const data = await response.json();

        if (!response.ok) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            throw new Error(data.message);
        }

        return data;
        

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