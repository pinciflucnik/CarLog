import * as request from '../lib/requester'
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
    }
 }