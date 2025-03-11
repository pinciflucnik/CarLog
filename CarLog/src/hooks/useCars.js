import { useContext } from 'react';
import * as cars from '../services/carService'
import ErrorContext from '../context/ErrorContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtwyysfkn/image/upload'

export default function useCars() {
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate()

    const addCarHandler = async (data, token, file) => {

        //format data here
        let formattedData = {
            ...data,
            make: data.make.toUpperCase(),
            model: data.model.toUpperCase()
        }

        


        try {
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


            //redirect to car details
            navigate(`/cars/${newCar._id}/details`)

        } catch (error) {
            console.log(error);
            errorSetter(error)
        }

    }

    const editCarHandler = async (carData, token) => {
        try {
            const editedCar = await cars.update(carData, token);
            navigate(`/cars/${editedCar._id}/details`)
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
    
    const getMyHandler = async (id, token) => {
        try {
            const list = await cars.getMyCars(id, token)
            return list;
            
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
            await cars.remove(id, token);
            navigate('/cars')
            
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
    }
}