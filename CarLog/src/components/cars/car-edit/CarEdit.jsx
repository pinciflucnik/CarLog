import { useContext } from "react";
import useCars from "../../../hooks/useCars";
import useForm from "../../../hooks/UseForm"
import AuthContext from "../../../context/AuthContext";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function CarEdit() {
    const { editCarHandler, getOneHandler, isPending } = useCars();
    const { auth } = useContext(AuthContext);
    const { carId } = useParams();
    const { values, file, onChange, onSubmit, onLoad } = useForm((data) => editCarHandler(data, auth.accessToken),{
        make: '',
        model: '',
        capacity: '',
        power: '',
        fuel: 'petrol',
        odometer: '',
        picture: '',
    });

    useEffect(() => {
        getOneHandler(carId)
            .then(data => onLoad(data));
    },[])

    return (
        <div className="container add-car">
            <div className="col-md-4 col-sm-6">
                <div className="form-container">
                    <form className="car-form" onSubmit={onSubmit}>
                        <h2>Edit Car</h2>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="make" name="make" value={values.make} onChange={onChange} required />

                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" value={values.model} onChange={onChange} required />

                        <label htmlFor="capacity">Engine Capacity (cc):</label>
                        <input type="number" id="capacity" name="capacity" value={values.capacity} onChange={onChange} required />

                        <label htmlFor="power">Power (hp):</label>
                        <input type="number" id="power" name="power" value={values.power} onChange={onChange} required />

                        <label htmlFor="fuel">Fuel Type:</label>
                        <select id="fuel" name="fuel" value={values.fuel} onChange={onChange} required>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="LPG">LPG</option>
                            <option value="CNG">CNG</option>
                        </select>

                        <label htmlFor="odometer">Odometer (km):</label>
                        <input type="number" id="odometer" name="odometer" value={values.odometer} onChange={onChange} required />
                        
                        <button type="submit" disabled={isPending}>Edit Car</button>
                    </form>
                </div>
            </div>
        </div>
    )
}