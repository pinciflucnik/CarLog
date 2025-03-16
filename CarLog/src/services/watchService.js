import * as request from '../lib/requester'

const base_url = 'http://localhost:3030/jsonstore/watchlists'
export const createList = async (carId) => {
    const data = {
        carId,
        watchers: []
    }
    const result = await request.post(`${base_url}`,data)
    
}

export const getAll = async () => {
    const result = await request.get(`${base_url}`);
    
    return Object.values(result)
}


export const addToList = async (listId, data) => {

    const updated = await request.put(`${base_url}/${listId}`, data);

    return updated
}