import * as request from '../lib/requester';

const baseUrl = 'http://localhost:3030/data/cars';

export const create = async (data, token) => {    
    
    const response = await request.post(`${baseUrl}`, data, token);
    return response
}

export const getAll = async () => {
    const response = await request.get(`${baseUrl}`);
    const result = await response.json();

    return result;
}
