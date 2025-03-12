import { useContext, useState } from "react";
import refuelService from "../services/refuelService";
import ErrorContext from "../context/ErrorContext";

export default function useRefuel() {
    const [refuels, setRefuels] = useState([]);
    const { errorSetter } = useContext(ErrorContext);

    const getRefuels = async (carId) => {
        try {
            const result = await refuelService.getAllAsc(carId);
                        
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
        console.log(result);

        setRefuels(state => [...state, result])
    }

    const calculateLastAvg = (data, car) => {
        let startKm = 0
        if (data.length == 0) {
            startKm = car.odometer
        } else {
            startKm = data[0].km
        }
    };

    const calculateAvg = (data, car) => {
        if (data.length === 0){
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
                console.log(refuel.full);
                console.log(index < data.length - 1);
                
                totalLiters += refuel.liters;
            }

        });
        const totalKm = endKm - startKm;

        return totalLiters/ (totalKm/100);
    };


    return {
        refuels,
        refuel,
        getRefuels,
        calculateAvg,
    }

}