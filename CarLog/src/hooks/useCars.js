import { useContext, useState } from 'react';
import * as cars from '../services/carService';
import * as watchService from '../services/watchService';
import ErrorContext from '../context/ErrorContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtwyysfkn/image/upload'

export default function useCars() {
    const { errorSetter } = useContext(ErrorContext);
    const [ isPending, setIsPending] = useState(false);
    const navigate = useNavigate()

    const addCarHandler = async (data, token, file) => {

        let formattedData = {
            ...data,
            make: data.make.toUpperCase(),
            model: data.model.toUpperCase(),
            odometer : Number(data.odometer),
            
        }

        


        try {
            setIsPending(true)
            if (file.name) {
                const formPicture = new FormData();
                formPicture.append("file", file);
                formPicture.append("upload_preset", "car_photos");

                const response = await axios.post(`${CLOUDINARY_URL}`, formPicture);
                const imageUrl = response.data.secure_url;
                formattedData = {
                    ...formattedData,
                    picture: imageUrl
                }
            } else {
                formattedData = {
                    ...formattedData,
                    picture: 'https://res.cloudinary.com/dtwyysfkn/image/upload/v1741519670/kuyqdei9ut5qqqwigwna.webp'
                }
      
            }

            const newCar = await cars.create(formattedData, token);
            const newList = await watchService.createList(newCar._id);


            navigate(`/cars/${newCar._id}/details`)
            setIsPending(false)
        } catch (error) {
            errorSetter(error)
        }

    }

    const editCarHandler = async (carData, token) => {
        carData.make = carData.make.toUpperCase();
        carData.model = carData.model.toUpperCase()
        try {
            setIsPending(true)
            const editedCar = await cars.update(carData, token);
            navigate(`/cars/${editedCar._id}/details`)
            setIsPending(false)
        } catch (error) {
            errorSetter(error);
        }


    }

    const getAllHandler = async () => {
        try {
            const list = await cars.getAll();
            return list;
            
        } catch (error) {
            errorSetter(error)
        }
    }
    
    const getMyHandler = async (id) => {
        try {
            setIsPending(true)
            const list = await cars.getMyCars(id)
            return list;
            setIsPending(false)
            
        } catch (error) {
            errorSetter(error)
        }
    }

    const getOneHandler = async (id) => {

        try {
            const car = await cars.getOne(id)
            return car;
            
        } catch (error) {
            errorSetter(error)
        }
    }

    const deleteCarHandler = async (id, token) => {
        try {
            setIsPending(true)
            await cars.remove(id, token);
            navigate('/cars')
            setIsPending(false)

        } catch (error) {
            errorSetter(error)
        }

    }


    return {
        addCarHandler,
        editCarHandler,
        getAllHandler,
        getMyHandler,
        getOneHandler,
        deleteCarHandler,
        isPending
    }
}