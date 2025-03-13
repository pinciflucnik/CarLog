import * as request from '../lib/requester'
import { remove } from './carService';
const base_url = 'http://localhost:3030/data/refuels'
 export default {
    create: async (data, token) => {
        const newRefuel = await request.post(`${base_url}`, data, token);
        return newRefuel;
    },
    getAllDesc: async (carId) => {
        const result = await request.get(`${base_url}?where=carId%3D%22${carId}%22&sortBy=km%20desc`);
        return result;
    },
    getAllAsc: async (carId) => {
        const result = await request.get(`${base_url}?where=carId%3D%22${carId}%22&sortBy=km`);        
        return result;
    },
    delete: async (refuelId, token) => {
        return await request.remove(`${base_url}/${refuelId}`, undefined, token);
    },
    getOne: async (id) => {
        const result =  await request.get(`${base_url}/${id}`);
        return result
    },
    edit: async (id, data, token) => {
        return await request.put(`${base_url}/${id}`, data, token)
    }
 }