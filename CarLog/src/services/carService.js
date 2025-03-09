import * as request from '../lib/requester';

const baseUrl = 'http://localhost:3030/data/cars';

export const create = async (data, token) => {    
    
    const response = await request.post(`${baseUrl}`, data, token);
    return response
}
