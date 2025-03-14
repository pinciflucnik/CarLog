import { useParams } from "react-router";
import useCars from "../../../hooks/useCars";
import { useContext, useEffect, useState } from "react";
import useRefuel from "../../../hooks/useRefuel";
import AuthContext from "../../../context/AuthContext";
import CarEditRefueling from "../car-edit-refueling/CarEditRefueling";

export default function CarRefuelList() {
    const [car, setCar] = useState({});
    const [refuels, setRefuels] = useState([]);
    const [refuelId, setId] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [toggleModals, setToggle] = useState(false);
    const { getOneHandler } = useCars();
    const { carId } = useParams();
    const { getRefuelsDesc, removeRefuel } = useRefuel();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        getOneHandler(carId)
            .then(result => setCar(result))
        getRefuelsDesc(carId)
            .then(result => setRefuels(result))
        
    }, [toggleModals])

    useEffect(()=> {
        if (car._ownerId === auth.id){
            setIsOwner(true);
        } else {
            setIsOwner(false)
        }
    }, [car])
    const modalHandler = (id) => {
        setToggle(state => !state);
         if (id) {
            setId(id);
         }
    }

    const deleteHandler = async (id) => {
        await removeRefuel(id, auth.accessToken, carId)
        
    }
    

    return (
        <div className="my-wrapper">
            <div className="container">
                <div className="section-header">
                    <h2>{car.make} {car.model}</h2>
                </div>
                <div className="new-cars-content">
                    <div className="new-cars-item">
                        <div className="single-new-cars-item">
                            <div className="row">
                                <div className="col-md-7 col-sm-12">
                                    <div className="new-cars-img">
                                        <img src={car.picture} alt={car.make} />
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-12">
                                    <div className="new-cars-txt">
                                        <h2>Technical specifications</h2>
                                        <div className="details">
                                            <p>Engine size: {car.capacity}cc</p>
                                            <p>Engine power: {car.power}HP</p>
                                            <p>Fuel type: {car.fuel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="single-new-cars-item">
                            <div className="col-md-12 col-sm-12">
                                <div className="table-container">
                                    {refuels.length > 0 && <table className="my-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Odometer (km)</th>
                                                <th>Liters</th>
                                            {isOwner && <th>Actions</th>}    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {refuels.map((refuel) => (
                                                <tr key={refuel.id}>
                                                    <td><span className="table-data">{new Date(refuel._createdOn).toLocaleDateString()}</span></td>
                                                    <td><span className="table-data">{refuel.km}</span></td>
                                                    <td><span className="table-data">{refuel.liters}</span></td>
                                                    {isOwner && 
                                                        <td>
                                                            <button onClick={() => modalHandler(refuel._id)} className="form-btn">Edit</button>
                                                            <button onClick={() => deleteHandler(refuel._id)} className="form-btn">Delete</button>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    }
                                    {refuels.length === 0 &&
                                        <div className="col-md-12 no-cars">
                                            <h1>There are no records to display</h1>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    {toggleModals && <CarEditRefueling refuelId={refuelId} modalHandler={modalHandler} />}
                </div>
            </div>
        </div>

    )
}