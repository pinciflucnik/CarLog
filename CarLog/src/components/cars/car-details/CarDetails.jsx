import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import useCars from "../../../hooks/useCars";
import AuthContext from "../../../context/AuthContext";
import AddRefueling from "../car-add-refueling/AddRefueling";
import AddMaintenance from "../car-add-maintetance/AddMeintenance";

export default function CarDetails() {
    const [isOwner, setIsOwner] = useState(false);
    const [toggleModals, setToggle] = useState({});
    const [car, setCar] = useState({});
    const { auth } = useContext(AuthContext)
    const { carId } = useParams();
    const { getOneHandler, deleteCarHandler } = useCars();

    function onDelete(e){
        e.preventDefault()
        deleteCarHandler(carId, auth.accessToken);
    }


    function modalToggle(e){
        setToggle({[e.target.value]: true})
    }
        
    useEffect(()=> {
        const getCar = async () => {
            const result = await getOneHandler(carId);
            setCar(result);

            if(auth.id === result._ownerId){
                setIsOwner(true);
            }
            
        }
        getCar()
    },[])


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
                                            {isOwner && <Link to={`/cars/${carId}/edit`} className="welcome-btn smaller">Edit</Link>}
                                            {isOwner && <button onClick={onDelete} className="welcome-btn smaller">Delete</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="single-new-cars-item">
                            <div className="col-md-5 col-sm-12 inner">
                                <div className="new-cars-txt">
                                    <h2>Refuelings</h2>
                                    <p>Average fuel consumption: <span className="consumption">6.2l / 100km</span></p>
                                    <p className="new-cars-para2">Latest fuel consumption: 7.8l / 100km</p>
                                    <Link to={`/cars/${carId}/refuel-list`} className="welcome-btn smaller">Refuelings</Link>
                                    {isOwner && <button onClick={modalToggle} className="welcome-btn smaller" value="refuel">Fill tank</button>}
                                </div>
                            </div>

                        </div>
                        <div className="single-new-cars-item">
                            <div className="col-md-5 col-sm-12">
                                <div className="new-cars-txt">
                                    <h2>Repairs and maintenance</h2>
                                    <p>Maintenance cost so far: <span className="consumption">6200 BGN</span></p>
                                    <p className="new-cars-para2">Cost of last maintenance was: 1000BGN</p>
                                    <Link to={`/cars/${carId}/view-repairs`} className="welcome-btn smaller">View list</Link>
                                    {isOwner && <button onClick={modalToggle} className="welcome-btn smaller special" value="maintenance" >Add new</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {toggleModals.refuel && <AddRefueling close={modalToggle}/>}
                {toggleModals.maintenance && <AddMaintenance close={modalToggle}/>}
            </div>
        </div>

    )
}