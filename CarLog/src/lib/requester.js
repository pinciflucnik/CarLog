const request = async (method, url, data, token) => {
    const options = {};
    console.log(method);
    console.log(url);
    console.log(data);
    console.log(token);


    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }

    const response = await fetch(url, {
        ...options,
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } 

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');