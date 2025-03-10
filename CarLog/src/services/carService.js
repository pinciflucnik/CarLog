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

export const getMyCars = async (id, token) => {
    const result = await request.get(`${baseUrl}?where=_ownerId%3D%22${id}%22`)
    return result;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);
    return result;
}

export const remove = async (id, token) => {
    await request.remove(`${baseUrl}/${id}`, null, token)
}
