const host = 'https://parseapi.back4app.com';
const appId = 'n7hcZF6rqfnCRcAx1cYfPZRwunSXcdH5NuQvnhcz';
const apiKey = 'VMBV9caUp37fiE3wUtE7qr5ef71qAVGyl1ag72pz';

async function request(method, url, data) {
    const options = {
        method,
        headers: {
          'X-Parse-Application-Id': appId,
          'X-Parse-JavaScript-Key': apiKey  
        }
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // TODO add authorizarion headers

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok != true) {
            console.log(result);
            throw new Error(result.message || result.error);
        }

        return result; 

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