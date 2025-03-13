import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";
import maintenanceService from "../services/maintenanceService";


export default function useMaintain(){
    const { auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate();

    const createHandler = async (formData, carId) => {
        const token = auth.accessToken;
        const data = {...Object.fromEntries(formData), carId}
        data.title = data.title.toLowerCase();
        data.price = Number(data.price);
        try {
            const result = await maintenanceService.create(data, token);

            //TODO navigate to list
            // navigate(`/cars/${carId}/view-repairs`);
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

    return {
        createHandler,
        getLatestHandler,
        sumAll,
    }

}