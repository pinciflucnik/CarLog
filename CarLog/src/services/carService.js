import * as request from '../lib/requester';

const baseUrl = 'http://localhost:3030/data/cars';

export const create = async (data, token) => {    
    
    const result = await request.post(`${baseUrl}`, data, token);
    return result
}

export const getAll = async () => {
    const result = await request.get(`${baseUrl}`);

    return result;
}
