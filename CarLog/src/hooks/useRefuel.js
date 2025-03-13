import { useContext, useState } from "react";
import refuelService from "../services/refuelService";
import ErrorContext from "../context/ErrorContext";
import { useNavigate } from "react-router";

export default function useRefuel() {
    const [refuels, setRefuels] = useState([]);
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate();

    const getRefuelsAsc = async (carId) => {
        try {
            const result = await refuelService.getAllAsc(carId);
                        
            setRefuels(result);

            return result;

        } catch (error) {
            errorSetter({ message: 'Unable to load refuels!' });
        }
    }
    const getRefuelsDesc = async (carId) => {
        try {
            const result = await refuelService.getAllDesc(carId);
                        
            setRefuels(result);

            return result;

        } catch (error) {
            errorSetter({ message: 'Unable to load refuels!' });
        }
    }
    const refuel = async (formData, carId, token) => {
        const data = { ...Object.fromEntries(formData) }
        const newRefuel = { ...data, carId, km: Number(data.km), liters: Number(data.liters) };

        const result = await refuelService.create(newRefuel, token);

        setRefuels(state => [...state, result])
    }
    const calculateLastAvg = (data, car) => {
        if (!data || data.length == 0) {
            return 0;
        };
        let endKm = 0;
        let startKm = 0;
        let fullFound = 0;
        let totalLiters = 0;
        if(data.length === 1){
            startKm = car.odometer;
        }

        data.map(r => {
            if(r.full === "true" && fullFound === 0){
                endKm = r.km;
                totalLiters += r.liters
            }
            if(r.full === "true" && fullFound === 1){
                startKm = r.km
            }
            if(fullFound < 2 && r.full === "false" && fullFound !== 0){
                
                totalLiters += r.liters
            }
            if(r.full === "true"){
                fullFound++
            }
            if (fullFound === 2){
                return
            }
        });

        return totalLiters / ((endKm - startKm) / 100)
        
        

    };
    const calculateAvg = (data, car) => {
        if (!data || data.length === 0){
            return 0;
        }
        const startKm = car.odometer;
        let endKm = 0
        let totalLiters = 0;
        data.map((refuel, index) => {
            if (refuel.full === 'true') {
                
                totalLiters += refuel.liters;
                    endKm = refuel.km;
            } else if (refuel.full === 'false' && index < data.length - 1) {
                
                totalLiters += refuel.liters;
            }

        });
        const totalKm = endKm - startKm;
        return totalLiters/ (totalKm/100);
    };
    const removeRefuel = async (id, token, carId) => {
        await refuelService.delete(id, token);
        navigate(`/cars/${carId}/details`)
    };
    const getCurrentRefuel = async (id) => {
        try {
            
            const result = await refuelService.getOne(id);
            return result;
        } catch (error) {
            errorSetter({message: 'Error loading refuel details'})
        }

    };
    const editRefuel = async (formData, refuel, token) => {
        const data = Object.fromEntries(formData);
        if(!data.full){
            console.log('u have no data for tank');
            throw new Error('Select if tank is full or not!')
        }
        const edited = {...refuel, ...data}
        try {
            await refuelService.edit(refuel._id, edited, token);
        } catch (error) {
            errorSetter(error);
        }

    }

    return {
        refuels,
        refuel,
        getRefuelsAsc,
        getRefuelsDesc,
        calculateAvg,
        calculateLastAvg,
        removeRefuel,
        getCurrentRefuel,
        editRefuel,
    }

}