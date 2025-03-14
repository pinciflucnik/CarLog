import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";
import maintenanceService from "../services/maintenanceService";


export default function useMaintain(){
    const { auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate();
    const token = auth.accessToken;
    const [current, setCurrent] = useState({
        title: '',
        price: ''
    });

    const createHandler = async (formData, carId) => {
        const data = {...Object.fromEntries(formData), carId}
        data.title = data.title.toLowerCase();
        data.price = Number(data.price);
        try {
            const result = await maintenanceService.create(data, token);

            navigate(`/cars/${carId}/view-repairs`);
        } catch (error) {
            errorSetter(error);
        }
    }
    const getLatestHandler = async (carId) => {
        try {
            const result = await maintenanceService.getLast(carId);
            console.log(result);
            return result;
            
        } catch (error) {
            errorSetter(error);
        }
    }
    const getAllHandler = async (carId) => {
        try {
            const result = await maintenanceService.getAllDesc(carId);
            return result;
        } catch (error) {
            errorSetter(error)
        }
    }
    const sumAll = async (carId) => {
        try {
            const all = await maintenanceService.getAllDesc(carId);
            let sum = 0;
            all.map(m => {
                sum += m.price
            })
            return sum;
        } catch (error) {
            errorSetter(error)
        }
    }  
    const deleteMaintenance = async (id, carId) => {
        try {
            await maintenanceService.delete(id, token);
            navigate(`/cars/${carId}/details`)            
        } catch (error) {
            errorSetter(error)
        }

    }
    const getSingleMaintenance = async (id) => {
        try {
            const result = await maintenanceService.getOne(id);
            return result;  
        } catch (error) {
            errorSetter(error)
        }
    }
    const setMyCurrent = (data) => {
        setCurrent(data);
    }

    return {
        createHandler,
        deleteMaintenance,
        getLatestHandler,
        getAllHandler,
        getSingleMaintenance,
        sumAll,
        setMyCurrent,
        current,
    }

}