import { useContext } from 'react';
import * as cars from '../services/carService'
import ErrorContext from '../context/ErrorContext';
import { useNavigate } from 'react-router';

export default function useCars() {
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate()

    const addCarHandler = async (data, token) => {
        
        //format data here
        let formatedData = {
            ...data,
            make: data.make.toUpperCase(),
            model: data.model.toUpperCase()
        }
        
        
        try {
            const newCar = await cars.create(formatedData, token);
            console.log(newCar);
            

        //redirect to car details
        navigate('/cars')

        } catch (error) {
            console.log(error);
            
            errorSetter(error)
        }
    }


    return {
        addCarHandler,
    }
}