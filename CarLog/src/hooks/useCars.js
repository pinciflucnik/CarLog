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
        let formatedData = {
            ...data,
            make: data.make.toUpperCase(),
            model: data.model.toUpperCase()
        }

        console.log('add car handler');
        console.log(file);
        


        try {
            if (file.name) {
                const formPicture = new FormData();
                formPicture.append("file", file);
                formPicture.append("upload_preset", "car_photos");

                const response = await axios.post(`${CLOUDINARY_URL}`, formPicture);
                const imageUrl = response.data.secure_url;
                formatedData = {
                    ...formatedData,
                    picture: imageUrl
                }
            } else {
                formatedData = {
                    ...formatedData,
                    picture: 'https://res.cloudinary.com/dtwyysfkn/image/upload/v1741519670/kuyqdei9ut5qqqwigwna.webp'
                }
      
            }

            const newCar = await cars.create(formatedData, token);
            console.log(newCar);


            //redirect to car details
            navigate('/cars')

        } catch (error) {
            console.log(error);
            errorSetter(error)
        }

    }

    const getAllHandler = async () => {
        try {
            const list = await cars.getAll();
            return list
            
        } catch (error) {
            errorSetter(error)
        }
    }


    return {
        addCarHandler,
        getAllHandler
    }
}