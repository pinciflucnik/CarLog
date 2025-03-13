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
            console.log(result);
            // navigate(`/cars/${carId}/view-repairs`);
        } catch (error) {
            errorSetter(error);
        }
    }

    return {
        createHandler,
    }

}