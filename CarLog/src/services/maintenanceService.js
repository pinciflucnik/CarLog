import * as request from '../lib/requester'

const base_url = 'http://localhost:3030/data/maintenances'

export default {
    create: async (data, token) => {
        const newRefuel = await request.post(`${base_url}`, data, token);
        return newRefuel;
    },
    delete: async (id, token) => {
        return await request.remove(`${base_url}/${id}`, undefined, token);
    },
    getOne: async (id) => {
        const result =  await request.get(`${base_url}/${id}`);
        return result
    },
    edit: async (id, data, token) => {
        return await request.put(`${base_url}/${id}`, data, token)
    },
    getAllDesc: async (carId) => {
        const result = await request.get(`${base_url}?where=carId%3D%22${carId}%22&sortBy=_createdOn%20desc`);
        return result;
    },
    getLast: async (carId) => {
        const result = await request.get(`${base_url}?where=carId%3D%22${carId}%22&sortBy=_createdOn%20desc&pageSize=1`);
        return result;

    }


}