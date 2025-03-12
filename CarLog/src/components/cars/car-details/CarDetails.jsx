import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import useCars from "../../../hooks/useCars";
import AuthContext from "../../../context/AuthContext";
import AddRefueling from "../car-add-refueling/AddRefueling";
import AddMaintenance from "../car-add-maintetance/AddMeintenance";
import useRefuel from "../../../hooks/useRefuel";

export default function CarDetails() {
    const [isOwner, setIsOwner] = useState(false);
    const [toggleModals, setToggle] = useState({});
    const [average, setAverage] = useState(0);
    const [curAvg, setCurAvg] = useState(0);
    const [car, setCar] = useState({});
    const [odometer, setOdo] = useState(0);
    const { auth } = useContext(AuthContext)
    const { carId } = useParams();
    const { getOneHandler, deleteCarHandler } = useCars();
    const { getRefuelsAsc, getRefuelsDesc, calculateAvg, calculateLastAvg } = useRefuel();


    function onDelete(e) {
        e.preventDefault()
        deleteCarHandler(carId, auth.accessToken);
    }


    function modalShow(e) {
        setToggle({ [e.target.value]: true })

    }
    function modalClose(e) {
        setToggle({ [e.target.value]: false })

    }

    useEffect(() => {
        const getCar = async () => {
            const result = await getOneHandler(carId);
            setCar(result);

            if (auth.id === result._ownerId) {
                setIsOwner(true);
            }

        }
        getCar()
    }, [])

    useEffect(() => {
        getRefuelsAsc(carId)
            .then(data => {

                const newAverage = calculateAvg(data, car)
                setAverage(newAverage.toFixed(1));
            })

        getRefuelsDesc(carId)
            .then(data => {
                
                console.log(data);
                if(data.length > 0){
                    setOdo(data[0].km)
                } else {
                    setOdo(car.odometer)
                }
                const newCurAverage = calculateLastAvg(data, car);
                setCurAvg(newCurAverage.toFixed(1));
            })
    }, [car, toggleModals])

    console.log(odometer);
    


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
                                    <p>Average fuel consumption: <span className="consumption">{average == 0.0 ? "N/A " : `${average}l / 100km`}</span></p>
                                    <p className="new-cars-para2">Latest fuel consumption: {curAvg == 0.0 ? "N/A " : `${curAvg}l / 100km`}</p>
                                    <Link to={`/cars/${carId}/refuel-list`} className="welcome-btn smaller">Refuelings</Link>
                                    {isOwner && <button onClick={modalShow} className="welcome-btn smaller" value="refuel">Fill tank</button>}
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
                                    {isOwner && <button onClick={modalShow} className="welcome-btn smaller special" value="maintenance" >Add new</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {toggleModals.refuel && <AddRefueling modalClose={modalClose} carId={carId} odometer={odometer} />}
                {toggleModals.maintenance && <AddMaintenance modalClose={modalClose} carId={carId} />}
            </div>
        </div>

    )
}