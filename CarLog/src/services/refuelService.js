import * as request from '../lib/requester'
const base_url = 'http://localhost:3030/data/refuels'
 export default {
    create: async (data, token) => {
        const newRefuel = await request.post(`${base_url}`, data, token);
        return newRefuel;
    }
 }