import { useState } from "react";
import refuelService from "../services/refuelService";

export default function useRefuel() {
    const [refuels, setRefuels] = useState([]);
    const [average, setAverage] = useState(0);

const refuel = async (formData, carId, token) => {
    const newRefuel = {...Object.fromEntries(formData), carId};

    const result = await refuelService.create(newRefuel, token);
    console.log(result);
    
    setRefuels(state => [...state, result])
}

const getRefuels = (data) => {
    setRefuels(data);
}
const calculateAvg = (data) => {
    const calculatedAvg = 0;
    //setAverage
};


return {
    refuels,
    average,
    refuel,
    getRefuels,
    calculateAvg,
}

}